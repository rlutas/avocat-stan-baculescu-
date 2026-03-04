'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { LawIcon, serviceIconMap, type LawIconName } from '@/components/icons';

interface ServiceDetailHeroProps {
  serviceId: string;
}

export function ServiceDetailHero({ serviceId }: ServiceDetailHeroProps) {
  const t = useTranslations('ServiceDetail');
  const iconName: LawIconName = serviceIconMap[serviceId] || 'balance-scale';
  const tServices = useTranslations('ServicesPage');

  return (
    <section className="relative w-full overflow-hidden bg-[linear-gradient(135deg,#002a52_0%,#003a70_50%,#004a8f_100%)] pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Diagonal line texture overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
        <div className="absolute inset-0 bg-[linear-gradient(30deg,transparent_24%,rgba(255,255,255,0.06)_25%,rgba(255,255,255,0.06)_26%,transparent_27%,transparent_74%,rgba(255,255,255,0.06)_75%,rgba(255,255,255,0.06)_76%,transparent_77%)] bg-[length:50px_50px]" />
      </div>

      {/* Right-aligned gold glow — icon side */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-[700px] w-[500px] opacity-15"
        style={{
          background:
            'radial-gradient(circle at 80% 40%, rgba(208,156,17,0.4) 0%, rgba(208,156,17,0.08) 50%, transparent 70%)',
        }}
      />

      {/* Left gold glow */}
      <div
        className="pointer-events-none absolute -bottom-10 left-0 h-[350px] w-[350px] opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(208,156,17,0.35) 0%, transparent 65%)',
        }}
      />

      {/* Gold shimmer top bar */}
      <div className="absolute left-0 right-0 top-0 z-20 h-[2px] animate-shimmer bg-[length:200%_100%] bg-[linear-gradient(90deg,transparent_0%,#d09c11_25%,#e6b520_50%,#d09c11_75%,transparent_100%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-12 flex flex-wrap items-center gap-1.5 text-sm text-white/50"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="transition-colors duration-200 hover:text-gold">
            {t('breadcrumbHome')}
          </Link>
          <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 text-white/30" />
          <Link href="/servicii" className="transition-colors duration-200 hover:text-gold">
            {t('breadcrumbServices')}
          </Link>
          <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 text-white/30" />
          <span className="text-white/80">
            {tServices(`services.${serviceId}.title`)}
          </span>
        </motion.nav>

        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
          {/* Left: content */}
          <div className="flex-1">
            {/* Gold label badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-2 ring-1 ring-gold/25"
            >
              <LawIcon name={iconName} size={16} variant="gold" />
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
                {t(`${serviceId}.trustBadge`)}
              </span>
            </motion.div>

            {/* Two-line heading */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="mb-5 font-heading font-bold leading-[1.1]"
            >
              <span className="block text-xl font-medium text-white/60 sm:text-2xl lg:text-3xl">
                {t(`${serviceId}.titleLine1`)}
              </span>
              <span className="block text-4xl text-white sm:text-5xl lg:text-6xl">
                {t(`${serviceId}.titleLine2`)}
              </span>
            </motion.h1>

            {/* Gold separator */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.38, ease: [0.25, 0.1, 0.25, 1] }}
              className="mb-7 h-[2px] w-16 origin-left bg-gold"
            />

            {/* Subtitle / description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.48, ease: [0.25, 0.1, 0.25, 1] }}
              className="max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl"
            >
              {t(`${serviceId}.subtitle`)}
            </motion.p>
          </div>

          {/* Right: large icon in glassmorphism container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-shrink-0 justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute inset-0 -m-4 rounded-3xl bg-gold/10 blur-xl" />
              {/* Icon container */}
              <div className="relative flex h-36 w-36 items-center justify-center rounded-3xl border border-white/20 bg-white/10 backdrop-blur-sm ring-1 ring-gold/20 sm:h-44 sm:w-44">
                <LawIcon name={iconName} size={72} variant="gold" />
                {/* Inner shimmer lines */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent" />
              </div>
              {/* Corner accent dot */}
              <div className="absolute -right-2 -top-2 h-4 w-4 rounded-full bg-gold shadow-[0_0_12px_rgba(208,156,17,0.6)]" />
              <div className="absolute -bottom-2 -left-2 h-3 w-3 rounded-full bg-gold/50 shadow-[0_0_8px_rgba(208,156,17,0.4)]" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
