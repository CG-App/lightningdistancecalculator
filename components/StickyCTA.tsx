// components/StickyCTA.tsx
"use client";

import Link from "next/link";
import Image from "next/image";

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
          {/* Logo scales with CTA bar */}
          <Link
            href="/"
            className="shrink-0 flex items-center"
            aria-label="Go to calculator home"
          >
            <div className="relative h-7 w-7 sm:h-9 sm:w-9">
              <Image
                src="/logo/LightningDistanceCalculator_Logo_Header.png"
                alt="Lightning Distance Calculator Logo"
                fill
                sizes="(min-width: 640px) 36px, 28px"
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Headline: hidden on small screens to keep it uncluttered */}
          <div className="flex-1 min-w-0 hidden sm:block">
            <p className="font-medium leading-tight truncate text-sm">
              Calculate Lightning Distance In Seconds
            </p>
          </div>

          {/* Primary action */}
          <Link
            href="/"
            className="
              ml-auto
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
