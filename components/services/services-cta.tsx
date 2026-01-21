'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';

export function ServicesCta() {
  const t = useTranslations('ServicesPage.cta');

  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {t('title')}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
          {t('description')}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="bg-amber-500 text-slate-900 hover:bg-amber-400"
          >
            <Link href="/contact">{t('button')}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
