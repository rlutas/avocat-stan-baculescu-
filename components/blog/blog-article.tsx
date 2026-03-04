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
                className="inline-flex items-center gap-2 text-white/70 hover:text-gold mb-8 transition-colors duration-300"
              >
                <ArrowLeft className="w-4 h-4" />
                {t('backToBlog')}
              </Link>
            </ScrollAnimate>

            {/* Category badge */}
            <ScrollAnimate variant="fadeUp" delay={0.1}>
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-navy bg-gold rounded-full shadow-md">
                  <Tag className="w-3.5 h-3.5" />
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
              <p className="text-lg text-white/70 leading-relaxed mb-8">
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
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gold/20 ring-2 ring-gold/30">
                      <User className="w-5 h-5 text-gold" />
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-wider">{t('article.writtenBy')}</p>
                    <p className="text-white font-semibold">{author}</p>
                  </div>
                </div>
                <div className="hidden sm:block h-8 w-px bg-white/20" />
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gold/20 ring-2 ring-gold/30">
                    <Calendar className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-wider">{t('article.publishedOn')}</p>
                    <time dateTime={date} className="text-white font-semibold">{formattedDate}</time>
                  </div>
                </div>
                <div className="hidden sm:block h-8 w-px bg-white/20" />
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gold/20 ring-2 ring-gold/30">
                    <Clock className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-wider">&nbsp;</p>
                    <p className="text-white font-semibold">{readingTime} {t('article.readingTime')}</p>
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
          <div className="max-w-4xl mx-auto">
            {/* Featured image */}
            {image && (
              <ScrollAnimate variant="scaleUp" className="-mt-16 relative z-10 mb-12">
                <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/5">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px"
                    priority
                  />
                  {/* Subtle overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>
              </ScrollAnimate>
            )}

            {/* Gold divider */}
            <ScrollAnimate variant="fadeIn" delay={0.1}>
              <div className="flex items-center gap-4 mb-12">
                <div className="h-px flex-1 bg-gradient-to-r from-gold/40 to-transparent" />
                <div className="w-2 h-2 rotate-45 bg-gold" />
                <div className="h-px flex-1 bg-gradient-to-l from-gold/40 to-transparent" />
              </div>
            </ScrollAnimate>

            {/* Article body */}
            <ScrollAnimate variant="fadeUp" delay={0.2}>
              <div className="max-w-3xl mx-auto">
                <div
                  className="prose prose-lg max-w-none mb-16
                    prose-headings:font-heading prose-headings:font-bold prose-headings:text-navy
                    prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-5 prose-h2:leading-tight
                    prose-h3:text-xl prose-h3:sm:text-2xl prose-h3:mt-10 prose-h3:mb-4
                    prose-p:text-[#374151] prose-p:leading-[1.8] prose-p:text-base prose-p:sm:text-lg
                    prose-a:text-gold prose-a:font-semibold prose-a:no-underline prose-a:border-b prose-a:border-gold/30 hover:prose-a:border-gold
                    prose-strong:text-navy prose-strong:font-bold
                    prose-ul:my-6 prose-li:text-[#374151] prose-li:leading-[1.8]
                    prose-ol:my-6
                    prose-blockquote:border-l-4 prose-blockquote:border-gold prose-blockquote:bg-[#fef9e7]/50 prose-blockquote:rounded-r-xl prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:text-navy prose-blockquote:font-heading prose-blockquote:text-lg prose-blockquote:sm:text-xl prose-blockquote:leading-relaxed prose-blockquote:my-10
                    prose-img:rounded-xl prose-img:shadow-lg
                    prose-hr:border-gold/20"
                >
                  <MDXContent />
                </div>

                {/* Bottom divider */}
                <div className="flex items-center gap-4 mb-10">
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
