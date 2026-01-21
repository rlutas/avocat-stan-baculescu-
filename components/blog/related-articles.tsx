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
    <section className="py-16 bg-[#f8f9fa]">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out both;
        }
      `}</style>

      <div className="container mx-auto px-4">
        <h2 className="animate-fade-in-up text-2xl md:text-3xl font-heading font-bold text-navy mb-10 text-center">
          {t('relatedArticles')}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {posts.map((post, index) => (
            <BlogCard
              key={post.slug}
              title={post.title}
              description={post.description}
              slug={post.slug}
              date={post.date}
              author={post.author}
              category={post.category}
              image={post.image}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
