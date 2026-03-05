import { defineConfig, defineCollection, s } from 'velite';
import rehypeSlug from 'rehype-slug';

const posts = defineCollection({
  name: 'Post',
  pattern: 'blog/**/*.mdx',
  schema: s
    .object({
      title: s.string().max(99),
      slug: s.slug('posts'),
      description: s.string().max(200),
      date: s.isodate(),
      author: s.string(),
      authorImage: s.string().optional(),
      category: s.string(),
      image: s.string().optional(),
      locale: s.enum(['ro', 'en']),
      published: s.boolean().default(true),
      body: s.mdx(),
      raw: s.raw(),
    })
    .transform((data) => ({
      ...data,
      permalink: `/blog/${data.slug}`,
    })),
});

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: { posts },
  mdx: {
    rehypePlugins: [rehypeSlug],
    remarkPlugins: [],
  },
});
