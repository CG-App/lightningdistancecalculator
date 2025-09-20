// app/author/page.tsx
import type { Metadata } from "next";
import JsonLd from "@/components/json-ld";

export const metadata: Metadata = {
  title: "About the Author",
  description: "Learn more about the creator of Lightning Distance Calculator.",
};

export default function AuthorPage() {
  const authorLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Your Name",
    url: "https://lightningdistancecalculator.com/author",
    sameAs: [
      // Add profile URLs here (Twitter, LinkedIn, GitHub, etc.)
      // "https://twitter.com/yourhandle",
    ],
  };

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <JsonLd data={authorLd} />

      <h1 className="text-3xl font-bold tracking-tight">About The Author</h1>
      <div className="mt-6 space-y-4 text-zinc-700 dark:text-zinc-300 leading-relaxed">
        <p>
          I’m <strong>Colton</strong>, a weather-safety enthusiast and builder of simple,
          reliable calculators. My goal is to make storm awareness tools fast, accurate,
          and easy to use.
        </p>
        <p>
          On this site I share practical advice, research notes, and product updates that
          help you use the Lightning Distance Calculator effectively.
        </p>
        {/* Optional: contact/social links */}
        {/* <p>Follow on X … | Email …</p> */}
      </div>
    </main>
  );
}
