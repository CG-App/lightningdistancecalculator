import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";

// ✅ Static generation + ISR (24h)
export const revalidate = 86400; // seconds

// ✅ Pre-render all post slugs at build time
export async function generateStaticParams() {
  return allPosts.map((p) => ({ slug: p.slug }));
}

type PageProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = allPosts.find((p) => p.slug === params.slug);
  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: post.url },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: post.url,
    },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = allPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      {/* If you want the date back, uncomment: */}
      {/* <p className="text-gray-600">{new Date(post.date).toLocaleDateString()}</p> */}
      <article
        className="prose prose-neutral"
        dangerouslySetInnerHTML={{ __html: post.body.html as unknown as string }}
      />
    </main>
  );
}
