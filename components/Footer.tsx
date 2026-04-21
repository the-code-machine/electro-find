import Link from "next/link";
import { Zap, Link2, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-950">
              <Zap className="h-3.5 w-3.5 text-orange-500" fill="#F97316" />
            </div>
            <span className="text-base font-extrabold tracking-tight text-zinc-950">
              Electro<span className="text-orange-500">Find</span>
            </span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-5 text-sm font-medium text-zinc-500">
            <Link
              href="/#about"
              className="hover:text-zinc-900 transition-colors"
            >
              About
            </Link>
            <Link
              href="/#team"
              className="hover:text-zinc-900 transition-colors"
            >
              Team
            </Link>
            <Link
              href="/search"
              className="hover:text-zinc-900 transition-colors"
            >
              Search
            </Link>
            <Link
              href="/docs"
              className="hover:text-zinc-900 transition-colors"
            >
              Documentation
            </Link>
          </nav>

          {/* Social */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 transition-colors hover:border-zinc-300 hover:text-zinc-900"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 transition-colors hover:border-zinc-300 hover:text-zinc-900"
            >
              <Link2 className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-zinc-100 pt-6 text-center text-xs text-zinc-400">
          © {new Date().getFullYear()} ElectroFind · Built by Leena, Prachi &
          Anu · AI-Powered Electronics Comparison
        </div>
      </div>
    </footer>
  );
}
