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
  LucideIcon,
} from 'lucide-react';

const allServices = [
  { id: 'malpraxis-medical', icon: Stethoscope },
  { id: 'drept-civil', icon: Scale },
  { id: 'drept-penal', icon: Gavel },
  { id: 'drept-familiei', icon: Users },
  { id: 'dreptul-muncii', icon: Briefcase },
  { id: 'drept-comercial', icon: Building2 },
  { id: 'accidente-rutiere', icon: Car },
  { id: 'drept-administrativ-fiscal', icon: FileText },
];

// Define related services for each service
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

export function ServiceDetailRelated({
  currentServiceId,
}: ServiceDetailRelatedProps) {
  const t = useTranslations('ServiceDetail');
  const tServices = useTranslations('ServicesPage');

  const relatedIds = relatedServicesMap[currentServiceId] || [];
  const relatedServices = relatedIds
    .map((id) => allServices.find((s) => s.id === id))
    .filter(Boolean) as { id: string; icon: LucideIcon }[];

  if (relatedServices.length === 0) {
    return null;
  }

  return (
    <section className="bg-slate-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 sm:text-3xl">
          {t('relatedServices')}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {relatedServices.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.id}
                href={`/servicii/${service.id}`}
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
                  {tServices(`services.${service.id}.title`)}
                </h3>

                {/* Description */}
                <p className="mb-4 text-sm text-slate-600">
                  {tServices(`services.${service.id}.shortDescription`)}
                </p>

                {/* Learn More */}
                <span className="inline-flex items-center text-sm font-medium text-slate-700 transition-colors duration-300 group-hover:text-amber-600">
                  {tServices('viewDetails')}
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
