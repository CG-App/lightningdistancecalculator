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

  return (
    <main className="max-w-2xl mx-auto p-6">
      {/* Inject breadcrumbs JSON-LD */}
      <JsonLd data={breadcrumbLd} />

      <h1 className="text-2xl font-bold mb-4">Blog</h1>
      <ul className="grid gap-4">
        {posts.map((p) => (
          <li key={p.slug} className="border rounded-xl p-4">
            <h2 className="text-lg font-semibold">
              <Link href={p.url} className="underline">
                {p.title}
              </Link>
            </h2>
            <p className="text-sm text-gray-600">{p.description}</p>
            {/* <small className="text-gray-500">
              {new Date(p.date).toLocaleDateString()}
            </small> */}
          </li>
        ))}
      </ul>
    </main>
  );
}
