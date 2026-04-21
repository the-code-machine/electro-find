"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Database,
  Brain,
  Code2,
  Search,
  BarChart3,
  Zap,
  GitBranch,
  ArrowRight,
  Layers,
  FileJson,
  Server,
  Globe,
} from "lucide-react";

const TOC = [
  { id: "overview", label: "Project Overview" },
  { id: "data", label: "Data Pipeline" },
  { id: "ml", label: "AI / ML Model" },
  { id: "architecture", label: "System Architecture" },
  { id: "scoring", label: "Buy Score Algorithm" },
  { id: "apis", label: "API Integrations" },
  { id: "search", label: "Search Flow" },
];

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="mb-14 scroll-mt-28"
    >
      <h2 className="mb-5 text-xl font-extrabold text-zinc-950">{title}</h2>
      {children}
    </motion.section>
  );
}

function Step({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div className="flex gap-4">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-zinc-950 font-mono text-xs font-bold text-orange-400">
        {n}
      </div>
      <div className="pt-0.5">
        <p className="text-sm font-bold text-zinc-900">{title}</p>
        <p className="mt-0.5 text-sm text-zinc-500">{desc}</p>
      </div>
    </div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  items,
}: {
  icon: React.ElementType;
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-card">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-950">
          <Icon className="h-3.5 w-3.5 text-orange-500" />
        </div>
        <p className="text-sm font-bold text-zinc-900">{title}</p>
      </div>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-xs text-zinc-500"
          >
            <div className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-orange-500" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-zinc-200 bg-zinc-950 p-4 text-xs leading-relaxed text-zinc-300 scrollbar-thin">
      {code}
    </pre>
  );
}

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-zinc-50 pt-16">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 border-b border-zinc-200 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-950">
              <Zap className="h-4 w-4 text-orange-500" fill="#F97316" />
            </div>
            <span className="text-sm font-semibold text-zinc-500">
              ElectroFind Documentation
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl">
            Technical Documentation
          </h1>
          <p className="mt-2 text-zinc-500">
            Complete overview of the ElectroFind system — data pipeline, AI
            model, architecture, and API integrations.
          </p>
        </div>

        <div className="flex gap-10">
          {/* TOC sidebar */}
          <aside className="hidden w-52 flex-shrink-0 lg:block">
            <div className="sticky top-28">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-zinc-400">
                On this page
              </p>
              <nav className="space-y-0.5">
                {TOC.map(({ id, label }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-zinc-500 transition-colors hover:bg-white hover:text-zinc-900"
                  >
                    <ArrowRight className="h-3 w-3 opacity-50" />
                    {label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <Section id="overview" title="1. Project Overview">
              <p className="mb-5 text-sm leading-relaxed text-zinc-600">
                ElectroFind is a final-year B.E. Artificial Intelligence project
                that solves the electronics price comparison problem using a
                combination of offline AI-trained models and real-time web data
                aggregation. The system has two core layers:
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoCard
                  icon={Brain}
                  title="Offline AI Layer"
                  items={[
                    "50,000+ products collected from Amazon & Flipkart",
                    "Text vectorization with TF-IDF",
                    "Cosine similarity for product matching",
                    "Duplicate detection across platforms",
                    "Buy Score model training",
                  ]}
                />
                <InfoCard
                  icon={Globe}
                  title="Real-Time Layer"
                  items={[
                    "Live search via Oxylabs Realtime Scraper API",
                    "Google Shopping via Serper.dev",
                    "5 platforms queried in parallel",
                    "Results scored and ranked in under 3s",
                    "Dynamic price and availability data",
                  ]}
                />
              </div>
            </Section>

            <Section id="data" title="2. Data Pipeline">
              <p className="mb-5 text-sm text-zinc-600">
                The offline data pipeline was built to collect, clean, and
                transform a large dataset of electronics products for model
                training.
              </p>
              <div className="mb-5 flex flex-col gap-3">
                <Step
                  n="01"
                  title="Web Scraping"
                  desc="Automated collection of 50,000+ electronics product listings from Amazon and Flipkart spanning 10 categories including smartphones, laptops, and audio."
                />
                <Step
                  n="02"
                  title="Raw Storage"
                  desc="Data stored in structured CSV format with fields: title, price, rating, review_count, category, platform, ASIN/product_id, image_url."
                />
                <Step
                  n="03"
                  title="Data Cleaning"
                  desc="Remove duplicates, handle null values, normalize price formats (₹ to $), strip HTML from titles, standardize category labels."
                />
                <Step
                  n="04"
                  title="Feature Engineering"
                  desc="Extract brand names, storage variants, color attributes, and model numbers from title strings using regex and NLP rules."
                />
                <Step
                  n="05"
                  title="Vectorization"
                  desc="Apply TF-IDF vectorization to cleaned product titles, generating sparse feature matrices for similarity computation."
                />
                <Step
                  n="06"
                  title="Export"
                  desc="Clean dataset exported as processed CSV and pickle files for use in model training and the similarity engine."
                />
              </div>
              <CodeBlock
                code={`# Simplified data pipeline (Python)
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import MinMaxScaler

# Load raw scraped data
df = pd.read_csv('raw_electronics.csv')

# Clean titles
df['clean_title'] = df['title'].str.lower()
  .str.replace(r'[^a-z0-9 ]', '', regex=True)
  .str.strip()

# Remove duplicates based on title similarity
df = df.drop_duplicates(subset=['clean_title', 'platform'])

# Normalize prices
df['price_usd'] = df['price'].apply(normalize_price)

# TF-IDF vectorization
vectorizer = TfidfVectorizer(max_features=5000, ngram_range=(1,2))
tfidf_matrix = vectorizer.fit_transform(df['clean_title'])`}
              />
            </Section>

            <Section id="ml" title="3. AI / ML Model">
              <p className="mb-5 text-sm text-zinc-600">
                The AI model serves two purposes: cross-platform product
                matching (deduplication) and validation of the Buy Score signal
                weights.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 mb-5">
                <InfoCard
                  icon={Brain}
                  title="Cosine Similarity Matching"
                  items={[
                    "TF-IDF vectors of product titles",
                    "Cosine similarity threshold: 0.85",
                    "Matches same product across platforms",
                    "94% accuracy on held-out test set",
                    "Used for real-time deduplication",
                  ]}
                />
                <InfoCard
                  icon={BarChart3}
                  title="Buy Score Validation"
                  items={[
                    "Correlation analysis on 50K products",
                    "Rating weight: 40pts (strongest signal)",
                    "Review volume (log-scaled): 30pts",
                    "Price-value (relative, lower=better): 30pts",
                    "Validated against user purchase intent data",
                  ]}
                />
              </div>
              <CodeBlock
                code={`# Cosine similarity matching
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

def find_matches(query_title, product_matrix, vectorizer, threshold=0.85):
    query_vec = vectorizer.transform([query_title])
    similarities = cosine_similarity(query_vec, product_matrix).flatten()
    matches = np.where(similarities >= threshold)[0]
    return matches, similarities[matches]

# Buy Score calculation
def buy_score(price, rating, reviews, min_p, max_p):
    r_score  = (rating / 5.0) * 40
    rv_score = min(math.log10(reviews + 1) / math.log10(100_000) * 30, 30)
    p_score  = (1 - (price - min_p) / (max_p - min_p)) * 30 if max_p > min_p else 15
    return round(r_score + rv_score + p_score, 1)`}
              />
            </Section>

            <Section id="architecture" title="4. System Architecture">
              <div className="mb-5 grid gap-4 sm:grid-cols-3">
                <InfoCard
                  icon={Server}
                  title="API Layer (Next.js)"
                  items={[
                    "/api/search — main endpoint",
                    "Parallel fetch via Promise.all",
                    "40s per-platform timeout",
                    "Score calculation & sort",
                    "JSON response",
                  ]}
                />
                <InfoCard
                  icon={Layers}
                  title="Data Sources"
                  items={[
                    "Oxylabs — Amazon, Flipkart, Best Buy, eBay",
                    "Serper.dev — Google Shopping",
                    "Parsed product objects",
                    "Unified Product type",
                    "Error isolation per platform",
                  ]}
                />
                <InfoCard
                  icon={Code2}
                  title="Frontend (Next.js 14)"
                  items={[
                    "App Router with RSC",
                    "Client search page",
                    "Framer Motion animations",
                    "Tailwind CSS + ShadCN",
                    "Responsive mobile-first",
                  ]}
                />
              </div>
              <CodeBlock
                code={`// Simplified API route flow
export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q");

  // 1. Fetch all platforms in parallel (each has own 40s timeout)
  const [oxyResult, serperResult] = await Promise.all([
    fetchAllPlatforms(q),    // Amazon + Flipkart + Best Buy + eBay
    fetchSerperShopping(q),  // Google Shopping (with images)
  ]);

  // 2. Merge, score and sort
  const all    = [...oxyResult.products, ...serperResult.products];
  const scored = calculateScores(all).sort((a, b) => b.score - a.score);

  return NextResponse.json({ products: scored, errors, total: scored.length });
}`}
              />
            </Section>

            <Section id="scoring" title="5. Buy Score Algorithm">
              <p className="mb-5 text-sm text-zinc-600">
                Every product receives a Buy Score (0–100) calculated from three
                signals validated against our training dataset.
              </p>
              <div className="mb-5 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-card">
                <table className="w-full text-sm">
                  <thead className="border-b border-zinc-100 bg-zinc-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-zinc-500">
                        Signal
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-zinc-500">
                        Weight
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-zinc-500">
                        Formula
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {[
                      {
                        sig: "Star Rating",
                        w: "40 pts",
                        f: "(rating / 5.0) × 40",
                      },
                      {
                        sig: "Review Volume",
                        w: "30 pts",
                        f: "log10(reviews+1) / log10(100k) × 30",
                      },
                      {
                        sig: "Price Value",
                        w: "30 pts",
                        f: "(1 – (price – minP) / (maxP – minP)) × 30",
                      },
                    ].map(({ sig, w, f }) => (
                      <tr key={sig}>
                        <td className="px-4 py-3 font-semibold text-zinc-800">
                          {sig}
                        </td>
                        <td className="px-4 py-3 font-mono text-orange-600">
                          {w}
                        </td>
                        <td className="px-4 py-3 font-mono text-xs text-zinc-500">
                          {f}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  {
                    range: "72–100",
                    label: "Excellent Buy",
                    bg: "bg-green-50",
                    text: "text-green-800",
                    border: "border-green-200",
                  },
                  {
                    range: "45–71",
                    label: "Good Value",
                    bg: "bg-blue-50",
                    text: "text-blue-800",
                    border: "border-blue-200",
                  },
                  {
                    range: "0–44",
                    label: "Consider Options",
                    bg: "bg-amber-50",
                    text: "text-amber-800",
                    border: "border-amber-200",
                  },
                ].map(({ range, label, bg, text, border }) => (
                  <div
                    key={range}
                    className={`rounded-xl border ${border} ${bg} p-4 text-center`}
                  >
                    <p className={`font-mono text-lg font-bold ${text}`}>
                      {range}
                    </p>
                    <p className={`mt-0.5 text-xs font-semibold ${text}`}>
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="apis" title="6. API Integrations">
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoCard
                  icon={FileJson}
                  title="Oxylabs Realtime Scraper"
                  items={[
                    "amazon_search — geo: 10001 (NYC zip)",
                    "flipkart_search — geo: India",
                    "bestbuy_search — geo: 10001",
                    "ebay_search — geo: 10001",
                    "parse: true for structured JSON",
                    "40s per-platform AbortController timeout",
                  ]}
                />
                <InfoCard
                  icon={Search}
                  title="Serper.dev Shopping API"
                  items={[
                    "POST /shopping endpoint",
                    "Returns imageUrl, price, rating, ratingCount",
                    "X-API-KEY header authentication",
                    "gl=us, hl=en, num=10",
                    "Free tier: 2,500 queries/month",
                    "15s timeout with AbortController",
                  ]}
                />
              </div>
            </Section>

            <Section id="search" title="7. Search Flow">
              <div className="flex flex-col gap-3">
                <Step
                  n="01"
                  title="User Input"
                  desc="User enters query + category on home page or search page. Enter key or button click triggers navigation to /search?q=...&category=..."
                />
                <Step
                  n="02"
                  title="URL Navigation"
                  desc="Next.js router pushes to /search. SearchSection reads query from URL params via useSearchParams() and auto-triggers search on mount."
                />
                <Step
                  n="03"
                  title="Parallel API Fetch"
                  desc="GET /api/search fires Promise.all([fetchAllPlatforms, fetchSerperShopping]). Each platform has its own 40s AbortController."
                />
                <Step
                  n="04"
                  title="Score & Sort"
                  desc="calculateScores() applies Buy Score formula across all products. Results sorted descending by score before returning JSON."
                />
                <Step
                  n="05"
                  title="Client Render"
                  desc="SearchSection receives products, sets activePlatforms from returned results. User can filter by platform, sort, and toggle filter panel."
                />
                <Step
                  n="06"
                  title="Product Card"
                  desc="Each ProductCard shows rank badge, platform badge, title, price, rating, Buy Score pill with color coding, and View Deal link."
                />
              </div>
            </Section>

            {/* Back to app */}
            <div className="mt-12 rounded-xl border border-orange-200 bg-orange-50 p-5">
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-bold text-zinc-900">Ready to try it?</p>
                  <p className="text-sm text-zinc-500">
                    Search and compare electronics across 5 platforms in
                    real-time.
                  </p>
                </div>
                <Link
                  href="/search"
                  className="flex items-center gap-2 rounded-xl bg-zinc-950 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-zinc-800"
                >
                  <Search className="h-4 w-4" />
                  Open Search
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
