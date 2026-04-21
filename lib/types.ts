// Removed "Google Search" — replaced with Best Buy + eBay
export type Platform =
  | "Amazon"
  | "Google Shopping"
  | "Flipkart"
  | "Best Buy"
  | "eBay";

export interface Product {
  id: string;
  title: string;
  price: number;
  currency: string;
  rating: number;
  reviews: number;
  image: string;
  url: string;
  platform: Platform;
  score: number;
  snippet?: string;
}

export interface SearchResponse {
  products: Product[];
  errors: Record<string, string>;
  query: string;
  total: number;
}

export type SortOption =
  | "score_desc"
  | "price_asc"
  | "price_desc"
  | "rating_desc"
  | "reviews_desc";

export interface PlatformConfig {
  label: string;
  color: string;
  textColor: string;
  bgColor: string;
}

export const PLATFORM_CONFIG: Record<Platform, PlatformConfig> = {
  Amazon: {
    label: "Amazon",
    color: "#E47911",
    textColor: "#FFFFFF",
    bgColor: "rgba(228,121,17,0.10)",
  },
  "Google Shopping": {
    label: "Google Shopping",
    color: "#1A73E8",
    textColor: "#FFFFFF",
    bgColor: "rgba(26,115,232,0.10)",
  },
  Flipkart: {
    label: "Flipkart",
    color: "#2874F0",
    textColor: "#FFFFFF",
    bgColor: "rgba(40,116,240,0.10)",
  },
  "Best Buy": {
    label: "Best Buy",
    color: "#0046BE",
    textColor: "#FFE000",
    bgColor: "rgba(0,70,190,0.10)",
  },
  eBay: {
    label: "eBay",
    color: "#E53238",
    textColor: "#FFFFFF",
    bgColor: "rgba(229,50,56,0.10)",
  },
};

export const CATEGORIES = [
  "All Electronics",
  "Smartphones & Mobiles",
  "Laptops & Computers",
  "Headphones & Audio",
  "Cameras & Photography",
  "Smart Watches",
  "Tablets",
  "TVs & Displays",
  "Gaming",
  "Smart Home",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_HINTS: Record<Category, string> = {
  "All Electronics": "",
  "Smartphones & Mobiles": "smartphone",
  "Laptops & Computers": "laptop",
  "Headphones & Audio": "headphones",
  "Cameras & Photography": "digital camera",
  "Smart Watches": "smartwatch",
  Tablets: "tablet",
  "TVs & Displays": "4K television",
  Gaming: "gaming console",
  "Smart Home": "smart home device",
};
