import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    if (!prisma) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }

    const categories = await prisma.category.findMany({
      include: {
        subcategories: {
          select: { name: true, slug: true },
        },
      },
      orderBy: { name: "asc" },
    });

    const formatted = categories.map((cat) => ({
      name: cat.name,
      slug: cat.slug,
      accent: cat.accent,
      items: cat.subcategories.map((sub) => ({ name: sub.name, slug: sub.slug })),
    }));

    return NextResponse.json({ categories: formatted });
  } catch (error) {
    console.error("Categories API error", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}
