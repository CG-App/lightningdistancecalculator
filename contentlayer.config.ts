import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    date: { type: 'date', required: true },
    updated: { type: 'date' },
    slug: { type: 'string', required: true },
  },
  computedFields: {
    url: { type: 'string', resolve: (p) => `/blog/${p.slug}` },
  },
}))

export default makeSource({
  contentDirPath: 'content/posts',
  documentTypes: [Post],
})
