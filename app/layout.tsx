import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "ElectroFind — AI Electronics Price Comparison",
  description:
    "Compare electronics prices across Amazon, Flipkart, Best Buy, eBay and Google Shopping. Ranked by our AI Buy Score.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-zinc-50">
        <Navbar />
        <div className="flex flex-col min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
