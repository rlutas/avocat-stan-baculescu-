'use client';

import { useTranslations } from 'next-intl';
import { BlogCard } from './blog-card';
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import { ScrollAnimate, StaggerContainer, StaggerItem } from '@/components/ui/scroll-animate';

type Post = {
  title: string;
  description: string;
  slug: string;
  date: string;
  author: string;
  authorImage?: string;
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
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 text-center sm:mb-16">
          <ScrollAnimate>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              {t('grid.label')}
            </p>
          </ScrollAnimate>
          <ScrollAnimate delay={0.1}>
            <h2 className="font-heading text-4xl font-bold leading-[1.1] tracking-tight text-navy sm:text-5xl lg:text-6xl">
              {t('grid.title')}
            </h2>
            <div className="mx-auto mt-4 h-[2px] w-24 bg-gold" />
          </ScrollAnimate>
          <ScrollAnimate delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
              {t('grid.description')}
            </p>
          </ScrollAnimate>
        </div>

        {/* Category Filter Pills */}
        <ScrollAnimate delay={0.25}>
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => onCategoryChange(null)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                selectedCategory === null
                  ? 'bg-gold text-navy shadow-lg shadow-gold/20'
                  : 'border border-gray-200 bg-white text-navy hover:border-gold/30 hover:bg-gold/10'
              }`}
            >
              {t('allCategories')}
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gold text-navy shadow-lg shadow-gold/20'
                    : 'border border-gray-200 bg-white text-navy hover:border-gold/30 hover:bg-gold/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </ScrollAnimate>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8" staggerDelay={0.08}>
            {posts.map((post) => (
              <StaggerItem key={post.slug} variant="scaleUp">
                <BlogCard
                  title={post.title}
                  description={post.description}
                  slug={post.slug}
                  date={post.date}
                  author={post.author}
                  authorImage={post.authorImage}
                  category={post.category}
                  image={post.image}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <ScrollAnimate>
            <div className="mx-auto max-w-md rounded-2xl border border-gray-100 bg-[#f8f9fa] px-8 py-16 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
                <FileText className="h-8 w-8 text-gold" />
              </div>
              <p className="font-heading text-xl font-semibold text-navy">
                {t('noPosts')}
              </p>
              <p className="mt-2 text-sm text-navy/50">
                {t('noPostsDescription')}
              </p>
            </div>
          </ScrollAnimate>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <ScrollAnimate delay={0.3}>
            <div className="mt-14 flex items-center justify-center gap-2">
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-navy transition-all duration-300 hover:border-gold/30 hover:bg-gold/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
                {t('previousPage')}
              </button>

              <div className="mx-2 flex items-center gap-1.5">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`h-10 w-10 rounded-full text-sm font-semibold transition-all duration-300 ${
                      currentPage === page
                        ? 'bg-gold text-navy shadow-lg shadow-gold/20'
                        : 'border border-gray-200 bg-white text-navy hover:border-gold/30 hover:bg-gold/10'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-navy transition-all duration-300 hover:border-gold/30 hover:bg-gold/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {t('nextPage')}
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </ScrollAnimate>
        )}
      </div>
    </section>
  );
}
