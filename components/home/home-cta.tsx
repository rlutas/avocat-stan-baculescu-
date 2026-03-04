'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone, Clock } from 'lucide-react';
import { ScrollAnimate } from '@/components/ui/scroll-animate';

export function HomeCta() {
  const t = useTranslations('HomePage.cta');

  return (
    <section className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollAnimate variant="scaleUp" duration={0.8}>
          <div className="relative overflow-hidden rounded-3xl bg-navy">
            {/* Subtle grid */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
              <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            </div>

            {/* Gold accent line */}
            <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />

            <div className="relative z-10 px-8 py-16 text-center sm:px-16 sm:py-24">
              <ScrollAnimate delay={0.2}>
                <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {t('title')}
                </h2>
              </ScrollAnimate>
              <ScrollAnimate delay={0.3}>
                <p className="mx-auto mb-10 mt-5 max-w-2xl text-lg text-white/60">
                  {t('description')}
                </p>
              </ScrollAnimate>

              {/* Buttons */}
              <ScrollAnimate delay={0.4}>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button
                    asChild
                    size="lg"
                    className="group h-14 rounded-full bg-gold px-8 text-base font-semibold text-navy transition-all duration-300 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/30"
                  >
                    <Link href="/contact">
                      {t('button')}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>

                  <a
                    href="tel:+40745466720"
                    className="group flex h-14 items-center overflow-hidden rounded-full bg-white/5 ring-1 ring-white/15 transition-all duration-300 hover:bg-white/10 hover:ring-gold/30"
                  >
                    <div className="flex h-full w-12 flex-shrink-0 items-center justify-center bg-gold/10 transition-colors duration-300 group-hover:bg-gold/20 sm:w-14">
                      <Phone className="h-5 w-5 text-gold transition-transform duration-300 group-hover:rotate-12" />
                    </div>
                    <div className="flex items-center gap-1.5 px-3 sm:block sm:px-5 sm:text-left">
                      <p className="whitespace-nowrap text-sm text-white/40 sm:text-xs">{t('callLabel')}</p>
                      <p className="whitespace-nowrap text-base font-semibold text-white sm:text-sm">+40 745 466 720</p>
                    </div>
                  </a>
                </div>
              </ScrollAnimate>

              <ScrollAnimate delay={0.5}>
                <div className="mt-8 flex items-center justify-center gap-2 text-white/30">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{t('available')}</span>
                </div>
              </ScrollAnimate>
            </div>
          </div>
        </ScrollAnimate>
      </div>
    </section>
  );
}
