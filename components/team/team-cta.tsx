'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function TeamCta() {
  const t = useTranslations('TeamPage.cta');

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
      `}</style>

      {/* Gold decorative elements */}
      <div className="gold-decoration" />
      <div className="gold-ring" />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(30deg,transparent_24%,rgba(255,255,255,0.04)_25%,rgba(255,255,255,0.04)_26%,transparent_27%,transparent_74%,rgba(255,255,255,0.04)_75%,rgba(255,255,255,0.04)_76%,transparent_77%)] bg-[length:50px_50px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2
          className="font-heading mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          style={{ animation: 'fadeInUp 1s ease-out both' }}
        >
          {t('title')}
        </h2>
        <p
          className="mx-auto mb-8 max-w-2xl text-lg text-white/80"
          style={{ animation: 'fadeInUp 1s ease-out 100ms both' }}
        >
          {t('description')}
        </p>
        <div style={{ animation: 'fadeInUp 1s ease-out 200ms both' }}>
          <Button
            asChild
            size="lg"
            className="group bg-gold text-navy hover:bg-gold/90"
            style={{ animation: 'pulse-glow 2s ease-in-out infinite' }}
          >
            <Link href="/contact">
              {t('button')}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
