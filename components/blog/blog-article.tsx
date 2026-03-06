'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Tag, Clock } from 'lucide-react';
import { SocialShare } from './social-share';
import { AuthorBio } from './author-bio';
import { ScrollAnimate } from '@/components/ui/scroll-animate';
import { useMDXComponent } from '@/lib/mdx';
import { TableOfContents } from '@/components/blog/table-of-contents';
import { KeyPoints } from '@/components/blog/key-points';
import { Callout } from '@/components/blog/callout';
import { LegalCitation } from '@/components/blog/legal-citation';
import { ReadingProgress } from '@/components/blog/reading-progress';
import { useBlogTracking } from '@/hooks/use-blog-tracking';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';

const mdxComponents = {
  KeyPoints,
  Callout,
  LegalCitation,
};

type BlogArticleProps = {
  title: string;
  description: string;
  date: string;
  author: string;
  authorImage?: string;
  category: string;
  content: string;
  raw?: string;
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
  raw,
  image,
}: BlogArticleProps) {
  const t = useTranslations('BlogPage');
  const locale = useLocale();
  const pathname = usePathname();
  const slug = pathname.split('/').pop() || '';

  // Blog engagement tracking (scroll depth + article read)
  useBlogTracking({ articleTitle: title, articleSlug: slug, language: locale });
  const formattedDate = new Date(date).toLocaleDateString('ro-RO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const readingTime = Math.max(1, Math.ceil(content.length / 1500));
  const MDXContent = useMDXComponent(content);

  return (
    <>
      <ReadingProgress />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#002a52_0%,#003a70_60%,#004a8f_100%)] pt-32 pb-20 sm:pt-40 sm:pb-28">
        {/* Subtle grid texture */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        {/* Gold radial glow — right side */}
        <div
          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3"
          style={{
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(208,156,17,0.18) 0%, rgba(208,156,17,0.06) 45%, transparent 70%)',
          }}
        />

        {/* Gold accent top line with shimmer */}
        <div className="absolute left-0 right-0 top-0 h-[2px] animate-shimmer bg-[length:200%_100%] bg-[linear-gradient(90deg,transparent_0%,#d09c11_25%,#e6b520_50%,#d09c11_75%,transparent_100%)]" />

        {/* Noise grain texture */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.03] mix-blend-soft-light" aria-hidden="true">
          <filter id="blogArticleHeroNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#blogArticleHeroNoise)" />
        </svg>

        {/* Animated gold line art */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true">
          <motion.path
            d="M-50 800 Q350 400 700 500 T1450 100"
            stroke="rgba(208, 156, 17, 0.10)"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: 3, ease: "easeInOut", delay: 1.2 },
              opacity: { duration: 0.5, delay: 1.2 }
            }}
          />
          <motion.path
            d="M-50 830 Q350 430 700 530 T1450 130"
            stroke="rgba(208, 156, 17, 0.05)"
            strokeWidth="1"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: 3.5, ease: "easeInOut", delay: 1.5 },
              opacity: { duration: 0.5, delay: 1.5 }
            }}
          />
        </svg>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Back link */}
            <div style={{ animation: 'fadeInUp 0.7s ease forwards', opacity: 0 }}>
              <Link
                href="/blog"
                className="mb-8 inline-flex items-center gap-2 text-white/70 transition-colors duration-300 hover:text-gold"
              >
                <ArrowLeft className="h-4 w-4" />
                {t('backToBlog')}
              </Link>
            </div>

            {/* Category badge */}
            <div className="mb-6" style={{ animation: 'fadeInUp 0.7s ease forwards', animationDelay: '120ms', opacity: 0 }}>
              <span className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-medium text-navy shadow-md">
                <Tag className="h-3.5 w-3.5" />
                {category}
              </span>
            </div>

            {/* Title */}
            <h1
              className="mb-6 font-heading text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
              style={{ animation: 'fadeInUp 0.7s ease forwards', animationDelay: '200ms', opacity: 0 }}
            >
              {title}
            </h1>

            {/* Animated gold bar */}
            <div
              className="h-[2px] w-16 origin-left bg-gold"
              style={{ animation: 'lineReveal 0.8s ease forwards', animationDelay: '300ms', transform: 'scaleX(0)' }}
            />

            {/* Description */}
            <p
              className="mt-6 mb-8 text-lg leading-relaxed text-white/70"
              style={{ animation: 'fadeInUp 0.7s ease forwards', animationDelay: '280ms', opacity: 0 }}
            >
              {description}
            </p>

            {/* Author & meta row */}
            <div
              className="flex flex-wrap items-center gap-6"
              style={{ animation: 'fadeInUp 0.7s ease forwards', animationDelay: '360ms', opacity: 0 }}
            >
              <div className="flex items-center gap-3">
                {authorImage ? (
                  <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-gold/30">
                    <Image
                      src={authorImage}
                      alt={author}
                      fill
                      className="object-cover object-top"
                      sizes="40px"
                    />
                  </div>
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
          </div>
        </div>

        {/* Bottom fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/[0.04] to-transparent" />

        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(24px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes lineReveal {
            from { transform: scaleX(0); }
            to   { transform: scaleX(1); }
          }
        `}</style>
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
            <div className="mx-auto max-w-3xl">
              <div className="blog-content mb-16">
                {raw && <TableOfContents content={raw} />}
                <MDXContent />
              </div>

              {/* Bottom divider */}
              <div className="mb-10 flex items-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
              </div>

              {/* Author bio */}
              <AuthorBio name={author} image={authorImage} />

              {/* Social share */}
              <div className="mt-10 pb-16">
                <SocialShare
                  title={title}
                  description={description}
                />
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
