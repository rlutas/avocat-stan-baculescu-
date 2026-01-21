'use client';

import { useTranslations } from 'next-intl';

export function ServicesHero() {
  const t = useTranslations('ServicesPage.hero');

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 sm:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(30deg,transparent_24%,rgba(255,255,255,0.04)_25%,rgba(255,255,255,0.04)_26%,transparent_27%,transparent_74%,rgba(255,255,255,0.04)_75%,rgba(255,255,255,0.04)_76%,transparent_77%)] bg-[length:50px_50px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-amber-500 sm:text-base">
            {t('subtitle')}
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            {t('title')}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            {t('description')}
          </p>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
