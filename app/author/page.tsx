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
    name: "Colton",
    url: "https://lightningdistancecalculator.com/author",
    sameAs: [
      // Add profile URLs here (Twitter, LinkedIn, GitHub, etc.)
      // "https://twitter.com/yourhandle",
    ],
  };

  return (
    <main className="content">
      <JsonLd data={authorLd} />

      <h1>About The Author</h1>

      <p>
        I’m <strong>Colton</strong>, a weather-safety enthusiast and builder of simple,
        reliable calculators. My goal is to make storm awareness tools fast, accurate,
        and easy to use.
      </p>
      <p>
        On this site I share practical advice, research notes, and product updates that
        help you use the Lightning Distance Calculator effectively.
      </p>

      {/* Optional: add socials or contact */}
      {/* <p>Follow on X … | Email …</p> */}
    </main>
  );
}
