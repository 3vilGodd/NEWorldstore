'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type CategoryGroup = {
  name: string;
  slug: string;
  accent: string;
  items: Array<{ name: string; slug: string }>;
};

const circleMotion = {
  hidden: { opacity: 0, scale: 0.9, y: 10 },
  show: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: 0.06 * i, duration: 0.4, ease: "easeOut" },
  }),
};

export function CategoriesGrid() {
  const [categories, setCategories] = useState<CategoryGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.categories || []);
      })
      .catch((err) => console.error("Failed to fetch categories", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section id="categories" className="mx-auto mt-16 max-w-6xl px-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-wide text-cyan-300">Shop by category</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Engineered for every device</h2>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="glass-panel h-48 animate-pulse rounded-3xl" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="categories" className="mx-auto mt-16 max-w-6xl px-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-cyan-300">Shop by category</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Engineered for every device</h2>
        </div>
        <Link href="/categories" className="hidden text-sm text-cyan-300 hover:text-cyan-200 sm:block">
          View all
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {categories.map((group, idx) => (
          <motion.div
            key={group.slug}
            className="glass-panel relative flex flex-col items-center justify-center rounded-3xl px-4 py-6 text-center shadow-strong"
            custom={idx}
            variants={circleMotion}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div
              className="mb-3 flex h-16 w-16 items-center justify-center rounded-full text-lg font-semibold text-white"
              style={{ background: `linear-gradient(135deg, ${group.accent}, #0ea5e9)` }}
            >
              {group.name.split(" ")[0]}
            </div>
            <h3 className="text-base font-semibold text-white">{group.name}</h3>
            <div className="mt-2 flex flex-wrap justify-center gap-1 text-[11px] text-gray-300">
              {group.items.slice(0, 6).map((item) => (
                <Link
                  key={item.slug}
                  href={`/categories/${group.slug}/${item.slug}`}
                  className="rounded-full border border-white/10 px-2 py-1 hover:border-white/30"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
