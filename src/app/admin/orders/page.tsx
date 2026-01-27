import Link from "next/link";
import { Package, Eye } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function AdminOrdersPage() {
  // Mock orders - in production, fetch from API
  const orders: any[] = [];

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <div className="mb-8">
        <Link href="/admin" className="text-sm text-cyan-300 hover:text-cyan-200 mb-4 inline-block">
          ← Back to Admin
        </Link>
        <h1 className="text-3xl font-semibold text-white">Orders</h1>
        <p className="mt-2 text-sm text-gray-300">Track and manage customer orders</p>
      </div>

      {orders.length === 0 ? (
        <div className="glass-panel rounded-3xl p-12 text-center">
          <Package size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-lg text-gray-300">No orders yet</p>
        </div>
      ) : (
        <div className="glass-panel rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Order ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order: any) => (
                  <tr key={order.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="px-6 py-4 text-sm text-white">#{order.id.slice(0, 8)}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{order.customer}</td>
                    <td className="px-6 py-4 text-sm text-white">{formatCurrency(order.total)}</td>
                    <td className="px-6 py-4">
                      <span className="inline-block rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-300">
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">{order.date}</td>
                    <td className="px-6 py-4">
                      <button className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 hover:border-white/30">
                        <Eye size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
