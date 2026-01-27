import Razorpay from "razorpay";
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  amount: z.number().min(1),
  currency: z.string().default("INR"),
  provider: z.enum(["razorpay", "stripe"]).default("razorpay"),
  receipt: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const payload = bodySchema.parse(json);

    if (payload.provider === "razorpay") {
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID || "",
        key_secret: process.env.RAZORPAY_KEY_SECRET || "",
      });

      const order = await razorpay.orders.create({
        amount: payload.amount * 100,
        currency: payload.currency,
        receipt: payload.receipt,
      });
      return NextResponse.json({ id: order.id, provider: "razorpay", order });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
      apiVersion: (process.env.STRIPE_API_VERSION as Stripe.LatestApiVersion) || "2024-12-18",
    });
    const paymentIntent = await stripe.paymentIntents.create({
      amount: payload.amount * 100,
      currency: payload.currency,
      metadata: { receipt: payload.receipt || "N/A" },
    });

    return NextResponse.json({ id: paymentIntent.id, clientSecret: paymentIntent.client_secret, provider: "stripe" });
  } catch (error: unknown) {
    console.error("Checkout API error", error);
    return NextResponse.json({ error: "Unable to create order" }, { status: 400 });
  }
}
