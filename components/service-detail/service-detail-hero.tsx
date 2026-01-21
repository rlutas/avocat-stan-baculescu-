'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowLeft } from 'lucide-react';
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

const serviceIcons: Record<string, LucideIcon> = {
  'malpraxis-medical': Stethoscope,
  'drept-civil': Scale,
  'drept-penal': Gavel,
  'drept-familiei': Users,
  'dreptul-muncii': Briefcase,
  'drept-comercial': Building2,
  'accidente-rutiere': Car,
  'drept-administrativ-fiscal': FileText,
};

interface ServiceDetailHeroProps {
  serviceId: string;
}

export function ServiceDetailHero({ serviceId }: ServiceDetailHeroProps) {
  const t = useTranslations('ServiceDetail');
  const tCommon = useTranslations('ServicesPage');
  const Icon = serviceIcons[serviceId] || Scale;

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#002a52_0%,#003a70_50%,#004a8f_100%)] py-16 sm:py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(30deg,transparent_24%,rgba(255,255,255,0.04)_25%,rgba(255,255,255,0.04)_26%,transparent_27%,transparent_74%,rgba(255,255,255,0.04)_75%,rgba(255,255,255,0.04)_76%,transparent_77%)] bg-[length:50px_50px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/servicii"
          className="mb-8 inline-flex items-center text-sm font-medium text-white/70 transition-colors hover:text-gold"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('backToServices')}
        </Link>

        <div className="lg:flex lg:items-center lg:gap-12">
          {/* Icon */}
          <div className="mb-8 lg:mb-0">
            <div className="inline-flex h-24 w-24 items-center justify-center rounded-2xl bg-gold/10 text-gold">
              <Icon className="h-12 w-12" />
            </div>
          </div>

          {/* Content */}
          <div className="lg:flex-1">
            <h1 className="font-heading mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {t(`${serviceId}.title`)}
            </h1>
            <p className="text-lg leading-relaxed text-white/80 sm:text-xl">
              {t(`${serviceId}.subtitle`)}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
