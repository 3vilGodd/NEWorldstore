import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import { products } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export default function AdminProductsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/admin" className="text-sm text-cyan-300 hover:text-cyan-200 mb-4 inline-block">
            ← Back to Admin
          </Link>
          <h1 className="text-3xl font-semibold text-white">Products</h1>
          <p className="mt-2 text-sm text-gray-300">Manage your product catalog</p>
        </div>
        <button className="btn-primary flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold">
          <Plus size={18} />
          Add Product
        </button>
      </div>

      <div className="glass-panel rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-white/10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Product</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Stock</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.slice(0, 10).map((product) => (
                <tr key={product.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-white/5" />
                      <div>
                        <p className="text-sm font-semibold text-white">{product.name}</p>
                        <p className="text-xs text-gray-400">{product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">{product.category}</td>
                  <td className="px-6 py-4 text-sm text-white">{formatCurrency(product.price)}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{product.stock}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 hover:border-white/30">
                        <Edit size={14} />
                      </button>
                      <button className="flex h-8 w-8 items-center justify-center rounded-full border border-red-500/30 text-red-400 hover:bg-red-500/10">
                        <Trash2 size={14} />
                      </button>
                    </div>
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
