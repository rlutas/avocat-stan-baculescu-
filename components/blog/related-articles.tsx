'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import { ScrollAnimate, StaggerContainer, StaggerItem } from '@/components/ui/scroll-animate';
import { BlogCard } from './blog-card';

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

type RelatedArticlesProps = {
  posts: Post[];
};

export function RelatedArticles({ posts }: RelatedArticlesProps) {
  const t = useTranslations('BlogPage');

  if (posts.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-[#f8f9fa] py-20 sm:py-24">
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="container mx-auto px-4">
        {/* Section heading */}
        <div className="mx-auto mb-12 flex max-w-6xl flex-col items-center gap-6 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
          <ScrollAnimate>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              {t('relatedArticlesLabel')}
            </p>
            <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl">
              {t('relatedArticles')}
            </h2>
            <div className="mx-auto mt-4 h-[2px] w-16 bg-gold sm:mx-0" />
          </ScrollAnimate>
          <ScrollAnimate delay={0.1}>
            <Link
              href="/blog"
              className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-navy/15 px-5 text-sm font-semibold text-navy transition-colors duration-300 hover:border-gold hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              {t('viewAllArticles')}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </ScrollAnimate>
        </div>

        {/* Cards grid — same card as the blog listing, so the design stays consistent */}
        <StaggerContainer
          className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.12}
        >
          {posts.slice(0, 3).map((post) => (
            <StaggerItem key={post.slug}>
              <BlogCard {...post} titleAs="h3" />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
