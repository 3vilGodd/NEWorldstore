import { Deal, Product, Review, SubCategory } from "./types";

export const categoryGroups: {
  name: string;
  slug: string;
  accent: string;
  items: { name: string; slug: SubCategory }[];
}[] = [
  {
    name: "Tempered Glass Screen Protectors",
    slug: "tempered-glass",
    accent: "#64d6ff",
    items: [
      { name: "OnePlus", slug: "oneplus" },
      { name: "Samsung", slug: "samsung" },
      { name: "iPhone", slug: "iphone" },
      { name: "Pixel", slug: "pixel" },
      { name: "Nothing Phone", slug: "nothing" },
    ],
  },
  {
    name: "Hydrogel Film Screen Protectors",
    slug: "hydrogel-film",
    accent: "#9c6bff",
    items: [
      { name: "OnePlus", slug: "oneplus" },
      { name: "Samsung", slug: "samsung" },
      { name: "Pixel", slug: "pixel" },
      { name: "Vivo", slug: "vivo" },
      { name: "Oppo", slug: "oppo" },
    ],
  },
  {
    name: "Watch Screen Protectors",
    slug: "watch-protectors",
    accent: "#f97316",
    items: [
      { name: "Apple Watch", slug: "apple-watch" },
      { name: "Mi Watch", slug: "mi-watch" },
      { name: "OnePlus Watch", slug: "oneplus-watch" },
      { name: "Samsung Watch", slug: "samsung-watch" },
    ],
  },
  {
    name: "Phone Back Cases",
    slug: "phone-cases",
    accent: "#22c55e",
    items: [
      { name: "XUNDD Beetle Series", slug: "xundd" },
      { name: "Tronzo Hard TPU Cases", slug: "tronzo" },
    ],
  },
  {
    name: "Accessories",
    slug: "accessories",
    accent: "#eab308",
    items: [
      { name: "Power Banks", slug: "power-banks" },
      { name: "Charger & Cable Protectors", slug: "charger-protectors" },
      { name: "Car Accessories", slug: "car-accessories" },
      { name: "Must Haves", slug: "must-haves" },
      { name: "Maintenance, Upkeep & Repairs", slug: "maintenance" },
    ],
  },
  {
    name: "Refurbished & Freebies",
    slug: "refurbished",
    accent: "#06b6d4",
    items: [{ name: "Refurbished & Freebies", slug: "refurbished-freebies" }],
  },
  {
    name: "Custom Cut Hydrogel Films",
    slug: "custom-hydrogel",
    accent: "#6366f1",
    items: [
      { name: "Phone Screen Protector", slug: "custom-phone-screen" },
      { name: "Phone Back Protector", slug: "custom-phone-back" },
    ],
  },
];

