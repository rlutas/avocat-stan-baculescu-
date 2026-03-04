'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { LawIcon } from '@/components/icons';
import type { LawIconName } from '@/components/icons';
import { ScrollAnimate, StaggerContainer, StaggerItem } from '@/components/ui/scroll-animate';

const services: {
  id: string;
  iconName: LawIconName;
  slug: string;
  num: string;
  gradient: string;
  image?: string;
}[] = [
  { id: 'malpraxis-medical', iconName: 'justice', slug: '/servicii/malpraxis-medical', num: '01', gradient: 'from-[#002a52] to-[#004a8f]', image: '/images/services/malpraxis-medical.webp' },
  { id: 'drept-civil', iconName: 'balance-scale', slug: '/servicii/drept-civil', num: '02', gradient: 'from-[#003a70] to-[#1a5a90]', image: '/images/services/drept-civil.webp' },
  { id: 'drept-penal', iconName: 'gavel', slug: '/servicii/drept-penal', num: '03', gradient: 'from-[#1a1a2e] to-[#16213e]', image: '/images/services/drept-penal.webp' },
  { id: 'drept-familiei', iconName: 'family', slug: '/servicii/drept-familiei', num: '04', gradient: 'from-[#002a52] to-[#003a70]', image: '/images/services/drept-familiei.webp' },
  { id: 'dreptul-muncii', iconName: 'suitcase', slug: '/servicii/dreptul-muncii', num: '05', gradient: 'from-[#16213e] to-[#1a3a5c]', image: '/images/services/dreptul-muncii.webp' },
  { id: 'drept-comercial', iconName: 'contract', slug: '/servicii/drept-comercial', num: '06', gradient: 'from-[#003a70] to-[#002a52]', image: '/images/services/drept-comercial.webp' },
  { id: 'accidente-rutiere', iconName: 'police-car', slug: '/servicii/accidente-rutiere', num: '07', gradient: 'from-[#1a1a2e] to-[#002a52]', image: '/images/services/accidente-rutiere.webp' },
  { id: 'drept-administrativ-fiscal', iconName: 'document', slug: '/servicii/drept-administrativ-fiscal', num: '08', gradient: 'from-[#002a52] to-[#16213e]', image: '/images/services/drept-administrativ-fiscal.webp' },
];

export function HomeServices() {
  const t = useTranslations('HomePage.services');
  const tServices = useTranslations('ServicesPage.services');

  return (
    <section className="bg-[#f8f9fa] py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 text-center sm:mb-16">
          <ScrollAnimate>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              {t('titleLine1')}
            </p>
          </ScrollAnimate>
          <ScrollAnimate delay={0.1}>
            <h2 className="font-heading text-4xl font-bold leading-[1.1] tracking-tight text-navy sm:text-5xl lg:text-6xl">
              {t('titleLine2')}
            </h2>
            <div className="mx-auto mt-4 h-[2px] w-24 bg-gold" />
          </ScrollAnimate>
          <ScrollAnimate delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
              {t('description')}
            </p>
          </ScrollAnimate>
        </div>

        {/* Cards Grid - 2 cols desktop, 1 mobile */}
        <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:gap-6" staggerDelay={0.08}>
          {services.map((service, index) => (
            <StaggerItem key={service.id} variant="scaleUp">
              <Link
                href={service.slug}
                className="group block h-full"
              >
                <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-navy/10">
                  {/* Visual Header - photo + gradient overlay */}
                  <div className={`relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br ${service.gradient} sm:h-56`}>
                    {/* Background image */}
                    {service.image && (
                      <Image
                        src={service.image}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    )}

                    {/* Dark gradient overlay for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/50 to-navy/30 transition-opacity duration-500 group-hover:from-navy/70 group-hover:via-navy/40 group-hover:to-navy/20" />

                    {/* Decorative number watermark */}
                    <span className="absolute -right-2 -top-4 z-[1] select-none font-heading text-[120px] font-bold leading-none text-white/[0.06] transition-all duration-500 group-hover:text-white/[0.10] sm:text-[150px]">
                      {service.num}
                    </span>

                    {/* Large icon */}
                    <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-white/15 group-hover:ring-gold/40 sm:h-24 sm:w-24">
                      <LawIcon name={service.iconName} size={40} variant="white" />
                    </div>

                    {/* Gold accent corner */}
                    <div className="absolute bottom-0 left-0 z-[1] h-1 w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h3 className="mb-2 font-heading text-xl font-semibold text-navy transition-colors duration-300 group-hover:text-gold">
                      {tServices(`${service.id}.title`)}
                    </h3>
                    <p className="mb-4 flex-grow text-sm leading-relaxed text-text-secondary line-clamp-3">
                      {tServices(`${service.id}.shortDescription`)}
                    </p>
                    <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-gold transition-all duration-300 group-hover:gap-3">
                      {t('viewDetails')}
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* View All */}
        <ScrollAnimate delay={0.3} className="mt-12 text-center">
          <Button
            asChild
            size="lg"
            className="group h-12 rounded-full border-2 border-navy bg-transparent px-8 text-base font-semibold text-navy transition-all duration-300 hover:bg-navy hover:text-white"
          >
            <Link href="/servicii">
              {t('viewAll')}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </ScrollAnimate>
      </div>
    </section>
  );
}
