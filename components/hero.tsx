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
    image: '/images/team/camelia-stan.png',
  },
  {
    id: 'vlad-baculescu',
    name: 'Vlad Baculescu',
    image: '/images/team/vlad-baculescu.png',
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
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes subtle-glow {
          0%, 100% {
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
          }
          50% {
            box-shadow: 0 8px 40px rgba(208, 156, 17, 0.15);
          }
        }
        @keyframes float-up {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        @keyframes float-down {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(8px);
          }
        }
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 4px 15px rgba(208, 156, 17, 0.3);
          }
          50% {
            box-shadow: 0 6px 25px rgba(208, 156, 17, 0.6);
          }
        }
        @keyframes gold-rotate {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        @keyframes gold-pulse {
          0%, 100% {
            opacity: 0.15;
            transform: scale(1);
          }
          50% {
            opacity: 0.25;
            transform: scale(1.05);
          }
        }
        .gold-decoration {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(208, 156, 17, 0.2) 0%, rgba(208, 156, 17, 0.05) 50%, transparent 70%);
          animation: gold-pulse 6s ease-in-out infinite;
          pointer-events: none;
        }
        .gold-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 450px;
          height: 450px;
          border-radius: 50%;
          border: 2px solid rgba(208, 156, 17, 0.15);
          animation: gold-rotate 30s linear infinite;
          pointer-events: none;
        }
        .gold-ring::before {
          content: '';
          position: absolute;
          top: -5px;
          left: 50%;
          width: 10px;
          height: 10px;
          background: rgba(208, 156, 17, 0.6);
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(208, 156, 17, 0.4);
        }
        .gold-ring::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 50%;
          width: 10px;
          height: 10px;
          background: rgba(208, 156, 17, 0.6);
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(208, 156, 17, 0.4);
        }
        .animate-float-up {
          animation: float-up 4s ease-in-out infinite;
        }
        .animate-float-down {
          animation: float-down 4s ease-in-out infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 1.5s ease-in-out infinite;
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
        .animate-subtle-glow {
          animation: subtle-glow 4s ease-in-out infinite;
        }
        .photo-shimmer {
          position: relative;
          overflow: hidden;
        }
        .photo-shimmer::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(
            105deg,
            transparent 40%,
            rgba(255, 255, 255, 0.03) 45%,
            rgba(255, 255, 255, 0.06) 50%,
            rgba(255, 255, 255, 0.03) 55%,
            transparent 60%
          );
          animation: shimmer 6s ease-in-out infinite;
          pointer-events: none;
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
        .delay-1200 { animation-delay: 1200ms; }
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
                className="group animate-pulse-glow h-14 rounded-full bg-gold px-8 text-base font-semibold text-navy transition-all duration-300 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/30"
              >
                <Link href="/contact">
                  {t('cta')}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <a
                href="tel:+40261848015"
                className="group flex h-14 items-center gap-3 rounded-full bg-white/5 px-6 ring-1 ring-white/20 transition-all duration-300 hover:bg-white/10 hover:ring-white/40"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20">
                  <Phone className="h-4 w-4 text-gold" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-white/50">{t('callNow')}</p>
                  <p className="text-sm font-semibold text-white">+40 261-848-015</p>
                </div>
              </a>
            </div>

            {/* Operating Hours */}
            <div className="animate-fade-in-up delay-400 flex items-center gap-3 text-white/50">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{t('schedule')}</span>
            </div>
          </div>

          {/* Right Side - Founders + Stats */}
          <div className="relative hidden lg:flex lg:items-start lg:justify-center">
            {/* Gold decorative elements */}
            <div className="gold-decoration"></div>
            <div className="gold-ring"></div>

            <div className="relative z-10 flex items-start gap-5">
              {/* Founder 1 column - with badge below */}
              <div className="flex flex-col items-center">
                <Link
                  href={`/echipa/${founders[0].id}`}
                  className="group relative"
                >
                  <div className="animate-photo delay-600 photo-shimmer relative h-[380px] w-[260px] overflow-hidden rounded-2xl bg-gradient-to-b from-gold/5 to-navy-light/20 shadow-2xl ring-2 ring-white/20 transition-all duration-500 group-hover:ring-gold/60 group-hover:-translate-y-3 group-hover:shadow-gold/30">
                    <Image
                      src={founders[0].image}
                      alt={founders[0].name}
                      fill
                      className="object-contain object-bottom transition-transform duration-500 group-hover:scale-105"
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
                  <div className="animate-float-down rounded-2xl bg-white px-5 py-3 shadow-xl">
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
                  <div className="animate-float-up rounded-2xl bg-white px-5 py-3 shadow-xl">
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
                  <div className="animate-photo delay-700 photo-shimmer relative h-[380px] w-[260px] overflow-hidden rounded-2xl bg-gradient-to-b from-gold/5 to-navy-light/20 shadow-2xl ring-2 ring-white/20 transition-all duration-500 group-hover:ring-gold/60 group-hover:-translate-y-3 group-hover:shadow-gold/30">
                    <Image
                      src={founders[1].image}
                      alt={founders[1].name}
                      fill
                      className="object-contain object-bottom transition-transform duration-500 group-hover:scale-105"
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
            {/* Gold decorative elements - like desktop but smaller */}
            <div className="gold-decoration" style={{ width: '320px', height: '320px' }}></div>
            <div className="gold-ring" style={{ width: '280px', height: '280px' }}></div>

            {/* Tablet (md to lg): Side by side layout */}
            <div className="hidden md:flex md:items-center md:justify-center md:gap-6 relative z-10">
              {/* Founder 1 - with badge below */}
              <div className="flex flex-col items-center">
                <Link
                  href={`/echipa/${founders[0].id}`}
                  className="group relative"
                >
                  <div className="animate-photo delay-600 photo-shimmer relative h-[280px] w-[190px] overflow-hidden rounded-2xl bg-gradient-to-b from-gold/5 to-navy-light/20 shadow-2xl ring-2 ring-white/20 transition-all duration-500 group-hover:ring-gold/60 group-hover:-translate-y-2 group-hover:shadow-gold/30">
                    <Image
                      src={founders[0].image}
                      alt={founders[0].name}
                      fill
                      className="object-contain object-bottom transition-transform duration-500 group-hover:scale-105"
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
                  <div className="animate-float-down rounded-xl bg-white px-4 py-2.5 shadow-xl">
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
                  <div className="animate-float-up rounded-xl bg-white px-4 py-2.5 shadow-xl">
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
                  <div className="animate-photo delay-700 photo-shimmer relative h-[280px] w-[190px] overflow-hidden rounded-2xl bg-gradient-to-b from-gold/5 to-navy-light/20 shadow-2xl ring-2 ring-white/20 transition-all duration-500 group-hover:ring-gold/60 group-hover:-translate-y-2 group-hover:shadow-gold/30">
                    <Image
                      src={founders[1].image}
                      alt={founders[1].name}
                      fill
                      className="object-contain object-bottom transition-transform duration-500 group-hover:scale-105"
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

            {/* Mobile (below md): Layout like desktop */}
            <div className="flex items-start justify-center gap-3 sm:gap-4 md:hidden relative z-10">
              {/* Founder 1 column - with badge below */}
              <div className="flex flex-col items-center">
                <Link
                  href={`/echipa/${founders[0].id}`}
                  className="group relative"
                >
                  <div className="animate-photo delay-600 photo-shimmer relative h-[200px] w-[140px] sm:h-[240px] sm:w-[165px] overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-b from-gold/5 to-navy-light/20 shadow-2xl ring-2 ring-white/20 transition-all duration-500 group-hover:ring-gold/60 group-hover:-translate-y-2 group-hover:shadow-gold/30">
                    <Image
                      src={founders[0].image}
                      alt={founders[0].name}
                      fill
                      className="object-contain object-bottom transition-transform duration-500 group-hover:scale-105"
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
                  <div className="animate-float-down rounded-xl bg-white px-3 py-2 sm:px-4 sm:py-2.5 shadow-xl">
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
                  <div className="animate-float-up rounded-xl bg-white px-3 py-2 sm:px-4 sm:py-2.5 shadow-xl">
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
                  <div className="animate-photo delay-700 photo-shimmer relative h-[200px] w-[140px] sm:h-[240px] sm:w-[165px] overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-b from-gold/5 to-navy-light/20 shadow-2xl ring-2 ring-white/20 transition-all duration-500 group-hover:ring-gold/60 group-hover:-translate-y-2 group-hover:shadow-gold/30">
                    <Image
                      src={founders[1].image}
                      alt={founders[1].name}
                      fill
                      className="object-contain object-bottom transition-transform duration-500 group-hover:scale-105"
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
