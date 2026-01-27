'use client';

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Package, ExternalLink } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useRouter } from "next/navigation";

type Order = {
  id: string;
  status: string;
  total: number;
  createdAt: string;
  items: Array<{
    product: {
      name: string;
      thumbnail: string;
    };
    quantity: number;
    price: number;
  }>;
};

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
      return;
    }
    if (status === "authenticated") {
      fetchOrders();
    }
  }, [status, router]);

  const fetchOrders = async () => {
    try {
      // In production, fetch from /api/orders
      // For now, return empty array
      setOrders([]);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="text-center text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <div className="mb-8">
        <Link href="/profile" className="text-sm text-cyan-300 hover:text-cyan-200 mb-4 inline-block">
          ← Back to Profile
        </Link>
        <h1 className="text-3xl font-semibold text-white">My Orders</h1>
      </div>

      {orders.length === 0 ? (
        <div className="glass-panel rounded-3xl p-12 text-center">
          <Package size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-lg text-gray-300 mb-2">No orders yet</p>
          <Link href="/" className="btn-primary inline-block rounded-full px-6 py-3 text-sm font-semibold">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel rounded-3xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-400">Order #{order.id.slice(0, 8)}</p>
                  <p className="text-lg font-semibold text-white">{formatCurrency(order.total)}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-block rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-300">
                    {order.status}
                  </span>
                  <Link
                    href={`/orders/${order.id}`}
                    className="mt-2 flex items-center gap-1 text-sm text-cyan-300 hover:text-cyan-200"
                  >
                    Track <ExternalLink size={14} />
                  </Link>
                </div>
              </div>
              <div className="space-y-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm">
                    <span className="text-gray-400">{item.quantity}x</span>
                    <span className="text-white">{item.product.name}</span>
                    <span className="ml-auto text-gray-300">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
