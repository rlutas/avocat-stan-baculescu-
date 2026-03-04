'use client';

import { useTranslations } from 'next-intl';
import { LawIcon, serviceIconMap, type LawIconName } from '@/components/icons';
import { ScrollAnimate, StaggerContainer, StaggerItem } from '@/components/ui/scroll-animate';

interface ServiceDetailContentProps {
  serviceId: string;
}

export function ServiceDetailContent({ serviceId }: ServiceDetailContentProps) {
  const t = useTranslations('ServiceDetail');
  const iconName: LawIconName = serviceIconMap[serviceId] || 'balance-scale';

  // Collect cases (up to 6)
  const cases: string[] = [];
  for (let i = 1; i <= 6; i++) {
    const key = `${serviceId}.cases.case${i}` as const;
    if (t.has(key)) {
      cases.push(t(key));
    }
  }

  // Collect approach points (up to 4)
  const approachPoints: string[] = [];
  for (let i = 1; i <= 4; i++) {
    const key = `${serviceId}.approach.point${i}` as const;
    if (t.has(key)) {
      approachPoints.push(t(key));
    }
  }

  return (
    <>
      {/* ── Description section ─────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-20">
            {/* Left: text */}
            <div>
              <ScrollAnimate>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                  {t('sectionLabelDescription')}
                </p>
              </ScrollAnimate>
              <ScrollAnimate delay={0.1}>
                <h2 className="font-heading text-4xl font-bold leading-[1.1] text-navy sm:text-5xl">
                  {t(`${serviceId}.descriptionTitle`)}
                </h2>
                <div className="mt-4 h-[2px] w-16 bg-gold" />
              </ScrollAnimate>
              <ScrollAnimate delay={0.2}>
                <p className="mt-6 text-lg leading-relaxed text-text-secondary">
                  {t(`${serviceId}.description`)}
                </p>
              </ScrollAnimate>
            </div>

            {/* Right: decorative stat/feature card */}
            <ScrollAnimate delay={0.3} variant="fadeRight">
              <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-[#f8f9fa] p-8 shadow-sm">
                {/* Gold corner accent */}
                <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-[80px] bg-gold/[0.07]" />

                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-2 ring-gold/15">
                  <LawIcon name={iconName} size={28} variant="gold" />
                </div>

                <h3 className="mt-5 font-heading text-2xl font-bold text-navy">
                  {t(`${serviceId}.descriptionTitle`)}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-text-secondary line-clamp-4">
                  {t(`${serviceId}.description`)}
                </p>

                {/* Gold bottom accent line */}
                <div className="mt-6 h-[2px] w-full bg-gradient-to-r from-gold/60 via-gold to-gold/0" />
              </div>
            </ScrollAnimate>
          </div>
        </div>
      </section>

      {/* ── Common Cases section ─────────────────────────────────── */}
      {cases.length > 0 && (
        <section className="bg-[#f8f9fa] py-20 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-14 sm:mb-16">
              <ScrollAnimate>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                  {t('sectionLabelCases')}
                </p>
              </ScrollAnimate>
              <ScrollAnimate delay={0.1}>
                <h2 className="font-heading text-4xl font-bold leading-[1.1] text-navy sm:text-5xl">
                  {t(`${serviceId}.casesTitle`)}
                </h2>
                <div className="mt-4 h-[2px] w-16 bg-gold" />
              </ScrollAnimate>
            </div>

            {/* Cases grid */}
            <StaggerContainer
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              staggerDelay={0.07}
            >
              {cases.map((caseItem, index) => (
                <StaggerItem key={index} variant="scaleUp">
                  <div className="group flex h-full items-start gap-4 overflow-hidden rounded-2xl border border-transparent bg-white p-5 shadow-sm ring-1 ring-black/[0.04] transition-all duration-500 hover:-translate-y-1 hover:border-gold/20 hover:shadow-xl hover:shadow-navy/[0.06]">
                    {/* Gold check icon */}
                    <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#fef9e7] transition-all duration-300 group-hover:bg-gold group-hover:shadow-[0_4px_12px_rgba(208,156,17,0.35)]">
                      <LawIcon name="approval" size={20} variant="gold" />
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-sm font-medium leading-snug text-[#1f2937]">
                        {caseItem}
                      </p>
                    </div>
                    {/* Gold bottom line reveal */}
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-gold to-gold/0 transition-all duration-500 group-hover:w-full" />
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* ── Approach section ─────────────────────────────────────── */}
      {approachPoints.length > 0 && (
        <section className="bg-white py-20 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-14 sm:mb-16">
              <ScrollAnimate>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                  {t('sectionLabelApproach')}
                </p>
              </ScrollAnimate>
              <ScrollAnimate delay={0.1}>
                <h2 className="font-heading text-4xl font-bold leading-[1.1] text-navy sm:text-5xl">
                  {t(`${serviceId}.approachTitle`)}
                </h2>
                <div className="mt-4 h-[2px] w-16 bg-gold" />
              </ScrollAnimate>
            </div>

            {/* Approach steps — vertical numbered list */}
            <StaggerContainer className="space-y-4" staggerDelay={0.1}>
              {approachPoints.map((point, index) => (
                <StaggerItem key={index} variant="fadeLeft">
                  <div className="group flex items-start gap-6 overflow-hidden rounded-2xl border border-transparent bg-[#f8f9fa] p-5 shadow-sm ring-1 ring-black/[0.03] transition-all duration-500 hover:-translate-y-1 hover:border-gold/20 hover:shadow-xl hover:shadow-navy/[0.06] sm:p-6">
                    {/* Step number */}
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-navy font-heading text-lg font-bold text-gold shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_4px_16px_rgba(0,58,112,0.3)]">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="flex-1 pt-1.5">
                      <p className="text-base leading-relaxed text-[#1f2937]">{point}</p>
                    </div>
                    {/* Right indicator */}
                    <div className="flex-shrink-0 self-center opacity-0 transition-all duration-300 group-hover:opacity-100">
                      <div className="h-1.5 w-1.5 rounded-full bg-gold" />
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}
    </>
  );
}
