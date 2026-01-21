'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function AboutCta() {
  const t = useTranslations('AboutPage.cta');

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#002a52_0%,#003a70_50%,#004a8f_100%)] px-8 py-16 text-center sm:px-16">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_24%,rgba(255,255,255,0.2)_25%,rgba(255,255,255,0.2)_26%,transparent_27%,transparent_74%,rgba(255,255,255,0.2)_75%,rgba(255,255,255,0.2)_76%,transparent_77%)] bg-[length:40px_40px]" />
          </div>

          <div className="relative">
            <h2 className="font-heading mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t('title')}
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
              {t('description')}
            </p>
            <Button
              asChild
              size="lg"
              className="h-14 bg-gold px-8 text-base font-semibold text-navy hover:bg-gold/90 shadow-[0_4px_6px_rgba(208,156,17,0.2)]"
            >
              <Link href="/contact">
                {t('button')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
