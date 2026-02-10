'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import {
  Stethoscope,
  Scale,
  Gavel,
  Users,
  Briefcase,
  Building2,
  Car,
  FileText,
  ArrowRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Service {
  id: string;
  icon: LucideIcon;
  slug: string;
  num: string;
  caseKeys: string[];
}

const services: Service[] = [
  {
    id: 'malpraxis-medical',
    icon: Stethoscope,
    slug: '/servicii/malpraxis-medical',
    num: '01',
    caseKeys: ['case1', 'case2', 'case4'],
  },
  {
    id: 'drept-civil',
    icon: Scale,
    slug: '/servicii/drept-civil',
    num: '02',
    caseKeys: ['case1', 'case3', 'case5'],
  },
  {
    id: 'drept-penal',
    icon: Gavel,
    slug: '/servicii/drept-penal',
    num: '03',
    caseKeys: ['case1', 'case2', 'case4'],
  },
  {
    id: 'drept-familiei',
    icon: Users,
    slug: '/servicii/drept-familiei',
    num: '04',
    caseKeys: ['case1', 'case2', 'case3'],
  },
  {
    id: 'dreptul-muncii',
    icon: Briefcase,
    slug: '/servicii/dreptul-muncii',
    num: '05',
    caseKeys: ['case1', 'case2', 'case3'],
  },
  {
    id: 'drept-comercial',
    icon: Building2,
    slug: '/servicii/drept-comercial',
    num: '06',
    caseKeys: ['case1', 'case2', 'case4'],
  },
  {
    id: 'accidente-rutiere',
    icon: Car,
    slug: '/servicii/accidente-rutiere',
    num: '07',
    caseKeys: ['case1', 'case2', 'case3'],
  },
  {
    id: 'drept-administrativ-fiscal',
    icon: FileText,
    slug: '/servicii/drept-administrativ-fiscal',
    num: '08',
    caseKeys: ['case1', 'case2', 'case3'],
  },
];

export function ServicesGrid() {
  const t = useTranslations('ServicesPage');
  const tDetail = useTranslations('ServiceDetail');

  return (
    <section className="bg-[#f8f9fa] py-16 sm:py-24">
      <style jsx>{`
        @keyframes revealCard {
          0% {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
            filter: blur(2px);
          }
          65% {
            opacity: 1;
            transform: translateY(-3px) scale(1.005);
            filter: blur(0);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }
        @keyframes shimmerSweep {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes iconFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        .service-showcase {
          animation: revealCard 1s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .service-showcase::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(
            105deg,
            transparent 40%,
            rgba(208, 156, 17, 0.05) 45%,
            rgba(208, 156, 17, 0.08) 50%,
            rgba(208, 156, 17, 0.05) 55%,
            transparent 60%
          );
          transform: translateX(-100%);
          pointer-events: none;
          border-radius: inherit;
        }
        .service-showcase:hover::after {
          animation: shimmerSweep 0.8s ease-out;
        }
        .service-showcase:hover .icon-float {
          animation: iconFloat 2s ease-in-out infinite;
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.id}
                href={service.slug}
                className="service-showcase group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-500 hover:-translate-y-2 hover:border-gold/30 hover:shadow-[0_25px_50px_rgba(0,58,112,0.1),0_0_0_1px_rgba(208,156,17,0.15)] sm:flex-row"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Left: Icon Area */}
                <div className="relative flex flex-shrink-0 items-center justify-center bg-gradient-to-br from-[#fefcf3] to-[#fef6de] p-8 sm:w-44 sm:p-10 lg:w-48">
                  {/* Number watermark */}
                  <span className="absolute left-3 top-2 select-none font-heading text-6xl font-bold text-gold/[0.08] transition-all duration-500 group-hover:text-gold/[0.18] sm:text-7xl">
                    {service.num}
                  </span>

                  {/* Icon circle */}
                  <div className="icon-float relative z-10">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-md ring-2 ring-gold/15 transition-all duration-500 group-hover:rotate-3 group-hover:scale-110 group-hover:bg-gold group-hover:ring-gold/40 group-hover:shadow-lg group-hover:shadow-gold/20 sm:h-24 sm:w-24 sm:rounded-3xl">
                      <Icon className="h-9 w-9 text-gold transition-colors duration-300 group-hover:text-navy sm:h-10 sm:w-10" />
                    </div>
                  </div>

                  {/* Decorative corner */}
                  <div className="absolute bottom-0 right-0 h-16 w-16 bg-gradient-to-tl from-gold/[0.06] to-transparent" />
                </div>

                {/* Right: Content */}
                <div className="relative flex flex-1 flex-col p-6 sm:p-7">
                  {/* Title */}
                  <h3 className="font-heading mb-3 text-xl font-bold text-navy sm:text-2xl">
                    {t(`services.${service.id}.title`)}
                  </h3>

                  {/* Description */}
                  <p className="mb-5 text-sm leading-relaxed text-[#4b5563] sm:text-base sm:leading-relaxed">
                    {t(`services.${service.id}.shortDescription`)}
                  </p>

                  {/* Case Type Tags */}
                  <div className="mb-5 flex flex-wrap gap-2">
                    {service.caseKeys.map((caseKey) => (
                      <span
                        key={caseKey}
                        className="inline-flex items-center gap-1.5 rounded-full bg-navy/[0.04] px-3 py-1.5 text-xs font-medium text-navy/70 transition-colors duration-300 group-hover:bg-gold/10 group-hover:text-navy"
                      >
                        <span className="h-1 w-1 rounded-full bg-gold" />
                        {tDetail(`${service.id}.cases.${caseKey}`)}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="relative z-10 mt-auto flex items-center gap-2 text-sm font-semibold text-gold transition-all duration-300 group-hover:gap-3">
                    {t('viewDetails')}
                    <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1.5" />
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-6 right-6 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-gold via-gold-light to-gold/0 transition-transform duration-500 group-hover:scale-x-100" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
