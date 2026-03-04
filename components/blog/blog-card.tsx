'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { Calendar, ArrowRight, Scale } from 'lucide-react';
// Scale is used for no-image fallback only

type BlogCardProps = {
  title: string;
  description: string;
  slug: string;
  date: string;
  author: string;
  category: string;
  image?: string;
  index?: number;
};

export function BlogCard({
  title,
  description,
  slug,
  date,
  author,
  category,
  image,
}: BlogCardProps) {
  const t = useTranslations('BlogPage');
  const formattedDate = new Date(date).toLocaleDateString('ro-RO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-navy/10">
      {/* Featured image area */}
      <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-[#002a52] to-[#004a8f]">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Scale className="h-16 w-16 text-white/20" />
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-navy/20 to-transparent transition-opacity duration-500" />

        {/* Category badge - top left */}
        <div className="absolute left-4 top-4 z-10">
          <span className="inline-flex items-center rounded-full bg-gold px-3 py-1 text-xs font-semibold text-navy shadow-lg shadow-gold/20">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Meta info */}
        <div className="mb-3 flex items-center gap-4 text-xs text-navy/50">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            <span className="font-medium">{author}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gold/10">
              <Calendar className="h-3 w-3 text-gold" />
            </div>
            <time dateTime={date}>{formattedDate}</time>
          </div>
        </div>

        {/* Title */}
        <h2 className="mb-3 font-heading text-xl font-bold leading-tight text-navy transition-colors duration-300 group-hover:text-gold line-clamp-2">
          <Link href={`/blog/${slug}`}>{title}</Link>
        </h2>

        {/* Description */}
        <p className="mb-5 flex-grow text-sm leading-relaxed text-navy/60 line-clamp-3">
          {description}
        </p>

        {/* Read more link */}
        <div className="mt-auto border-t border-gray-100 pt-4">
          <Link
            href={`/blog/${slug}`}
            className="group/link inline-flex items-center gap-2 text-sm font-semibold text-gold transition-all duration-300 hover:gap-3"
          >
            {t('readMore')}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Gold bottom line reveal on hover */}
      <div className="absolute bottom-0 left-0 z-[1] h-[3px] w-0 bg-gradient-to-r from-gold via-gold-light to-gold/60 transition-all duration-500 group-hover:w-full" />
    </article>
  );
}
