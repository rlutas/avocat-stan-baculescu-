'use client';

import { useTranslations } from 'next-intl';
import { BlogCard } from './blog-card';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
        {/* Category Filter */}
        <div className="animate-fade-in-up mb-12 flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => onCategoryChange(null)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
              selectedCategory === null
                ? 'bg-gold text-navy shadow-[0_4px_6px_rgba(208,156,17,0.2)]'
                : 'bg-white text-navy hover:bg-gold/10 border border-gray-200 hover:border-gold/30'
            }`}
          >
            {t('allCategories')}
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gold text-navy shadow-[0_4px_6px_rgba(208,156,17,0.2)]'
                  : 'bg-white text-navy hover:bg-gold/10 border border-gray-200 hover:border-gold/30'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
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
        ) : (
          <div className="animate-fade-in-up text-center py-16 bg-white rounded-2xl shadow-sm">
            <p className="text-[#4b5563] text-lg">{t('noPosts')}</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="animate-fade-in-up flex justify-center items-center gap-2" style={{ animationDelay: '400ms' }}>
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-navy hover:bg-gold/10 hover:border-gold/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              <ChevronLeft className="w-4 h-4" />
              {t('previousPage')}
            </button>

            <div className="flex items-center gap-1.5 mx-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`w-10 h-10 rounded-lg font-semibold transition-all duration-300 ${
                    currentPage === page
                      ? 'bg-gold text-navy shadow-[0_4px_6px_rgba(208,156,17,0.2)]'
                      : 'border border-gray-200 bg-white text-navy hover:bg-gold/10 hover:border-gold/30'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-navy hover:bg-gold/10 hover:border-gold/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {t('nextPage')}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
