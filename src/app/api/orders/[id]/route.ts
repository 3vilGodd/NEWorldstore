import { NextResponse } from "next/server";

type OrderRouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, context: OrderRouteContext) {
  const { id } = await context.params;

  // Stub order tracker response
  const status = "IN_TRANSIT";
  const timeline = [
    { label: "Order placed", at: "2024-12-10T09:00:00Z", completed: true },
    { label: "Packed", at: "2024-12-10T12:00:00Z", completed: true },
    { label: "Handed to courier", at: "2024-12-11T08:20:00Z", completed: status !== "PLACED" },
  ];

  return NextResponse.json({
    id,
    status,
    timeline,
  });
}
