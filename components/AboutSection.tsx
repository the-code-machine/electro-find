"use client";

import { motion } from "framer-motion";
import {
  Database,
  Brain,
  Code2,
  BarChart3,
  Search,
  Layers,
  CheckCircle2,
} from "lucide-react";

const FEATURES = [
  {
    icon: Database,
    title: "Data Collection",
    desc: "Scraped 50,000+ electronics listings from Amazon and Flipkart using automated pipelines.",
  },
  {
    icon: Brain,
    title: "AI Similarity Engine",
    desc: "Cosine similarity and TF-IDF vectorization to match and deduplicate products across platforms.",
  },
  {
    icon: Layers,
    title: "Data Processing",
    desc: "Multi-stage ETL pipeline: cleaning, normalization, feature engineering and enrichment.",
  },
  {
    icon: BarChart3,
    title: "Buy Score Algorithm",
    desc: "Custom scoring model combining price, rating, and review signals into a single 0–100 score.",
  },
  {
    icon: Search,
    title: "Real-Time Search",
    desc: "Live product fetching from 5 platforms with sub-second aggregation and ranking.",
  },
  {
    icon: Code2,
    title: "Full-Stack Architecture",
    desc: "Next.js 14 frontend, Node.js API layer, Python ML backend, and REST integration.",
  },
];

const TIMELINE = [
  {
    date: "June 2025",
    title: "Project Inception",
    desc: "Defined scope, formed team, identified data sources — Amazon and Flipkart electronics categories.",
    tag: "Planning",
  },
  {
    date: "July 2025",
    title: "Data Collection Pipeline",
    desc: "Built automated scrapers to collect 50,000+ product listings. Structured raw data into CSV datasets.",
    tag: "Data",
  },
  {
    date: "August 2025",
    title: "Data Cleaning & EDA",
    desc: "Removed duplicates, handled missing values, normalized price formats, performed exploratory analysis.",
    tag: "Processing",
  },
  {
    date: "September 2025",
    title: "Feature Engineering",
    desc: "Extracted title embeddings, category tags, brand signals, and price-tier features for model input.",
    tag: "AI/ML",
  },
  {
    date: "October 2025",
    title: "Model Training",
    desc: "Trained cosine similarity and TF-IDF vectorization models. Validated deduplication accuracy at 94%.",
    tag: "AI/ML",
  },
  {
    date: "November 2025",
    title: "Backend Development",
    desc: "Built REST API layer integrating Oxylabs and Serper APIs. Implemented scoring and aggregation logic.",
    tag: "Backend",
  },
  {
    date: "December 2025",
    title: "Frontend Development",
    desc: "Designed and built Next.js frontend with Tailwind CSS, Framer Motion animations and ShadCN components.",
    tag: "Frontend",
  },
  {
    date: "January 2026",
    title: "Integration & Testing",
    desc: "End-to-end integration testing, performance benchmarking, and cross-platform result validation.",
    tag: "QA",
  },
  {
    date: "February 2026",
    title: "Beta Launch",
    desc: "Deployed beta version. Collected user feedback, iterated on UI/UX and scoring algorithm.",
    tag: "Launch",
  },
  {
    date: "April 2026",
    title: "Production Release",
    desc: "Full production deployment with 5 platform support, real-time search, and AI Buy Score.",
    tag: "Live",
  },
];

const TAG_COLORS: Record<string, string> = {
  Planning: "bg-zinc-100 text-zinc-600",
  Data: "bg-blue-50 text-blue-700",
  Processing: "bg-purple-50 text-purple-700",
  "AI/ML": "bg-orange-50 text-orange-700",
  Backend: "bg-green-50 text-green-700",
  Frontend: "bg-cyan-50 text-cyan-700",
  QA: "bg-yellow-50 text-yellow-700",
  Launch: "bg-orange-100 text-orange-800",
  Live: "bg-zinc-950 text-white",
};

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.45, delay },
  };
}

