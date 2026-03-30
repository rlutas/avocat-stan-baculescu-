'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Clock, Phone, ArrowRight } from 'lucide-react';
import { GlowWrapper } from '@/components/ui/glow-button';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useEffect } from 'react';
import { trackPhoneClick, trackCtaClick } from '@/lib/analytics';

const founders = [
  {
    id: 'camelia-stan',
    name: 'Camelia Stan',
    image: '/images/team/camelia-stan.webp',
  },
  {
    id: 'vlad-baculescu',
    name: 'Vlad Baculescu',
    image: '/images/team/vlad-baculescu.webp',
  },
];

export function Hero() {
  const t = useTranslations('HomePage.hero');

  // Layer 4: Mouse parallax for founder photos
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const photoX = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), springConfig);
  const photoY = useSpring(useTransform(mouseY, [0, 1], [-6, 6]), springConfig);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [mouseX, mouseY]);

  return (
    <section className="hero-gradient-animated relative w-full min-h-screen overflow-hidden" style={{ backgroundColor: '#003a70' }}>
      <style jsx>{`
        .hero-gradient-animated {
          background: linear-gradient(
            var(--hero-angle, 135deg),
            var(--hero-stop1, #002a52) 0%,
            var(--hero-stop2, #003a70) 50%,
            var(--hero-stop3, #004a8f) 100%
          );
          animation: heroGradientShift 40s ease-in-out infinite alternate;
        }
        @keyframes heroGradientShift {
          0% {
            --hero-angle: 135deg;
            --hero-stop1: #002a52;
            --hero-stop2: #003a70;
            --hero-stop3: #004a8f;
          }
          33% {
            --hero-angle: 160deg;
            --hero-stop1: #00325f;
            --hero-stop2: #003d75;
            --hero-stop3: #003a70;
          }
          66% {
            --hero-angle: 120deg;
            --hero-stop1: #003a70;
            --hero-stop2: #002a52;
            --hero-stop3: #004a8f;
          }
          100% {
            --hero-angle: 145deg;
            --hero-stop1: #002d58;
            --hero-stop2: #004080;
            --hero-stop3: #003a70;
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes photoFadeIn {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes badgeFadeIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes lineReveal {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
        @keyframes lineRevealY {
          from {
            transform: scaleY(0);
          }
          to {
            transform: scaleY(1);
          }
        }
        @keyframes glowFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out both;
        }
        .animate-photo {
          animation: photoFadeIn 1.2s ease-out both;
        }
        .animate-badge {
          animation: badgeFadeIn 0.8s ease-out both;
        }
        .animate-line-x {
          animation: lineReveal 1.2s ease-out both;
        }
        .animate-line-y {
          animation: lineRevealY 1.2s ease-out both;
        }
        .animate-glow {
          animation: glowFadeIn 2s ease-out both;
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }
        .delay-600 { animation-delay: 600ms; }
        .delay-700 { animation-delay: 700ms; }
        .delay-800 { animation-delay: 800ms; }
        .delay-900 { animation-delay: 900ms; }
        .delay-1000 { animation-delay: 1000ms; }
        .delay-1100 { animation-delay: 1100ms; }
        @keyframes gentleFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        .animate-gentle-float {
          animation: gentleFloat 5s ease-in-out infinite;
          animation-delay: 2s;
        }
        .animate-gentle-float-alt {
          animation: gentleFloat 6s ease-in-out infinite;
          animation-delay: 2.5s;
        }
      `}</style>

      {/* Layer 1: SVG Noise/Grain Texture */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.03] mix-blend-soft-light" aria-hidden="true">
        <filter id="heroNoise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#heroNoise)" />
      </svg>

      {/* Layer 3: Animated Gold Line Art */}
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

      <div className="mx-auto flex min-h-screen max-w-[1400px] items-start lg:items-center px-4 sm:px-6 lg:px-8">
        <div className="grid w-full items-center gap-8 pt-28 pb-16 sm:pt-32 sm:pb-20 lg:grid-cols-[1fr_auto] lg:gap-12 lg:pt-28 lg:pb-28">

          {/* Left Content */}
          <div className="max-w-xl">
            {/* Headline */}
            <h1 className="animate-fade-in-up delay-100 mb-6 font-heading font-bold leading-tight text-white">
              <span className="block text-2xl sm:text-3xl lg:text-[2.5rem] text-white/70 font-medium">{t('titleLine1')}</span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl">{t('titleLine2')}</span>
            </h1>

            {/* Description */}
            <p className="animate-fade-in-up delay-200 mb-10 text-lg leading-relaxed text-white/70 sm:text-xl">
              {t('description')}
            </p>

            {/* CTA Buttons */}
            <div className="animate-fade-in-up delay-300 mb-10 flex flex-row items-center gap-2.5 sm:gap-4">
              <GlowWrapper className="flex-1 rounded-full sm:flex-none">
                <Button
                  asChild
                  size="lg"
                  className="group h-12 w-full rounded-full bg-gold px-4 text-sm font-semibold text-navy shadow-[var(--shadow-gold)] transition-all duration-300 hover:bg-gold-light hover:shadow-[var(--shadow-gold-lg)] sm:h-14 sm:px-8 sm:text-base"
                >
                  <Link href="/contact" onClick={() => trackCtaClick({ cta_text: 'Programează o Consultație', cta_location: 'hero', cta_destination: '/contact', page_type: 'home' })}>
                    <span className="sm:hidden">{t('ctaShort')}</span>
                    <span className="hidden sm:inline">{t('cta')}</span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1 sm:ml-2" />
                  </Link>
                </Button>
              </GlowWrapper>
              <a
                href="tel:+40745466720"
                onClick={() => trackPhoneClick('hero', 'home')}
                className="group relative flex h-12 flex-1 items-center justify-center overflow-hidden rounded-full bg-white/5 ring-1 ring-white/20 transition-all duration-300 hover:bg-white/15 hover:ring-gold/40 hover:shadow-lg hover:shadow-gold/20 hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 sm:h-14 sm:flex-none sm:justify-start"
              >
                {/* Icon section with distinct background */}
                <div className="flex h-full w-10 flex-shrink-0 items-center justify-center self-stretch bg-gold/10 transition-all duration-300 group-hover:bg-gold/20 group-active:bg-gold/30 sm:w-14">
                  <Phone className="h-4 w-4 text-gold transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 group-active:scale-95 sm:h-5 sm:w-5" />
                </div>
                {/* Mobile: just "Sună acum" */}
                <div className="flex flex-1 items-center justify-center px-2 sm:hidden">
                  <p className="text-sm font-semibold text-white whitespace-nowrap">{t('callNow')}</p>
                </div>
                {/* Desktop: label + number */}
                <div className="hidden sm:block sm:px-5 sm:text-left">
                  <p className="text-xs text-white/50 transition-colors duration-300 group-hover:text-white/70 whitespace-nowrap">{t('callNow')}</p>
                  <p className="text-sm font-semibold text-white whitespace-nowrap">+40 745 466 720</p>
                </div>
              </a>
            </div>

            {/* Operating Hours */}
            <div className="animate-fade-in-up delay-400 flex items-center gap-3 text-white/50">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{t('schedule')}</span>
            </div>
          </div>

          {/* Right Side - Founders + Stats (Desktop) - Layer 4: Mouse Parallax */}
          <motion.div style={{ x: photoX, y: photoY }} className="relative hidden lg:flex lg:items-start lg:justify-center">
            {/* Strong radial glow behind photos */}
            <div
              className="animate-glow delay-500 pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: '550px',
                height: '550px',
                background: 'radial-gradient(circle, rgba(208, 156, 17, 0.18) 0%, rgba(208, 156, 17, 0.08) 35%, rgba(208, 156, 17, 0.02) 55%, transparent 70%)',
              }}
            />

            <div className="relative z-10 flex items-start gap-5">
              {/* Gold vertical separator between photos */}
              <div className="pointer-events-none absolute left-1/2 top-[5%] z-20 h-[90%] w-[2px] -translate-x-1/2 origin-top animate-line-y delay-800 bg-gradient-to-b from-gold/10 via-gold/40 to-gold/10" />

              {/* Founder 1 column - with badge below */}
              <div className="flex flex-col items-center">
                <Link
                  href={`/echipa/${founders[0].id}`}
                  className="group relative"
                >
                  <div className="animate-photo delay-600 relative h-[380px] w-[260px] overflow-hidden rounded-2xl bg-gradient-to-b from-gold/5 to-navy-light/20 shadow-2xl ring-2 ring-white/20 transition-all duration-500 group-hover:ring-gold/60 group-hover:-translate-y-3 group-hover:shadow-gold/30">
                    <Image
                      src={founders[0].image}
                      alt={founders[0].name}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      sizes="(min-width: 1024px) 400px, 300px"
                      priority
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy via-navy/70 to-transparent pt-16 pb-4">
                      <div className="text-center">
                        <p className="text-base font-bold text-white">{founders[0].name}</p>
                        <p className="text-xs text-gold">{t('founder')}</p>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Badge below Camelia */}
                <div className="animate-badge delay-1000 mt-8">
                  <div className="animate-gentle-float rounded-2xl bg-white px-5 py-3 shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-gold to-gold-light shadow-md">
                        <span className="text-base font-bold text-navy">1K+</span>
                      </div>
                      <p className="text-sm font-bold text-navy whitespace-nowrap">{t('satisfiedClients')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Founder 2 column - with badge above */}
              <div className="flex flex-col items-center mt-16">
                {/* Badge above Vlad */}
                <div className="animate-badge delay-900 mb-8">
                  <div className="animate-gentle-float-alt rounded-2xl bg-white px-5 py-3 shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-gold to-gold-light shadow-md">
                        <span className="text-base font-bold text-navy">20+</span>
                      </div>
                      <p className="text-sm font-bold text-navy whitespace-nowrap">{t('yearsExperience')}</p>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/echipa/${founders[1].id}`}
                  className="group relative"
                >
                  <div className="animate-photo delay-700 relative h-[380px] w-[260px] overflow-hidden rounded-2xl bg-gradient-to-b from-gold/5 to-navy-light/20 shadow-2xl ring-2 ring-white/20 transition-all duration-500 group-hover:ring-gold/60 group-hover:-translate-y-3 group-hover:shadow-gold/30">
                    <Image
                      src={founders[1].image}
                      alt={founders[1].name}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      sizes="(min-width: 1024px) 400px, 300px"
                      priority
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy via-navy/70 to-transparent pt-16 pb-4">
                      <div className="text-center">
                        <p className="text-base font-bold text-white">{founders[1].name}</p>
                        <p className="text-xs text-gold">{t('founder')}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Tablet & Mobile - Founders */}
          <div className="relative lg:hidden mt-8 sm:mt-10">
            {/* Strong radial glow - smaller */}
            <div
              className="animate-glow delay-500 pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: '360px',
                height: '360px',
                background: 'radial-gradient(circle, rgba(208, 156, 17, 0.15) 0%, rgba(208, 156, 17, 0.06) 35%, transparent 70%)',
              }}
            />

            {/* Tablet (md to lg): Side by side layout */}
            <div className="hidden md:flex md:items-center md:justify-center md:gap-6 relative z-10">
              {/* Founder 1 - with badge below */}
              <div className="flex flex-col items-center">
                <Link
                  href={`/echipa/${founders[0].id}`}
                  className="group relative"
                >
                  <div className="animate-photo delay-600 relative h-[280px] w-[190px] overflow-hidden rounded-2xl bg-gradient-to-b from-gold/5 to-navy-light/20 shadow-2xl ring-2 ring-white/20 transition-all duration-500 group-hover:ring-gold/60 group-hover:-translate-y-2 group-hover:shadow-gold/30">
                    <Image
                      src={founders[0].image}
                      alt={founders[0].name}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      sizes="(min-width: 768px) 190px, 150px"
                      priority
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy via-navy/70 to-transparent pt-12 pb-3">
                      <div className="text-center">
                        <p className="text-sm font-bold text-white">{founders[0].name}</p>
                        <p className="text-xs text-gold">{t('founder')}</p>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Badge below Camelia */}
                <div className="animate-badge delay-1000 mt-6">
                  <div className="animate-gentle-float rounded-xl bg-white px-4 py-2.5 shadow-xl">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-gold to-gold-light shadow-md">
                        <span className="text-sm font-bold text-navy">1K+</span>
                      </div>
                      <p className="text-xs font-bold text-navy whitespace-nowrap">{t('satisfiedClients')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Founder 2 - with badge above */}
              <div className="flex flex-col items-center mt-12">
                {/* Badge above Vlad */}
                <div className="animate-badge delay-900 mb-6">
                  <div className="animate-gentle-float-alt rounded-xl bg-white px-4 py-2.5 shadow-xl">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-gold to-gold-light shadow-md">
                        <span className="text-sm font-bold text-navy">20+</span>
                      </div>
                      <p className="text-xs font-bold text-navy whitespace-nowrap">{t('yearsExperience')}</p>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/echipa/${founders[1].id}`}
                  className="group relative"
                >
                  <div className="animate-photo delay-700 relative h-[280px] w-[190px] overflow-hidden rounded-2xl bg-gradient-to-b from-gold/5 to-navy-light/20 shadow-2xl ring-2 ring-white/20 transition-all duration-500 group-hover:ring-gold/60 group-hover:-translate-y-2 group-hover:shadow-gold/30">
                    <Image
                      src={founders[1].image}
                      alt={founders[1].name}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      sizes="(min-width: 768px) 190px, 150px"
                      priority
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy via-navy/70 to-transparent pt-12 pb-3">
                      <div className="text-center">
                        <p className="text-sm font-bold text-white">{founders[1].name}</p>
                        <p className="text-xs text-gold">{t('founder')}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Mobile (below md) */}
            <div className="flex items-start justify-center gap-3 sm:gap-4 md:hidden relative z-10">
              {/* Founder 1 column - with badge below */}
              <div className="flex flex-col items-center">
                <Link
                  href={`/echipa/${founders[0].id}`}
                  className="group relative"
                >
                  <div className="animate-photo delay-600 relative h-[230px] w-[150px] sm:h-[280px] sm:w-[185px] overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-b from-gold/5 to-navy-light/20 shadow-2xl ring-2 ring-white/20 transition-all duration-500 group-hover:ring-gold/60 group-hover:-translate-y-2 group-hover:shadow-gold/30">
                    <Image
                      src={founders[0].image}
                      alt={founders[0].name}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      sizes="185px"
                      priority
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy via-navy/70 to-transparent pt-10 pb-2">
                      <div className="text-center">
                        <p className="text-xs sm:text-sm font-bold text-white">{founders[0].name}</p>
                        <p className="text-[10px] sm:text-xs text-gold">{t('founder')}</p>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Badge below Camelia */}
                <div className="animate-badge delay-1000 mt-4 sm:mt-6">
                  <div className="animate-gentle-float rounded-xl bg-white px-3 py-2 sm:px-4 sm:py-2.5 shadow-xl">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-gradient-to-br from-gold to-gold-light shadow-md">
                        <span className="text-xs sm:text-sm font-bold text-navy">1K+</span>
                      </div>
                      <p className="text-[10px] sm:text-xs font-bold text-navy whitespace-nowrap">{t('satisfiedClients')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Founder 2 column - with badge above */}
              <div className="flex flex-col items-center mt-10 sm:mt-12">
                {/* Badge above Vlad */}
                <div className="animate-badge delay-900 mb-4 sm:mb-6">
                  <div className="animate-gentle-float-alt rounded-xl bg-white px-3 py-2 sm:px-4 sm:py-2.5 shadow-xl">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-gradient-to-br from-gold to-gold-light shadow-md">
                        <span className="text-xs sm:text-sm font-bold text-navy">20+</span>
                      </div>
                      <p className="text-[10px] sm:text-xs font-bold text-navy whitespace-nowrap">{t('yearsExperience')}</p>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/echipa/${founders[1].id}`}
                  className="group relative"
                >
                  <div className="animate-photo delay-700 relative h-[230px] w-[150px] sm:h-[280px] sm:w-[185px] overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-b from-gold/5 to-navy-light/20 shadow-2xl ring-2 ring-white/20 transition-all duration-500 group-hover:ring-gold/60 group-hover:-translate-y-2 group-hover:shadow-gold/30">
                    <Image
                      src={founders[1].image}
                      alt={founders[1].name}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      sizes="185px"
                      priority
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy via-navy/70 to-transparent pt-10 pb-2">
                      <div className="text-center">
                        <p className="text-xs sm:text-sm font-bold text-white">{founders[1].name}</p>
                        <p className="text-[10px] sm:text-xs text-gold">{t('founder')}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
