'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LawIcon, serviceIconMap, type LawIconName } from '@/components/icons';
import { ScrollAnimate, StaggerContainer, StaggerItem } from '@/components/ui/scroll-animate';

const allServices = [
  {
    id: 'malpraxis-medical',
    num: '01',
    gradient: 'from-[#002a52] to-[#004a8f]',
    image: '/images/services/malpraxis-medical.webp',
  },
  {
    id: 'drept-civil',
    num: '02',
    gradient: 'from-[#003a70] to-[#1a5a90]',
    image: '/images/services/drept-civil.webp',
  },
  {
    id: 'drept-penal',
    num: '03',
    gradient: 'from-[#1a1a2e] to-[#16213e]',
    image: '/images/services/drept-penal.webp',
  },
  {
    id: 'drept-familiei',
    num: '04',
    gradient: 'from-[#002a52] to-[#003a70]',
    image: '/images/services/drept-familiei.webp',
  },
  {
    id: 'dreptul-muncii',
    num: '05',
    gradient: 'from-[#16213e] to-[#1a3a5c]',
    image: '/images/services/dreptul-muncii.webp',
  },
  {
    id: 'drept-comercial',
    num: '06',
    gradient: 'from-[#003a70] to-[#002a52]',
    image: '/images/services/drept-comercial.webp',
  },
  {
    id: 'accidente-rutiere',
    num: '07',
    gradient: 'from-[#1a1a2e] to-[#002a52]',
    image: '/images/services/accidente-rutiere.webp',
  },
  {
    id: 'drept-administrativ-fiscal',
    num: '08',
    gradient: 'from-[#002a52] to-[#16213e]',
    image: '/images/services/drept-administrativ-fiscal.webp',
  },
];

const relatedServicesMap: Record<string, string[]> = {
  'malpraxis-medical': ['drept-civil', 'accidente-rutiere', 'drept-penal'],
  'drept-civil': ['drept-familiei', 'drept-comercial', 'dreptul-muncii'],
  'drept-penal': ['drept-civil', 'accidente-rutiere', 'drept-administrativ-fiscal'],
  'drept-familiei': ['drept-civil', 'dreptul-muncii', 'drept-comercial'],
  'dreptul-muncii': ['drept-civil', 'drept-comercial', 'drept-administrativ-fiscal'],
  'drept-comercial': ['drept-civil', 'dreptul-muncii', 'drept-administrativ-fiscal'],
  'accidente-rutiere': ['malpraxis-medical', 'drept-civil', 'drept-penal'],
  'drept-administrativ-fiscal': ['drept-comercial', 'dreptul-muncii', 'drept-civil'],
};

interface ServiceDetailRelatedProps {
  currentServiceId: string;
}

export function ServiceDetailRelated({ currentServiceId }: ServiceDetailRelatedProps) {
  const t = useTranslations('ServiceDetail');
  const tServices = useTranslations('ServicesPage');

  const relatedIds = relatedServicesMap[currentServiceId] || [];
  const relatedServices = relatedIds
    .map((id) => allServices.find((s) => s.id === id))
    .filter(Boolean) as typeof allServices;

  if (relatedServices.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-navy py-20 sm:py-32">
      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 text-center sm:mb-16">
          <ScrollAnimate>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              {t('relatedLabel')}
            </p>
          </ScrollAnimate>
          <ScrollAnimate delay={0.1}>
            <h2 className="font-heading text-4xl font-bold leading-[1.1] text-white sm:text-5xl">
              {t('relatedServices')}
            </h2>
            <div className="mx-auto mt-4 h-[2px] w-24 bg-gold" />
          </ScrollAnimate>
        </div>

        {/* Related cards — 3-column grid */}
        <StaggerContainer
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
          staggerDelay={0.1}
        >
          {relatedServices.map((service) => {
            const iconName: LawIconName = serviceIconMap[service.id] || 'balance-scale';
            return (
              <StaggerItem key={service.id} variant="scaleUp">
                <Link href={`/servicii/${service.id}`} className="group block h-full">
                  <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] transition-all duration-500 hover:-translate-y-2 hover:border-gold/20 hover:bg-white/[0.06]">
                    {/* Visual header */}
                    <div
                      className={`relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br ${service.gradient} sm:h-48`}
                    >
                      {/* Background image */}
                      <Image
                        src={service.image}
                        alt={tServices(`services.${service.id}.title`)}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />

                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/50 to-navy/30 transition-opacity duration-500 group-hover:from-navy/70 group-hover:via-navy/40 group-hover:to-navy/20" />

                      {/* Number watermark */}
                      <span className="absolute -right-1 -top-3 z-[1] select-none font-heading text-[100px] font-bold leading-none text-white/[0.06] transition-all duration-500 group-hover:text-white/[0.10]">
                        {service.num}
                      </span>

                      {/* Icon glassmorphism container */}
                      <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-gold/20 group-hover:ring-gold/30">
                        <LawIcon name={iconName} size={32} variant="white" />
                      </div>

                      {/* Gold bottom line reveal */}
                      <div className="absolute bottom-0 left-0 z-[1] h-[2px] w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="mb-2 font-heading text-lg font-semibold text-white transition-colors duration-300 group-hover:text-gold">
                        {tServices(`services.${service.id}.title`)}
                      </h3>
                      <p className="mb-4 flex-grow text-sm leading-relaxed text-white/50 line-clamp-2">
                        {tServices(`services.${service.id}.shortDescription`)}
                      </p>
                      <div className="mt-auto flex items-center gap-2 border-t border-white/[0.06] pt-4 text-sm font-semibold text-gold transition-all duration-300 group-hover:gap-3">
                        {tServices('viewDetails')}
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* View All Services button */}
        <ScrollAnimate delay={0.3} className="mt-12 text-center">
          <Button
            asChild
            size="lg"
            className="group h-12 rounded-full border-2 border-white/20 bg-transparent px-8 text-base font-semibold text-white transition-all duration-300 hover:border-gold hover:bg-gold hover:text-navy"
          >
            <Link href="/servicii">
              {t('viewAllServices')}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </ScrollAnimate>
      </div>
    </section>
  );
}
