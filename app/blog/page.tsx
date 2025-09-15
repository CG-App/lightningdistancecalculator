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
    <main className="content">
      {/* Inject breadcrumbs JSON-LD */}
      <JsonLd data={breadcrumbLd} />

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
            {/* <small>
              {new Date(p.date).toLocaleDateString()}
            </small> */}
          </li>
        ))}
      </ul>
    </main>
  );
}
