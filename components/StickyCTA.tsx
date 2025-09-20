"use client";

import Link from "next/link";

export default function StickyCTA() {
  return (
    <div
      role="region"
      aria-label="Lightning Distance Calculator call to action"
      className="
        fixed top-0 left-0 right-0 z-50
        bg-yellow-400 text-black
        dark:bg-yellow-300 dark:text-black
        shadow-[0_4px_20px_rgba(0,0,0,0.15)]
        h-12 sm:h-14
      "
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="mx-auto max-w-screen-lg h-full px-4">
        <div className="h-full flex items-center gap-3">
          <span className="text-base sm:text-lg">⚡</span>
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium leading-tight truncate">
              Calculate How Far Away Lightning Was
            </p>
          </div>

          <Link
            href="/"
            className="shrink-0 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold bg-black text-white
                       hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-black/40"
            aria-label="Open Lightning Distance Calculator"
          >
            Try The Calculator
          </Link>
        </div>
      </div>
    </div>
  );
}
