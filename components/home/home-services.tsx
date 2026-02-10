'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
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

const services = [
  { id: 'malpraxis-medical', icon: Stethoscope, slug: '/servicii/malpraxis-medical', num: '01' },
  { id: 'drept-civil', icon: Scale, slug: '/servicii/drept-civil', num: '02' },
  { id: 'drept-penal', icon: Gavel, slug: '/servicii/drept-penal', num: '03' },
  { id: 'drept-familiei', icon: Users, slug: '/servicii/drept-familiei', num: '04' },
  { id: 'dreptul-muncii', icon: Briefcase, slug: '/servicii/dreptul-muncii', num: '05' },
  { id: 'drept-comercial', icon: Building2, slug: '/servicii/drept-comercial', num: '06' },
  { id: 'accidente-rutiere', icon: Car, slug: '/servicii/accidente-rutiere', num: '07' },
  { id: 'drept-administrativ-fiscal', icon: FileText, slug: '/servicii/drept-administrativ-fiscal', num: '08' },
];

export function HomeServices() {
  const t = useTranslations('HomePage.services');
  const tServices = useTranslations('ServicesPage.services');

  return (
    <section className="bg-[#f8f9fa] py-16 sm:py-24">
      <style jsx>{`
        @keyframes revealCard {
          0% {
            opacity: 0;
            transform: translateY(50px) scale(0.92);
            filter: blur(3px);
          }
          65% {
            opacity: 1;
            transform: translateY(-4px) scale(1.01);
            filter: blur(0);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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
        @keyframes iconPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(208, 156, 17, 0.4);
          }
          70% {
            box-shadow: 0 0 0 12px rgba(208, 156, 17, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(208, 156, 17, 0);
          }
        }
        .service-card {
          animation: revealCard 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .service-card::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(
            105deg,
            transparent 40%,
            rgba(208, 156, 17, 0.06) 45%,
            rgba(208, 156, 17, 0.1) 50%,
            rgba(208, 156, 17, 0.06) 55%,
            transparent 60%
          );
          transform: translateX(-100%);
          pointer-events: none;
          border-radius: inherit;
        }
        .service-card:hover::after {
          animation: shimmerSweep 0.7s ease-out;
        }
        .service-card:hover .icon-ring {
          animation: iconPulse 0.8s ease-out;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out both;
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
      `}</style>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 text-center">
          <div className="animate-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-2">
            <Scale className="h-4 w-4 text-gold" />
            <span className="text-sm font-semibold text-gold">{t('trustBadge')}</span>
          </div>

          <p className="animate-fade-in-up delay-100 mb-2 text-sm font-semibold uppercase tracking-widest text-gold">
            {t('titleLine1')}
          </p>
          <h2 className="animate-fade-in-up delay-200 font-heading mb-4 text-3xl font-bold text-navy md:text-4xl lg:text-5xl">
            {t('titleLine2')}
          </h2>
          <p className="animate-fade-in-up delay-300 mx-auto max-w-2xl text-lg text-[#4b5563]">
            {t('description')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.id}
                href={service.slug}
                className="service-card group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-3 hover:border-gold/40 hover:shadow-[0_20px_40px_rgba(0,58,112,0.12),0_0_0_1px_rgba(208,156,17,0.2)]"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                {/* Number Watermark */}
                <span className="absolute right-4 top-3 select-none font-heading text-5xl font-bold text-navy/[0.04] transition-all duration-500 group-hover:text-gold/[0.12] group-hover:scale-110">
                  {service.num}
                </span>

                {/* Left Gold Accent */}
                <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full bg-gold/20 transition-all duration-500 group-hover:top-4 group-hover:bottom-4 group-hover:bg-gold group-hover:shadow-[0_0_8px_rgba(208,156,17,0.4)]" />

                {/* Icon */}
                <div className="relative z-10 mb-5 pl-2">
                  <div className="icon-ring relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#fef9e7] to-[#fdf0c8] ring-2 ring-gold/20 transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-gold group-hover:to-gold-light group-hover:ring-gold/50 group-hover:scale-110 group-hover:rotate-6">
                    <Icon className="h-6 w-6 text-gold transition-colors duration-300 group-hover:text-navy" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="relative z-10 pl-2 font-heading mb-2 text-lg font-semibold text-navy transition-colors duration-300 group-hover:text-navy">
                  {tServices(`${service.id}.title`)}
                </h3>

                {/* Description */}
                <p className="relative z-10 pl-2 mb-5 flex-grow text-sm leading-relaxed text-[#6b7280] transition-colors duration-300 group-hover:text-[#4b5563]">
                  {tServices(`${service.id}.shortDescription`)}
                </p>

                {/* Arrow Link */}
                <div className="relative z-10 pl-2 mt-auto flex items-center gap-2 text-sm font-semibold text-gold/70 transition-all duration-300 group-hover:text-gold group-hover:gap-3">
                  {t('viewDetails')}
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                </div>

                {/* Bottom Gold Line - grows from center on hover */}
                <div className="absolute bottom-0 left-1/2 h-[3px] w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-gold/0 via-gold to-gold/0 transition-all duration-500 group-hover:w-4/5" />
              </Link>
            );
          })}
        </div>

        {/* View All Services */}
        <div
          className="animate-fade-in-up mt-14 text-center"
          style={{ animationDelay: '800ms' }}
        >
          <Button
            asChild
            size="lg"
            className="group h-12 rounded-full border-2 border-gold bg-transparent px-8 text-base font-semibold text-gold transition-all duration-300 hover:bg-gold hover:text-navy hover:shadow-lg hover:shadow-gold/30"
          >
            <Link href="/servicii">
              {t('viewAll')}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
