'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Scale, Home, Briefcase, Phone } from 'lucide-react';

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#f8f9fa]">
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        {/* Logo Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-navy/10 flex items-center justify-center">
            <Scale className="w-10 h-10 text-navy" />
          </div>
        </div>

        {/* 404 Number */}
        <h1 className="font-heading text-8xl font-bold text-navy mb-4">404</h1>

        {/* Title */}
        <h2 className="font-heading text-3xl md:text-4xl font-semibold text-navy mb-4">
          {t('title')}
        </h2>

        {/* Description */}
        <p className="text-[#4b5563] text-lg mb-8 max-w-md mx-auto">
          {t('description')}
        </p>

        {/* Primary CTA - Homepage */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-gold text-navy font-semibold px-8 py-4 rounded-lg hover:bg-gold/90 transition-colors shadow-[0_4px_6px_rgba(208,156,17,0.2)] mb-8"
        >
          <Home className="w-5 h-5" />
          {t('backToHome')}
        </Link>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-navy/10"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-[#f8f9fa] px-4 text-[#4b5563] text-sm">
              {t('orVisit')}
            </span>
          </div>
        </div>

        {/* Secondary Links */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/servicii"
            className="inline-flex items-center justify-center gap-2 border border-navy text-navy font-medium px-6 py-3 rounded-lg hover:bg-navy hover:text-white transition-colors"
          >
            <Briefcase className="w-5 h-5" />
            {t('viewServices')}
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 border border-navy text-navy font-medium px-6 py-3 rounded-lg hover:bg-navy hover:text-white transition-colors"
          >
            <Phone className="w-5 h-5" />
            {t('contactUs')}
          </Link>
        </div>
      </div>
    </div>
  );
}
