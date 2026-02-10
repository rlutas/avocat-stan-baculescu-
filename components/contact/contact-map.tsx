'use client';

import { useTranslations } from 'next-intl';
import { MapPin } from 'lucide-react';

export function ContactMap() {
  const t = useTranslations('ContactPage.map');

  // Google Maps embed URL for Str. Decebal Nr. 4, Satu Mare
  const mapSrc =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2688.9881732890584!2d22.8685!3d47.7925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4737d8b4f3c3c3c3%3A0x0!2sStr.%20Decebal%204%2C%20Satu%20Mare%2C%20Romania!5e0!3m2!1sen!2sro!4v1704067200000!5m2!1sen!2sro';

  return (
    <section className="py-16 bg-[#f8f9fa]">
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
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out both;
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
      `}</style>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in-up mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-2">
            <MapPin className="h-4 w-4 text-gold" />
            <span className="text-sm font-medium text-gold">{t('badge')}</span>
          </div>
          <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl">{t('title')}</h2>
          <p className="mt-2 text-lg text-[#4b5563]">{t('subtitle')}</p>
        </div>
        <div className="animate-fade-in-up delay-200 overflow-hidden rounded-2xl shadow-xl ring-2 ring-gold/20 transition-all duration-300 hover:shadow-2xl hover:ring-gold/40">
          <iframe
            src={mapSrc}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={t('title')}
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}
