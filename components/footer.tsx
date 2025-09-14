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
      className="mt-16 border-t border-zinc-200 dark:border-zinc-800"
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-6xl px-4 py-8">
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-zinc-600 dark:text-zinc-400">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="hover:text-zinc-900 dark:hover:text-zinc-100 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="mt-6 text-xs text-zinc-500 dark:text-zinc-500">
          © {year} Lightning Distance Calculator. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
