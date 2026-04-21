import { Product } from "./types";

export function calculateScores(products: Product[]): Product[] {
  const validPrices = products.map((p) => p.price).filter((p) => p > 0);
  const minP = validPrices.length ? Math.min(...validPrices) : 0;
  const maxP = validPrices.length ? Math.max(...validPrices) : 0;

  return products.map((p) => {
    // 40 pts — rating (out of 5)
    const rScore = p.rating > 0 ? (p.rating / 5) * 40 : 0;

    // 30 pts — review count (log-scaled, 100k = full)
    const rvScore =
      p.reviews > 0
        ? Math.min((Math.log10(p.reviews + 1) / Math.log10(100_000)) * 30, 30)
        : 0;

    // 30 pts — price value (lower = better)
    let pScore = 0;
    if (maxP > minP && p.price > 0) {
      pScore = (1 - (p.price - minP) / (maxP - minP)) * 30;
    } else if (p.price > 0) {
      pScore = 15;
    }

    return { ...p, score: Math.round((rScore + rvScore + pScore) * 10) / 10 };
  });
}

export function scoreLabel(score: number): {
  label: string;
  color: string;
  bg: string;
} {
  if (score >= 72)
    return {
      label: "Excellent Buy",
      color: "#16A34A",
      bg: "rgba(22,163,74,0.09)",
    };
  if (score >= 45)
    return {
      label: "Good Value",
      color: "#2563EB",
      bg: "rgba(37,99,235,0.08)",
    };
  return { label: "Consider", color: "#D97706", bg: "rgba(217,119,6,0.09)" };
}
