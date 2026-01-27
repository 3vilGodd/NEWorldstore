import Link from "next/link";
import { AlertTriangle, Package } from "lucide-react";
import { products } from "@/lib/data";

export default function AdminInventoryPage() {
  const lowStock = products.filter((p) => p.stock < 10);

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <div className="mb-8">
        <Link href="/admin" className="text-sm text-cyan-300 hover:text-cyan-200 mb-4 inline-block">
          ← Back to Admin
        </Link>
        <h1 className="text-3xl font-semibold text-white">Inventory</h1>
        <p className="mt-2 text-sm text-gray-300">Monitor stock levels and replenishment</p>
      </div>

      {lowStock.length > 0 && (
        <div className="glass-panel rounded-3xl p-6 mb-6 border border-amber-500/30 bg-amber-500/5">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle size={20} className="text-amber-300" />
            <h2 className="text-lg font-semibold text-white">Low Stock Alerts</h2>
          </div>
          <div className="space-y-2">
            {lowStock.map((product) => (
              <div key={product.id} className="flex items-center justify-between text-sm">
                <span className="text-gray-300">{product.name}</span>
                <span className="text-amber-300 font-semibold">Only {product.stock} left</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="glass-panel rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-white/10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Product</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">SKU</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Stock</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {products.slice(0, 15).map((product) => (
                <tr key={product.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="px-6 py-4 text-sm text-white">{product.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-400">{product.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{product.stock}</td>
                  <td className="px-6 py-4">
                    {product.stock < 10 ? (
                      <span className="inline-block rounded-full bg-amber-500/20 px-3 py-1 text-xs text-amber-300">
                        Low Stock
                      </span>
                    ) : (
                      <span className="inline-block rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-300">
                        In Stock
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
