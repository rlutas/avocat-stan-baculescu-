'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { LawIcon } from '@/components/icons';
import { ScrollAnimate, StaggerContainer, StaggerItem } from '@/components/ui/scroll-animate';
import { motion } from 'framer-motion';

export function AboutHistory() {
  const t = useTranslations('AboutPage.history');

  const milestones = [
    { iconName: 'balance-scale' as const, key: 'milestone1' },
    { iconName: 'medal' as const,         key: 'milestone2' },
    { iconName: 'conference' as const,    key: 'milestone3' },
  ];

  return (
    <section className="relative overflow-hidden bg-[#f8f9fa] py-20 sm:py-32">
      {/* Subtle section transition from hero */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-0">

          {/* Left: full-bleed office photo — mirrors the Why Us pattern */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="relative h-full min-h-[480px] overflow-hidden rounded-2xl lg:rounded-r-none lg:rounded-l-2xl sm:min-h-[560px] lg:min-h-[600px]">
              {/* Photo */}
              <Image
                src="/images/team/fondatori-societatea-civila-de-avocat-stan-baculescu.webp"
                alt="Fondatorii Stan-Baculescu - Camelia Stan si Vlad Baculescu"
                fill
                className="object-cover object-top transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Gradient overlay — lighter to show founders clearly */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/25 to-navy/5" />

              {/* Floating year badge */}
              <motion.div
                className="absolute left-6 top-6 sm:left-8 sm:top-8"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="rounded-xl bg-navy/80 px-4 py-3 ring-1 ring-white/20">
                  <p className="font-heading text-3xl font-bold text-gold">2009</p>
                  <p className="text-xs font-medium uppercase tracking-wider text-white/70">
                    {t('foundedLabel')}
                  </p>
                </div>
              </motion.div>

              {/* Gold vertical right edge line */}
              <motion.div
                className="absolute right-0 top-[10%] hidden h-[80%] w-[2px] bg-gradient-to-b from-transparent via-gold/40 to-transparent lg:block"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
                style={{ transformOrigin: 'top' }}
              />
            </div>
          </motion.div>

          {/* Right: content panel — navy to match the split pattern */}
          <div className="flex flex-col justify-center rounded-2xl bg-navy p-8 sm:p-10 lg:rounded-l-none lg:rounded-r-2xl lg:p-14">
            <ScrollAnimate>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                {t('label')}
              </p>
            </ScrollAnimate>

            <ScrollAnimate delay={0.1}>
              <h2 className="font-heading text-3xl font-bold leading-[1.1] text-white sm:text-4xl lg:text-5xl">
                {t('title')}
              </h2>
              <div className="mt-4 h-[2px] w-16 bg-gold" />
            </ScrollAnimate>

            <ScrollAnimate delay={0.2}>
              <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">
                {t('description')}
              </p>
            </ScrollAnimate>

            {/* Milestones — staggered */}
            <StaggerContainer className="mt-8 space-y-4 sm:mt-10" staggerDelay={0.1}>
              {milestones.map((m) => (
                <StaggerItem key={m.key}>
                  <div className="group flex gap-4 rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 transition-all duration-500 hover:border-gold/20 hover:bg-white/[0.06] sm:p-5">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gold/15 transition-colors duration-300 group-hover:bg-gold/25">
                      <LawIcon name={m.iconName} size={24} variant="gold" />
                    </div>
                    <div className="flex items-center">
                      <p className="text-sm font-medium leading-relaxed text-white/70 transition-colors duration-300 group-hover:text-white sm:text-base">
                        {t(m.key)}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

        </div>
      </div>
    </section>
  );
}
