'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function ServicesCta() {
  const t = useTranslations('ServicesPage.cta');

  return (
    <section className="relative overflow-hidden bg-navy py-16 sm:py-24">
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
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(208, 156, 17, 0.15) 0%, rgba(208, 156, 17, 0.03) 50%, transparent 70%);
          animation: gold-pulse 6s ease-in-out infinite;
          pointer-events: none;
        }
        .gold-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 400px;
          height: 400px;
          border-radius: 50%;
          border: 1px solid rgba(208, 156, 17, 0.1);
          animation: gold-rotate 30s linear infinite;
          pointer-events: none;
        }
        .gold-ring::before {
          content: '';
          position: absolute;
          top: -4px;
          left: 50%;
          width: 8px;
          height: 8px;
          background: rgba(208, 156, 17, 0.5);
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(208, 156, 17, 0.3);
        }
        .gold-ring::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 50%;
          width: 8px;
          height: 8px;
          background: rgba(208, 156, 17, 0.5);
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(208, 156, 17, 0.3);
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out both;
        }
        .animate-pulse-glow {
          animation: pulse-glow 1.5s ease-in-out infinite;
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
      `}</style>

      {/* Gold decorative elements */}
      <div className="gold-decoration"></div>
      <div className="gold-ring"></div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="animate-fade-in-up font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {t('title')}
        </h2>
        <p className="animate-fade-in-up delay-100 mx-auto mt-4 max-w-2xl text-lg text-white/70">
          {t('description')}
        </p>
        <div className="animate-fade-in-up delay-200 mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
        </div>
      </div>
    </section>
  );
}
