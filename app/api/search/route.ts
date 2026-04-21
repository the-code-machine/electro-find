import { NextRequest, NextResponse } from "next/server";
import { fetchAllPlatforms } from "@/lib/oxylabs"; // Amazon, Flipkart, Best Buy, eBay
import { fetchSerperShopping } from "@/lib/serper"; // Google Shopping (with images)
import { calculateScores } from "@/lib/scoring";
import { SearchResponse } from "@/lib/types";

export const maxDuration = 55;

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim();
  const category = req.nextUrl.searchParams.get("category") ?? "";

  if (!q) {
    return NextResponse.json(
      { error: "Missing required param: q" },
      { status: 400 },
    );
  }

  if (process.env.NODE_ENV === "development") {
    console.log(`\nSearch: "${q}" [${category}]`);
  }

  // All 5 platforms in parallel:
  //   Oxylabs  → Amazon + Flipkart + Best Buy + eBay
  //   Serper   → Google Shopping (with product images)
  const [oxyResult, serperResult] = await Promise.all([
    fetchAllPlatforms(q),
    fetchSerperShopping(q),
  ]);

  const all = [...oxyResult.products, ...serperResult.products];
  const scored = calculateScores(all).sort((a, b) => b.score - a.score);

  const errors: Record<string, string> = { ...oxyResult.errors };
  if (serperResult.error && serperResult.products.length === 0) {
    errors["Google Shopping"] = serperResult.error;
  }

  if (process.env.NODE_ENV === "development") {
    console.log(
      `Total: ${scored.length} products across ${new Set(scored.map((p) => p.platform)).size} platforms`,
    );
    if (Object.keys(errors).length) console.log("Errors:", errors);
  }

  const body: SearchResponse = {
    products: scored,
    errors,
    query: q,
    total: scored.length,
  };

  return NextResponse.json(body);
}
