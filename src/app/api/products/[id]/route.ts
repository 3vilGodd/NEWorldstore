import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { transformProduct } from "@/lib/db-helpers";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!prisma) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }

    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: { select: { slug: true } }, subcategory: { select: { slug: true } } },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(transformProduct(product));
  } catch (error) {
    console.error("Product API error", error);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}
