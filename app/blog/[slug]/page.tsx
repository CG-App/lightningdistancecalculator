/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";
import JsonLd from "@/components/json-ld";

const BASE_URL = "https://lightningdistancecalculator.com";

/** ✅ Build-time SSG + daily revalidation */
export const revalidate = 86400;

/** ✅ Pre-render all post slugs at build time */
export function generateStaticParams() {
  return allPosts.map((p) => ({ slug: p.slug }));
}

/** ✅ SEO metadata with canonical + OpenGraph */
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = allPosts.find((p) => p.slug === params.slug);
  if (!post) return { title: "Post not found" };

  const canonical = `${BASE_URL}${post.url}`;

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: canonical,
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = allPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const url = `${BASE_URL}${post.url}`;
  const published = post.date ? new Date(post.date).toISOString() : undefined;

  // ✅ Breadcrumb JSON-LD
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  // ✅ Article JSON-LD
  const articleLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: published,
    dateModified: published,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Organization", name: "Lightning Distance Calculator" },
    publisher: {
      "@type": "Organization",
      name: "Lightning Distance Calculator",
      logo: { "@type": "ImageObject", url: `${BASE_URL}/favicon.ico` },
    },
  };

  // Optional hero image if your Contentlayer schema supports it
  if ((post as any).image) {
    (articleLd as any).image = `${BASE_URL}${(post as any).image}`;
  }

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      {/* JSON-LD injection */}
      <JsonLd data={[breadcrumbLd, articleLd]} />

      <h1 className="text-2xl font-bold">{post.title}</h1>
      {/* <p className="text-gray-600">{new Date(post.date).toLocaleDateString()}</p> */}
      <article
        className="prose prose-neutral"
        dangerouslySetInnerHTML={{ __html: (post as any).body.html as string }}
      />
    </main>
  );
}
