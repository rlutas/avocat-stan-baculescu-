'use client';

import { useTranslations } from 'next-intl';
import { Scale, Award, Users } from 'lucide-react';

export function AboutHistory() {
  const t = useTranslations('AboutPage.history');

  const milestones = [
    {
      icon: Scale,
      text: t('milestone1'),
    },
    {
      icon: Award,
      text: t('milestone2'),
    },
    {
      icon: Users,
      text: t('milestone3'),
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Image Placeholder */}
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-[#e5e7eb] to-[#d1d5db]">
              <div className="flex h-full w-full items-center justify-center">
                <Scale className="h-24 w-24 text-navy/30" />
              </div>
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl bg-gold/20" />
          </div>

          {/* Content */}
          <div>
            <h2 className="font-heading mb-6 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              {t('title')}
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-[#4b5563]">
              {t('description')}
            </p>

            {/* Milestones */}
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#fef9e7]">
                    <milestone.icon className="h-6 w-6 text-gold" />
                  </div>
                  <p className="text-[#1f2937]">{milestone.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
