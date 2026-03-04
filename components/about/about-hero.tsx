'use client';

import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function AboutHero() {
  const t = useTranslations('AboutPage.hero');

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section ref={heroRef} className="relative overflow-hidden bg-[linear-gradient(135deg,#002a52_0%,#003a70_60%,#004a8f_100%)] pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Subtle grid texture */}
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

      {/* Gold radial glow — right side */}
      <div
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3"
        style={{
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(208,156,17,0.18) 0%, rgba(208,156,17,0.06) 45%, transparent 70%)',
        }}
      />

      {/* Gold accent top line with shimmer */}
      <div className="absolute left-0 right-0 top-0 h-[2px] animate-shimmer bg-[length:200%_100%] bg-[linear-gradient(90deg,transparent_0%,#d09c11_25%,#e6b520_50%,#d09c11_75%,transparent_100%)]" />

      {/* Noise grain texture */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.03] mix-blend-soft-light" aria-hidden="true">
        <filter id="aboutHeroNoise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#aboutHeroNoise)" />
      </svg>

      {/* Animated gold line art */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true">
        <motion.path
          d="M-50 800 Q350 400 700 500 T1450 100"
          stroke="rgba(208, 156, 17, 0.10)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { duration: 3, ease: "easeInOut", delay: 1.2 },
            opacity: { duration: 0.5, delay: 1.2 }
          }}
        />
        <motion.path
          d="M-50 830 Q350 430 700 530 T1450 130"
          stroke="rgba(208, 156, 17, 0.05)"
          strokeWidth="1"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { duration: 3.5, ease: "easeInOut", delay: 1.5 },
            opacity: { duration: 0.5, delay: 1.5 }
          }}
        />
      </svg>

      <motion.div style={{ y: contentY }} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          {/* Gold label */}
          <p
            className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-gold"
            style={{ animation: 'fadeInUp 0.8s ease-out both' }}
          >
            {t('label')}
          </p>

          {/* Heading */}
          <h1
            className="font-heading font-bold leading-[1.05] text-white"
            style={{ animation: 'fadeInUp 0.8s ease-out 120ms both' }}
          >
            <span className="mb-1 block text-2xl font-semibold text-gold/90 sm:text-3xl">
              {t('titleLine1')}
            </span>
            <span className="block text-5xl sm:text-6xl lg:text-7xl">
              {t('titleLine2')}
            </span>
          </h1>

          {/* Animated gold bar */}
          <div
            className="mt-5 h-[2px] w-16 origin-left bg-gold"
            style={{ animation: 'lineReveal 1.2s ease-out 200ms both' }}
          />

          {/* Description */}
          <p
            className="mt-6 max-w-lg text-lg leading-relaxed text-white/70"
            style={{ animation: 'fadeInUp 0.8s ease-out 280ms both' }}
          >
            {t('subtitle')}
          </p>

        </div>
      </motion.div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/[0.04] to-transparent" />

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes lineReveal {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>
    </section>
  );
}
