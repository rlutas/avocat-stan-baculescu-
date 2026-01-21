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
} from 'lucide-react';

const services = [
  {
    id: 'malpraxis-medical',
    icon: Stethoscope,
    slug: '/servicii/malpraxis-medical',
  },
  {
    id: 'drept-civil',
    icon: Scale,
    slug: '/servicii/drept-civil',
  },
  {
    id: 'drept-penal',
    icon: Gavel,
    slug: '/servicii/drept-penal',
  },
  {
    id: 'drept-familiei',
    icon: Users,
    slug: '/servicii/drept-familiei',
  },
  {
    id: 'dreptul-muncii',
    icon: Briefcase,
    slug: '/servicii/dreptul-muncii',
  },
  {
    id: 'drept-comercial',
    icon: Building2,
    slug: '/servicii/drept-comercial',
  },
  {
    id: 'accidente-rutiere',
    icon: Car,
    slug: '/servicii/accidente-rutiere',
  },
  {
    id: 'drept-administrativ-fiscal',
    icon: FileText,
    slug: '/servicii/drept-administrativ-fiscal',
  },
];

export function ServicesGrid() {
  const t = useTranslations('ServicesPage');

  return (
    <section className="bg-[#f8f9fa] py-16 sm:py-24">
      <style jsx>{`
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
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out both;
        }
        .delay-0 { animation-delay: 0ms; }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }
        .delay-600 { animation-delay: 600ms; }
        .delay-700 { animation-delay: 700ms; }
      `}</style>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            const delayClass = `delay-${index * 100}`;
            return (
              <Link
                key={service.id}
                href={service.slug}
                className={`animate-fade-in-up ${delayClass} group relative overflow-hidden rounded-2xl border border-transparent bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-gold hover:ring-2 hover:ring-gold/60 hover:shadow-xl`}
              >
                {/* Top Accent Line */}
                <div className="absolute left-0 right-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-navy to-gold transition-transform duration-300 group-hover:scale-x-100" />

                {/* Icon in decorative circle */}
                <div className="relative mb-5">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fef9e7] text-gold transition-all duration-300 group-hover:bg-gold group-hover:text-navy group-hover:shadow-lg group-hover:shadow-gold/20">
                    <Icon className="h-7 w-7" />
                  </div>
                  {/* Decorative ring on hover */}
                  <div className="absolute -inset-1 rounded-2xl ring-2 ring-transparent transition-all duration-300 group-hover:ring-gold/20" />
                </div>

                {/* Title */}
                <h3 className="font-heading mb-3 text-xl font-semibold text-navy transition-colors duration-300">
                  {t(`services.${service.id}.title`)}
                </h3>

                {/* Description */}
                <p className="mb-5 text-sm leading-relaxed text-[#4b5563]">
                  {t(`services.${service.id}.shortDescription`)}
                </p>

                {/* Learn More Link */}
                <span className="inline-flex items-center text-sm font-semibold text-navy transition-colors duration-300 group-hover:text-gold">
                  {t('viewDetails')}
                  <svg
                    className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
