import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { prisma } from "@/lib/prisma";
import { transformProduct } from "@/lib/db-helpers";

export default async function CategoryPage({ params }: { params: { slug: string[] } }) {
  const [categorySlug, subSlug] = params.slug ?? [];

  if (!prisma) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="glass-panel rounded-3xl p-6 text-center text-gray-300">
          Database not configured. Please set DATABASE_URL environment variable.
        </div>
      </div>
    );
  }

  const category = await prisma.category.findUnique({
    where: { slug: categorySlug },
    include: { subcategories: true },
  });

  if (!category) return notFound();

  const sub = subSlug ? category.subcategories.find((s) => s.slug === subSlug) : null;

  const where: any = { categoryId: category.id };
  if (sub) {
    where.subcategoryId = sub.id;
  }

  const productsData = await prisma.product.findMany({
    where,
    include: { category: { select: { slug: true } }, subcategory: { select: { slug: true } } },
    orderBy: { createdAt: "desc" },
  });

  const products = productsData.map(transformProduct);

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <div className="flex flex-col gap-2">
        <p className="text-sm uppercase tracking-wide text-cyan-300">NEWorld • {category.name}</p>
        <h1 className="text-3xl font-semibold text-white">{sub ? sub.name : category.name}</h1>
        <p className="text-sm text-gray-300">
          Impact-rated glass, self-healing films, and curated cases crafted for {sub?.name || category.name}.
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {!products.length ? (
          <div className="glass-panel col-span-full rounded-3xl p-6 text-center text-gray-300">
            No products yet. Check back soon!
          </div>
        ) : null}
      </div>
    </div>
  );
}
