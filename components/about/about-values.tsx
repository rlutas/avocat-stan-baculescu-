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
    <section className="bg-slate-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            {t('subtitle')}
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {values.map((value, index) => (
            <div
              key={index}
              className="group rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 transition-transform duration-300 group-hover:scale-110">
                <value.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-slate-900">
                {t(`${value.titleKey}.title`)}
              </h3>
              <p className="leading-relaxed text-slate-600">
                {t(`${value.titleKey}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
