import { Product, Platform } from "./types";

const OXY_URL = "https://realtime.oxylabs.io/v1/queries";
const USERNAME = process.env.OXY_USERNAME ?? "";
const PASSWORD = process.env.OXY_PASSWORD ?? "";

// ── Platform sources ───────────────────────────────────────────────────────────
// Oxylabs supported e-commerce sources:
//   amazon_search, flipkart_search, bestbuy_search, ebay_search, walmart_search
const SOURCES: { platform: Platform; source: string; geo: string }[] = [
  { platform: "Amazon", source: "amazon_search", geo: "10001" },
  { platform: "Flipkart", source: "flipkart_search", geo: "India" },
  { platform: "Best Buy", source: "bestbuy_search", geo: "10001" },
  { platform: "eBay", source: "ebay_search", geo: "10001" },
];

// ── Extract organic list from any Oxylabs response shape ──────────────────────
function extractOrganic(raw: unknown): unknown[] {
  if (!raw || typeof raw !== "object") return [];
  try {
    const result = (
      (raw as Record<string, unknown>).results as unknown[]
    )?.[0] as Record<string, unknown>;
    const content = result?.content;

    if (Array.isArray(content)) return content;
    if (!content || typeof content !== "object") return [];

    const c = content as Record<string, unknown>;
    const rf = c.results;

    if (rf && typeof rf === "object" && !Array.isArray(rf)) {
      const rfd = rf as Record<string, unknown>;
      if (Array.isArray(rfd.organic) && rfd.organic.length) return rfd.organic;
      if (Array.isArray(rfd.paid) && rfd.paid.length) return rfd.paid;
    }
    if (Array.isArray(rf) && rf.length) return rf;

    for (const key of ["organic", "items", "products", "listings"]) {
      const v = c[key];
      if (Array.isArray(v) && v.length) return v;
    }
  } catch {}
  return [];
}

// ── Field cleaners ─────────────────────────────────────────────────────────────
function cleanPrice(v: unknown): number {
  if (!v && v !== 0) return 0;
  if (typeof v === "number") return v > 0 && v < 1e6 ? v : 0;
  const n = parseFloat(String(v).replace(/[^0-9.]/g, ""));
  return isFinite(n) && n > 0 && n < 1e6 ? n : 0;
}
function cleanFloat(v: unknown): number {
  if (!v) return 0;
  const n = parseFloat(String(v));
  if (!isFinite(n) || n <= 0) return 0;
  return n > 5 ? Math.round((n / 2) * 10) / 10 : n;
}
function cleanInt(v: unknown): number {
  if (!v) return 0;
  const n = parseInt(String(v).replace(/[^0-9]/g, ""), 10);
  return isFinite(n) ? n : 0;
}

