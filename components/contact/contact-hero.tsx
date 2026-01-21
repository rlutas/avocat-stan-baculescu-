'use client';

import { useTranslations } from 'next-intl';

export function ContactHero() {
  const t = useTranslations('ContactPage.hero');

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#002a52_0%,#003a70_50%,#004a8f_100%)] py-20 sm:py-28">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_24%,rgba(255,255,255,0.1)_25%,rgba(255,255,255,0.1)_26%,transparent_27%,transparent_74%,rgba(255,255,255,0.1)_75%,rgba(255,255,255,0.1)_76%,transparent_77%)] bg-[length:60px_60px]" />
      </div>

      {/* Gold Accent */}
      <div className="absolute left-0 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-64 w-64 translate-x-1/2 translate-y-1/2 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-gold">
            {t('subtitle')}
          </p>
          <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t('title')}
          </h1>
        </div>
      </div>
    </section>
  );
}
