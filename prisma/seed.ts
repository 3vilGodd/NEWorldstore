import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { categoryGroups, products } from "../src/lib/data";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  for (const group of categoryGroups) {
    const category = await prisma.category.upsert({
      where: { slug: group.slug },
      update: { name: group.name, accent: group.accent },
      create: { name: group.name, slug: group.slug, accent: group.accent },
    });

    for (const item of group.items) {
      await prisma.subCategory.upsert({
        where: { slug: item.slug },
        update: { name: item.name, categoryId: category.id },
        create: {
          name: item.name,
          slug: item.slug,
          categoryId: category.id,
        },
      });
    }
  }

  for (const product of products) {
    const category = await prisma.category.findUnique({ where: { slug: product.category } });
    const subcategory = await prisma.subCategory.findUnique({ where: { slug: product.subcategory } });

    if (!category || !subcategory) {
      console.warn(`Skipping ${product.id}: category/subcategory not found`);
      continue;
    }

    await prisma.product.upsert({
      where: { id: product.id },
      update: {
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
        subcategoryId: subcategory.id,
      },
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
        subcategoryId: subcategory.id,
      },
    });
  }

  console.log(`Seeded ${categoryGroups.length} categories and ${products.length} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
