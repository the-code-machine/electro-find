"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowLeft, SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { SkeletonCard } from "@/components/SkeletonCard";
import { StatsBar } from "@/components/StatsBar";
import { ErrorBanner } from "@/components/ErrorBanner";
import {
  CATEGORIES,
  Category,
  Platform,
  SortOption,
  PLATFORM_CONFIG,
  SearchResponse,
  Product,
} from "@/lib/types";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "score_desc", label: "Buy Score" },
  { value: "price_asc", label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
  { value: "rating_desc", label: "Rating" },
  { value: "reviews_desc", label: "Most Reviews" },
];

const SORT_FNS: Record<SortOption, (a: Product, b: Product) => number> = {
  score_desc: (a, b) => b.score - a.score,
  price_asc: (a, b) => (a.price || 1e9) - (b.price || 1e9),
  price_desc: (a, b) => b.price - a.price,
  rating_desc: (a, b) => b.rating - a.rating,
  reviews_desc: (a, b) => b.reviews - a.reviews,
};

export function SearchSection() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [category, setCategory] = useState<Category>(
    (searchParams.get("category") as Category) ?? "All Electronics",
  );
  const [sort, setSort] = useState<SortOption>("score_desc");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [searched, setSearched] = useState(false);
  const [activePlatforms, setActivePlatforms] = useState<Set<Platform>>(
    new Set<Platform>(Object.keys(PLATFORM_CONFIG) as Platform[]),
  );
  const [filtersOpen, setFiltersOpen] = useState(false);

  const doSearch = useCallback(async (q: string, cat: Category) => {
    if (!q.trim()) return;
    setLoading(true);
    setSearched(false);
    setErrors({});
    setProducts([]);
    try {
      const params = new URLSearchParams({ q: q.trim(), category: cat });
      const res = await fetch(`/api/search?${params.toString()}`);
      const data: SearchResponse = await res.json();
      setProducts(data.products ?? []);
      setErrors(data.errors ?? {});
      const found = new Set(
        data.products.map((p) => p.platform),
      ) as Set<Platform>;
      setActivePlatforms(
        found.size > 0
          ? found
          : new Set(Object.keys(PLATFORM_CONFIG) as Platform[]),
      );
    } catch (e) {
      setErrors({ Network: (e as Error).message });
    } finally {
      setLoading(false);
      setSearched(true);
    }
  }, []);

  // Auto-search on mount if URL has query
  useEffect(() => {
    const q = searchParams.get("q") ?? "";
    const cat = (searchParams.get("category") as Category) ?? "All Electronics";
    if (q) {
      setQuery(q);
      setCategory(cat);
      doSearch(q, cat);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch = () => {
    if (!query.trim()) return;
    const params = new URLSearchParams({ q: query.trim(), category });
    router.replace(`/search?${params.toString()}`, { scroll: false });
    doSearch(query.trim(), category);
  };

  const togglePlatform = (p: Platform) => {
    setActivePlatforms((prev) => {
      const next = new Set(prev);
      if (next.has(p)) {
        if (next.size > 1) next.delete(p);
      } else next.add(p);
      return next;
    });
  };

  const availablePlatforms = [
    ...new Set(products.map((p) => p.platform)),
  ] as Platform[];
  const filtered = products
    .filter((p) => activePlatforms.has(p.platform))
    .sort(SORT_FNS[sort]);

  return (
    <div className="min-h-screen bg-zinc-50 pt-16">
      {/* Search bar header */}
      <div className="sticky top-16 z-30 border-b border-zinc-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
          <button
            onClick={() => router.push("/")}
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="hidden h-9 w-44 flex-shrink-0 appearance-none rounded-lg border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-700 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:block"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* Input */}
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search electronics..."
              className="h-9 w-full rounded-lg border border-zinc-200 bg-white pl-9 pr-3 text-sm font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <button
            onClick={handleSearch}
            disabled={!query.trim() || loading}
            className="flex h-9 flex-shrink-0 items-center gap-1.5 rounded-lg bg-zinc-950 px-4 text-sm font-bold text-white transition-all hover:bg-zinc-800 disabled:opacity-40"
          >
            {loading ? (
              <span className="flex items-center gap-1.5">
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                <span className="hidden sm:block">Searching</span>
              </span>
            ) : (
              <>
                <Search className="h-3.5 w-3.5" />
                <span className="hidden sm:block">Search</span>
              </>
            )}
          </button>

          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border transition-colors ${filtersOpen ? "border-orange-400 bg-orange-50 text-orange-600" : "border-zinc-200 text-zinc-500 hover:text-zinc-900"}`}
          >
            {filtersOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <SlidersHorizontal className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Filter panel */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-zinc-100"
            >
              <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
                {/* Sort */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-zinc-500">
                    Sort:
                  </span>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortOption)}
                    className="h-8 rounded-lg border border-zinc-200 bg-white px-2.5 text-xs font-medium text-zinc-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {SORT_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Platform toggles */}
                {availablePlatforms.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-xs font-semibold text-zinc-500">
                      Platforms:
                    </span>
                    {availablePlatforms.map((p) => {
                      const cfg = PLATFORM_CONFIG[p];
                      const active = activePlatforms.has(p);
                      return (
                        <button
                          key={p}
                          onClick={() => togglePlatform(p)}
                          className="flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all"
                          style={
                            active
                              ? {
                                  background: cfg.color,
                                  borderColor: cfg.color,
                                  color: "#fff",
                                }
                              : {
                                  background: "#fff",
                                  borderColor: "#E4E4E7",
                                  color: "#52525B",
                                }
                          }
                        >
                          <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{
                              background: active
                                ? "rgba(255,255,255,0.6)"
                                : cfg.color,
                            }}
                          />
                          {cfg.label}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Result count */}
                {searched && (
                  <span className="ml-auto text-xs text-zinc-400">
                    {filtered.length} results
                    {query && (
                      <>
                        {" "}
                        for{" "}
                        <strong className="text-zinc-700">
                          &ldquo;{query}&rdquo;
                        </strong>
                      </>
                    )}
                  </span>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main content */}
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        {/* Errors */}
        {Object.keys(errors).length > 0 && (
          <div className="mb-4">
            <ErrorBanner errors={errors} />
          </div>
        )}

        {/* Stats */}
        {!loading && searched && products.length > 0 && (
          <div className="mb-4">
            <StatsBar products={products} />
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Results */}
        {!loading && filtered.length > 0 && (
          <motion.div layout className="flex flex-col gap-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  rank={i + 1}
                  index={i}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty after search */}
        {!loading &&
          searched &&
          filtered.length === 0 &&
          Object.keys(errors).length === 0 && (
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-zinc-300 bg-white py-24 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100">
                <Search className="h-6 w-6 text-zinc-400" />
              </div>
              <div>
                <p className="font-bold text-zinc-800">No results found</p>
                <p className="mt-1 text-sm text-zinc-400">
                  Try a different term or check your API credentials.
                </p>
              </div>
            </div>
          )}

        {/* Idle state */}
        {!loading && !searched && (
          <div className="flex flex-col items-center gap-4 py-24 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-950">
              <Search className="h-7 w-7 text-orange-500" />
            </div>
            <div>
              <p className="text-lg font-bold text-zinc-900">Start searching</p>
              <p className="mt-1 text-sm text-zinc-400">
                Enter a product name above to compare prices across all
                platforms.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
