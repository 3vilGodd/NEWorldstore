'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useRouter } from "next/navigation";

type CartItem = {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    thumbnail: string;
    price: number;
    mrp?: number | null;
  };
};

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await fetch("/api/cart");
      const data = await res.json();
      setItems(data.items || []);
    } catch (error) {
      console.error("Failed to fetch cart", error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) return;
    try {
      await fetch("/api/cart/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId, quantity }),
      });
      fetchCart();
    } catch (error) {
      console.error("Failed to update quantity", error);
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      await fetch(`/api/cart?itemId=${itemId}`, { method: "DELETE" });
      fetchCart();
    } catch (error) {
      console.error("Failed to remove item", error);
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="text-center text-gray-400">Loading cart...</div>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-14">
        <h1 className="text-3xl font-semibold text-white">Shopping Cart</h1>
        <div className="mt-8 glass-panel rounded-3xl p-12 text-center">
          <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-lg text-gray-300 mb-2">Your cart is empty</p>
          <Link href="/" className="btn-primary inline-block rounded-full px-6 py-3 text-sm font-semibold">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <h1 className="text-3xl font-semibold text-white">Shopping Cart</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr,400px]">
        <div className="space-y-4">
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel rounded-3xl p-4"
            >
              <div className="flex gap-4">
                <Link href={`/product/${item.product.id}`} className="flex-shrink-0">
                  <Image
                    src={item.product.thumbnail}
                    alt={item.product.name}
                    width={120}
                    height={120}
                    className="h-24 w-24 rounded-2xl object-cover"
                  />
                </Link>
                <div className="flex-1">
                  <Link href={`/product/${item.product.id}`} className="text-lg font-semibold text-white hover:text-cyan-300">
                    {item.product.name}
                  </Link>
                  <p className="mt-1 text-xl font-semibold text-white">{formatCurrency(item.product.price)}</p>
                  {item.product.mrp && item.product.mrp > item.product.price ? (
                    <p className="text-sm text-gray-400 line-through">{formatCurrency(item.product.mrp)}</p>
                  ) : null}

                  <div className="mt-4 flex items-center gap-4">
                    <div className="flex items-center gap-2 rounded-full border border-white/10">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-white/10"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-white/10"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="flex items-center gap-2 rounded-full border border-red-500/30 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 size={16} />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="lg:sticky lg:top-24 lg:h-fit">
          <div className="glass-panel rounded-3xl p-6 space-y-4">
            <h2 className="text-xl font-semibold text-white">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : formatCurrency(shipping)}</span>
              </div>
              {subtotal < 500 ? (
                <p className="text-xs text-emerald-300">Add {formatCurrency(500 - subtotal)} more for free shipping</p>
              ) : null}
              <div className="border-t border-white/10 pt-2 flex justify-between text-lg font-semibold text-white">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
            <button
              onClick={() => router.push("/checkout")}
              className="btn-primary w-full rounded-full px-6 py-3 text-sm font-semibold"
            >
              Proceed to Checkout
            </button>
            <Link href="/" className="block text-center text-sm text-gray-400 hover:text-white">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
