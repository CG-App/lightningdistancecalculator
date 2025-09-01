import createMDX from '@next/mdx'
import { withContentlayer } from 'next-contentlayer'

import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
  },
})

export default withContentlayer(
  withMDX({
    pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  })
)
