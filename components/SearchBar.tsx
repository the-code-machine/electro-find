"use client";

import { useRef, KeyboardEvent } from "react";
import { Search, Cpu } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { CATEGORIES, Category } from "@/lib/types";

interface Props {
  query: string;
  category: Category;
  loading: boolean;
  onQueryChange: (v: string) => void;
  onCategoryChange: (v: Category) => void;
  onSearch: () => void;
}

const CATEGORY_OPTIONS = CATEGORIES.map((c) => ({ value: c, label: c }));

export function SearchBar({
  query,
  category,
  loading,
  onQueryChange,
  onCategoryChange,
  onSearch,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSearch();
  };

  return (
    <motion.div
      className="bg-white border border-slate-200 rounded-2xl p-4 shadow-card"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, delay: 0.05 }}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Category selector */}
        <div className="sm:w-52 flex-shrink-0">
          <Select
            options={CATEGORY_OPTIONS}
            value={category}
            onChange={(e) => onCategoryChange(e.target.value as Category)}
            aria-label="Category"
          />
        </div>

        {/* Search input */}
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            ref={inputRef}
            className="pl-9 h-10"
            placeholder='e.g. "Sony WH-1000XM5" or "gaming laptop under $1000"'
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyDown={handleKey}
            disabled={loading}
          />
        </div>

        {/* Search button */}
        <Button
          size="lg"
          className="h-10 gap-2 px-5 text-sm sm:flex-shrink-0"
          onClick={onSearch}
          disabled={loading || !query.trim()}
        >
          {loading ? (
            <>
              <Cpu className="h-4 w-4 animate-spin" />
              Searching…
            </>
          ) : (
            <>
              <Search className="h-4 w-4" />
              Search
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
}
