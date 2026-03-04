'use client';

import { useTranslations } from 'next-intl';
import { LawIcon } from '@/components/icons';
import type { LawIconName } from '@/components/icons';

export function AboutPrinciples() {
  const t = useTranslations('AboutPage.principles');

  const principles: { iconName: LawIconName; titleKey: string; stat: string; statLabel: string }[] = [
    {
      iconName: 'target',
      titleKey: 'motivation',
      stat: '100%',
      statLabel: t('statMotivation'),
    },
    {
      iconName: 'shield-badge',
      titleKey: 'seriousness',
      stat: '24/7',
      statLabel: t('statSeriousness'),
    },
    {
      iconName: 'diploma',
      titleKey: 'experience',
      stat: '15+',
      statLabel: t('statExperience'),
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-24">
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
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out both;
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }
      `}</style>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="animate-fade-in-up font-heading mb-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            {t('title')}
          </h2>
          <p className="animate-fade-in-up delay-100 mx-auto max-w-2xl text-lg text-[#4b5563]">
            {t('subtitle')}
          </p>
        </div>

        {/* Principles */}
        <div className="grid gap-8 md:grid-cols-3">
          {principles.map((principle, index) => (
            <div
              key={index}
              className="animate-fade-in-up group relative overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:border-gold hover:ring-2 hover:ring-gold/60 hover:shadow-xl"
              style={{ animationDelay: `${(index + 2) * 100}ms` }}
            >
              {/* Background Number */}
              <div className="absolute -right-4 -top-4 text-[120px] font-bold leading-none text-[#f3f4f6] transition-colors duration-300 group-hover:text-gold/10">
                {index + 1}
              </div>

              {/* Floating Stat Badge */}
              <div className="animate-float absolute -right-2 top-6 rounded-xl bg-white px-4 py-2 shadow-lg ring-1 ring-gold/20" style={{ animationDelay: `${index * 200}ms` }}>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-gold to-gold-light shadow-md">
                    <span className="text-xs font-bold text-navy">{principle.stat}</span>
                  </div>
                  <p className="text-xs font-medium text-navy whitespace-nowrap">{principle.statLabel}</p>
                </div>
              </div>

              <div className="relative">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-navy transition-transform duration-300 group-hover:scale-110">
                  <LawIcon name={principle.iconName} size={24} variant="white" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-navy font-heading">
                  {t(`${principle.titleKey}.title`)}
                </h3>
                <p className="leading-relaxed text-[#4b5563]">
                  {t(`${principle.titleKey}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
