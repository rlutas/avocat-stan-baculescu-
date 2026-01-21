'use client';

import { useTranslations } from 'next-intl';
import { MessageSquare, FileText, Cog, CheckCircle2 } from 'lucide-react';

export function AboutMethodology() {
  const t = useTranslations('AboutPage.methodology');

  const steps = [
    {
      icon: MessageSquare,
      stepKey: 'step1',
      number: '01',
    },
    {
      icon: FileText,
      stepKey: 'step2',
      number: '02',
    },
    {
      icon: Cog,
      stepKey: 'step3',
      number: '03',
    },
    {
      icon: CheckCircle2,
      stepKey: 'step4',
      number: '04',
    },
  ];

  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-300">
            {t('subtitle')}
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative rounded-2xl bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
            >
              {/* Step Number */}
              <div className="mb-4 text-4xl font-bold text-amber-500/30">
                {step.number}
              </div>

              {/* Icon */}
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10">
                <step.icon className="h-6 w-6 text-amber-500" />
              </div>

              {/* Content */}
              <h3 className="mb-2 text-lg font-semibold text-white">
                {t(`${step.stepKey}.title`)}
              </h3>
              <p className="text-sm leading-relaxed text-slate-400">
                {t(`${step.stepKey}.description`)}
              </p>

              {/* Connector Line (except last) */}
              {index < steps.length - 1 && (
                <div className="absolute -right-4 top-1/2 hidden h-px w-8 bg-gradient-to-r from-amber-500/50 to-transparent lg:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
