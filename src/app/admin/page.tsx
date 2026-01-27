import Link from "next/link";

const cards = [
  { title: "Products", desc: "Create, update, publish catalog", href: "/admin/products" },
  { title: "Categories", desc: "Manage categories & subcategories", href: "/admin/categories" },
  { title: "Orders", desc: "Track, refund, invoice", href: "/admin/orders" },
  { title: "Inventory", desc: "Low stock alerts & replenishment", href: "/admin/inventory" },
  { title: "Coupons", desc: "Generate promo codes & campaigns", href: "/admin/coupons" },
];

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <h1 className="text-3xl font-semibold text-white">Admin dashboard</h1>
      <p className="mt-2 text-sm text-gray-300">Operational controls for NEWorld eStore.</p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="glass-panel rounded-3xl p-5 transition hover:border-white/30 hover:shadow-strong"
          >
            <h2 className="text-xl font-semibold text-white">{card.title}</h2>
            <p className="mt-2 text-sm text-gray-300">{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
