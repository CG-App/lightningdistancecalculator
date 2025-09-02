import { allPosts } from "contentlayer/generated"
import MdxContent from "@/components/mdx-content" // or "../../components/mdx-content" if alias fails

export const dynamic = "force-static" // build as SSG

export function generateStaticParams() {
  return allPosts.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = allPosts.find((p) => p.slug === params.slug)!
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

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = allPosts.find((p) => p.slug === params.slug)
  if (!post) return null

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="text-gray-600">{new Date(post.date).toLocaleDateString()}</p>
      <article className="prose prose-neutral">
        <MdxContent code={post.body.code} />
      </article>
    </main>
  )
}
