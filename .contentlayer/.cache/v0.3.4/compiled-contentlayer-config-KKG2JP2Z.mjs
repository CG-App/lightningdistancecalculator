// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
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
  documentTypes: [Post]
});
export {
  Post,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-KKG2JP2Z.mjs.map
