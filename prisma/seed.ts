import { PrismaClient } from "@prisma/client";
import { categoryGroups, products } from "../src/lib/data";

const prisma = new PrismaClient();

async function main() {
  // Seed categories and subcategories
  for (const group of categoryGroups) {
    const category = await prisma.category.upsert({
      where: { slug: group.slug },
      update: {},
      create: { name: group.name, slug: group.slug, accent: group.accent },
    });

    for (const item of group.items) {
      await prisma.subCategory.upsert({
        where: { slug: item.slug },
        update: {},
        create: { name: item.name, slug: item.slug, categoryId: category.id },
      });
    }
  }

  // Seed products
  for (const product of products) {
    const category = await prisma.category.findUnique({ where: { slug: product.category } });
    const sub = await prisma.subCategory.findUnique({ where: { slug: product.subcategory } });
    if (!category || !sub) continue;

    await prisma.product.upsert({
      where: { id: product.id },
      update: {},
      create: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        mrp: product.mrp ?? null,
        rating: product.rating,
        ratingCount: product.ratingCount,
        stock: product.stock,
        badges: product.badges ?? [],
        tags: product.tags ?? [],
        images: product.images,
        thumbnail: product.thumbnail,
        compatibility: product.compatibility,
        features: product.features ?? [],
        offers: product.offers ?? [],
        categoryId: category.id,
        subcategoryId: sub.id,
      },
    });
  }

  console.log("Seeded NEWorld catalog");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
