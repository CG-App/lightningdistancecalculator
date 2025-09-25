"use client";

// components/author-bio.tsx
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function AuthorBio() {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      className="mt-12 rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 p-6 bg-white/60 dark:bg-black/40 backdrop-blur text-left"
    >
      <div className="space-y-4">
        {/* Row 1: avatar + heading */}
        <div className="flex items-center gap-3">
          {!imgError ? (
            <Image
              src="/images/author.jpg"
              alt="Colton"
              width={60}
              height={60}
              sizes="60px"
              priority // preload to reduce CLS on first view
              className="rounded-full object-cover ring-1 ring-zinc-200/70 dark:ring-zinc-800/70 block"
              onError={() => setImgError(true)}
            />
          ) : (
            <div
              className="flex items-center justify-center w-[60px] h-[60px] rounded-full ring-1 ring-zinc-200/70 dark:ring-zinc-800/70 text-lg font-semibold select-none"
              style={{ background: "var(--background)", color: "var(--foreground)" }}
              aria-hidden="true"
            >
              C
            </div>
          )}

          <h3 className="text-lg font-semibold tracking-tight !mt-0 !mb-0">
            About The Author
          </h3>
        </div>

        {/* Row 2: description */}
        <div className="space-y-2">
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300 !mt-0">
            Hi, my name is <strong>Colton</strong> I am the creator of{" "}
            <Link
              href="/"
              className="underline underline-offset-4"
            >
              LightningDistanceCalculator.com
            </Link>
            , a site born from my lifelong fascination with thunder & lightning.
            Inspired by childhood evenings spent storm watching and firsthand
            encounters with lightnings power, I built this tool to help others
            track strikes with clarity and ease. When I am not coding, you will
            often find me outdoors camping, hiking, or fishing.
          </p>
          <p className="text-sm !mt-0">
            <Link href="/author" className="underline underline-offset-4">
              Read more about me →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