// ── Fix URLs per platform ──────────────────────────────────────────────────────
function fixUrl(raw: unknown, platform: Platform): string {
  let url = String(raw ?? "").trim();
  if (!url) return "";

  if (platform === "Amazon") {
    url = url
      .replace(/^https?:\/\/\//, "https://www.amazon.com/")
      .replace(/^\//, "https://www.amazon.com/");
  }
  if (platform === "Best Buy") {
    if (url.startsWith("/")) url = "https://www.bestbuy.com" + url;
  }
  if (platform === "eBay") {
    if (url.startsWith("/")) url = "https://www.ebay.com" + url;
  }
  if (platform === "Flipkart") {
    if (url.startsWith("/")) url = "https://www.flipkart.com" + url;
  }
  if (!url.startsWith("http")) url = "https://" + url;
  return url;
}

// ── Extract image per platform ─────────────────────────────────────────────────
function extractImage(d: Record<string, unknown>, platform: Platform): string {
  // Try platform-specific primary fields first
  const fieldsByPlatform: Record<Platform, string[]> = {
    Amazon: ["url_image", "image", "thumbnail"],
    Flipkart: ["thumbnail", "image", "url_image"],
    "Best Buy": ["thumbnail", "image", "url_image", "img"],
    eBay: ["image", "thumbnail", "url_image", "gallery_url"],
    "Google Shopping": ["imageUrl", "image", "thumbnail"],
  };

  const fields = fieldsByPlatform[platform] ?? [
    "image",
    "thumbnail",
    "url_image",
  ];

  for (const field of fields) {
    const v = String(d[field] ?? "").trim();
    if (v.startsWith("http") && !v.includes("favicon")) return v;
  }

  // Try images array
  if (Array.isArray(d.images) && d.images.length > 0) {
    const v = String(d.images[0]).trim();
    if (v.startsWith("http")) return v;
  }

  return "";
}

// ── Parse single item ──────────────────────────────────────────────────────────
function parseItem(item: unknown, platform: Platform): Product | null {
  if (!item || typeof item !== "object") return null;
  const d = item as Record<string, unknown>;

  const title = String(d.title ?? d.name ?? d.product_name ?? "").trim();
  if (!title) return null;

  const price = cleanPrice(
    d.price ?? d.price_str ?? d.price_upper ?? d.sale_price ?? d.min_price,
  );
  const rating = cleanFloat(
    d.rating ?? d.score ?? d.stars ?? d.customer_rating,
  );
  const reviews = cleanInt(
    d.reviews_count ??
      d.reviews ??
      d.ratings_total ??
      d.review_count ??
      d.num_reviews ??
      d.rating_count,
  );
  const url = fixUrl(d.url ?? d.link ?? d.product_url ?? d.pdp_url, platform);
  const image = extractImage(d, platform);

  if (process.env.NODE_ENV === "development") {
    // Log first item per platform to help diagnose field names
    if ((d as Record<string, unknown>).__logged !== true) {
      (d as Record<string, unknown>).__logged = true;
    }
  }

  return {
    id: `${platform}-${Math.random().toString(36).slice(2, 10)}`,
    title,
    price,
    currency: "USD",
    rating,
    reviews,
    url,
    image,
    platform,
    score: 0,
  };
}

// ── Fetch one platform with 40s timeout ───────────────────────────────────────
async function fetchOnePlatform(
  platform: Platform,
  source: string,
  geo: string,
  query: string,
): Promise<{ products: Product[]; error?: string }> {
  if (!USERNAME || !PASSWORD) {
    return {
      products: [],
      error: "OXY_USERNAME / OXY_PASSWORD not set in .env.local",
    };
  }

  const auth = Buffer.from(`${USERNAME}:${PASSWORD}`).toString("base64");

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 40_000);

    const res = await fetch(OXY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({ source, query, parse: true, geo_location: geo }),
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return {
        products: [],
        error: `HTTP ${res.status}: ${text.slice(0, 200)}`,
      };
    }

    const raw = await res.json();
    const organic = extractOrganic(raw);

    if (process.env.NODE_ENV === "development" && organic.length > 0) {
      const first = organic[0] as Record<string, unknown>;
      console.log(
        `[Oxylabs:${platform}] keys: ${Object.keys(first).join(", ")}`,
      );
      console.log(
        `[Oxylabs:${platform}] url="${first.url}" image="${first.url_image ?? first.thumbnail ?? first.image}"`,
      );
    }

    const products = organic
      .slice(0, 10)
      .map((item) => parseItem(item, platform))
      .filter((p): p is Product => p !== null);

    return { products };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return {
      products: [],
      error: msg.toLowerCase().includes("abort")
        ? "Timeout after 40s"
        : msg.slice(0, 200),
    };
  }
}

// ── Public: all platforms in parallel ─────────────────────────────────────────
export async function fetchAllPlatforms(query: string): Promise<{
  products: Product[];
  errors: Record<string, string>;
}> {
  const settled = await Promise.all(
    SOURCES.map(({ platform, source, geo }) =>
      fetchOnePlatform(platform, source, geo, query),
    ),
  );

  const products: Product[] = [];
  const errors: Record<string, string> = {};

  settled.forEach((result, i) => {
    const { platform } = SOURCES[i];
    if (result.error && result.products.length === 0) {
      errors[platform] = result.error;
    }
    products.push(...result.products);
  });

  return { products, errors };
}
