'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';

export function BlogCta() {
  const t = useTranslations('BlogPage');

  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">{t('cta.title')}</h2>
        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
          {t('cta.description')}
        </p>
        <Button
          asChild
          size="lg"
          className="bg-amber-500 hover:bg-amber-600 text-white font-semibold"
        >
          <Link href="/contact">{t('cta.button')}</Link>
        </Button>
      </div>
    </section>
  );
}
