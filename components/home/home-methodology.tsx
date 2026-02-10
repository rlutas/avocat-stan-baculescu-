'use client';

import { useTranslations } from 'next-intl';
import { MessageSquare, FileText, Cog, CheckCircle2, Workflow } from 'lucide-react';

const steps = [
  { icon: MessageSquare, stepKey: 'step1', number: '01' },
  { icon: FileText, stepKey: 'step2', number: '02' },
  { icon: Cog, stepKey: 'step3', number: '03' },
  { icon: CheckCircle2, stepKey: 'step4', number: '04' },
];

export function HomeMethodology() {
  const t = useTranslations('HomePage.methodology');
  const tSteps = useTranslations('AboutPage.methodology');

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
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out both;
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
      `}</style>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <div className="animate-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-2">
            <Workflow className="h-4 w-4 text-gold" />
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

        {/* Steps Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="animate-fade-in-up group relative rounded-2xl border border-transparent bg-[#f8f9fa] p-6 transition-all duration-500 hover:-translate-y-2 hover:border-gold hover:bg-white hover:ring-2 hover:ring-gold/60 hover:shadow-xl"
                style={{ animationDelay: `${(index + 4) * 100}ms` }}
              >
                {/* Step Number Watermark */}
                <div className="mb-4 text-4xl font-bold text-gold/20 transition-colors duration-300 group-hover:text-gold/40">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#fef9e7] transition-all duration-300 group-hover:bg-gold group-hover:shadow-lg group-hover:shadow-gold/20">
                  <Icon className="h-6 w-6 text-gold transition-colors duration-300 group-hover:text-navy" />
                </div>

                {/* Content */}
                <h3 className="mb-2 font-heading text-lg font-semibold text-navy">
                  {tSteps(`${step.stepKey}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-[#4b5563]">
                  {tSteps(`${step.stepKey}.description`)}
                </p>

                {/* Connector Line (desktop only, except last) */}
                {index < steps.length - 1 && (
                  <div className="absolute -right-4 top-1/2 hidden h-px w-8 bg-gradient-to-r from-gold/40 to-transparent lg:block" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
