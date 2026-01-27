'use client';

import { useEffect, useState } from "react";
import { ProductCard } from "../product-card";
import { Product } from "@/lib/types";

export function Featured() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/products?ids=p-oneplus-temp-1,p-iphone-watch-1,p-case-xundd-1`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.items || []);
      })
      .catch((err) => console.error("Failed to fetch featured products", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section id="featured" className="mx-auto mt-16 max-w-6xl px-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-wide text-cyan-300">Featured</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Editor's picks</h2>
          </div>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-panel h-96 animate-pulse rounded-3xl" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="featured" className="mx-auto mt-16 max-w-6xl px-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-cyan-300">Featured</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Editor's picks</h2>
        </div>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {products.map((p) => (p ? <ProductCard key={p.id} product={p} /> : null))}
      </div>
    </section>
  );
}
