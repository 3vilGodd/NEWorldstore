export type ProductCategory =
  | "tempered-glass"
  | "hydrogel-film"
  | "watch-protectors"
  | "phone-cases"
  | "accessories"
  | "refurbished"
  | "custom-hydrogel";

export type SubCategory =
  | "oneplus"
  | "samsung"
  | "iphone"
  | "pixel"
  | "nothing"
  | "vivo"
  | "oppo"
  | "apple-watch"
  | "mi-watch"
  | "oneplus-watch"
  | "samsung-watch"
  | "xundd"
  | "tronzo"
  | "power-banks"
  | "charger-protectors"
  | "car-accessories"
  | "must-haves"
  | "maintenance"
  | "refurbished-freebies"
  | "custom-phone-screen"
  | "custom-phone-back";

export type Badge = "new" | "bestseller" | "deal" | "limited" | "pro" | "refurbished";

export type Product = {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  subcategory: SubCategory;
  price: number;
  mrp?: number;
  rating: number;
  ratingCount: number;
  stock: number;
  compatibility: string[];
  images: string[];
  thumbnail: string;
  badges?: Badge[];
  features?: string[];
  offers?: string[];
  tags?: string[];
};

export type Review = {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  comment: string;
  productId?: string;
  createdAt: string;
};

export type Deal = {
  id: string;
  title: string;
  discount: string;
  expiresIn: string;
  productIds: string[];
};
