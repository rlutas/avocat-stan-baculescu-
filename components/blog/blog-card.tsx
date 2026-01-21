'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Calendar, User, ArrowRight, Quote } from 'lucide-react';

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
  index = 0,
}: BlogCardProps) {
  const t = useTranslations('BlogPage');
  const formattedDate = new Date(date).toLocaleDateString('ro-RO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article
      className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden border border-transparent hover:border-gold hover:-translate-y-2 hover:ring-2 hover:ring-gold/20 animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
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
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out both;
        }
        .card-shimmer {
          position: relative;
          overflow: hidden;
        }
        .card-shimmer::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 10;
          background: linear-gradient(
            105deg,
            transparent 40%,
            rgba(208, 156, 17, 0.05) 45%,
            rgba(208, 156, 17, 0.1) 50%,
            rgba(208, 156, 17, 0.05) 55%,
            transparent 60%
          );
          transform: translateX(-100%);
          transition: transform 0s;
          pointer-events: none;
        }
        .group:hover .card-shimmer::before {
          animation: shimmer 1.5s ease-in-out;
        }
      `}</style>

      {/* Decorative top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gold transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></div>

      {/* Card shimmer overlay */}
      <div className="card-shimmer absolute inset-0 pointer-events-none"></div>

      <div className="relative p-6">
        {/* Quote icon decoration */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Quote className="w-8 h-8 text-gold/20" />
        </div>

        {/* Category badge */}
        <div className="mb-4">
          <span className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gold bg-[#fef9e7] rounded-full ring-1 ring-gold/20">
            {category}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-heading font-bold text-navy mb-3 group-hover:text-gold transition-colors duration-300 line-clamp-2">
          <Link href={`/blog/${slug}`}>{title}</Link>
        </h2>

        {/* Description */}
        <p className="text-[#4b5563] mb-4 line-clamp-3 leading-relaxed">{description}</p>

        {/* Meta info */}
        <div className="flex items-center justify-between text-sm text-[#6b7280] mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#fef9e7]">
              <User className="w-3.5 h-3.5 text-gold" />
            </div>
            <span>{author}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#fef9e7]">
              <Calendar className="w-3.5 h-3.5 text-gold" />
            </div>
            <time dateTime={date}>{formattedDate}</time>
          </div>
        </div>

        {/* Read more link */}
        <Link
          href={`/blog/${slug}`}
          className="inline-flex items-center gap-2 text-gold font-semibold hover:text-gold/80 transition-colors group/link"
        >
          {t('readMore')}
          <ArrowRight className="w-4 h-4 transform transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
