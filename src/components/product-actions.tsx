'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, Heart } from "lucide-react";

export function ProductActions({ productId }: { productId: string }) {
  const [adding, setAdding] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const router = useRouter();

  const handleAddToCart = async () => {
    setAdding(true);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: 1 }),
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

  const handleBuyNow = async () => {
    setAdding(true);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: 1 }),
      });
      if (res.ok) {
        router.push("/checkout");
      }
    } catch (error) {
      console.error("Failed to add to cart", error);
    } finally {
      setAdding(false);
    }
  };

  const handleWishlist = async () => {
    try {
      const res = await fetch("/api/wishlist", {
        method: wishlisted ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      if (res.ok) {
        setWishlisted(!wishlisted);
      }
    } catch (error) {
      console.error("Failed to toggle wishlist", error);
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={handleBuyNow}
        disabled={adding}
        className="btn-primary rounded-full px-6 py-3 text-sm font-semibold text-[#050915] disabled:opacity-50"
      >
        Buy now
      </button>
      <button
        onClick={handleAddToCart}
        disabled={adding}
        className="btn-secondary rounded-full px-6 py-3 text-sm font-semibold text-white disabled:opacity-50"
      >
        {adding ? "Adding..." : "Add to cart"}
      </button>
      <button
        onClick={handleWishlist}
        className={`rounded-full border px-4 py-3 text-sm font-semibold transition ${
          wishlisted
            ? "border-pink-500/50 bg-pink-500/20 text-pink-300"
            : "btn-secondary text-white"
        }`}
      >
        <Heart size={16} className="inline mr-2" fill={wishlisted ? "currentColor" : "none"} />
        {wishlisted ? "Wishlisted" : "Wishlist"}
      </button>
    </div>
  );
}
