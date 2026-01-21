'use client';

import { useTranslations } from 'next-intl';

export function BlogHero() {
  const t = useTranslations('BlogPage');

  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('hero.title')}</h1>
          <p className="text-xl text-slate-300">{t('hero.subtitle')}</p>
        </div>
      </div>
    </section>
  );
}
