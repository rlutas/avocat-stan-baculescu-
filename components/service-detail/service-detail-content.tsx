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
      {/* Description Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading mb-6 text-2xl font-bold text-navy sm:text-3xl">
            {t(`${serviceId}.descriptionTitle`)}
          </h2>
          <div className="prose prose-lg max-w-none">
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
            <h2 className="font-heading mb-8 text-2xl font-bold text-navy sm:text-3xl">
              {t(`${serviceId}.casesTitle`)}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {cases.map((caseItem, index) => (
                <div
                  key={index}
                  className="flex items-start rounded-lg border border-transparent bg-white p-4 shadow-sm transition-colors hover:border-gold"
                >
                  <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#fef9e7]">
                    <CheckCircle2 className="h-5 w-5 text-gold" />
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
            <h2 className="font-heading mb-8 text-2xl font-bold text-navy sm:text-3xl">
              {t(`${serviceId}.approachTitle`)}
            </h2>
            <div className="space-y-6">
              {approachPoints.map((point, index) => (
                <div key={index} className="flex items-start">
                  <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gold text-sm font-bold text-navy">
                    {index + 1}
                  </div>
                  <div className="pt-1">
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
