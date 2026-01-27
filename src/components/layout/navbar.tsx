'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Heart, Menu, Search, ShoppingBag, User, Sun, Moon, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/components/providers/theme-provider";
import { categoryGroups, searchSuggestions } from "@/lib/data";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Categories", href: "#categories" },
  { label: "Best Sellers", href: "#best-sellers" },
  { label: "Deals", href: "#deals" },
  { label: "Reviews", href: "#reviews" },
  { label: "Support", href: "#footer" },
];

export function Navbar() {
  const { theme, toggle, mounted } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl">
      <div className="glass-panel mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-3 lg:px-6">
        <div className="flex items-center gap-3">
          <button
            aria-label="Open menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-sm text-gray-200 lg:hidden"
            onClick={() => setOpen((p) => !p)}
          >
            <Menu size={18} />
          </button>
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-500 to-violet-500 text-[#050915] shadow-strong">
              <ShieldCheck size={18} />
            </span>
            <span className="hidden sm:block">
              NEWorld <span className="text-gradient">eStore</span>
            </span>
          </Link>
        </div>

        <div className="relative hidden flex-1 items-center justify-center px-8 lg:flex">
          <SearchBar />
        </div>

        <div className="flex items-center gap-2">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-sm hover:border-white/30"
            aria-label="Toggle theme"
            onClick={toggle}
            disabled={!mounted}
          >
            {mounted && theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <IconButton icon={<Heart size={16} />} label="Wishlist" href="/wishlist" />
          <IconButton icon={<ShoppingBag size={16} />} label="Cart" href="/cart" />
          <IconButton icon={<User size={16} />} label="Account" href="/profile" />
        </div>
      </div>

      {open ? (
        <motion.nav
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="glass-panel mx-4 mt-2 flex flex-col gap-2 rounded-3xl p-4 lg:hidden"
        >
          <SearchBar compact />
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-2xl border border-white/5 px-3 py-2 text-sm text-gray-200 hover:border-white/20"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.nav>
      ) : null}
    </header>
  );
}

function IconButton({ icon, label, href }: { icon: React.ReactNode; label: string; href?: string }) {
  const Component = href ? Link : "button";
  const props = href ? { href } : { "aria-label": label };
  return (
    <Component
      {...props}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-sm hover:border-white/30"
    >
      {icon}
    </Component>
  );
}

function SearchBar({ compact = false }: { compact?: boolean }) {
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className={cn("w-full max-w-2xl", compact && "max-w-full")}>
      <form onSubmit={handleSubmit}>
        <div
          className={cn(
            "relative flex items-center gap-3 rounded-full border px-4 py-2",
            focused ? "border-white/40 bg-white/5" : "border-white/10 bg-white/0"
          )}
        >
          <Search size={16} className="text-gray-300" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Search for accessories, protectors, brands..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-gray-500"
          />
          <div className="hidden gap-2 text-[11px] text-gray-400 md:flex">
            {searchSuggestions.slice(0, 3).map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => {
                  setQuery(chip);
                  router.push(`/search?q=${encodeURIComponent(chip)}`);
                }}
                className="rounded-full bg-white/5 px-3 py-1 hover:bg-white/10"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </form>

      <div className="mt-2 hidden items-center gap-3 text-[11px] text-gray-400 lg:flex">
        <span className="text-white/70">Browse:</span>
        {categoryGroups.slice(0, 4).map((cat) => (
          <Link
            key={cat.slug}
            href={`/categories/${cat.slug}`}
            className="rounded-full bg-white/5 px-3 py-1 hover:text-white"
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
