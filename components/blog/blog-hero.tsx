'use client';

import { useTranslations } from 'next-intl';
import { FileText } from 'lucide-react';

export function BlogHero() {
  const t = useTranslations('BlogPage');

  return (
    <section className="relative w-full overflow-hidden bg-navy py-20 md:py-28">
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
          left: 70%;
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
          left: 70%;
          transform: translate(-50%, -50%);
          width: 400px;
          height: 400px;
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
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
      `}</style>

      {/* Gold decorative elements */}
      <div className="gold-decoration"></div>
      <div className="gold-ring"></div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Trust Badge */}
          <div className="animate-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-2 ring-1 ring-gold/20">
            <FileText className="h-4 w-4 text-gold" />
            <span className="text-sm font-medium text-gold">{t('hero.trustBadge')}</span>
          </div>

          {/* Two-line headline */}
          <h1 className="animate-fade-in-up delay-100 mb-6 font-heading font-bold leading-tight text-white">
            <span className="block text-xl sm:text-2xl lg:text-3xl text-white/70 font-medium mb-2">{t('hero.titleLine1')}</span>
            <span className="block text-4xl sm:text-5xl lg:text-6xl">{t('hero.titleLine2')}</span>
          </h1>

          {/* Description */}
          <p className="animate-fade-in-up delay-200 text-lg leading-relaxed text-white/70 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
        </div>
      </div>

      {/* Bottom fade to off-white */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#f8f9fa] to-transparent"></div>
    </section>
  );
}
