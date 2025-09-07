/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";

/**
 * Keep Edge runtime for Cloudflare Pages compatibility.
 * Even though posts are statically generated, this avoids past build-time errors
 * if the route ever needs dynamic behavior.
 */
export const runtime = "edge";

/** ✅ Static generation + ISR (24h) */
export const revalidate = 86400; // seconds

/** ✅ Pre-render all post slugs at build time */
export async function generateStaticParams() {
  return allPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Post not found" };

  // Use absolute URLs for SEO
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

export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      {/* If you want the date back, uncomment: */}
      {/* <p className="text-gray-600">{new Date(post.date).toLocaleDateString()}</p> */}
      <article className="prose prose-neutral">
        <div
          dangerouslySetInnerHTML={{ __html: (post as any).body.html }}
        />
      </article>
    </main>
  );
}
