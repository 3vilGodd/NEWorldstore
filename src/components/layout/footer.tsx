import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const links = {
  shop: ["Tempered Glass", "Hydrogel Film", "Watch Protectors", "Cases", "Accessories"],
  support: ["Order tracking", "Returns & refunds", "Warranty", "Contact"],
  company: ["About NEWorld", "Careers", "Sustainability", "Press"],
};

export function Footer() {
  return (
    <footer id="footer" className="mt-24 border-t border-white/5 bg-black/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold">NEWorld eStore</h3>
            <p className="mt-3 text-sm text-gray-400">
              Premium mobile protection, curated accessories, and concierge-grade support.
            </p>
          </div>
          <LinkColumn title="Shop" items={links.shop} />
          <LinkColumn title="Support" items={links.support} />
          <LinkColumn title="Company" items={links.company} />
        </div>

        <div className="flex flex-col gap-4 border-t border-white/5 pt-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} NEWorld Labs. Built for scale.</p>
          <div className="flex items-center gap-3 text-gray-400">
            {[Twitter, Instagram, Facebook, Linkedin].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                aria-label={`Social link ${idx}`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 hover:border-white/30"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function LinkColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-200">{title}</h4>
      <div className="space-y-2 text-sm text-gray-400">
        {items.map((item) => (
          <Link href="#" key={item} className="block hover:text-white">
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
}
