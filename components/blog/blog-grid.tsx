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

type BlogGridProps = {
  posts: Post[];
  currentPage: number;
  totalPages: number;
  selectedCategory: string | null;
  categories: string[];
  onCategoryChange: (category: string | null) => void;
  onPageChange: (page: number) => void;
};

export function BlogGrid({
  posts,
  currentPage,
  totalPages,
  selectedCategory,
  categories,
  onCategoryChange,
  onPageChange,
}: BlogGridProps) {
  const t = useTranslations('BlogPage');

  return (
    <section className="py-16 bg-[#f8f9fa]">
      <div className="container mx-auto px-4">
        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => onCategoryChange(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === null
                ? 'bg-gold text-navy'
                : 'bg-white text-navy hover:bg-gold/10 border border-gray-200'
            }`}
          >
            {t('allCategories')}
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-gold text-navy'
                  : 'bg-white text-navy hover:bg-gold/10 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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
        ) : (
          <div className="text-center py-12">
            <p className="text-[#4b5563] text-lg">{t('noPosts')}</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-md border border-gray-200 text-navy hover:bg-gold/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {t('previousPage')}
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  currentPage === page
                    ? 'bg-gold text-navy'
                    : 'border border-gray-200 text-navy hover:bg-gold/10'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-md border border-gray-200 text-navy hover:bg-gold/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {t('nextPage')}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
