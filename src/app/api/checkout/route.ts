import Razorpay from "razorpay";
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ensureUser } from "@/lib/ensure-user";

const addressSchema = z.object({
  label: z.string().min(1),
  line1: z.string().min(1),
  line2: z.string().optional(),
  city: z.string().min(1),
  state: z.string().min(1),
  zip: z.string().min(1),
  phone: z.string().min(10),
});

const bodySchema = z.object({
  amount: z.number().min(1),
  currency: z.string().default("INR"),
  provider: z.enum(["razorpay", "stripe"]).default("razorpay"),
  receipt: z.string().optional(),
  address: addressSchema.optional(),
});

export async function POST(req: Request) {
  try {
    if (!prisma) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await ensureUser(session);
    if (!user) {
      return NextResponse.json({ error: "Unable to resolve user" }, { status: 500 });
    }

    const json = await req.json();
    const payload = bodySchema.parse(json);

    const cart = await prisma.cart.findUnique({
      where: { userId: user.id },
      include: { items: { include: { product: true } } },
    });

    if (!cart?.items.length) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    let addressId: string | undefined;
    if (payload.address) {
      const saved = await prisma.address.create({
        data: {
          ...payload.address,
          userId: user.id,
        },
      });
      addressId = saved.id;
    }

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        total: payload.amount,
        currency: payload.currency,
        status: "PLACED",
        addressId,
        paymentMode: payload.provider,
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
    });

    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

    const hasRazorpay = !!(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);
    const hasStripe = !!process.env.STRIPE_SECRET_KEY;

    if (payload.provider === "razorpay" && hasRazorpay) {
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID!,
        key_secret: process.env.RAZORPAY_KEY_SECRET!,
      });

      const paymentOrder = await razorpay.orders.create({
        amount: payload.amount * 100,
        currency: payload.currency,
        receipt: payload.receipt ?? order.id,
      });

      await prisma.order.update({
        where: { id: order.id },
        data: { paymentId: paymentOrder.id, status: "PAYMENT_PENDING" },
      });

      return NextResponse.json({
        orderId: order.id,
        id: paymentOrder.id,
        provider: "razorpay",
        order: paymentOrder,
      });
    }

    if (payload.provider === "stripe" && hasStripe) {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: (process.env.STRIPE_API_VERSION as Stripe.LatestApiVersion) || "2024-12-18",
      });
      const paymentIntent = await stripe.paymentIntents.create({
        amount: payload.amount * 100,
        currency: payload.currency.toLowerCase(),
        metadata: { orderId: order.id, receipt: payload.receipt || order.id },
      });

      await prisma.order.update({
        where: { id: order.id },
        data: { paymentId: paymentIntent.id, status: "PAYMENT_PENDING" },
      });

      return NextResponse.json({
        orderId: order.id,
        id: paymentIntent.id,
        clientSecret: paymentIntent.client_secret,
        provider: "stripe",
      });
    }

    await prisma.order.update({
      where: { id: order.id },
      data: { status: "CONFIRMED" },
    });

    return NextResponse.json({
      orderId: order.id,
      id: order.id,
      provider: payload.provider,
      paymentSkipped: true,
      message: "Order placed. Configure payment keys to enable live payments.",
    });
  } catch (error: unknown) {
    console.error("Checkout API error", error);
    return NextResponse.json({ error: "Unable to create order" }, { status: 400 });
  }
}
