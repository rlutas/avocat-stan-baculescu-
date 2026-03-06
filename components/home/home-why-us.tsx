'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { LawIcon } from '@/components/icons';
import { ScrollAnimate, StaggerContainer, StaggerItem } from '@/components/ui/scroll-animate';
import { motion } from 'framer-motion';

export function HomeWhyUs() {
  const t = useTranslations('HomePage.whyUs');

  const stats = [
    { value: t('stat1Value'), label: t('stat1Label') },
    { value: t('stat2Value'), label: t('stat2Label') },
    { value: t('stat3Value'), label: t('stat3Label') },
  ];

  const values = [
    { title: t('value1Title'), description: t('value1Description'), icon: 'medal' as const },
    { title: t('value2Title'), description: t('value2Description'), icon: 'conference' as const },
    { title: t('value3Title'), description: t('value3Description'), icon: 'shield' as const },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-0">

          {/* Left: Full-bleed photo panel */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="relative h-full min-h-[500px] overflow-hidden rounded-2xl lg:rounded-r-none lg:rounded-l-2xl sm:min-h-[600px] lg:min-h-[650px]">
              {/* Photo - full coverage */}
              <Image
                src="/images/receptie-stan-baculescu.webp"
                alt="Cabinet Stan-Baculescu"
                fill
                className="object-cover object-left"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />

              {/* Gradient overlay - darker at bottom for text, lighter at top to show photo */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-navy/20" />

              {/* Stats positioned at the bottom of the image */}
              <div className="absolute inset-x-0 bottom-0 z-10 p-8 sm:p-10 lg:p-12">
                {/* Main stat - dramatic entrance */}
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, scale: 1.3, filter: 'blur(10px)' }}
                  whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <div className="font-heading text-7xl font-bold text-gold drop-shadow-[0_2px_20px_rgba(208,156,17,0.4)] sm:text-8xl lg:text-9xl">
                    {stats[0].value}
                  </div>
                  <motion.div
                    className="mt-1 text-base font-medium uppercase tracking-[0.15em] text-white/80 sm:text-lg"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    {stats[0].label}
                  </motion.div>
                </motion.div>

                {/* Secondary stats - slide up with gold divider */}
                <div className="flex items-center gap-6 sm:gap-8">
                  {stats.slice(1).map((stat, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-6 sm:gap-8"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.8 + index * 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      {index > 0 && (
                        <div className="h-10 w-[1px] bg-white/20" />
                      )}
                      <div>
                        <div className="font-heading text-3xl font-bold text-white drop-shadow-[0_1px_10px_rgba(255,255,255,0.15)] sm:text-4xl">
                          {stat.value}
                        </div>
                        <div className="mt-0.5 text-xs font-medium uppercase tracking-wider text-white/50 sm:text-sm">
                          {stat.label}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Subtle gold line at right edge */}
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

          {/* Right: Content panel */}
          <div className="flex flex-col justify-center rounded-2xl bg-navy p-8 sm:p-10 lg:rounded-l-none lg:rounded-r-2xl lg:p-14">
            <ScrollAnimate>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                {t('titleLine1')}
              </p>
            </ScrollAnimate>
            <ScrollAnimate delay={0.1}>
              <h2 className="font-heading text-3xl font-bold leading-[1.1] text-white sm:text-4xl lg:text-5xl">
                {t('titleLine2')}
              </h2>
              <div className="mt-4 h-[2px] w-16 bg-gold" />
            </ScrollAnimate>
            <ScrollAnimate delay={0.2}>
              <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">
                {t('description')}
              </p>
            </ScrollAnimate>

            {/* Value propositions */}
            <StaggerContainer className="mt-8 space-y-4 sm:mt-10" staggerDelay={0.1}>
              {values.map((value, index) => (
                <StaggerItem key={index}>
                  <div className="group flex gap-4 rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 transition-all duration-400 hover:border-gold/20 hover:bg-white/[0.06] sm:p-5">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gold/15 transition-colors duration-300 group-hover:bg-gold/25">
                      <LawIcon name={value.icon} size={28} variant="gold" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-heading text-base font-semibold text-white transition-colors duration-300 group-hover:text-gold sm:text-lg">
                        {value.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-white/45">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>

      {/* Section transition line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </section>
  );
}
