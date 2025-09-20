// app/blog/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";
import type { Post } from "contentlayer/generated";
import JsonLd from "@/components/json-ld";
import AuthorBio from "@/components/author-bio";

/** Static generation + ISR (24h) */
export const revalidate = 86400;

/** Pre-render all post slugs at build time */
export function generateStaticParams() {
  return allPosts.map((p) => ({ slug: p.slug }));
}

/** Helper to safely extract params.slug without using `any` */
function getSlug(input: unknown): string | undefined {
  const maybe = input as { params?: { slug?: string } } | undefined;
  return maybe?.params?.slug;
}

export function generateMetadata(input: unknown): Metadata {
  const slug = getSlug(input);
  const post = allPosts.find((p): p is Post => p.slug === slug);

  if (!post) return { title: "Post not found" };

  const canonical = `https://lightningdistancecalculator.com${post.url}`;

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

export default function BlogPostPage(input: unknown) {
  const slug = getSlug(input);
  const post = allPosts.find((p): p is Post => p.slug === slug);
  if (!post) notFound();

  const canonical = `https://lightningdistancecalculator.com${post.url}`;

  const articleSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    mainEntityOfPage: canonical,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: "Colton",
      url: "https://lightningdistancecalculator.com/author",
    },
    publisher: {
      "@type": "Organization",
      name: "Lightning Distance Calculator",
      logo: {
        "@type": "ImageObject",
        url: "https://lightningdistancecalculator.com/favicon.ico",
      },
    },
  };

  const html = String((post.body as { html?: unknown })?.html ?? "");

  return (
    <main className="content">
      <JsonLd data={articleSchema} />

      <h1>{post.title}</h1>

      {/* <p>{new Date(post.date).toLocaleDateString()}</p> */}

      <article dangerouslySetInnerHTML={{ __html: html }} />

      {/* Author bio at the bottom */}
      <AuthorBio />
    </main>
  );
}
