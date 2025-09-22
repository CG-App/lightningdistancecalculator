// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: false },
    // ✅ Date is optional now (evergreen posts build fine)
    date: { type: "date", required: false },
    updated: { type: "date", required: false },
    slug: { type: "string", required: true },
    // ✅ Allow author + tags without errors
    author: { type: "string", required: false },
    tags: { type: "list", of: { type: "string" }, required: false },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) =>
        doc._raw.flattenedPath.split("/").pop() ?? doc._raw.flattenedPath,
    },
    publishedAt: {
      type: "string",
      resolve: (doc) =>
        doc.date ? new Date(doc.date).toISOString() : "",
    },
    url: {
      type: "string",
      resolve: (doc) =>
        `https://lightningdistancecalculator.com/blog/${doc._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({
  contentDirPath: "content/posts",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap" }],
    ],
  },
  disableImportAliasWarning: true,
});
