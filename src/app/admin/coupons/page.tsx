import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function AdminCouponsPage() {
  // Mock coupons - in production, fetch from API
  const coupons = [
    { id: "1", code: "WELCOME20", discount: 20, expiresAt: "2025-12-31", active: true },
    { id: "2", code: "FLASH50", discount: 50, expiresAt: "2025-01-15", active: true },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/admin" className="text-sm text-cyan-300 hover:text-cyan-200 mb-4 inline-block">
            ← Back to Admin
          </Link>
          <h1 className="text-3xl font-semibold text-white">Coupons</h1>
          <p className="mt-2 text-sm text-gray-300">Create and manage promotional codes</p>
        </div>
        <button className="btn-primary flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold">
          <Plus size={18} />
          Create Coupon
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {coupons.map((coupon) => (
          <div key={coupon.id} className="glass-panel rounded-3xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-white">{coupon.code}</h2>
                <p className="text-2xl font-bold text-cyan-300 mt-1">{coupon.discount}% OFF</p>
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
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-300">
                <span>Expires</span>
                <span>{new Date(coupon.expiresAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Status</span>
                <span className={coupon.active ? "text-emerald-300" : "text-gray-500"}>
                  {coupon.active ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
