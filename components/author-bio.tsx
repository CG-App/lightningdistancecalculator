"use client";

// components/author-bio.tsx
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function AuthorBio() {
  const [imgError, setImgError] = useState(false);

  return (
    <section className="mt-12 rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 p-6 bg-white/60 dark:bg-black/40 backdrop-blur">
      <div className="space-y-4">
        {/* Row 1: avatar + heading */}
        <div className="flex items-center gap-3">
          {!imgError ? (
            <Image
              src="/images/author.jpg"
              alt="Colton"
              width={60}
              height={60}
              className="rounded-full object-cover ring-1 ring-zinc-200/70 dark:ring-zinc-800/70"
              onError={() => setImgError(true)}
              priority={false}
            />
          ) : (
            <div
              className="flex items-center justify-center w-[60px] h-[60px] rounded-full ring-1 ring-zinc-200/70 dark:ring-zinc-800/70 text-lg font-semibold"
              style={{ background: "var(--background)", color: "var(--foreground)" }}
            >
              C
            </div>
          )}

          <h3 className="text-lg font-semibold tracking-tight !mt-0 !mb-0">
            About The Author
          </h3>
        </div>

        {/* Row 2: description (no top margins from global .content) */}
        <div className="space-y-2">
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300 !mt-0">
            Hi, I’m <strong>Colton</strong>, the creator of Lightning Distance Calculator.
            I write practical guides on severe weather awareness and building fast,
            user-friendly tools.
          </p>
          <p className="text-sm !mt-0">
            <Link href="/author" className="underline underline-offset-4">
              Read the full author bio →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
