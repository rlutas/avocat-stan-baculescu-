'use client';

import { useTranslations } from 'next-intl';
import { Target, ShieldCheck, GraduationCap } from 'lucide-react';

export function AboutPrinciples() {
  const t = useTranslations('AboutPage.principles');

  const principles = [
    {
      icon: Target,
      titleKey: 'motivation',
    },
    {
      icon: ShieldCheck,
      titleKey: 'seriousness',
    },
    {
      icon: GraduationCap,
      titleKey: 'experience',
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="font-heading mb-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#4b5563]">
            {t('subtitle')}
          </p>
        </div>

        {/* Principles */}
        <div className="grid gap-8 md:grid-cols-3">
          {principles.map((principle, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white p-8 transition-all duration-300 hover:border-gold hover:shadow-lg"
            >
              {/* Background Number */}
              <div className="absolute -right-4 -top-4 text-[120px] font-bold leading-none text-[#f3f4f6]">
                {index + 1}
              </div>

              <div className="relative">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-navy">
                  <principle.icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-navy">
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
