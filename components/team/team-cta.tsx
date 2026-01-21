'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';

export function TeamCta() {
  const t = useTranslations('TeamPage.cta');

  return (
    <section className="bg-[linear-gradient(135deg,#002a52_0%,#003a70_50%,#004a8f_100%)] py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-heading mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {t('title')}
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-white/80">
          {t('description')}
        </p>
        <Button
          asChild
          size="lg"
          className="bg-gold text-navy hover:bg-gold/90 shadow-[0_4px_6px_rgba(208,156,17,0.2)]"
        >
          <Link href="/contact">{t('button')}</Link>
        </Button>
      </div>
    </section>
  );
}
