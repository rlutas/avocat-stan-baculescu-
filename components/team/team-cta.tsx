'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';

export function TeamCta() {
  const t = useTranslations('TeamPage.cta');

  return (
    <section className="bg-slate-50 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {t('title')}
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-600">
          {t('description')}
        </p>
        <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600">
          <Link href="/contact">{t('button')}</Link>
        </Button>
      </div>
    </section>
  );
}
