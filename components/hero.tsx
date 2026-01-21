'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';

export function Hero() {
  const t = useTranslations('HomePage.hero');

  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-[linear-gradient(135deg,#002a52_0%,#003a70_50%,#004a8f_100%)]">
      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[90vh] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Subtitle */}
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold sm:text-base">
            {t('subtitle')}
          </p>

          {/* Title */}
          <h1 className="mb-6 font-heading text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {t('title')}
          </h1>

          {/* Description */}
          <p className="mb-10 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl">
            {t('description')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-14 bg-gold px-8 text-base font-semibold text-navy shadow-gold hover:bg-gold-light hover:shadow-gold-lg"
            >
              <Link href="/contact">{t('cta')}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-14 border-2 border-white bg-transparent px-8 text-base font-semibold text-white hover:bg-white/10"
            >
              <Link href="/servicii">{t('secondaryCta')}</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
