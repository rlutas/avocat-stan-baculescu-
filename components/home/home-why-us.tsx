'use client';

import { useTranslations } from 'next-intl';
import { CheckCircle2, Shield } from 'lucide-react';

export function HomeWhyUs() {
  const t = useTranslations('HomePage.whyUs');

  const stats = [
    { value: t('stat1Value'), label: t('stat1Label') },
    { value: t('stat2Value'), label: t('stat2Label') },
    { value: t('stat3Value'), label: t('stat3Label') },
  ];

  const values = [
    { title: t('value1Title'), description: t('value1Description') },
    { title: t('value2Title'), description: t('value2Description') },
    { title: t('value3Title'), description: t('value3Description') },
  ];

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
        @keyframes countUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .gold-orb {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(208, 156, 17, 0.2) 0%, transparent 70%);
          animation: gold-pulse 6s ease-in-out infinite;
          pointer-events: none;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out both;
        }
        .animate-count-up {
          animation: countUp 1s ease-out both;
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
      `}</style>

      {/* Background decorative orbs */}
      <div
        className="gold-orb"
        style={{ top: '10%', right: '-100px', width: '300px', height: '300px' }}
      />
      <div
        className="gold-orb"
        style={{ bottom: '10%', left: '-150px', width: '400px', height: '400px', animationDelay: '3s' }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center lg:mb-16">
          <div className="animate-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-2">
            <Shield className="h-4 w-4 text-gold" />
            <span className="text-sm font-semibold text-gold">{t('trustBadge')}</span>
          </div>

          <p className="animate-fade-in-up delay-100 mb-2 text-sm font-semibold uppercase tracking-widest text-gold">
            {t('titleLine1')}
          </p>
          <h2 className="animate-fade-in-up delay-200 font-heading mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {t('titleLine2')}
          </h2>
          <p className="animate-fade-in-up delay-300 mx-auto max-w-2xl text-lg text-white/70">
            {t('description')}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Value Propositions */}
          <div className="space-y-5">
            {values.map((value, index) => (
              <div
                key={index}
                className="animate-fade-in-up group flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:border-gold/30 hover:bg-white/10"
                style={{ animationDelay: `${(index + 4) * 100}ms` }}
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gold/20 transition-colors duration-300 group-hover:bg-gold/30">
                  <CheckCircle2 className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <h3 className="mb-1 font-heading text-lg font-semibold text-white">
                    {value.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/60">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Statistics */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1 lg:gap-5">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="animate-count-up group rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition-all duration-300 hover:border-gold/30 hover:bg-white/10 lg:flex lg:items-center lg:gap-6 lg:text-left"
                style={{ animationDelay: `${(index + 4) * 150}ms` }}
              >
                <div className="mb-2 font-heading text-5xl font-bold text-gold transition-transform duration-300 group-hover:scale-110 lg:mb-0 lg:min-w-[120px] lg:text-6xl">
                  {stat.value}
                </div>
                <div className="text-sm font-medium uppercase tracking-wider text-white/60 lg:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
