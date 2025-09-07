import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";

/** ✅ Static generation + ISR (24h) */
export const revalidate = 86400; // seconds

/** ✅ Pre-render all post slugs at build time */
export function generateStaticParams() {
  return allPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata(props: any): Metadata {
  const slug = props?.params?.slug as string | undefined;
  const post = allPosts.find((p) => p.slug === slug);
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

export default function BlogPostPage(props: any) {
  const slug = props?.params?.slug as string | undefined;
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      {/* <p className="text-gray-600">{new Date(post.date).toLocaleDateString()}</p> */}
      <article className="prose prose-neutral">
        <div
          dangerouslySetInnerHTML={{
            __html: post.body.html as unknown as string,
          }}
        />
      </article>
    </main>
  );
}
