'use client';

import { useTranslations } from 'next-intl';

export function ContactMap() {
  const t = useTranslations('ContactPage.map');

  // Google Maps embed URL for Str. Aurel Popp 2, Satu Mare
  const mapSrc =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2688.9881732890584!2d22.8685!3d47.7925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4737d8b4f3c3c3c3%3A0x0!2sStr.%20Aurel%20Popp%202%2C%20Satu%20Mare%20440014%2C%20Romania!5e0!3m2!1sen!2sro!4v1704067200000!5m2!1sen!2sro';

  return (
    <section className="py-16 bg-[#f8f9fa]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-navy">{t('title')}</h2>
          <p className="mt-2 text-lg text-[#4b5563]">{t('subtitle')}</p>
        </div>
        <div className="overflow-hidden rounded-2xl shadow-xl">
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
