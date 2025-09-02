// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
var Post = defineDocumentType(() => ({
  name: "Post",
  // You can keep .mdx extension if you like; we'll parse as Markdown, not MDX runtime
  filePathPattern: `**/*.mdx`,
  contentType: "markdown",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    date: { type: "date", required: true },
    updated: { type: "date" },
    slug: { type: "string", required: true }
  },
  computedFields: {
    url: { type: "string", resolve: (p) => `/blog/${p.slug}` }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content/posts",
  documentTypes: [Post],
  // Use the markdown pipeline (not mdx) to output HTML we can render on the server
  markdown: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings]
  },
  // Optional: silence the alias warning
  disableImportAliasWarning: true
});
export {
  Post,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-NJAI2SE7.mjs.map
