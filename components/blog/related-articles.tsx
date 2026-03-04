'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { ScrollAnimate, StaggerContainer, StaggerItem } from '@/components/ui/scroll-animate';

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
    <section className="relative overflow-hidden bg-[#f8f9fa] py-20 sm:py-28">
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="container mx-auto px-4">
        {/* Section heading */}
        <div className="text-center mb-14">
          <ScrollAnimate>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              {t('relatedArticlesLabel')}
            </p>
          </ScrollAnimate>
          <ScrollAnimate delay={0.1}>
            <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl">
              {t('relatedArticles')}
            </h2>
            <div className="mx-auto mt-4 h-[2px] w-16 bg-gold" />
          </ScrollAnimate>
        </div>

        {/* Cards grid */}
        <StaggerContainer
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
          staggerDelay={0.12}
        >
          {posts.slice(0, 3).map((post) => {
            const formattedDate = new Date(post.date).toLocaleDateString('ro-RO', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });

            return (
              <StaggerItem key={post.slug}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/[0.04] transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:ring-gold/30">
                  {/* Decorative top accent line */}
                  <div className="absolute top-0 left-0 right-0 z-10 h-1 bg-gold transform origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />

                  <div className="relative flex flex-1 flex-col p-6">
                    {/* Category badge */}
                    <div className="mb-4">
                      <span className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gold bg-[#fef9e7] rounded-full ring-1 ring-gold/20">
                        {post.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 font-heading text-xl font-bold text-navy transition-colors duration-300 group-hover:text-gold line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>

                    {/* Description */}
                    <p className="mb-5 flex-1 text-[#4b5563] leading-relaxed line-clamp-3">
                      {post.description}
                    </p>

                    {/* Meta info */}
                    <div className="flex items-center justify-between text-sm text-[#6b7280] mb-5 pb-5 border-b border-gray-100">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#fef9e7]">
                          <User className="w-3.5 h-3.5 text-gold" />
                        </div>
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#fef9e7]">
                          <Calendar className="w-3.5 h-3.5 text-gold" />
                        </div>
                        <time dateTime={post.date}>{formattedDate}</time>
                      </div>
                    </div>

                    {/* Read more link */}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-gold font-semibold hover:text-gold/80 transition-colors group/link"
                    >
                      {t('readMore')}
                      <ArrowRight className="w-4 h-4 transform transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
