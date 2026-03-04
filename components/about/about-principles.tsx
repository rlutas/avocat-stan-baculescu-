'use client';

import { useTranslations } from 'next-intl';
import { LawIcon } from '@/components/icons';
import type { LawIconName } from '@/components/icons';
import { ScrollAnimate, StaggerContainer, StaggerItem } from '@/components/ui/scroll-animate';

const principles: {
  iconName: LawIconName;
  titleKey: string;
  stat: string;
  statKey: string;
  number: string;
}[] = [
  {
    iconName: 'target',
    titleKey: 'motivation',
    stat: '100%',
    statKey: 'statMotivation',
    number: '01',
  },
  {
    iconName: 'shield-badge',
    titleKey: 'seriousness',
    stat: '24/7',
    statKey: 'statSeriousness',
    number: '02',
  },
  {
    iconName: 'diploma',
    titleKey: 'experience',
    stat: '20+',
    statKey: 'statExperience',
    number: '03',
  },
];

export function AboutPrinciples() {
  const t = useTranslations('AboutPage.principles');

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#002a52_0%,#003a70_60%,#004a8f_100%)] py-20 sm:py-28">
      {/* Subtle grid pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Gold radial glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '800px',
          height: '800px',
          background:
            'radial-gradient(circle, rgba(208,156,17,0.08) 0%, rgba(208,156,17,0.02) 50%, transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-14 text-center sm:mb-16">
          <ScrollAnimate>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              {t('label')}
            </p>
          </ScrollAnimate>

          <ScrollAnimate delay={0.1}>
            <h2 className="font-heading text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
              {t('title')}
            </h2>
            <div className="mx-auto mt-4 h-[2px] w-24 bg-gold" />
          </ScrollAnimate>

          <ScrollAnimate delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
              {t('subtitle')}
            </p>
          </ScrollAnimate>
        </div>

        {/* Principles grid */}
        <StaggerContainer
          className="grid gap-5 sm:gap-6 md:grid-cols-3"
          staggerDelay={0.12}
        >
          {principles.map((p) => (
            <StaggerItem key={p.titleKey} variant="scaleUp">
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] shadow-lg shadow-black/10 transition-all duration-500 hover:-translate-y-2 hover:border-gold/30 hover:bg-white/[0.10] hover:shadow-xl hover:shadow-gold/5">

                {/* Gold top accent */}
                <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent transition-all duration-500 group-hover:via-gold/80" />

                <div className="relative flex flex-1 flex-col p-6 sm:p-8">
                  {/* Top row: icon + stat */}
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gold/10 ring-1 ring-gold/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-gold/20 group-hover:ring-gold/40">
                      <LawIcon name={p.iconName} size={26} variant="gold" />
                    </div>
                    <div className="text-right">
                      <span className="font-heading text-3xl font-bold text-gold sm:text-4xl">
                        {p.stat}
                      </span>
                      <p className="text-xs font-medium text-white/50">
                        {t(p.statKey)}
                      </p>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 font-heading text-xl font-bold text-white transition-colors duration-300 group-hover:text-gold">
                    {t(`${p.titleKey}.title`)}
                  </h3>

                  {/* Description */}
                  <p className="flex-1 text-[15px] leading-relaxed text-white/60">
                    {t(`${p.titleKey}.description`)}
                  </p>
                </div>

                {/* Gold bottom line reveal */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gold transition-all duration-500 group-hover:w-full" />
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
