'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/types";
import { cn, discountPercent, formatCurrency } from "@/lib/utils";

export function ProductCard({ product, compact }: { product: Product; compact?: boolean }) {
  const [adding, setAdding] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const router = useRouter();
  const discount = discountPercent(product.price, product.mrp);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      });
      if (res.ok) {
        router.push("/cart");
      }
    } catch (error) {
      console.error("Failed to add to cart", error);
    } finally {
      setAdding(false);
    }
  };

  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const res = await fetch("/api/wishlist", {
        method: wishlisted ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id }),
      });
      if (res.ok) {
        setWishlisted(!wishlisted);
      }
    } catch (error) {
      console.error("Failed to toggle wishlist", error);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className={cn(
        "glass-panel group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10",
        compact && "rounded-2xl"
      )}
    >
      <div className="relative overflow-hidden">
        <Link href={`/product/${product.id}`}>
          <Image
            src={product.thumbnail}
            alt={product.name}
            width={400}
            height={300}
            className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>
        {product.badges?.length ? (
          <div className="absolute left-3 top-3 flex gap-2">
            {product.badges.map((b) => (
              <span key={b} className="rounded-full bg-black/60 px-2 py-1 text-[11px] uppercase tracking-wide text-white">
                {b}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/product/${product.id}`} className="text-base font-semibold leading-tight text-white hover:text-cyan-300">
            {product.name}
          </Link>
          <button
            onClick={handleWishlist}
            aria-label="Wishlist"
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${
              wishlisted
                ? "border-pink-500/50 bg-pink-500/20 text-pink-300"
                : "border-white/10 text-gray-200 hover:border-white/30"
            }`}
          >
            <Heart size={16} fill={wishlisted ? "currentColor" : "none"} />
          </button>
        </div>
        <p className="text-sm text-gray-400 line-clamp-2">{product.description}</p>
        <div className="flex items-center gap-2 text-sm text-amber-300">
          <Star size={16} fill="currentColor" className="text-amber-300" />
          {product.rating} ({product.ratingCount.toLocaleString()})
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div>
            <p className="text-xl font-semibold text-white">{formatCurrency(product.price)}</p>
            {discount ? (
              <p className="text-xs text-emerald-300">
                MRP {formatCurrency(product.mrp!)} • Save {discount}%
              </p>
            ) : null}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={adding}
            className="btn-primary flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition hover:scale-[1.01] disabled:opacity-50"
          >
            <ShoppingBag size={16} />
            {adding ? "Adding..." : "Add"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
