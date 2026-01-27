import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import { categoryGroups } from "@/lib/data";

export default function AdminCategoriesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/admin" className="text-sm text-cyan-300 hover:text-cyan-200 mb-4 inline-block">
            ← Back to Admin
          </Link>
          <h1 className="text-3xl font-semibold text-white">Categories</h1>
          <p className="mt-2 text-sm text-gray-300">Manage product categories and subcategories</p>
        </div>
        <button className="btn-primary flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold">
          <Plus size={18} />
          Add Category
        </button>
      </div>

      <div className="grid gap-4">
        {categoryGroups.map((group) => (
          <div key={group.slug} className="glass-panel rounded-3xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-white">{group.name}</h2>
                <p className="text-sm text-gray-400 mt-1">/{group.slug}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 hover:border-white/30">
                  <Edit size={14} />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-full border border-red-500/30 text-red-400 hover:bg-red-500/10">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item.slug}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-gray-300"
                >
                  {item.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
