"use client";

import { motion } from "framer-motion";
import { Package, Layers, DollarSign, TrendingUp } from "lucide-react";
import { Product } from "@/lib/types";

interface Props {
  products: Product[];
}

export function StatsBar({ products }: Props) {
  const prices = products.map((p) => p.price).filter((p) => p > 0);
  const nPlats = new Set(products.map((p) => p.platform)).size;
  const best = products[0]?.score ?? 0;
  const priceRange = prices.length
    ? `$${Math.min(...prices).toLocaleString("en-US", { maximumFractionDigits: 0 })} – $${Math.max(...prices).toLocaleString("en-US", { maximumFractionDigits: 0 })}`
    : "N/A";

  const stats = [
    { icon: Package, value: products.length, label: "Results" },
    { icon: Layers, value: nPlats, label: "Platforms" },
    { icon: DollarSign, value: priceRange, label: "Price Range" },
    { icon: TrendingUp, value: best, label: "Top Score" },
  ];

  return (
    <motion.div
      className="grid grid-cols-2 divide-x divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card sm:grid-cols-4 sm:divide-y-0"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      {stats.map(({ icon: Icon, value, label }) => (
        <div key={label} className="flex items-center gap-3 px-4 py-3.5">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-navy-50">
            <Icon className="h-4 w-4 text-navy-500" />
          </div>
          <div>
            <p className="font-mono text-lg font-bold leading-none text-slate-900">
              {value}
            </p>
            <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-widest text-slate-400">
              {label}
            </p>
          </div>
        </div>
      ))}
    </motion.div>
  );
}
