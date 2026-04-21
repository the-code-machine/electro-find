"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Star,
  MessageSquare,
  ShoppingCart,
  ImageOff,
  TrendingUp,
  ShoppingBag,
} from "lucide-react";
import { Product, PLATFORM_CONFIG } from "@/lib/types";
import { scoreLabel } from "@/lib/scoring";
import { cn } from "@/lib/utils";

interface Props {
  product: Product;
  rank: number;
  index: number; // for stagger delay
}

const RANK_STYLES: Record<number, { bg: string; text: string; label: string }> =
  {
    1: { bg: "bg-amber-500", text: "text-white", label: "Gold" },
    2: { bg: "bg-slate-400", text: "text-white", label: "Silver" },
    3: { bg: "bg-orange-700", text: "text-white", label: "Bronze" },
  };

export function ProductCard({ product, rank, index }: Props) {
  const [imgError, setImgError] = useState(false);
  const cfg = PLATFORM_CONFIG[product.platform];
  const scoreMeta = scoreLabel(product.score);
  const rankStyle = RANK_STYLES[rank];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.32, delay: Math.min(index * 0.04, 0.4) }}
      whileHover={{ y: -3, transition: { duration: 0.18 } }}
      className="group relative flex gap-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card hover:shadow-card-hover hover:border-blue-100 transition-shadow"
    >
      {/* Left accent bar */}
      <div
        className="w-1 flex-shrink-0 rounded-l-2xl"
        style={{ background: cfg.color }}
      />

      {/* Image */}
      <div className="relative flex h-auto w-[120px] flex-shrink-0 items-center justify-center overflow-hidden bg-slate-50 sm:w-[140px]">
        {product.image && !imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.title}
            className="absolute inset-0 h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          /* Styled no-image placeholder using platform colour */
          <div className="flex flex-col items-center gap-1.5 px-2 text-center">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ background: cfg.bgColor }}
            >
              <ShoppingBag className="h-5 w-5" style={{ color: cfg.color }} />
            </div>
            <span className="text-[10px] font-medium text-slate-400 leading-tight">
              {cfg.label}
            </span>
          </div>
        )}

        {/* Rank badge */}
        <div
          className={cn(
            "absolute left-1.5 top-1.5 flex h-6 min-w-[24px] items-center justify-center rounded-md px-1.5 text-[11px] font-bold",
            rankStyle
              ? `${rankStyle.bg} ${rankStyle.text}`
              : "bg-slate-800/70 text-white",
          )}
        >
          #{rank}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 p-4 min-w-0">
        {/* Platform badge */}
        <div className="flex items-center justify-between gap-2">
          <span
            className="inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide"
            style={{ background: cfg.bgColor, color: cfg.color }}
          >
            {cfg.label}
          </span>

          {/* Score pill */}
          <motion.div
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1"
            style={{ background: scoreMeta.bg }}
            title={scoreMeta.label}
          >
            <TrendingUp
              className="h-3 w-3"
              style={{ color: scoreMeta.color }}
            />
            <span
              className="font-mono text-sm font-bold"
              style={{ color: scoreMeta.color }}
            >
              {product.score}
            </span>
            <span
              className="text-[10px] font-semibold uppercase tracking-wide"
              style={{ color: scoreMeta.color }}
            >
              {scoreMeta.label}
            </span>
          </motion.div>
        </div>

        {/* Title */}
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-slate-800">
          {product.title}
        </h3>

        {/* Snippet (Google Search only) */}
        {product.snippet && (
          <p className="line-clamp-1 text-xs text-slate-400">
            {product.snippet}
          </p>
        )}

        {/* Meta row */}
        <div className="mt-auto flex flex-wrap items-end justify-between gap-2">
          <div className="flex flex-col gap-1">
            {/* Price */}
            {product.price > 0 ? (
              <span className="font-mono text-xl font-bold text-slate-900">
                $
                {product.price.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            ) : (
              <span className="text-xs text-slate-400">Price unavailable</span>
            )}

            {/* Rating + reviews */}
            <div className="flex items-center gap-2 flex-wrap">
              {product.rating > 0 && (
                <span className="flex items-center gap-1 rounded-md bg-amber-50 px-1.5 py-0.5 text-xs font-semibold text-amber-700">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  {product.rating.toFixed(1)}
                </span>
              )}
              {product.reviews > 0 && (
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <MessageSquare className="h-3 w-3" />
                  {product.reviews.toLocaleString()} reviews
                </span>
              )}
            </div>
          </div>

          {/* CTA */}
          {product.url && (
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-xl bg-navy-500 px-3.5 py-2 text-xs font-bold text-white transition-all hover:bg-navy-600 hover:gap-2 active:scale-95"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              View Deal
              <ExternalLink className="h-3 w-3 opacity-70" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
