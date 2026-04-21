"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ProductCard } from "./ProductCard";
import { SkeletonCard } from "./SkeletonCard";
import { Product, Platform, SortOption } from "@/lib/types";
import { SearchX } from "lucide-react";

interface Props {
  products: Product[];
  loading: boolean;
  activePlatforms: Set<Platform>;
  sort: SortOption;
}

const SORT_FNS: Record<SortOption, (a: Product, b: Product) => number> = {
  score_desc: (a, b) => b.score - a.score,
  price_asc: (a, b) => (a.price || 1e9) - (b.price || 1e9),
  price_desc: (a, b) => b.price - a.price,
  rating_desc: (a, b) => b.rating - a.rating,
  reviews_desc: (a, b) => b.reviews - a.reviews,
};

export function ProductGrid({
  products,
  loading,
  activePlatforms,
  sort,
}: Props) {
  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  const filtered = products
    .filter((p) => activePlatforms.has(p.platform))
    .sort(SORT_FNS[sort]);

  if (!filtered.length) {
    return (
      <motion.div
        className="flex flex-col items-center gap-4 py-20 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
          <SearchX className="h-7 w-7 text-slate-400" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-700">
            No results found
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            Try a different search term or enable more platforms above.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div className="flex flex-col gap-3" layout>
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
  );
}
