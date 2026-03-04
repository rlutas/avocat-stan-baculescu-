'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
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
    <section className="bg-[#f8f9fa] py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 text-center sm:mb-16">
          <ScrollAnimate>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              {t('relatedLabel')}
            </p>
          </ScrollAnimate>
          <ScrollAnimate delay={0.1}>
            <h2 className="font-heading text-4xl font-bold leading-[1.1] text-navy sm:text-5xl">
              {t('relatedServices')}
            </h2>
            <div className="mx-auto mt-4 h-[2px] w-24 bg-gold" />
          </ScrollAnimate>
        </div>

        {/* Related cards — 3-column grid, identical card design to services-grid */}
        <StaggerContainer
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
          staggerDelay={0.1}
        >
          {relatedServices.map((service) => {
            const iconName: LawIconName = serviceIconMap[service.id] || 'balance-scale';
            return (
              <StaggerItem key={service.id} variant="scaleUp">
                <Link href={`/servicii/${service.id}`} className="group block h-full">
                  <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/[0.04] transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-navy/10">
                    {/* Visual header */}
                    <div
                      className={`relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br ${service.gradient} sm:h-48`}
                    >
                      {/* Background image */}
                      <Image
                        src={service.image}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />

                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/55 to-navy/25 transition-opacity duration-500 group-hover:from-navy/75 group-hover:via-navy/45 group-hover:to-navy/15" />

                      {/* Number watermark */}
                      <span className="absolute -right-1 -top-3 z-[1] select-none font-heading text-[100px] font-bold leading-none text-white/[0.06] transition-all duration-500 group-hover:text-white/[0.10]">
                        {service.num}
                      </span>

                      {/* Icon glassmorphism container */}
                      <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-white/15 group-hover:ring-gold/40">
                        <LawIcon name={iconName} size={32} variant="white" />
                      </div>

                      {/* Gold bottom line reveal */}
                      <div className="absolute bottom-0 left-0 z-[1] h-[3px] w-0 bg-gradient-to-r from-gold via-gold-light to-gold/60 transition-all duration-500 group-hover:w-full" />
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="mb-2 font-heading text-lg font-semibold text-navy transition-colors duration-300 group-hover:text-gold">
                        {tServices(`services.${service.id}.title`)}
                      </h3>
                      <p className="mb-4 flex-grow text-sm leading-relaxed text-text-secondary line-clamp-2">
                        {tServices(`services.${service.id}.shortDescription`)}
                      </p>
                      <div className="mt-auto flex items-center gap-2 border-t border-gray-100 pt-4 text-sm font-semibold text-gold transition-all duration-300 group-hover:gap-3">
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
      </div>
    </section>
  );
}
