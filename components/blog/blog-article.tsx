'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react';
import { SocialShare } from './social-share';

type BlogArticleProps = {
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  content: string;
  slug: string;
};

export function BlogArticle({
  title,
  description,
  date,
  author,
  category,
  content,
  slug,
}: BlogArticleProps) {
  const t = useTranslations('BlogPage');
  const formattedDate = new Date(date).toLocaleDateString('ro-RO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-navy py-16 md:py-24">
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
          @keyframes gold-rotate {
            0% {
              transform: translate(-50%, -50%) rotate(0deg);
            }
            100% {
              transform: translate(-50%, -50%) rotate(360deg);
            }
          }
          @keyframes gold-pulse {
            0%, 100% {
              opacity: 0.15;
              transform: scale(1);
            }
            50% {
              opacity: 0.25;
              transform: scale(1.05);
            }
          }
          .gold-decoration {
            position: absolute;
            top: 50%;
            left: 80%;
            transform: translate(-50%, -50%);
            width: 400px;
            height: 400px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(208, 156, 17, 0.2) 0%, rgba(208, 156, 17, 0.05) 50%, transparent 70%);
            animation: gold-pulse 6s ease-in-out infinite;
            pointer-events: none;
          }
          .gold-ring {
            position: absolute;
            top: 50%;
            left: 80%;
            transform: translate(-50%, -50%);
            width: 350px;
            height: 350px;
            border-radius: 50%;
            border: 2px solid rgba(208, 156, 17, 0.15);
            animation: gold-rotate 30s linear infinite;
            pointer-events: none;
          }
          .gold-ring::before {
            content: '';
            position: absolute;
            top: -5px;
            left: 50%;
            width: 10px;
            height: 10px;
            background: rgba(208, 156, 17, 0.6);
            border-radius: 50%;
            box-shadow: 0 0 10px rgba(208, 156, 17, 0.4);
          }
          .gold-ring::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 50%;
            width: 10px;
            height: 10px;
            background: rgba(208, 156, 17, 0.6);
            border-radius: 50%;
            box-shadow: 0 0 10px rgba(208, 156, 17, 0.4);
          }
          .animate-fade-in-up {
            animation: fadeInUp 1s ease-out both;
          }
          .delay-100 { animation-delay: 100ms; }
          .delay-200 { animation-delay: 200ms; }
          .delay-300 { animation-delay: 300ms; }
        `}</style>

        {/* Gold decorative elements */}
        <div className="gold-decoration"></div>
        <div className="gold-ring"></div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-3xl">
            {/* Back link */}
            <Link
              href="/blog"
              className="animate-fade-in-up inline-flex items-center gap-2 text-white/70 hover:text-gold mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('backToBlog')}
            </Link>

            {/* Category badge */}
            <div className="animate-fade-in-up delay-100 mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gold bg-gold/10 rounded-full ring-1 ring-gold/20">
                <Tag className="w-4 h-4" />
                {category}
              </span>
            </div>

            {/* Two-line title */}
            <h1 className="animate-fade-in-up delay-200 mb-6 font-heading font-bold leading-tight text-white">
              <span className="block text-3xl sm:text-4xl lg:text-5xl">{title}</span>
            </h1>

            {/* Description */}
            <p className="animate-fade-in-up delay-300 text-lg text-white/70 leading-relaxed mb-8">
              {description}
            </p>

            {/* Author info */}
            <div className="animate-fade-in-up delay-300 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gold/20 ring-2 ring-gold/30">
                  <User className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-sm text-white/50">{t('article.writtenBy')}</p>
                  <p className="text-white font-semibold">{author}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gold/20 ring-2 ring-gold/30">
                  <Calendar className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-sm text-white/50">{t('article.publishedOn')}</p>
                  <time dateTime={date} className="text-white font-semibold">{formattedDate}</time>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article content */}
      <article className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Article content */}
            <div
              className="prose prose-lg max-w-none mb-12
                prose-headings:font-heading prose-headings:font-bold prose-headings:text-navy
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-[#1f2937] prose-p:leading-relaxed
                prose-a:text-gold prose-a:no-underline hover:prose-a:underline
                prose-strong:text-navy
                prose-ul:my-4 prose-li:text-[#1f2937]
                prose-ol:my-4"
              dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* Social share */}
            <div className="border-t border-gray-200 pt-8">
              <SocialShare
                title={title}
                description={description}
                slug={slug}
              />
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
