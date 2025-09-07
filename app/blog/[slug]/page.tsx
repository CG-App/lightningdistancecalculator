/* eslint-disable @typescript-eslint/no-explicit-any */
import { allPosts } from "contentlayer/generated"

// Render dynamically to avoid earlier build-time quirk
export const runtime = 'edge'
export const dynamic = "force-dynamic"
export const revalidate = 0

export function generateMetadata({ params }: any) {
  const post = allPosts.find((p) => p.slug === params.slug)
  if (!post) return { title: "Post not found" }
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
  }
}

export default function BlogPostPage({ params }: any) {
  const post = allPosts.find((p) => p.slug === params.slug)
  if (!post) return null

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      {/* <p className="text-gray-600">{new Date(post.date).toLocaleDateString()}</p> */}
      <article
        className="prose prose-neutral"
        dangerouslySetInnerHTML={{ __html: (post as any).body.html }}
      />
    </main>
  )
}
