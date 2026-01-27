'use client';

import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { Product } from "@/lib/types";

type Deal = {
  id: string;
  title: string;
  discount: string;
  expiresIn: string;
  productIds: string[];
};

export function Deals() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [productsMap, setProductsMap] = useState<Record<string, Product>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock deals data - in production, fetch from API
    const mockDeals: Deal[] = [
      {
        id: "d1",
        title: "Screen Protection Bundle",
        discount: "25%",
        expiresIn: "23:59:59",
        productIds: ["p-oneplus-temp-1", "p-samsung-hydro-1"],
      },
      {
        id: "d2",
        title: "Watch Shield Special",
        discount: "30%",
        expiresIn: "11:45:10",
        productIds: ["p-iphone-watch-1"],
      },
    ];
    setDeals(mockDeals);

    // Fetch products for all deals
    const allProductIds = mockDeals.flatMap((d) => d.productIds).join(",");
    fetch(`/api/products?ids=${allProductIds}`)
      .then((res) => res.json())
      .then((data) => {
        const map: Record<string, Product> = {};
        (data.items || []).forEach((p: Product) => {
          map[p.id] = p;
        });
        setProductsMap(map);
      })
      .catch((err) => console.error("Failed to fetch deal products", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section id="deals" className="mx-auto mt-16 max-w-6xl px-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-wide text-cyan-300">Lightning offers</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Deals of the Day</h2>
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {[1, 2].map((i) => (
            <div key={i} className="glass-panel h-48 animate-pulse rounded-3xl" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="deals" className="mx-auto mt-16 max-w-6xl px-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-cyan-300">Lightning offers</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Deals of the Day</h2>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {deals.map((deal) => {
          const products = deal.productIds.map((id) => productsMap[id]).filter(Boolean);
          return (
            <div key={deal.id} className="glass-panel rounded-3xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-emerald-300">{deal.discount} off</p>
                  <h3 className="text-xl font-semibold text-white">{deal.title}</h3>
                </div>
                <div className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-200">
                  Ends in {deal.expiresIn}
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {products.map((p) => (
                  <div key={p.id} className="rounded-2xl border border-white/5 bg-white/5 p-3 text-sm text-white">
                    <p className="font-semibold">{p.name}</p>
                    <p className="text-emerald-300">{formatCurrency(p.price)}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
