'use client';

import { useTranslations } from 'next-intl';

export function BlogHero() {
  const t = useTranslations('BlogPage');

  return (
    <section className="bg-[linear-gradient(135deg,#002a52_0%,#003a70_50%,#004a8f_100%)] text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gold font-medium mb-4">{t('hero.subtitle')}</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold">{t('hero.title')}</h1>
        </div>
      </div>
    </section>
  );
}