export const products: Product[] = [
  {
    id: "p-oneplus-temp-1",
    name: "OnePlus 12 Pro EdgeGuard Tempered Glass",
    description: "9H hardness, anti-fingerprint, HD clarity with oleophobic nano-coating.",
    category: "tempered-glass",
    subcategory: "oneplus",
    price: 799,
    mrp: 1199,
    rating: 4.8,
    ratingCount: 2689,
    stock: 42,
    compatibility: ["OnePlus 12 Pro", "OnePlus 11", "OnePlus 10 Pro"],
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    ],
    thumbnail: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    badges: ["bestseller", "deal"],
    features: ["Edge-to-edge fit", "Hydrophobic layer", "Anti-shatter film"],
    offers: ["Buy 2 get 1 free", "Extra 10% off via NEWorld Pay"],
    tags: ["tempered", "oneplus", "case-friendly"],
  },
  {
    id: "p-samsung-hydro-1",
    name: "Galaxy S24 Ultra HydroCurve Film",
    description: "Self-healing hydrogel with curved coverage and matte finish.",
    category: "hydrogel-film",
    subcategory: "samsung",
    price: 949,
    mrp: 1399,
    rating: 4.6,
    ratingCount: 1833,
    stock: 58,
    compatibility: ["Galaxy S24 Ultra", "Galaxy S23 Ultra", "Galaxy Note 20"],
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5",
    ],
    thumbnail: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    badges: ["new"],
    features: ["Self-healing", "Matte anti-glare", "Precise cut-outs"],
    offers: ["Flat 20% launch offer"],
    tags: ["hydrogel", "curved", "matte"],
  },
  {
    id: "p-iphone-watch-1",
    name: "Apple Watch Ultra 2 Sapphire Shield",
    description: "Premium sapphire-coated protector with CNC-polished edges.",
    category: "watch-protectors",
    subcategory: "apple-watch",
    price: 1299,
    mrp: 1699,
    rating: 4.9,
    ratingCount: 954,
    stock: 26,
    compatibility: ["Apple Watch Ultra 2", "Apple Watch Ultra"],
    images: [
      "https://images.unsplash.com/photo-1509099836639-18ba02e0b35d",
      "https://images.unsplash.com/photo-1518444020291-16f1a07fc1bb",
    ],
    thumbnail: "https://images.unsplash.com/photo-1509099836639-18ba02e0b35d",
    badges: ["bestseller", "limited"],
    features: ["Sapphire layer", "Oleophobic", "360° CNC edges"],
    offers: ["Combo with straps @ 30% off"],
    tags: ["watch", "sapphire", "premium"],
  },
  {
    id: "p-pixel-temp-1",
    name: "Pixel 9 Pro Max Clarity Glass",
    description: "Ultra-clear tempered glass tuned for Pixel color accuracy.",
    category: "tempered-glass",
    subcategory: "pixel",
    price: 749,
    mrp: 1099,
    rating: 4.7,
    ratingCount: 1210,
    stock: 64,
    compatibility: ["Pixel 9 Pro", "Pixel 8 Pro", "Pixel 8"],
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
      "https://images.unsplash.com/photo-1512499617640-c2f999098c12",
    ],
    thumbnail: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    badges: ["deal"],
    features: ["Anti-yellowing", "Alignment frame included", "Thin 0.23mm"],
    offers: ["Flash sale - ends tonight"],
    tags: ["pixel", "tempered", "thin"],
  },
  {
    id: "p-case-xundd-1",
    name: "XUNDD Beetle Armor Case (MagSafe)",
    description: "Military grade drop protection with crystal-clear back.",
    category: "phone-cases",
    subcategory: "xundd",
    price: 1699,
    mrp: 2299,
    rating: 4.5,
    ratingCount: 2110,
    stock: 88,
    compatibility: ["iPhone 16", "iPhone 15 Pro", "iPhone 15"],
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
      "https://images.unsplash.com/photo-1518444020291-16f1a07fc1bb",
    ],
    thumbnail: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    badges: ["pro", "bestseller"],
    features: ["Air-guard corners", "Raised camera lip", "MagSafe ring"],
    offers: ["10% off with Stripe checkout"],
    tags: ["case", "magsafe", "armor"],
  },
  {
    id: "p-accessory-power-1",
    name: "NEWorld 20W GaN Mini Charger",
    description: "Pocket-size GaN fast charger with smart surge protection.",
    category: "accessories",
    subcategory: "must-haves",
    price: 1299,
    mrp: 1899,
    rating: 4.4,
    ratingCount: 830,
    stock: 120,
    compatibility: ["PD 3.0", "QC 4.0", "USB-C"],
    images: [
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5",
    ],
    thumbnail: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef",
    badges: ["deal"],
    features: ["Overcurrent guard", "Foldable pins", "Featherweight"],
    offers: ["Bundle with cable for 15% off"],
    tags: ["charger", "gan", "fast-charge"],
  },
  {
    id: "p-refurb-1",
    name: "Refurb Apple Watch SE + 2x Hydro Films",
    description: "Grade A refurb with battery health 90%+ and freebies.",
    category: "refurbished",
    subcategory: "refurbished-freebies",
    price: 13999,
    mrp: 19999,
    rating: 4.3,
    ratingCount: 312,
    stock: 12,
    compatibility: ["watchOS 10"],
    images: [
      "https://images.unsplash.com/photo-1509099836639-18ba02e0b35d",
      "https://images.unsplash.com/photo-1518444020291-16f1a07fc1bb",
    ],
    thumbnail: "https://images.unsplash.com/photo-1509099836639-18ba02e0b35d",
    badges: ["refurbished", "deal"],
    features: ["90%+ battery", "6-month warranty", "2x freebies"],
    offers: ["Use coupon REFURB10"],
    tags: ["refurb", "deal"],
  },
];

export const dealsOfTheDay: Deal[] = [
  {
    id: "deal-1",
    title: "Buy 2 Get 1 on Tempered",
    discount: "33%",
    expiresIn: "08:12:32",
    productIds: ["p-oneplus-temp-1", "p-pixel-temp-1"],
  },
  {
    id: "deal-2",
    title: "Watch Shields Combo",
    discount: "30%",
    expiresIn: "11:45:10",
    productIds: ["p-iphone-watch-1"],
  },
];

export const featuredIds = ["p-oneplus-temp-1", "p-iphone-watch-1", "p-case-xundd-1"];
export const bestSellerIds = ["p-oneplus-temp-1", "p-samsung-hydro-1", "p-case-xundd-1"];

export const reviews: Review[] = [
  {
    id: "r1",
    user: "Ananya",
    avatar: "https://i.pravatar.cc/100?img=12",
    rating: 5,
    comment: "HydroCurve film saved my S24 Ultra from a bad fall. Self-healing actually works!",
    productId: "p-samsung-hydro-1",
    createdAt: "2024-12-14",
  },
  {
    id: "r2",
    user: "Raghav",
    avatar: "https://i.pravatar.cc/100?img=32",
    rating: 4,
    comment: "XUNDD case feels premium and MagSafe grip is strong. Shipping was quick.",
    productId: "p-case-xundd-1",
    createdAt: "2024-12-09",
  },
  {
    id: "r3",
    user: "Meera",
    avatar: "https://i.pravatar.cc/100?img=7",
    rating: 5,
    comment: "Pixel glass is super clear and install frame made it easy. Would buy again.",
    productId: "p-pixel-temp-1",
    createdAt: "2024-11-28",
  },
];

export const searchSuggestions = [
  "OnePlus tempered glass",
  "Hydrogel film",
  "Apple Watch protector",
  "MagSafe cases",
  "20W GaN charger",
];

export function getProductsByIds(ids: string[]) {
  // Create a map for O(1) lookup
  const productMap = new Map(products.map((p) => [p.id, p]));
  // Preserve the order of IDs by mapping over the input array
  return ids.map((id) => productMap.get(id)).filter((p): p is Product => p !== undefined);
}

export function findProductsByCategory(slug?: string, sub?: string) {
  return products.filter((p) => {
    const categoryMatch = slug ? p.category === slug : true;
    const subMatch = sub ? p.subcategory === sub : true;
    return categoryMatch && subMatch;
  });
}

export function searchProducts(term: string) {
  const query = term.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(query) ||
      p.tags?.some((t) => t.toLowerCase().includes(query)) ||
      p.description.toLowerCase().includes(query)
  );
}