export function AboutSection() {
  return (
    <section id="about" className="bg-zinc-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div {...fadeUp()} className="mb-16 text-center">
          <span className="mb-3 inline-block rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-orange-600">
            About The Project
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl">
            Built with AI. Backed by Data.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-zinc-500">
            ElectroFind is a final-year engineering project combining machine
            learning, real-time web scraping, and modern frontend to solve the
            electronics price comparison problem.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT — Features */}
          <div>
            <motion.div {...fadeUp(0.05)}>
              <div className="mb-2 flex items-center gap-2">
                <div className="h-0.5 w-6 rounded-full bg-orange-500" />
                <span className="text-xs font-bold uppercase tracking-widest text-orange-500">
                  Features & Overview
                </span>
              </div>
              <h3 className="mb-4 text-2xl font-extrabold text-zinc-950">
                What we built
              </h3>
              <p className="mb-8 text-sm leading-relaxed text-zinc-500">
                A full-stack AI-powered electronics comparison platform. We
                collected, cleaned and vectorized product data from Amazon and
                Flipkart, trained a similarity model, and built real-time search
                that surfaces the best deal across 5 major platforms — ranked by
                a custom Buy Score.
              </p>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2">
              {FEATURES.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  {...fadeUp(0.07 + i * 0.05)}
                  className="rounded-xl border border-zinc-200 bg-white p-4 shadow-card hover:shadow-card-hover hover:border-orange-200 transition-all"
                >
                  <div className="mb-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-950">
                    <Icon className="h-4 w-4 text-orange-500" />
                  </div>
                  <p className="mb-1 text-sm font-bold text-zinc-900">
                    {title}
                  </p>
                  <p className="text-xs leading-relaxed text-zinc-500">
                    {desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Key metrics */}
            <motion.div
              {...fadeUp(0.4)}
              className="mt-6 grid grid-cols-3 divide-x divide-zinc-200 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-card"
            >
              {[
                { value: "50K+", label: "Products Collected" },
                { value: "94%", label: "Match Accuracy" },
                { value: "5", label: "Live Platforms" },
              ].map(({ value, label }) => (
                <div key={label} className="py-4 text-center">
                  <p className="font-mono text-xl font-bold text-zinc-950">
                    {value}
                  </p>
                  <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Timeline */}
          <div>
            <motion.div {...fadeUp(0.05)}>
              <div className="mb-2 flex items-center gap-2">
                <div className="h-0.5 w-6 rounded-full bg-orange-500" />
                <span className="text-xs font-bold uppercase tracking-widest text-orange-500">
                  Project Timeline
                </span>
              </div>
              <h3 className="mb-6 text-2xl font-extrabold text-zinc-950">
                From idea to production
              </h3>
            </motion.div>

            <div className="relative pl-6">
              {/* Vertical line */}
              <div className="absolute left-2 top-2 bottom-2 w-px bg-zinc-200" />

              <div className="flex flex-col gap-6">
                {TIMELINE.map(({ date, title, desc, tag }, i) => (
                  <motion.div
                    key={date}
                    {...fadeUp(0.08 + i * 0.04)}
                    className="relative"
                  >
                    {/* Dot */}
                    <div
                      className={`absolute -left-[17px] top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-white ${tag === "Live" ? "bg-orange-500" : "bg-zinc-300"}`}
                    >
                      {tag === "Live" && (
                        <CheckCircle2 className="h-2.5 w-2.5 text-white" />
                      )}
                    </div>

                    <div className="rounded-xl border border-zinc-100 bg-white p-3.5 shadow-card">
                      <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
                        <span className="font-mono text-xs font-semibold text-zinc-400">
                          {date}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${TAG_COLORS[tag] ?? "bg-zinc-100 text-zinc-600"}`}
                        >
                          {tag}
                        </span>
                      </div>
                      <p className="mb-0.5 text-sm font-bold text-zinc-900">
                        {title}
                      </p>
                      <p className="text-xs leading-relaxed text-zinc-500">
                        {desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
