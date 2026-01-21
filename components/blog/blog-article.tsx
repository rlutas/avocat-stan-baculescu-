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
    <article className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-amber-600 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('backToBlog')}
          </Link>

          {/* Article header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-4 h-4 text-amber-600" />
              <span className="text-amber-600 font-medium">{category}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {title}
            </h1>
            <p className="text-xl text-slate-600 mb-6">{description}</p>
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 pb-6 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={date}>{formattedDate}</time>
              </div>
            </div>
          </header>

          {/* Article content */}
          <div
            className="prose prose-lg prose-slate max-w-none mb-12
              prose-headings:font-bold prose-headings:text-slate-900
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-slate-700 prose-p:leading-relaxed
              prose-a:text-amber-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-slate-900
              prose-ul:my-4 prose-li:text-slate-700
              prose-ol:my-4"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* Social share */}
          <div className="border-t border-slate-200 pt-8">
            <SocialShare
              title={title}
              description={description}
              slug={slug}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
