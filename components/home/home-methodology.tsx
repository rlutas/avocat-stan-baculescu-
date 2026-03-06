'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { LawIcon } from '@/components/icons';
import type { LawIconName } from '@/components/icons';
import { ScrollAnimate, StaggerContainer, StaggerItem } from '@/components/ui/scroll-animate';

const steps: { iconName: LawIconName; stepKey: string; number: string; gradient: string; image: string }[] = [
  { iconName: 'conference', stepKey: 'step1', number: '01', gradient: 'from-[#002a52] to-[#004a8f]', image: '/images/methodology/consultanta-initiala.webp' },
  { iconName: 'law-book', stepKey: 'step2', number: '02', gradient: 'from-[#003a70] to-[#1a5a90]', image: '/images/methodology/strategie-personalizata.webp' },
  { iconName: 'detective', stepKey: 'step3', number: '03', gradient: 'from-[#1a1a2e] to-[#16213e]', image: '/images/methodology/implementare.webp' },
  { iconName: 'approval', stepKey: 'step4', number: '04', gradient: 'from-[#002a52] to-[#003a70]', image: '/images/methodology/rezultate.webp' },
];

export function HomeMethodology() {
  const t = useTranslations('HomePage.methodology');
  const tSteps = useTranslations('AboutPage.methodology');

  return (
    <section className="bg-navy py-20 sm:py-32">
      {/* Subtle pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 sm:mb-16">
          <ScrollAnimate>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              {t('titleLine1')}
            </p>
          </ScrollAnimate>
          <ScrollAnimate delay={0.1}>
            <h2 className="font-heading text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
              {t('titleLine2')}
            </h2>
            <div className="mt-4 h-[2px] w-20 bg-gold" />
          </ScrollAnimate>
          <ScrollAnimate delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
              {t('description')}
            </p>
          </ScrollAnimate>
        </div>

        {/* Steps - large visual cards */}
        <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6" staggerDelay={0.1}>
          {steps.map((step) => (
            <StaggerItem key={step.number} variant="scaleUp">
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] transition-all duration-500 hover:-translate-y-2 hover:border-gold/20 hover:bg-white/[0.06]">
                {/* Visual header with large number */}
                <div className={`relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br ${step.gradient} sm:h-48`}>
                  {/* Background image */}
                  <Image
                    src={step.image}
                    alt={tSteps(`${step.stepKey}.title`)}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />

                  {/* Dark gradient overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/50 to-navy/30 transition-opacity duration-500 group-hover:from-navy/70 group-hover:via-navy/40 group-hover:to-navy/20" />

                  {/* Number watermark */}
                  <span className="absolute inset-0 z-[1] flex items-center justify-center font-heading text-[120px] font-bold leading-none text-white/[0.06] transition-all duration-500 group-hover:text-white/[0.1] sm:text-[140px]">
                    {step.number}
                  </span>

                  {/* Icon */}
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-gold/20 group-hover:ring-gold/30">
                    <LawIcon name={step.iconName} size={32} variant="white" />
                  </div>

                  {/* Gold line bottom */}
                  <div className="absolute bottom-0 left-0 z-[1] h-[2px] w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-gold">
                    {step.number}
                  </div>
                  <h3 className="mb-2 font-heading text-lg font-semibold text-white transition-colors duration-300 group-hover:text-gold sm:text-xl">
                    {tSteps(`${step.stepKey}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/50">
                    {tSteps(`${step.stepKey}.description`)}
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
