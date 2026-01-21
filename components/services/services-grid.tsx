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
    <section className="bg-slate-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.id}
                href={service.slug}
                className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                {/* Top Accent Line */}
                <div className="absolute left-0 right-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-slate-800 to-amber-500 transition-transform duration-300 group-hover:scale-x-100" />

                {/* Icon */}
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-amber-50 text-amber-600 transition-colors duration-300 group-hover:bg-amber-500 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>

                {/* Title */}
                <h3 className="mb-2 font-serif text-xl font-semibold text-slate-800 transition-colors duration-300 group-hover:text-slate-900">
                  {t(`services.${service.id}.title`)}
                </h3>

                {/* Description */}
                <p className="mb-4 text-sm text-slate-600">
                  {t(`services.${service.id}.shortDescription`)}
                </p>

                {/* Learn More Link */}
                <span className="inline-flex items-center text-sm font-medium text-slate-700 transition-colors duration-300 group-hover:text-amber-600">
                  {t('viewDetails')}
                  <svg
                    className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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
