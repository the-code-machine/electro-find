"use client";

import { AlertTriangle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Props {
  errors: Record<string, string>;
}

export function ErrorBanner({ errors }: Props) {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const visible = Object.entries(errors).filter(([k]) => !dismissed.has(k));

  if (visible.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <AnimatePresence>
        {visible.map(([platform, msg]) => (
          <motion.div
            key={platform}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3"
          >
            <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
            <div className="flex-1 min-w-0">
              <span className="text-sm font-semibold text-red-700">
                {platform} unavailable
              </span>
              <span className="text-sm text-red-600"> — </span>
              <span className="text-sm text-red-500 break-all">
                {msg.slice(0, 160)}
              </span>
            </div>
            <button
              onClick={() =>
                setDismissed((prev) => new Set([...prev, platform]))
              }
              className="flex-shrink-0 rounded-md p-0.5 text-red-400 hover:bg-red-100 hover:text-red-600 transition-colors"
              aria-label={`Dismiss ${platform} error`}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
