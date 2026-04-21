"use client";

import { motion } from "framer-motion";
import { Zap, TrendingUp, ShieldCheck, Clock } from "lucide-react";

const EXAMPLE_SEARCHES = [
  "iPhone 16 Pro",
  "Sony WH-1000XM5",
  "MacBook Air M3",
  "Samsung 65 OLED TV",
  "iPad Pro M4",
  "Canon EOS R50",
  "PS5 Console",
  "Samsung Galaxy Watch",
];

interface Props {
  onExampleClick: (q: string) => void;
}

export function LandingState({ onExampleClick }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-5 py-2"
    >
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          {
            icon: TrendingUp,
            title: "Buy Score Algorithm",
            desc: "Combines rating, review volume and price into one 0-100 score.",
          },
          {
            icon: ShieldCheck,
            title: "4 Platforms at Once",
            desc: "Amazon, Google Shopping, Flipkart and Google Search in one query.",
          },
          {
            icon: Clock,
            title: "Live Prices",
            desc: "Fetched in real-time via Oxylabs Realtime Scraper and Google CSE.",
          },
        ].map(({ icon: Icon, title, desc }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.32 }}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-card"
          >
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Icon className="h-4 w-4" />
            </div>
            <p className="mb-1 text-sm font-semibold text-slate-800">{title}</p>
            <p className="text-xs leading-relaxed text-slate-500">{desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
        <div className="mb-3 flex items-center gap-2">
          <Zap className="h-4 w-4 text-blue-600" />
          <p className="text-sm font-semibold text-slate-700">
            Try a quick search
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {EXAMPLE_SEARCHES.map((q, i) => (
            <motion.button
              key={q}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + i * 0.04, duration: 0.22 }}
              onClick={() => onExampleClick(q)}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-all hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 active:scale-95"
            >
              {q}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
        <p className="mb-3 text-sm font-semibold text-slate-700">
          Buy Score Breakdown
        </p>
        <div className="space-y-2">
          {[
            { label: "Star Rating", pts: 40, color: "#1D4ED8" },
            { label: "Review Volume", pts: 30, color: "#0891B2" },
            { label: "Price Value", pts: 30, color: "#059669" },
          ].map(({ label, pts, color }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="w-28 text-xs text-slate-500">{label}</span>
              <div className="flex-1 h-1.5 overflow-hidden rounded-full bg-slate-100">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: color }}
                  initial={{ width: 0 }}
                  animate={{ width: pts + "%" }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                />
              </div>
              <span className="w-12 text-right font-mono text-xs font-semibold text-slate-600">
                {pts} pts
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
