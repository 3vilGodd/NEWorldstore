'use client';

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { Product } from "@/lib/types";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      setQuery(q);
      setLoading(true);
      fetch(`/api/products?q=${encodeURIComponent(q)}`)
        .then((res) => res.json())
        .then((data) => {
          setResults(data.items || []);
        })
        .catch((err) => console.error("Search error", err))
        .finally(() => setLoading(false));
    } else {
      setResults([]);
    }
  }, [searchParams]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <h1 className="text-3xl font-semibold text-white">Search</h1>
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          if (e.target.value) {
            router.push(`/search?q=${encodeURIComponent(e.target.value)}`);
          } else {
            router.push("/search");
          }
        }}
        placeholder="Search products, brands, devices..."
        className="mt-4 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none"
      />

      {loading ? (
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-panel h-96 animate-pulse rounded-3xl" />
          ))}
        </div>
      ) : (
        <>
          {query && (
            <p className="mt-4 text-sm text-gray-400">
              Found {results.length} result{results.length !== 1 ? "s" : ""} for "{query}"
            </p>
          )}

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {results.length > 0 ? (
              results.map((product) => <ProductCard key={product.id} product={product} />)
            ) : query ? (
              <div className="col-span-full glass-panel rounded-3xl p-12 text-center">
                <p className="text-gray-300">No products found for "{query}"</p>
              </div>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}
