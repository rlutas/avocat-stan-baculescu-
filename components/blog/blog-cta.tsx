'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function BlogCta() {
  const t = useTranslations('BlogPage');

  return (
    <section className="relative py-20 bg-navy overflow-hidden">
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
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 4px 15px rgba(208, 156, 17, 0.3);
          }
          50% {
            box-shadow: 0 6px 25px rgba(208, 156, 17, 0.6);
          }
        }
        .gold-decoration {
          position: absolute;
          top: 50%;
          left: 80%;
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
          left: 80%;
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
      `}</style>

      {/* Gold decorative elements */}
      <div className="gold-decoration"></div>
      <div className="gold-ring"></div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <h2 className="animate-fade-in-up text-3xl md:text-4xl font-heading font-bold text-white mb-4">
          {t('cta.title')}
        </h2>
        <p className="animate-fade-in-up delay-100 text-xl text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
          {t('cta.description')}
        </p>
        <div className="animate-fade-in-up delay-200">
          <Button
            asChild
            size="lg"
            className="group animate-pulse-glow h-14 rounded-full bg-gold px-8 text-base font-semibold text-navy transition-all duration-300 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/30"
          >
            <Link href="/contact">
              {t('cta.button')}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
