'use client';

import { useTranslations } from 'next-intl';
import { BlogCard } from './blog-card';

type Post = {
  title: string;
  description: string;
  slug: string;
  date: string;
  author: string;
  category: string;
  image?: string;
};

type RelatedArticlesProps = {
  posts: Post[];
};

export function RelatedArticles({ posts }: RelatedArticlesProps) {
  const t = useTranslations('BlogPage');

  if (posts.length === 0) return null;

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
          {t('relatedArticles')}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {posts.map((post) => (
            <BlogCard
              key={post.slug}
              title={post.title}
              description={post.description}
              slug={post.slug}
              date={post.date}
              author={post.author}
              category={post.category}
              image={post.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
