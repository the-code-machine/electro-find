import { Suspense } from "react";
import { SearchSection } from "@/components/SearchSection";

export const metadata = {
  title: "Search — ElectroFind",
  description:
    "Search and compare electronics prices across Amazon, Flipkart, Best Buy, eBay and Google Shopping.",
};

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-200 border-t-orange-500" />
            <p className="text-sm text-zinc-400">Loading search...</p>
          </div>
        </div>
      }
    >
      <SearchSection />
    </Suspense>
  );
}
