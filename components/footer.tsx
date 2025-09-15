// components/footer.tsx
"use client";

import Link from "next/link";

const links = [
  { href: "/", label: "Calculator" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/faqs", label: "FAQs" },
  { href: "/feedback", label: "Feedback" },
  { href: "/blog", label: "Blog" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="mt-16 border-t border-zinc-800 bg-black text-white"
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-6xl px-4 py-8">
        <nav aria-label="Footer navigation">
          {/* Column on very small screens; row (wrapping) from sm and up */}
          <ul className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-3 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="hover:opacity-90 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="mt-6 text-center text-xs text-zinc-400">
          © {year} Lightning Distance Calculator. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
