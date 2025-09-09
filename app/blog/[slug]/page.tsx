// app/blog/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";
import JsonLd from "@/components/json-ld";

/** ✅ Revalidate blog pages every 24h (ISR) */
export const revalidate = 86400;

/** ✅ Pre-render all post slugs at build time */
export function generateStaticParams() {
  return allPosts.map((p) => ({ slug: p.slug }));
}

/** Helper to safely read slug from Next’s generated PageProps without typing conflicts */
function getSlug(input: unknown): string | undefined {
  const maybe = input as { params?: { slug?: string } } | undefined;
  return maybe?.params?.slug;
}

const BASE_URL = "https://lightningdistancecalculator.com";

export function generateMetadata(input: unknown): Metadata {
  const slug = getSlug(input);
  const post = allPosts.find((p) => p.slug === slug);

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
    twitter: {
      card: "summary",
      title: post.title,
      description: post.description,
    },
  };
}

export default function BlogPostPage(input: unknown) {
  const slug = getSlug(input);
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const canonical = `${BASE_URL}${post.url}`;
  const published = (post as any).date ?? new Date().toISOString();
  const modified = (post as any).date ?? published;

  // ✅ Structured data (Article + Breadcrumb)
  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: canonical },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.description,
      datePublished: published,
      dateModified: modified,
      mainEntityOfPage: canonical,
      author: { "@type": "Organization", name: "Lightning Distance Calculator" },
      publisher: {
        "@type": "Organization",
        name: "Lightning Distance Calculator",
        logo: {
          "@type": "ImageObject",
          url: `${BASE_URL}/favicon.ico`,
        },
      },
    },
  ];

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      {/* JSON-LD */}
      <JsonLd data={ld} />

      <h1 className="text-2xl font-bold">{post.title}</h1>
      <article className="prose prose-neutral">
        <div
          dangerouslySetInnerHTML={{
            __html: (post.body.html as unknown as string) ?? "",
          }}
        />
      </article>
    </main>
  );
}
