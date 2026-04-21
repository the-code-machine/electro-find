"use client";

import { LayoutGrid, ArrowUpDown } from "lucide-react";
import { motion } from "framer-motion";
import { Select } from "@/components/ui/select";
import { Platform, SortOption, PLATFORM_CONFIG } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Props {
  sort: SortOption;
  activePlatforms: Set<Platform>;
  availablePlatforms: Platform[];
  total: number;
  query: string;
  onSortChange: (v: SortOption) => void;
  onTogglePlatform: (p: Platform) => void;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "score_desc", label: "Buy Score (Best first)" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating_desc", label: "Rating" },
  { value: "reviews_desc", label: "Most Reviews" },
];

export function FilterBar({
  sort,
  activePlatforms,
  availablePlatforms,
  total,
  query,
  onSortChange,
  onTogglePlatform,
}: Props) {
  return (
    <motion.div
      className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      {/* Result count */}
      <p className="text-sm text-slate-500 flex items-center gap-1.5">
        <LayoutGrid className="h-3.5 w-3.5 text-slate-400" />
        <span>
          <strong className="font-semibold text-slate-800">{total}</strong>{" "}
          results for&nbsp;
          <strong className="font-semibold text-navy-500">{query}</strong>
        </span>
      </p>

      <div className="flex flex-wrap items-center gap-2">
        {/* Platform toggles */}
        {availablePlatforms.map((platform) => {
          const cfg = PLATFORM_CONFIG[platform];
          const active = activePlatforms.has(platform);
          return (
            <button
              key={platform}
              onClick={() => onTogglePlatform(platform)}
              className={cn(
                "flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-semibold transition-all",
                active
                  ? "border-transparent text-white"
                  : "border-slate-200 bg-white text-slate-500 hover:border-slate-300",
              )}
              style={active ? { background: cfg.color } : undefined}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{
                  background: active ? "rgba(255,255,255,0.6)" : cfg.color,
                }}
              />
              {cfg.label}
            </button>
          );
        })}

        {/* Sort */}
        <div className="flex items-center gap-1.5">
          <ArrowUpDown className="h-3.5 w-3.5 text-slate-400" />
          <Select
            className="h-8 rounded-lg text-xs"
            options={SORT_OPTIONS}
            value={sort}
            onChange={(e: any) => onSortChange(e.target.value as SortOption)}
          />
        </div>
      </div>
    </motion.div>
  );
}
