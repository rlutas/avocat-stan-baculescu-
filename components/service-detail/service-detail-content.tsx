'use client';

import { useTranslations } from 'next-intl';
import { CheckCircle2 } from 'lucide-react';

interface ServiceDetailContentProps {
  serviceId: string;
}

export function ServiceDetailContent({ serviceId }: ServiceDetailContentProps) {
  const t = useTranslations('ServiceDetail');

  // Get cases array (up to 6 cases)
  const cases = [];
  for (let i = 1; i <= 6; i++) {
    const caseKey = `${serviceId}.cases.case${i}` as const;
    if (t.has(caseKey)) {
      cases.push(t(caseKey));
    }
  }

  // Get approach points array (up to 4 points)
  const approachPoints = [];
  for (let i = 1; i <= 4; i++) {
    const pointKey = `${serviceId}.approach.point${i}` as const;
    if (t.has(pointKey)) {
      approachPoints.push(t(pointKey));
    }
  }

  return (
    <>
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
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out both;
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }
        .delay-600 { animation-delay: 600ms; }
      `}</style>

      {/* Description Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="animate-fade-in-up font-heading mb-6 text-2xl font-bold text-navy sm:text-3xl">
            {t(`${serviceId}.descriptionTitle`)}
          </h2>
          <div className="animate-fade-in-up delay-100 prose prose-lg max-w-none">
            <p className="leading-relaxed text-[#4b5563]">
              {t(`${serviceId}.description`)}
            </p>
          </div>
        </div>
      </section>

      {/* Common Cases Section */}
      {cases.length > 0 && (
        <section className="bg-[#f8f9fa] py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="animate-fade-in-up font-heading mb-8 text-2xl font-bold text-navy sm:text-3xl">
              {t(`${serviceId}.casesTitle`)}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {cases.map((caseItem, index) => (
                <div
                  key={index}
                  className="animate-fade-in-up group flex items-start rounded-xl border border-transparent bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-lg hover:ring-2 hover:ring-gold/20"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#fef9e7] transition-colors duration-300 group-hover:bg-gold">
                    <CheckCircle2 className="h-5 w-5 text-gold transition-colors duration-300 group-hover:text-navy" />
                  </div>
                  <span className="pt-2 font-medium text-[#1f2937]">
                    {caseItem}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Our Approach Section */}
      {approachPoints.length > 0 && (
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="animate-fade-in-up font-heading mb-8 text-2xl font-bold text-navy sm:text-3xl">
              {t(`${serviceId}.approachTitle`)}
            </h2>
            <div className="space-y-6">
              {approachPoints.map((point, index) => (
                <div
                  key={index}
                  className="animate-fade-in-up group flex items-start rounded-xl border border-transparent bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-lg"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gold text-lg font-bold text-navy transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_4px_12px_rgba(208,156,17,0.4)]">
                    {index + 1}
                  </div>
                  <div className="pt-2">
                    <p className="text-lg text-[#1f2937]">{point}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
