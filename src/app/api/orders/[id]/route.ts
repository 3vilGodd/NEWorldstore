import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type OrderRouteContext = {
  params: Promise<{
    id: string;
  }>;
};

function buildTimeline(status: string, createdAt: Date) {
  const placed = createdAt.toISOString();
  const packed = new Date(createdAt.getTime() + 3 * 60 * 60 * 1000).toISOString();
  const shipped = new Date(createdAt.getTime() + 24 * 60 * 60 * 1000).toISOString();

  const steps = [
    { label: "Order placed", at: placed, completed: true },
    { label: "Packed", at: packed, completed: status !== "PLACED" },
    { label: "Handed to courier", at: shipped, completed: ["IN_TRANSIT", "DELIVERED", "CONFIRMED"].includes(status) },
    { label: "Delivered", at: shipped, completed: status === "DELIVERED" },
  ];

  return steps.filter((s) => s.completed || s.label === "Order placed");
}

export async function GET(_request: Request, context: OrderRouteContext) {
  const { id } = await context.params;

  if (prisma) {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: { include: { product: { select: { name: true, thumbnail: true } } } },
        address: true,
      },
    });

    if (order) {
      return NextResponse.json({
        id: order.id,
        status: order.status,
        total: order.total,
        currency: order.currency,
        paymentId: order.paymentId,
        paymentMode: order.paymentMode,
        createdAt: order.createdAt.toISOString(),
        timeline: buildTimeline(order.status, order.createdAt),
        items: order.items.map((item) => ({
          quantity: item.quantity,
          price: item.price,
          product: item.product,
        })),
        address: order.address,
      });
    }
  }

  return NextResponse.json({
    id,
    status: "IN_TRANSIT",
    timeline: buildTimeline("IN_TRANSIT", new Date()),
  });
}
