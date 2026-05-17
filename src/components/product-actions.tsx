'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";

async function parseApiError(res: Response) {
  try {
    const data = await res.json();
    return data.error || data.message || `Request failed (${res.status})`;
  } catch {
    return `Request failed (${res.status})`;
  }
}

export function ProductActions({ productId }: { productId: string }) {
  const [adding, setAdding] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleAddToCart = async () => {
    setAdding(true);
    setError(null);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: 1 }),
      });
      if (res.ok) {
        router.push("/cart");
      } else {
        setError(await parseApiError(res));
      }
    } catch {
      setError("Could not add to cart. Please try again.");
    } finally {
      setAdding(false);
    }
  };

  const handleBuyNow = async () => {
    setAdding(true);
    setError(null);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: 1 }),
      });
      if (res.ok) {
        router.push("/checkout");
      } else {
        setError(await parseApiError(res));
      }
    } catch {
      setError("Could not add to cart. Please try again.");
    } finally {
      setAdding(false);
    }
  };

  const handleWishlist = async () => {
    setError(null);
    try {
      const res = await fetch("/api/wishlist", {
        method: wishlisted ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      if (res.ok) {
        setWishlisted(!wishlisted);
      } else {
        setError(await parseApiError(res));
      }
    } catch {
      setError("Could not update wishlist. Please try again.");
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      {error && (
        <p className="w-full rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-200">
          {error}
          {error.includes("Unauthorized") && (
            <span>
              {" "}
              <a href="/auth/signin" className="underline">
                Sign in
              </a>
            </span>
          )}
        </p>
      )}
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
