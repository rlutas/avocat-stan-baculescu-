'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { LawIcon } from '@/components/icons';
import type { LawIconName } from '@/components/icons';
import { ScrollAnimate, StaggerContainer, StaggerItem } from '@/components/ui/scroll-animate';

const steps: {
  iconName: LawIconName;
  stepKey: string;
  number: string;
  gradient: string;
  image: string;
}[] = [
  {
    iconName: 'conference',
    stepKey: 'step1',
    number: '01',
    gradient: 'from-[#002a52] to-[#004a8f]',
    image: '/images/methodology/consultanta-initiala.webp',
  },
  {
    iconName: 'law-book',
    stepKey: 'step2',
    number: '02',
    gradient: 'from-[#003a70] to-[#1a5a90]',
    image: '/images/methodology/strategie-personalizata.webp',
  },
  {
    iconName: 'detective',
    stepKey: 'step3',
    number: '03',
    gradient: 'from-[#1a1a2e] to-[#16213e]',
    image: '/images/methodology/implementare.webp',
  },
  {
    iconName: 'approval',
    stepKey: 'step4',
    number: '04',
    gradient: 'from-[#002a52] to-[#003a70]',
    image: '/images/methodology/rezultate.webp',
  },
];

export function AboutMethodology() {
  const t = useTranslations('AboutPage.methodology');

  return (
    <section className="relative overflow-hidden bg-[#f8f9fa] py-20 sm:py-32">
      {/* Subtle top line */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-navy/10 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header — left-aligned */}
        <div className="mb-14 sm:mb-16">
          <ScrollAnimate>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              {t('label')}
            </p>
          </ScrollAnimate>

          <ScrollAnimate delay={0.1}>
            <h2 className="font-heading text-4xl font-bold leading-[1.1] text-navy sm:text-5xl lg:text-6xl">
              {t('title')}
            </h2>
            <div className="mt-4 h-[2px] w-20 bg-gold" />
          </ScrollAnimate>

          <ScrollAnimate delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
              {t('subtitle')}
            </p>
          </ScrollAnimate>
        </div>

        {/* Steps — identical premium card pattern to HomeMethodology */}
        <StaggerContainer
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
          staggerDelay={0.1}
        >
          {steps.map((step) => (
            <StaggerItem key={step.number} variant="scaleUp">
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/[0.04] transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-navy/10">

                {/* Visual header with image + number watermark */}
                <div
                  className={`relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br ${step.gradient} sm:h-48`}
                >
                  {/* Background image */}
                  <Image
                    src={step.image}
                    alt={t(`${step.stepKey}.title`)}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />

                  {/* Dark gradient overlay — lighter to show photos */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-navy/35 to-navy/20 transition-opacity duration-500 group-hover:from-navy/50 group-hover:via-navy/25 group-hover:to-navy/10" />

                  {/* Number watermark */}
                  <span className="absolute inset-0 z-[1] flex items-center justify-center font-heading text-[120px] font-bold leading-none text-white/[0.06] transition-all duration-500 group-hover:text-white/[0.1] sm:text-[140px]">
                    {step.number}
                  </span>

                  {/* Icon */}
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-xl bg-navy/60 ring-1 ring-white/20 transition-all duration-500 group-hover:scale-110 group-hover:bg-gold/20 group-hover:ring-gold/30">
                    <LawIcon name={step.iconName} size={32} variant="white" />
                  </div>

                  {/* Gold bottom reveal line inside image */}
                  <div className="absolute bottom-0 left-0 z-[1] h-[2px] w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                </div>

                {/* Card content */}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-gold">
                    {step.number}
                  </div>
                  <h3 className="mb-2 font-heading text-lg font-semibold text-navy transition-colors duration-300 group-hover:text-gold sm:text-xl">
                    {t(`${step.stepKey}.title`)}
                  </h3>
                  <p className="flex-1 text-sm leading-relaxed text-text-secondary">
                    {t(`${step.stepKey}.description`)}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
