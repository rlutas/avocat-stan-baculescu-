'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Calendar, User, ArrowRight } from 'lucide-react';

type BlogCardProps = {
  title: string;
  description: string;
  slug: string;
  date: string;
  author: string;
  category: string;
  image?: string;
};

export function BlogCard({
  title,
  description,
  slug,
  date,
  author,
  category,
}: BlogCardProps) {
  const t = useTranslations('BlogPage');
  const formattedDate = new Date(date).toLocaleDateString('ro-RO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100">
      <div className="p-6">
        <div className="mb-3">
          <span className="inline-block px-3 py-1 text-sm font-medium text-amber-700 bg-amber-50 rounded-full">
            {category}
          </span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors line-clamp-2">
          <Link href={`/blog/${slug}`}>{title}</Link>
        </h2>
        <p className="text-slate-600 mb-4 line-clamp-3">{description}</p>
        <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <time dateTime={date}>{formattedDate}</time>
          </div>
        </div>
        <Link
          href={`/blog/${slug}`}
          className="inline-flex items-center gap-2 text-amber-600 font-medium hover:text-amber-700 transition-colors"
        >
          {t('readMore')}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
