// app/blog/page.tsx
import type { Metadata } from "next";
import { allPosts } from "contentlayer/generated";
import Link from "next/link";
import JsonLd from "@/components/json-ld";

export const revalidate = 3600; // 1 hour

export const metadata: Metadata = {
  title: "Blog | Lightning Distance Calculator",
  description: "Articles about lightning, storms, and safety.",
  alternates: {
    canonical: "https://lightningdistancecalculator.com/blog",
  },
};

const BASE_URL = "https://lightningdistancecalculator.com";

export default function BlogIndexPage() {
  // ✅ Breadcrumb JSON-LD
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/blog` },
    ],
  };

  const posts = allPosts
    .slice()
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));

  // ✅ CollectionPage + ItemList JSON-LD (lists all blog posts)
  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${BASE_URL}/blog#collection`,
    url: `${BASE_URL}/blog`,
    name: "Lightning Distance Calculator Blog",
    isPartOf: {
      "@type": "WebSite",
      name: "Lightning Distance Calculator",
      url: BASE_URL,
    },
    hasPart: {
      "@type": "ItemList",
      itemListElement: posts.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${BASE_URL}${p.url}`,
        item: {
          "@type": "BlogPosting",
          headline: p.title,
          description: p.description,
          url: `${BASE_URL}${p.url}`,
          datePublished: p.date,
        },
      })),
    },
  };

  return (
    <main className="content">
      {/* Inject JSON-LD */}
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={collectionLd} />

      <h1>Blog</h1>
      <ul>
        {posts.map((p) => (
          <li key={p.slug} className="border rounded-xl p-4 mb-4">
            <h2>
              <Link href={p.url} className="hover:underline">
                {p.title}
              </Link>
            </h2>
            <p>{p.description}</p>
            {/* <small>{new Date(p.date).toLocaleDateString()}</small> */}
          </li>
        ))}
      </ul>
    </main>
  );
}
