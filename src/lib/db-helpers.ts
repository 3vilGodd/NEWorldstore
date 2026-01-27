import { Product as PrismaProduct } from "@prisma/client";
import { Product, Badge } from "./types";

export function transformProduct(p: PrismaProduct & { category: { slug: string }; subcategory: { slug: string } }): Product {
  return {
    id: p.id,
    name: p.name,
    description: p.description,
    category: p.category.slug as Product["category"],
    subcategory: p.subcategory.slug as Product["subcategory"],
    price: p.price,
    mrp: p.mrp ?? undefined,
    rating: p.rating,
    ratingCount: p.ratingCount,
    stock: p.stock,
    compatibility: p.compatibility,
    images: p.images,
    thumbnail: p.thumbnail,
    badges: (p.badges as Badge[]) ?? [],
    features: p.features ?? [],
    offers: p.offers ?? [],
    tags: p.tags ?? [],
  };
}
