'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, Package, Truck, MapPin } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

type TimelineItem = {
  label: string;
  at: string;
  completed?: boolean;
};

export default function OrderTrackingPage() {
  const params = useParams();
  const [order, setOrder] = useState<{
    id: string;
    status: string;
    timeline: TimelineItem[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id && typeof params.id === "string") {
      fetchOrder();
    } else {
      setLoading(false);
    }
  }, [params.id]);

  const fetchOrder = async () => {
    if (!params.id || typeof params.id !== "string") {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/orders/${params.id}`);
      const data = await res.json();
      setOrder(data);
    } catch (error) {
      console.error("Failed to fetch order", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="text-center text-gray-400">Loading order...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="text-center text-gray-400">Order not found</div>
      </div>
    );
  }

  const statusSteps = [
    { label: "Order Placed", icon: Package },
    { label: "Packed", icon: Package },
    { label: "Shipped", icon: Truck },
    { label: "Delivered", icon: CheckCircle2 },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <h1 className="text-3xl font-semibold text-white">Order Tracking</h1>
      <p className="mt-2 text-sm text-gray-400">Order #{order.id.slice(0, 8)}</p>

      <div className="mt-8 glass-panel rounded-3xl p-6">
        <div className="mb-6">
          <span className="inline-block rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-semibold text-cyan-300">
            {order.status}
          </span>
        </div>

        <div className="space-y-4">
          {order.timeline.map((item, idx) => {
            // Determine completion: item is completed if it has the completed flag set to true, or if all previous items are explicitly completed
            const isCompleted = item.completed === true || (idx === 0 || order.timeline.slice(0, idx).every((prev) => prev.completed === true));
            const Icon = statusSteps[idx]?.icon || Package;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-4"
              >
                <div
                  className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${
                    isCompleted ? "bg-cyan-500/20 text-cyan-300" : "bg-gray-500/20 text-gray-500"
                  }`}
                >
                  <Icon size={20} />
                </div>
                <div className="flex-1">
                  <p className={`font-semibold ${isCompleted ? "text-white" : "text-gray-400"}`}>
                    {item.label}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(item.at).toLocaleString()}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
