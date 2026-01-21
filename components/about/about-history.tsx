'use client';

import { useTranslations } from 'next-intl';
import { Scale, Award, Users } from 'lucide-react';
import Image from 'next/image';

export function AboutHistory() {
  const t = useTranslations('AboutPage.history');

  const milestones = [
    {
      icon: Scale,
      text: t('milestone1'),
    },
    {
      icon: Award,
      text: t('milestone2'),
    },
    {
      icon: Users,
      text: t('milestone3'),
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-24">
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
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out both;
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
      `}</style>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Image with shimmer effect */}
          <div className="animate-fade-in-up relative">
            <div className="photo-shimmer group aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-navy/5 to-navy/10 shadow-2xl ring-2 ring-navy/10 transition-all duration-500 hover:-translate-y-2 hover:ring-gold/60 hover:shadow-gold/20">
              <div className="flex h-full w-full items-center justify-center">
                <Scale className="h-24 w-24 text-navy/30 transition-transform duration-500 group-hover:scale-110" />
              </div>
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl bg-gold/20" />
          </div>

          {/* Content */}
          <div>
            <h2 className="animate-fade-in-up delay-100 font-heading mb-6 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              {t('title')}
            </h2>
            <p className="animate-fade-in-up delay-200 mb-8 text-lg leading-relaxed text-[#4b5563]">
              {t('description')}
            </p>

            {/* Milestones */}
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`animate-fade-in-up delay-${(index + 3) * 100} group flex items-center gap-4 rounded-xl p-3 transition-all duration-300 hover:-translate-y-1 hover:bg-[#fef9e7]/50 hover:shadow-md`}
                  style={{ animationDelay: `${(index + 3) * 100}ms` }}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#fef9e7] transition-transform duration-300 group-hover:scale-110">
                    <milestone.icon className="h-6 w-6 text-gold" />
                  </div>
                  <p className="text-[#1f2937] font-medium">{milestone.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
