'use client';

import { useTranslations } from 'next-intl';
import { ScrollAnimate } from '@/components/ui/scroll-animate';
import { LazyVideo } from '@/components/ui/lazy-video';
import { LawIcon } from '@/components/icons';
import { motion } from 'framer-motion';

export function HomeVideo() {
  const t = useTranslations('HomePage.video');

  return (
    <section className="relative overflow-hidden bg-[#f8f9fa] py-20 sm:py-28">
      {/* Top gold line */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      {/* Subtle radial glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,58,112,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center sm:mb-14">
          <ScrollAnimate>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              {t('label')}
            </p>
          </ScrollAnimate>
          <ScrollAnimate delay={0.1}>
            <h2 className="font-heading text-3xl font-bold leading-[1.1] text-navy sm:text-4xl lg:text-5xl">
              {t('title')}
            </h2>
            <div className="mx-auto mt-4 h-[2px] w-16 bg-gold" />
          </ScrollAnimate>
          <ScrollAnimate delay={0.2}>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-navy/60 sm:text-lg">
              {t('description')}
            </p>
          </ScrollAnimate>
        </div>

        {/* Video container with decorative frame */}
        <ScrollAnimate delay={0.3}>
          <div className="relative mx-auto max-w-4xl">
            {/* Decorative corner accents */}
            <div className="absolute -left-3 -top-3 z-10 h-8 w-8 border-l-2 border-t-2 border-gold/40 sm:-left-4 sm:-top-4 sm:h-10 sm:w-10" />
            <div className="absolute -right-3 -top-3 z-10 h-8 w-8 border-r-2 border-t-2 border-gold/40 sm:-right-4 sm:-top-4 sm:h-10 sm:w-10" />
            <div className="absolute -bottom-3 -left-3 z-10 h-8 w-8 border-b-2 border-l-2 border-gold/40 sm:-bottom-4 sm:-left-4 sm:h-10 sm:w-10" />
            <div className="absolute -bottom-3 -right-3 z-10 h-8 w-8 border-b-2 border-r-2 border-gold/40 sm:-bottom-4 sm:-right-4 sm:h-10 sm:w-10" />

            {/* Shadow glow behind video */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-gold/10 via-navy/5 to-gold/10 blur-sm" />

            {/* Video player */}
            <LazyVideo
              src="/video/prezentare-sb-720.mp4"
              poster="/images/video-poster.webp"
              className="rounded-2xl shadow-2xl ring-1 ring-navy/10"
            />
          </div>
        </ScrollAnimate>

        {/* Bottom highlights */}
        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-3 gap-6 sm:mt-14 sm:gap-8">
          {(['highlight1', 'highlight2', 'highlight3'] as const).map((key, i) => (
            <motion.div
              key={key}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.15 }}
            >
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-navy/[0.06] sm:h-12 sm:w-12">
                <LawIcon
                  name={i === 0 ? 'conference' : i === 1 ? 'balance-scale' : 'shield'}
                  size={22}
                  variant="navy"
                />
              </div>
              <p className="text-sm font-medium leading-snug text-navy/70 sm:text-base">
                {t(key)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom gold line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </section>
  );
}
