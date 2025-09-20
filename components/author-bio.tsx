import Link from "next/link";

export default function AuthorBio() {
  return (
    <section className="mt-12 rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 p-5 sm:p-6 bg-white/60 dark:bg-black/40 backdrop-blur">
      <div className="flex items-start gap-4">
        {/* Optional avatar: drop an image into public/images/author.jpg */}
        {/* <img src="/images/author.jpg" alt="Author" className="h-14 w-14 rounded-full object-cover" /> */}
        <div>
          <h3 className="text-lg font-semibold tracking-tight">About The Author</h3>
          <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            Hi, I’m <strong>Colton</strong>, the creator of Lightning Distance Calculator.
            I write practical guides on severe weather awareness and building fast, user-friendly tools.
          </p>
          <p className="mt-2 text-sm">
            <Link href="/author" className="underline underline-offset-4">
              Read the full author bio →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
