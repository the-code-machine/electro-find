"use client";

import { motion } from "framer-motion";
import {
  Smartphone,
  Globe,
  BrainCircuit,
  Bell,
  BarChart2,
  ShieldCheck,
} from "lucide-react";

const PLANS = [
  {
    icon: BrainCircuit,
    title: "Deeper AI Recommendations",
    desc: "Fine-tune the similarity model with user interaction data to provide personalized product recommendations based on browsing patterns.",
    quarter: "Q3 2026",
  },
  {
    icon: Globe,
    title: "Expand to 10+ Platforms",
    desc: "Add support for Walmart, Newegg, Croma, Reliance Digital, B&H Photo and international storefronts for broader coverage.",
    quarter: "Q3 2026",
  },
  {
    icon: Bell,
    title: "Price Drop Alerts",
    desc: "Let users set price thresholds on any product. Get notified via email or push notification when the price hits their target.",
    quarter: "Q4 2026",
  },
  {
    icon: Smartphone,
    title: "Native Mobile App",
    desc: "React Native application for iOS and Android with barcode scanning to instantly find the best online price for in-store products.",
    quarter: "Q1 2027",
  },
  {
    icon: BarChart2,
    title: "Price History Charts",
    desc: "Track and visualize price changes over time using our collected historical dataset and real-time price monitoring pipeline.",
    quarter: "Q1 2027",
  },
  {
    icon: ShieldCheck,
    title: "Verified Reviews Layer",
    desc: "Cross-reference reviews across platforms using NLP to detect fake reviews and surface only verified, trustworthy ratings.",
    quarter: "Q2 2027",
  },
];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.45, delay },
  };
}

export function FuturePlans() {
  return (
    <section className="bg-zinc-950 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div {...fadeUp()} className="mb-14 text-center">
          <span className="mb-3 inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-orange-400">
            Roadmap
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            What&apos;s coming next
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-zinc-400">
            ElectroFind is actively evolving. Here&apos;s what the team is
            building toward in the next development phases.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PLANS.map(({ icon: Icon, title, desc, quarter }, i) => (
            <motion.div
              key={title}
              {...fadeUp(0.07 + i * 0.06)}
              className="group rounded-xl border border-zinc-800 bg-zinc-900 p-5 transition-all hover:border-orange-500/40 hover:bg-zinc-800/80"
            >
              <div className="mb-3 flex items-start justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/10">
                  <Icon className="h-4.5 w-4.5 text-orange-400" />
                </div>
                <span className="font-mono text-[10px] font-semibold text-zinc-500">
                  {quarter}
                </span>
              </div>
              <h3 className="mb-1.5 text-sm font-bold text-white">{title}</h3>
              <p className="text-xs leading-relaxed text-zinc-400">{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div {...fadeUp(0.5)} className="mt-12 text-center">
          <p className="text-sm text-zinc-500">
            Have a feature idea?{" "}
            <a
              href="mailto:team@electrofind.dev"
              className="font-semibold text-orange-400 hover:text-orange-300 transition-colors"
            >
              Reach out to the team →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
