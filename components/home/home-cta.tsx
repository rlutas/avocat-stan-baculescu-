'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone, Clock } from 'lucide-react';

export function HomeCta() {
  const t = useTranslations('HomePage.cta');

  return (
    <section className="py-16 sm:py-24">
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
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 4px 15px rgba(208, 156, 17, 0.3);
          }
          50% {
            box-shadow: 0 6px 25px rgba(208, 156, 17, 0.6);
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
        @keyframes gold-rotate {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        .gold-decoration {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 400px;
          height: 400px;
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
          width: 350px;
          height: 350px;
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
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out both;
        }
        .animate-pulse-glow {
          animation: pulse-glow 1.5s ease-in-out infinite;
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
      `}</style>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-navy px-8 py-16 text-center sm:px-16 sm:py-20">
          {/* Gold decorative elements */}
          <div className="gold-decoration" />
          <div className="gold-ring" />

          <div className="relative z-10">
            <h2 className="animate-fade-in-up font-heading mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {t('title')}
            </h2>
            <p className="animate-fade-in-up delay-100 mx-auto mb-10 max-w-2xl text-lg text-white/70">
              {t('description')}
            </p>

            {/* CTA Buttons */}
            <div className="animate-fade-in-up delay-200 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="group animate-pulse-glow h-14 rounded-full bg-gold px-8 text-base font-semibold text-navy transition-all duration-300 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/30"
              >
                <Link href="/contact">
                  {t('button')}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <a
                href="tel:+40745466720"
                className="group relative flex h-14 items-center overflow-hidden rounded-full bg-white/5 ring-1 ring-white/20 transition-all duration-300 hover:bg-white/15 hover:ring-gold/40 hover:shadow-lg hover:shadow-gold/20 hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0"
              >
                <div className="flex h-full w-12 sm:w-14 flex-shrink-0 items-center justify-center self-stretch bg-gold/10 transition-all duration-300 group-hover:bg-gold/20 group-active:bg-gold/30">
                  <Phone className="h-5 w-5 text-gold transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 group-active:scale-95" />
                </div>
                <div className="flex items-center gap-1.5 px-3 sm:block sm:px-5 sm:text-left">
                  <p className="text-sm sm:text-xs text-white/50 transition-colors duration-300 group-hover:text-white/70 whitespace-nowrap">{t('callLabel')}</p>
                  <p className="text-base sm:text-sm font-semibold text-white whitespace-nowrap">+40 745 466 720</p>
                </div>
              </a>
            </div>

            {/* Available hours */}
            <div className="animate-fade-in-up delay-300 mt-6 flex items-center justify-center gap-2 text-white/40">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{t('available')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
