"use client";

import Link from "next/link";

export default function StickyCTA() {
  return (
    <div
      role="region"
      aria-label="Lightning Distance Calculator call to action"
      className="
        fixed top-0 left-0 right-0 z-50
        h-12 sm:h-14
        bg-black text-white
        dark:bg-[#cccccc] dark:text-black
        shadow-[0_4px_20px_rgba(0,0,0,0.15)]
      "
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="mx-auto max-w-screen-lg h-full px-3 sm:px-4">
        <div className="h-full flex items-center gap-2 sm:gap-3">
          <span
            aria-hidden="true"
            className="text-base sm:text-lg leading-none select-none"
          >
            ⚡
          </span>

          <div className="flex-1 min-w-0">
            <p className="font-medium leading-tight truncate text-[13px] sm:text-sm">
              <span className="hidden sm:inline">Calculate Lightning Distance In Seconds</span>
              <span className="sm:hidden">Calculate Lightning Distance</span>
            </p>
          </div>

          <Link
            href="/"
            className="
              inline-flex items-center justify-center
              rounded-md
              px-3 sm:px-3.5
              py-1.5
              text-xs sm:text-sm
              font-semibold
              bg-yellow-400 text-black
              hover:bg-yellow-300
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/50
              active:bg-yellow-500
              transition-colors
              whitespace-nowrap
              shadow-sm
            "
            aria-label="Open Lightning Distance Calculator"
          >
            Try The Calculator
          </Link>
        </div>
      </div>
    </div>
  );
}
