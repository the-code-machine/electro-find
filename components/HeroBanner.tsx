"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";

const PLATFORM_TAGS = [
  "Amazon",
  "Google Shopping",
  "Flipkart",
  "Best Buy",
  "eBay",
];

export function HeroBanner() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#0F2460] via-[#1D4ED8] to-[#3B82F6] px-8 py-10 md:px-12 md:py-14">
      {/* Background orbs */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/5" />
      <div className="pointer-events-none absolute -bottom-24 left-[38%] h-72 w-72 rounded-full bg-white/[0.03]" />
      <div className="pointer-events-none absolute right-1/4 top-1/2 h-40 w-40 rounded-full bg-blue-400/10 blur-2xl" />

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Platform tags */}
        <motion.div
          className="mb-5 flex flex-wrap gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {PLATFORM_TAGS.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/20 bg-white/10 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-widest text-white/80 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Headline */}
        <motion.div
          className="flex items-center gap-3 mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
            <Zap className="h-5 w-5 text-white" fill="white" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            ElectroFind
          </h1>
        </motion.div>

        <motion.p
          className="max-w-xl text-[15px] leading-relaxed text-white/75"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.14 }}
        >
          Compare electronics prices, ratings and value across four platforms —
          ranked by our&nbsp;
          <span className="font-semibold text-white">Buy Score</span> algorithm.
        </motion.p>

        {/* Score legend pills */}
        <motion.div
          className="mt-5 flex flex-wrap gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.22 }}
        >
          {[
            { range: "72–100", label: "Excellent Buy", color: "#34D399" },
            { range: "45–71", label: "Good Value", color: "#93C5FD" },
            { range: "0–44", label: "Consider", color: "#FCD34D" },
          ].map((s) => (
            <span
              key={s.range}
              className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/85"
            >
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: s.color }}
              />
              <span className="font-mono text-white/60">{s.range}</span>
              &nbsp;{s.label}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
