import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { transformProduct } from "@/lib/db-helpers";

export async function GET(req: Request) {
  try {
    if (!prisma) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") ?? undefined;
    const sub = searchParams.get("sub") ?? undefined;
    const query = searchParams.get("q");
    const ids = searchParams.get("ids")?.split(",").filter(Boolean);

    if (ids && ids.length > 0) {
      const products = await prisma.product.findMany({
        where: { id: { in: ids } },
        include: { category: { select: { slug: true } }, subcategory: { select: { slug: true } } },
      });
      // Preserve the order of requested IDs
      const productMap = new Map(products.map((p) => [p.id, transformProduct(p)]));
      const orderedProducts = ids.map((id) => productMap.get(id)).filter((p): p is ReturnType<typeof transformProduct> => p !== undefined);
      return NextResponse.json({ items: orderedProducts });
    }

    if (query) {
      const products = await prisma.product.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
            { tags: { has: query } },
          ],
        },
        include: { category: { select: { slug: true } }, subcategory: { select: { slug: true } } },
        take: 50,
      });
      return NextResponse.json({ items: products.map(transformProduct) });
    }

    if (category || sub) {
      const where: any = {};
      if (category) {
        const cat = await prisma.category.findUnique({ where: { slug: category } });
        if (cat) where.categoryId = cat.id;
      }
      if (sub) {
        const subcat = await prisma.subCategory.findUnique({ where: { slug: sub } });
        if (subcat) where.subcategoryId = subcat.id;
      }

      const products = await prisma.product.findMany({
        where,
        include: { category: { select: { slug: true } }, subcategory: { select: { slug: true } } },
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json({ items: products.map(transformProduct) });
    }

    const products = await prisma.product.findMany({
      include: { category: { select: { slug: true } }, subcategory: { select: { slug: true } } },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return NextResponse.json({ items: products.map(transformProduct) });
  } catch (error) {
    console.error("Products API error", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
