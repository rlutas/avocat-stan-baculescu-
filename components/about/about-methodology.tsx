'use client';

import { useTranslations } from 'next-intl';
import { LawIcon } from '@/components/icons';
import type { LawIconName } from '@/components/icons';

export function AboutMethodology() {
  const t = useTranslations('AboutPage.methodology');

  const steps: { iconName: LawIconName; stepKey: string; number: string }[] = [
    {
      iconName: 'conference',
      stepKey: 'step1',
      number: '01',
    },
    {
      iconName: 'law-book',
      stepKey: 'step2',
      number: '02',
    },
    {
      iconName: 'detective',
      stepKey: 'step3',
      number: '03',
    },
    {
      iconName: 'approval',
      stepKey: 'step4',
      number: '04',
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
        .delay-600 { animation-delay: 600ms; }
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

        {/* Steps */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="animate-fade-in-up group relative rounded-2xl border border-transparent bg-white p-6 shadow-sm ring-2 ring-transparent transition-all duration-500 hover:-translate-y-2 hover:border-gold hover:ring-gold/60 hover:shadow-xl"
              style={{ animationDelay: `${(index + 2) * 100}ms` }}
            >
              {/* Step Number */}
              <div className="mb-4 text-4xl font-bold text-gold/30 transition-colors duration-300 group-hover:text-gold/60">
                {step.number}
              </div>

              {/* Icon */}
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#fef9e7] transition-transform duration-300 group-hover:scale-110">
                <LawIcon name={step.iconName} size={24} variant="gold" />
              </div>

              {/* Content */}
              <h3 className="mb-2 text-lg font-semibold text-navy font-heading">
                {t(`${step.stepKey}.title`)}
              </h3>
              <p className="text-sm leading-relaxed text-[#4b5563]">
                {t(`${step.stepKey}.description`)}
              </p>

              {/* Connector Line (except last) */}
              {index < steps.length - 1 && (
                <div className="absolute -right-4 top-1/2 hidden h-px w-8 bg-gradient-to-r from-gold/50 to-transparent lg:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
