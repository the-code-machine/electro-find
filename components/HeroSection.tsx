"use client";

import { useState, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Search,
  ArrowRight,
  Sparkles,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";
import { CATEGORIES, Category } from "@/lib/types";

const EXAMPLE_QUERIES = [
  "iPhone 16 Pro",
  "Sony WH-1000XM5",
  "MacBook Air M3",
  "Samsung 4K TV",
  "iPad Pro M4",
  "RTX 4080",
];

const STATS = [
  { icon: TrendingUp, value: "5", label: "Platforms" },
  { icon: Sparkles, value: "AI", label: "Powered" },
  { icon: ShieldCheck, value: "Live", label: "Prices" },
];

export function HeroSection() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("All Electronics");
  const router = useRouter();

  const doSearch = () => {
    const q = query.trim();
    if (!q) return;
    const params = new URLSearchParams({ q, category });
    router.push(`/search?${params.toString()}`);
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") doSearch();
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-4 pt-24 pb-16">
      {/* Subtle grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#09090B 1px, transparent 1px), linear-gradient(90deg, #09090B 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Orange glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/5 blur-3xl" />

      <div className="relative mx-auto w-full max-w-4xl text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5"
        >
          <Sparkles className="h-3.5 w-3.5 text-orange-500" />
          <span className="text-xs font-semibold text-orange-700">
            AI-Powered Price Comparison
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="mb-5 text-5xl font-extrabold leading-[1.08] tracking-tight text-zinc-950 sm:text-6xl lg:text-7xl"
        >
          Find the Best
          <br />
          <span className="gradient-text">Electronics Deal</span>
          <br />
          <span className="text-zinc-300">Instantly.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto mb-8 max-w-xl text-base text-zinc-500 sm:text-lg"
        >
          Compare prices across Amazon, Flipkart, Best Buy, eBay and Google
          Shopping. Ranked by our AI-trained Buy Score algorithm.
        </motion.p>

        {/* Search box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mb-6 w-full max-w-2xl"
        >
          <div className="flex flex-col gap-2 rounded-2xl border border-zinc-200 bg-white p-2 shadow-card sm:flex-row">
            {/* Category */}
            <div className="relative sm:w-44 flex-shrink-0">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="h-11 w-full appearance-none rounded-xl border-0 bg-zinc-50 px-3 pr-8 text-sm font-medium text-zinc-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400">
                ▾
              </div>
            </div>

            {/* Input */}
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKey}
                placeholder='Try "iPhone 16 Pro" or "gaming laptop"...'
                className="h-11 w-full rounded-xl border-0 bg-transparent pl-9 pr-3 text-sm font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Button */}
            <button
              onClick={doSearch}
              disabled={!query.trim()}
              className="flex h-11 items-center justify-center gap-1.5 rounded-xl bg-zinc-950 px-5 text-sm font-bold text-white transition-all hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
            >
              Search
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>

        {/* Example chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mb-12 flex flex-wrap justify-center gap-2"
        >
          {EXAMPLE_QUERIES.map((q) => (
            <button
              key={q}
              onClick={() => {
                setQuery(q);
                router.push(
                  `/search?q=${encodeURIComponent(q)}&category=All+Electronics`,
                );
              }}
              className="rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-zinc-600 transition-all hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700"
            >
              {q}
            </button>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.38 }}
          className="flex flex-wrap items-center justify-center gap-8"
        >
          {STATS.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1.5">
                <Icon className="h-4 w-4 text-orange-500" />
                <span className="font-mono text-xl font-bold text-zinc-950">
                  {value}
                </span>
              </div>
              <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="h-4 w-0.5 rounded-full bg-zinc-300"
        />
      </motion.div>
    </section>
  );
}
