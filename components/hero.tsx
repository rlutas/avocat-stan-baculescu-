'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Scale, Shield, Users } from 'lucide-react';

export function Hero() {
  const t = useTranslations('HomePage.hero');

  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-[linear-gradient(135deg,#002a52_0%,#003a70_50%,#004a8f_100%)]">
      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[90vh] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid w-full gap-12 lg:grid-cols-2 lg:items-center">
          {/* Text Content */}
          <div className="max-w-xl">
            {/* Subtitle */}
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold sm:text-base">
              {t('subtitle')}
            </p>

            {/* Title */}
            <h1 className="mb-6 font-heading text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              {t('title')}
            </h1>

            {/* Description */}
            <p className="mb-10 text-lg leading-relaxed text-white/90 sm:text-xl">
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

            {/* Trust Indicators - Mobile */}
            <div className="mt-12 grid grid-cols-3 gap-4 lg:hidden">
              <div className="text-center">
                <p className="text-2xl font-bold text-gold">15+</p>
                <p className="text-xs text-white/70">Ani Experiență</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gold">1000+</p>
                <p className="text-xs text-white/70">Clienți</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gold">8</p>
                <p className="text-xs text-white/70">Arii Practică</p>
              </div>
            </div>
          </div>

          {/* Founders Section - Desktop */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Founders Cards - Same style as team page */}
              <div className="flex gap-5">
                {/* Camelia Stan */}
                <Link href="/echipa/camelia-stan" className="group flex-1">
                  <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-300 hover:shadow-2xl">
                    <div className="absolute left-0 right-0 top-0 z-10 h-1 bg-gold" />
                    <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-[#fdf6e3] via-[#fef9ed] to-[#fffbf5]">
                      <div className="absolute bottom-0 left-0 right-0 top-0">
                        <Image
                          src="/images/team/camelia-stan.png"
                          alt="Av. Camelia Stan"
                          fill
                          className="object-contain object-bottom transition-transform duration-300 group-hover:scale-[1.02]"
                          sizes="20vw"
                          priority
                        />
                      </div>
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="font-heading text-lg font-bold text-navy group-hover:text-gold">
                        Av. Camelia Stan
                      </h3>
                      <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                        Fondator
                      </p>
                    </div>
                  </div>
                </Link>

                {/* Vlad Baculescu */}
                <Link href="/echipa/vlad-baculescu" className="group flex-1">
                  <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-300 hover:shadow-2xl">
                    <div className="absolute left-0 right-0 top-0 z-10 h-1 bg-gold" />
                    <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-[#fdf6e3] via-[#fef9ed] to-[#fffbf5]">
                      <div className="absolute bottom-0 left-0 right-0 top-0">
                        <Image
                          src="/images/team/vlad-baculescu.png"
                          alt="Av. Vlad Baculescu"
                          fill
                          className="object-contain object-bottom transition-transform duration-300 group-hover:scale-[1.02]"
                          sizes="20vw"
                          priority
                        />
                      </div>
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="font-heading text-lg font-bold text-navy group-hover:text-gold">
                        Av. Vlad Baculescu
                      </h3>
                      <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                        Fondator
                      </p>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Trust Indicators - Desktop */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm">
                  <Scale className="mx-auto mb-2 h-5 w-5 text-gold" />
                  <p className="text-xl font-bold text-white">15+</p>
                  <p className="text-xs text-white/70">Ani Experiență</p>
                </div>
                <div className="rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm">
                  <Users className="mx-auto mb-2 h-5 w-5 text-gold" />
                  <p className="text-xl font-bold text-white">1000+</p>
                  <p className="text-xs text-white/70">Clienți Mulțumiți</p>
                </div>
                <div className="rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm">
                  <Shield className="mx-auto mb-2 h-5 w-5 text-gold" />
                  <p className="text-xl font-bold text-white">8</p>
                  <p className="text-xs text-white/70">Arii de Practică</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
