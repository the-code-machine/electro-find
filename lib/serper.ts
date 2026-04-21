/**
 * Serper.dev — Google Shopping only (web search removed)
 * Free tier: 2,500 queries/month
 * Sign up: https://serper.dev
 */
import { Product } from "./types";

const SERPER_KEY = process.env.SERPER_API_KEY ?? "";

interface SerperShoppingItem {
  title: string;
  source: string;
  link: string;
  price: string;
  rating?: number;
  ratingCount?: number;
  imageUrl?: string;
  delivery?: string;
}

function parsePrice(raw: string | undefined): number {
  if (!raw) return 0;
  const n = parseFloat(raw.replace(/[^0-9.]/g, ""));
  return isFinite(n) && n > 0 && n < 1e6 ? n : 0;
}

export async function fetchSerperShopping(query: string): Promise<{
  products: Product[];
  error?: string;
}> {
  if (!SERPER_KEY) return { products: [] };

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15_000);

    const res = await fetch("https://google.serper.dev/shopping", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": SERPER_KEY,
      },
      body: JSON.stringify({ q: query, gl: "us", hl: "en", num: 10 }),
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return {
        products: [],
        error: `Serper HTTP ${res.status}: ${text.slice(0, 120)}`,
      };
    }

    const data = (await res.json()) as { shopping?: SerperShoppingItem[] };

    if (process.env.NODE_ENV === "development") {
      console.log(`[Serper:Shopping] ${data.shopping?.length ?? 0} results`);
    }

    const products: Product[] = (data.shopping ?? []).map((item) => ({
      id: `serper-${Math.random().toString(36).slice(2, 10)}`,
      title: item.title.slice(0, 150),
      price: parsePrice(item.price),
      currency: "USD",
      rating: item.rating ?? 0,
      reviews: item.ratingCount ?? 0,
      image: item.imageUrl ?? "",
      url: item.link ?? "",
      platform: "Google Shopping" as const,
      snippet: item.source
        ? `${item.source}${item.delivery ? ` · ${item.delivery}` : ""}`
        : undefined,
      score: 0,
    }));

    return { products };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return {
      products: [],
      error: msg.toLowerCase().includes("abort")
        ? "Serper timed out"
        : msg.slice(0, 150),
    };
  }
}
