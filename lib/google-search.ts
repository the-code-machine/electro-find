import { Product } from "./types";

const API_KEY = process.env.GOOGLE_CSE_API_KEY ?? "";
const CX = process.env.GOOGLE_CSE_CX ?? "";

interface CseItem {
  title: string;
  link: string;
  snippet: string;
  displayLink: string;
  pagemap?: {
    cse_image?: Array<{ src: string }>;
    cse_thumbnail?: Array<{ src: string }>;
    offer?: Array<{ price?: string; lowprice?: string }>;
    aggregaterating?: Array<{ ratingvalue?: string; reviewcount?: string }>;
    product?: Array<{ name?: string }>;
  };
}

function extractPrice(item: CseItem): number {
  // Try structured data first
  const structured =
    item.pagemap?.offer?.[0]?.price ?? item.pagemap?.offer?.[0]?.lowprice;
  if (structured) {
    const n = parseFloat(String(structured).replace(/[^0-9.]/g, ""));
    if (isFinite(n) && n > 0) return n;
  }
  // Fall back to snippet regex
  const match = item.snippet.match(/\$\s?([\d,]+\.?\d{0,2})/);
  if (match) {
    const n = parseFloat(match[1].replace(/,/g, ""));
    if (isFinite(n) && n > 0 && n < 1e6) return n;
  }
  return 0;
}

function extractRating(item: CseItem): number {
  const raw = item.pagemap?.aggregaterating?.[0]?.ratingvalue;
  if (!raw) return 0;
  const n = parseFloat(String(raw));
  if (!isFinite(n) || n <= 0) return 0;
  return n > 5 ? Math.round((n / 2) * 10) / 10 : n;
}

function extractReviews(item: CseItem): number {
  const raw = item.pagemap?.aggregaterating?.[0]?.reviewcount ?? "0";
  const n = parseInt(String(raw).replace(/\D/g, ""), 10);
  return isFinite(n) ? n : 0;
}

function extractImage(item: CseItem): string {
  // cse_thumbnail is more reliable than cse_image (smaller, usually actually loads)
  return (
    item.pagemap?.cse_thumbnail?.[0]?.src ??
    item.pagemap?.cse_image?.[0]?.src ??
    ""
  );
}

export async function fetchGoogleSearch(query: string): Promise<{
  products: Product[];
  error?: string;
}> {
  // Skip silently if not configured — Google Search is optional
  if (!API_KEY || !CX) {
    return { products: [] };
  }

  try {
    const url = new URL("https://www.googleapis.com/customsearch/v1");
    url.searchParams.set("key", API_KEY);
    url.searchParams.set("cx", CX);
    url.searchParams.set("q", `${query} buy price`);
    url.searchParams.set("num", "10");

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15_000);

    const res = await fetch(url.toString(), { signal: controller.signal });
    clearTimeout(timer);

    if (!res.ok) {
      // Parse the error body for a clean message
      const body = (await res.json().catch(() => ({}))) as {
        error?: { code?: number; message?: string; status?: string };
      };
      const code = body.error?.code ?? res.status;
      const status = body.error?.status ?? "";
      const msg = body.error?.message ?? res.statusText;

      if (code === 403) {
        if (status === "PERMISSION_DENIED" || msg.includes("does not have")) {
          return {
            products: [],
            error:
              `API key exists but Custom Search API is not enabled on this project. ` +
              `Go to console.cloud.google.com → Search "Custom Search API" → Enable.`,
          };
        }
        return { products: [], error: `403 Forbidden: ${msg.slice(0, 120)}` };
      }

      if (code === 400) {
        return {
          products: [],
          error: `Invalid request — check your GOOGLE_CSE_CX value. Error: ${msg.slice(0, 120)}`,
        };
      }

      return { products: [], error: `HTTP ${code}: ${msg.slice(0, 120)}` };
    }

    const data = (await res.json()) as { items?: CseItem[] };
    const items = data.items ?? [];

    if (process.env.NODE_ENV === "development") {
      console.log(`[Google CSE] returned ${items.length} items for "${query}"`);
    }

    const products: Product[] = items
      .filter((it) => it.link && it.title)
      .map((it) => ({
        id: `google-${Math.random().toString(36).slice(2, 10)}`,
        title: it.title.slice(0, 150),
        price: extractPrice(it),
        currency: "USD",
        rating: extractRating(it),
        reviews: extractReviews(it),
        image: extractImage(it),
        url: it.link,
        platform: "Google Search" as const,
        snippet: it.snippet,
        score: 0,
      }));

    return { products };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (msg.toLowerCase().includes("abort")) {
      return { products: [], error: "Google Search timed out after 15s" };
    }
    return { products: [], error: msg.slice(0, 150) };
  }
}
