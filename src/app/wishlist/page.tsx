'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Product } from "@/lib/types";

type WishlistItem = {
  id: string;
  product: Product;
};

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await fetch("/api/wishlist");
      const data = await res.json();
      setItems(data.items || []);
    } catch (error) {
      console.error("Failed to fetch wishlist", error);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      await fetch(`/api/wishlist?itemId=${itemId}`, { method: "DELETE" });
      fetchWishlist();
    } catch (error) {
      console.error("Failed to remove item", error);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="text-center text-gray-400">Loading wishlist...</div>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-14">
        <h1 className="text-3xl font-semibold text-white">Wishlist</h1>
        <div className="mt-8 glass-panel rounded-3xl p-12 text-center">
          <Heart size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-lg text-gray-300 mb-2">Your wishlist is empty</p>
          <Link href="/" className="btn-primary inline-block rounded-full px-6 py-3 text-sm font-semibold">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <h1 className="text-3xl font-semibold text-white">Wishlist</h1>
      <p className="mt-2 text-sm text-gray-400">{items.length} item{items.length !== 1 ? "s" : ""} saved</p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <button
              onClick={() => removeItem(item.id)}
              className="absolute right-2 top-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 backdrop-blur text-red-400 hover:bg-red-500/20"
            >
              <Trash2 size={18} />
            </button>
            <ProductCard product={item.product} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
