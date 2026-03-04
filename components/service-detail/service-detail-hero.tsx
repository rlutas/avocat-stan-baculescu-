'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowLeft } from 'lucide-react';
import { LawIcon, serviceIconMap, type LawIconName } from '@/components/icons';

interface ServiceDetailHeroProps {
  serviceId: string;
}

export function ServiceDetailHero({ serviceId }: ServiceDetailHeroProps) {
  const t = useTranslations('ServiceDetail');
  const iconName: LawIconName = serviceIconMap[serviceId] || 'balance-scale';

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
        .delay-400 { animation-delay: 400ms; }
      `}</style>

      {/* Gold decorative elements */}
      <div className="gold-decoration"></div>
      <div className="gold-ring"></div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(30deg,transparent_24%,rgba(255,255,255,0.04)_25%,rgba(255,255,255,0.04)_26%,transparent_27%,transparent_74%,rgba(255,255,255,0.04)_75%,rgba(255,255,255,0.04)_76%,transparent_77%)] bg-[length:50px_50px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        {/* Back Link */}
        <Link
          href="/servicii"
          className="animate-fade-in-up mb-8 inline-flex items-center text-sm font-medium text-white/70 transition-colors hover:text-gold"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('backToServices')}
        </Link>

        <div className="lg:flex lg:items-start lg:gap-8">
          {/* Icon with gold accent */}
          <div className="animate-fade-in-up delay-100 mb-8 lg:mb-0">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gold/10 text-gold ring-1 ring-gold/20 transition-all duration-300 hover:bg-gold hover:text-navy hover:ring-gold sm:h-24 sm:w-24">
              <LawIcon name={iconName} size={48} variant="gold" />
            </div>
          </div>

          {/* Content */}
          <div className="lg:flex-1">
            {/* Trust Badge */}
            <div className="animate-fade-in-up delay-100 mb-4 inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-2 ring-1 ring-gold/20">
              <LawIcon name={iconName} size={16} variant="gold" />
              <span className="text-sm font-medium text-gold">{t(`${serviceId}.trustBadge`)}</span>
            </div>

            {/* Two-line Headline */}
            <h1 className="animate-fade-in-up delay-200 mb-4 font-heading font-bold leading-tight text-white">
              <span className="block text-xl sm:text-2xl lg:text-3xl text-white/70 font-medium">{t(`${serviceId}.titleLine1`)}</span>
              <span className="block text-3xl sm:text-4xl lg:text-5xl">{t(`${serviceId}.titleLine2`)}</span>
            </h1>

            {/* Description */}
            <p className="animate-fade-in-up delay-300 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
              {t(`${serviceId}.subtitle`)}
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}
