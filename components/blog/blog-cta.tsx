'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';

export function BlogCta() {
  const t = useTranslations('BlogPage');

  return (
    <section className="py-16 bg-[linear-gradient(135deg,#002a52_0%,#003a70_50%,#004a8f_100%)]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-heading font-bold text-white mb-4">{t('cta.title')}</h2>
        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          {t('cta.description')}
        </p>
        <Button
          asChild
          size="lg"
          className="bg-gold hover:bg-gold/90 text-navy font-semibold shadow-[0_4px_6px_rgba(208,156,17,0.2)]"
        >
          <Link href="/contact">{t('cta.button')}</Link>
        </Button>
      </div>
    </section>
  );
}
