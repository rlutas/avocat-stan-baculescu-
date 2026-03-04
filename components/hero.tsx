'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Clock, Award, Phone, ArrowRight } from 'lucide-react';

const founders = [
  {
    id: 'camelia-stan',
    name: 'Camelia Stan',
    image: '/images/team/camielia-stan.webp',
  },
  {
    id: 'vlad-baculescu',
    name: 'Vlad Baculescu',
    image: '/images/team/vlad-baculescu.webp',
  },
];

export function Hero() {
  const t = useTranslations('HomePage.hero');

  return (
    <section className="relative w-full overflow-hidden bg-navy">
      <style jsx>{`
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
      `}</style>

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 py-28 sm:py-36 lg:grid-cols-[1fr_auto] lg:gap-12 lg:py-44">

          {/* Left Content */}
          <div className="max-w-xl">
            {/* Trust Badge */}
            <div className="animate-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-2 ring-1 ring-gold/20">
              <Award className="h-4 w-4 text-gold" />
              <span className="text-sm font-medium text-gold">{t('trustBadge')}</span>
            </div>

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
            <div className="animate-fade-in-up delay-300 mb-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="group h-14 rounded-full bg-gold px-8 text-base font-semibold text-navy shadow-[var(--shadow-gold)] transition-all duration-300 hover:bg-gold-light hover:shadow-[var(--shadow-gold-lg)]"
              >
                <Link href="/contact">
                  {t('cta')}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <a
                href="tel:+40745466720"
                className="group relative flex h-14 items-center overflow-hidden rounded-full bg-white/5 ring-1 ring-white/20 transition-all duration-300 hover:bg-white/15 hover:ring-gold/40 hover:shadow-lg hover:shadow-gold/20 hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0"
              >
                {/* Icon section with distinct background */}
                <div className="flex h-full w-12 sm:w-14 flex-shrink-0 items-center justify-center self-stretch bg-gold/10 transition-all duration-300 group-hover:bg-gold/20 group-active:bg-gold/30">
                  <Phone className="h-5 w-5 text-gold transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 group-active:scale-95" />
                </div>
                {/* Text section */}
                <div className="flex items-center gap-1.5 px-3 sm:block sm:px-5 sm:text-left">
                  <p className="text-sm sm:text-xs text-white/50 transition-colors duration-300 group-hover:text-white/70 whitespace-nowrap">{t('callNow')}</p>
                  <p className="text-base sm:text-sm font-semibold text-white whitespace-nowrap">+40 745 466 720</p>
                </div>
              </a>
            </div>

            {/* Operating Hours */}
            <div className="animate-fade-in-up delay-400 flex items-center gap-3 text-white/50">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{t('schedule')}</span>
            </div>
          </div>

          {/* Right Side - Founders + Stats (Desktop) */}
          <div className="relative hidden lg:flex lg:items-start lg:justify-center">
            {/* Geometric gold decorations */}
            {/* Static radial glow behind photos */}
            <div
              className="animate-glow delay-500 pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: '520px',
                height: '520px',
                background: 'radial-gradient(circle, rgba(208, 156, 17, 0.12) 0%, rgba(208, 156, 17, 0.04) 40%, transparent 70%)',
              }}
            />

            {/* Diagonal gold lines */}
            <div
              className="animate-line-x delay-700 pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[1px] w-[600px] origin-center -rotate-[30deg] bg-gradient-to-r from-transparent via-gold/[0.08] to-transparent"
            />
            <div
              className="animate-line-x delay-800 pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[40%] h-[1px] w-[500px] origin-center -rotate-[30deg] bg-gradient-to-r from-transparent via-gold/[0.06] to-transparent"
            />
            <div
              className="animate-line-x delay-900 pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%] h-[1px] w-[550px] origin-center -rotate-[30deg] bg-gradient-to-r from-transparent via-gold/[0.06] to-transparent"
            />

            {/* Corner accent - top left */}
            <div className="animate-line-x delay-800 pointer-events-none absolute -left-4 top-8 h-[1px] w-20 origin-left bg-gradient-to-r from-gold/30 to-transparent" />
            <div className="animate-line-y delay-800 pointer-events-none absolute -left-4 top-8 h-20 w-[1px] origin-top bg-gradient-to-b from-gold/30 to-transparent" />

            {/* Corner accent - bottom right */}
            <div className="animate-line-x delay-900 pointer-events-none absolute -right-4 bottom-8 h-[1px] w-20 origin-right bg-gradient-to-l from-gold/30 to-transparent" />
            <div className="animate-line-y delay-900 pointer-events-none absolute -right-4 bottom-8 h-20 w-[1px] origin-bottom bg-gradient-to-t from-gold/30 to-transparent" />

            <div className="relative z-10 flex items-start gap-5">
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
                  <div className="rounded-2xl bg-white px-5 py-3 shadow-xl">
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
                  <div className="rounded-2xl bg-white px-5 py-3 shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-gold to-gold-light shadow-md">
                        <span className="text-base font-bold text-navy">15+</span>
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
          </div>

          {/* Tablet & Mobile - Founders */}
          <div className="relative lg:hidden mt-8 sm:mt-10">
            {/* Geometric gold decorations - smaller */}
            <div
              className="animate-glow delay-500 pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: '340px',
                height: '340px',
                background: 'radial-gradient(circle, rgba(208, 156, 17, 0.10) 0%, rgba(208, 156, 17, 0.03) 40%, transparent 70%)',
              }}
            />
            <div
              className="animate-line-x delay-700 pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[1px] w-[380px] origin-center -rotate-[30deg] bg-gradient-to-r from-transparent via-gold/[0.07] to-transparent"
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
                  <div className="rounded-xl bg-white px-4 py-2.5 shadow-xl">
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
                  <div className="rounded-xl bg-white px-4 py-2.5 shadow-xl">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-gold to-gold-light shadow-md">
                        <span className="text-sm font-bold text-navy">15+</span>
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
                  <div className="animate-photo delay-600 relative h-[200px] w-[140px] sm:h-[240px] sm:w-[165px] overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-b from-gold/5 to-navy-light/20 shadow-2xl ring-2 ring-white/20 transition-all duration-500 group-hover:ring-gold/60 group-hover:-translate-y-2 group-hover:shadow-gold/30">
                    <Image
                      src={founders[0].image}
                      alt={founders[0].name}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      sizes="165px"
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
                  <div className="rounded-xl bg-white px-3 py-2 sm:px-4 sm:py-2.5 shadow-xl">
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
                  <div className="rounded-xl bg-white px-3 py-2 sm:px-4 sm:py-2.5 shadow-xl">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-gradient-to-br from-gold to-gold-light shadow-md">
                        <span className="text-xs sm:text-sm font-bold text-navy">15+</span>
                      </div>
                      <p className="text-[10px] sm:text-xs font-bold text-navy whitespace-nowrap">{t('yearsExperience')}</p>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/echipa/${founders[1].id}`}
                  className="group relative"
                >
                  <div className="animate-photo delay-700 relative h-[200px] w-[140px] sm:h-[240px] sm:w-[165px] overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-b from-gold/5 to-navy-light/20 shadow-2xl ring-2 ring-white/20 transition-all duration-500 group-hover:ring-gold/60 group-hover:-translate-y-2 group-hover:shadow-gold/30">
                    <Image
                      src={founders[1].image}
                      alt={founders[1].name}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      sizes="165px"
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
