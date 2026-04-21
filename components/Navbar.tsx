"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Menu, X, Search, FileText, Users, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/#about", label: "About", icon: Info },
  { href: "/docs", label: "Documentation", icon: FileText },
  { href: "/#team", label: "Team", icon: Users },
  { href: "/search", label: "Search", icon: Search },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-zinc-200 shadow-sm"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-950 transition-transform group-hover:scale-105">
            <Zap className="h-4 w-4 text-orange-500" fill="#F97316" />
          </div>
          <span className="text-lg font-extrabold tracking-tight text-zinc-950">
            Electro<span className="text-orange-500">Find</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map(({ href, label }) => {
            const active =
              pathname === href ||
              (href === "/search" && pathname.startsWith("/search"));
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "relative px-4 py-2 rounded-lg text-sm font-semibold transition-colors",
                  active
                    ? "text-zinc-950"
                    : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100",
                )}
              >
                {label}
                {active && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-orange-500"
                  />
                )}
              </Link>
            );
          })}

          {/* CTA */}
          <Link
            href="/search"
            className="ml-4 flex items-center gap-1.5 rounded-lg bg-zinc-950 px-4 py-2 text-sm font-bold text-white transition-all hover:bg-zinc-800 active:scale-95"
          >
            <Search className="h-3.5 w-3.5" />
            Compare Now
          </Link>
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden border-b border-zinc-200 bg-white md:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-3">
              {NAV_LINKS.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-100"
                >
                  <Icon className="h-4 w-4 text-zinc-400" />
                  {label}
                </Link>
              ))}
              <div className="mt-2 border-t border-zinc-100 pt-2">
                <Link
                  href="/search"
                  className="flex items-center justify-center gap-2 rounded-lg bg-zinc-950 py-2.5 text-sm font-bold text-white"
                >
                  <Search className="h-4 w-4" />
                  Compare Now
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
