'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { Calendar, User, ArrowLeft, Tag, Clock } from 'lucide-react';
import { SocialShare } from './social-share';
import { ScrollAnimate } from '@/components/ui/scroll-animate';
import { useMDXComponent } from '@/lib/mdx';

type BlogArticleProps = {
  title: string;
  description: string;
  date: string;
  author: string;
  authorImage?: string;
  category: string;
  content: string;
  image?: string;
};

export function BlogArticle({
  title,
  description,
  date,
  author,
  authorImage,
  category,
  content,
  image,
}: BlogArticleProps) {
  const t = useTranslations('BlogPage');
  const formattedDate = new Date(date).toLocaleDateString('ro-RO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const readingTime = Math.max(1, Math.ceil(content.length / 1500));
  const MDXContent = useMDXComponent(content);

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-navy py-20 sm:py-28 lg:py-36">
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-3xl">
            {/* Back link */}
            <ScrollAnimate variant="fadeUp">
              <Link
                href="/blog"
                className="mb-8 inline-flex items-center gap-2 text-white/70 transition-colors duration-300 hover:text-gold"
              >
                <ArrowLeft className="h-4 w-4" />
                {t('backToBlog')}
              </Link>
            </ScrollAnimate>

            {/* Category badge */}
            <ScrollAnimate variant="fadeUp" delay={0.1}>
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-medium text-navy shadow-md">
                  <Tag className="h-3.5 w-3.5" />
                  {category}
                </span>
              </div>
            </ScrollAnimate>

            {/* Title */}
            <ScrollAnimate variant="fadeUp" delay={0.2}>
              <h1 className="mb-6 font-heading text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                {title}
              </h1>
            </ScrollAnimate>

            {/* Description */}
            <ScrollAnimate variant="fadeUp" delay={0.3}>
              <p className="mb-8 text-lg leading-relaxed text-white/70">
                {description}
              </p>
            </ScrollAnimate>

            {/* Author & meta row */}
            <ScrollAnimate variant="fadeUp" delay={0.4}>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-3">
                  {authorImage ? (
                    <Image
                      src={authorImage}
                      alt={author}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20 ring-2 ring-gold/30">
                      <User className="h-5 w-5 text-gold" />
                    </div>
                  )}
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/50">{t('article.writtenBy')}</p>
                    <p className="font-semibold text-white">{author}</p>
                  </div>
                </div>
                <div className="hidden h-8 w-px bg-white/20 sm:block" />
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20 ring-2 ring-gold/30">
                    <Calendar className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/50">{t('article.publishedOn')}</p>
                    <time dateTime={date} className="font-semibold text-white">{formattedDate}</time>
                  </div>
                </div>
                <div className="hidden h-8 w-px bg-white/20 sm:block" />
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20 ring-2 ring-gold/30">
                    <Clock className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/50">&nbsp;</p>
                    <p className="font-semibold text-white">{readingTime} {t('article.readingTime')}</p>
                  </div>
                </div>
              </div>
            </ScrollAnimate>
          </div>
        </div>
      </section>

      {/* Article content */}
      <article className="bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            {/* Featured image */}
            {image && (
              <ScrollAnimate variant="scaleUp" className="relative z-10 -mt-16 mb-12">
                <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/5">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>
              </ScrollAnimate>
            )}

            {/* Gold divider */}
            <ScrollAnimate variant="fadeIn" delay={0.1}>
              <div className="mb-12 flex items-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-gold/40 to-transparent" />
                <div className="h-2 w-2 rotate-45 bg-gold" />
                <div className="h-px flex-1 bg-gradient-to-l from-gold/40 to-transparent" />
              </div>
            </ScrollAnimate>

            {/* Article body */}
            <ScrollAnimate variant="fadeUp" delay={0.2}>
              <div className="mx-auto max-w-3xl">
                <div className="blog-content mb-16">
                  <MDXContent />
                </div>

                {/* Bottom divider */}
                <div className="mb-10 flex items-center gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
                </div>

                {/* Social share */}
                <div className="pb-16">
                  <SocialShare
                    title={title}
                    description={description}
                  />
                </div>
              </div>
            </ScrollAnimate>
          </div>
        </div>
      </article>
    </>
  );
}
