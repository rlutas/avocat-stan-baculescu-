'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { LawIcon } from '@/components/icons';
import type { LawIconName } from '@/components/icons';
import { ScrollAnimate, StaggerContainer, StaggerItem } from '@/components/ui/scroll-animate';

const values: { iconName: LawIconName; titleKey: string }[] = [
  { iconName: 'certificate', titleKey: 'professionalism' },
  { iconName: 'shield',      titleKey: 'adaptability'    },
  { iconName: 'medal',       titleKey: 'loyalty'          },
];

export function AboutValues() {
  const t = useTranslations('AboutPage.values');

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-32">
      {/* Subtle top line */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-navy/10 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header — centered */}
        <div className="mb-14 text-center sm:mb-16">
          <ScrollAnimate>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              {t('label')}
            </p>
          </ScrollAnimate>

          <ScrollAnimate delay={0.1}>
            <h2 className="font-heading text-4xl font-bold leading-[1.1] text-navy sm:text-5xl lg:text-6xl">
              {t('title')}
            </h2>
            <div className="mx-auto mt-4 h-[2px] w-24 bg-gold" />
          </ScrollAnimate>

          <ScrollAnimate delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
              {t('subtitle')}
            </p>
          </ScrollAnimate>
        </div>

        {/* Team meeting photo banner */}
        <ScrollAnimate delay={0.3} variant="fadeIn">
          <div className="relative mb-12 overflow-hidden rounded-2xl sm:mb-14">
            <div className="relative h-56 sm:h-72 lg:h-80">
              <Image
                src="/images/team/echipa-in-meeting-2.webp"
                alt="Echipa Stan-Baculescu in sedinta de lucru"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
              {/* Subtle gradient overlay for polish */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-navy/10" />
              {/* Gold bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
            </div>
          </div>
        </ScrollAnimate>

        {/* Values grid */}
        <StaggerContainer
          className="grid gap-6 md:grid-cols-3"
          staggerDelay={0.12}
        >
          {values.map((value) => (
            <StaggerItem key={value.titleKey} variant="scaleUp">
              {/* Card with gold bottom line reveal on hover */}
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/[0.04] transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-navy/10">

                {/* Top accent: thin gold bar that reveals on hover */}
                <div className="absolute left-0 top-0 h-[3px] w-0 bg-gold transition-all duration-500 group-hover:w-full" />

                <div className="flex flex-1 flex-col p-8">
                  {/* Icon container */}
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-[#fef9e7] transition-all duration-300 group-hover:scale-110 group-hover:bg-gold/20">
                    <LawIcon name={value.iconName} size={32} variant="gold" />
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 font-heading text-xl font-semibold text-navy transition-colors duration-300 group-hover:text-gold sm:text-2xl">
                    {t(`${value.titleKey}.title`)}
                  </h3>

                  {/* Description */}
                  <p className="flex-1 text-base leading-relaxed text-text-secondary">
                    {t(`${value.titleKey}.description`)}
                  </p>
                </div>

                {/* Gold bottom line reveal */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gold transition-all duration-500 group-hover:w-full" />
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Bottom transition line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </section>
  );
}
