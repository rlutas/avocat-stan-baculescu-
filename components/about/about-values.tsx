'use client';

import { useTranslations } from 'next-intl';
import { Briefcase, RefreshCw, Heart } from 'lucide-react';

export function AboutValues() {
  const t = useTranslations('AboutPage.values');

  const values = [
    {
      icon: Briefcase,
      titleKey: 'professionalism',
    },
    {
      icon: RefreshCw,
      titleKey: 'adaptability',
    },
    {
      icon: Heart,
      titleKey: 'loyalty',
    },
  ];

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
          animation: fadeInUp 1s ease-out both;
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

        {/* Values Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {values.map((value, index) => (
            <div
              key={index}
              className="animate-fade-in-up group rounded-2xl border border-transparent bg-white p-8 shadow-sm ring-2 ring-transparent transition-all duration-500 hover:-translate-y-2 hover:border-gold hover:ring-gold/60 hover:shadow-xl"
              style={{ animationDelay: `${(index + 2) * 100}ms` }}
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#fef9e7] transition-transform duration-300 group-hover:scale-110">
                <value.icon className="h-7 w-7 text-gold" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-navy font-heading">
                {t(`${value.titleKey}.title`)}
              </h3>
              <p className="leading-relaxed text-[#4b5563]">
                {t(`${value.titleKey}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
