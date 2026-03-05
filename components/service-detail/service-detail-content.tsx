'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { LawIcon } from '@/components/icons';
import { ScrollAnimate, StaggerContainer, StaggerItem } from '@/components/ui/scroll-animate';

interface ServiceDetailContentProps {
  serviceId: string;
}

export function ServiceDetailContent({ serviceId }: ServiceDetailContentProps) {
  const t = useTranslations('ServiceDetail');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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

  // Collect FAQ items (up to 4)
  const faqItems: { question: string; answer: string }[] = [];
  for (let i = 1; i <= 4; i++) {
    const qKey = `${serviceId}.faq.q${i}` as const;
    const aKey = `${serviceId}.faq.a${i}` as const;
    if (t.has(qKey) && t.has(aKey)) {
      faqItems.push({ question: t(qKey), answer: t(aKey) });
    }
  }
  const faqTitle = t.has(`${serviceId}.faq.title` as const) ? t(`${serviceId}.faq.title` as const) : '';

  return (
    <>
      {/* -- Description section ----------------------------------------- */}
      <section className="bg-white py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
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
              <div className="mt-6 space-y-4">
                {t(`${serviceId}.description`).split('\n\n').map((paragraph: string, i: number) => (
                  <p key={i} className="text-lg leading-relaxed text-text-secondary">
                    {paragraph}
                  </p>
                ))}
              </div>
            </ScrollAnimate>
          </div>
        </div>
      </section>

      {/* -- Common Cases section ---------------------------------------- */}
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
                  <div className="group flex h-full items-start gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/[0.04] transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/[0.06]">
                    {/* Gold icon container */}
                    <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gold/10 transition-all duration-300 group-hover:bg-gold group-hover:shadow-[0_4px_12px_rgba(208,156,17,0.35)]">
                      <LawIcon name="approval" size={20} variant="gold" className="icon-hover-white" />
                    </div>
                    <div className="flex-1 pt-0.5">
                      <p className="text-sm font-medium leading-snug text-[#1f2937]">
                        {caseItem}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* -- Approach section -------------------------------------------- */}
      {approachPoints.length > 0 && (
        <section className="bg-white py-20 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-14 text-center sm:mb-16">
              <ScrollAnimate>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                  {t('sectionLabelApproach')}
                </p>
              </ScrollAnimate>
              <ScrollAnimate delay={0.1}>
                <h2 className="font-heading text-4xl font-bold leading-[1.1] text-navy sm:text-5xl">
                  {t(`${serviceId}.approachTitle`)}
                </h2>
                <div className="mx-auto mt-4 h-[2px] w-16 bg-gold" />
              </ScrollAnimate>
            </div>

            {/* ── Desktop: Horizontal timeline (lg+) ── */}
            <div className="hidden lg:block">
              {/* Connector line row — sits behind the circles */}
              <div className="relative mb-8">
                <div className="flex items-center">
                  {approachPoints.map((_, index) => (
                    <div key={index} className="flex flex-1 items-center">
                      {/* Circle node */}
                      <ScrollAnimate delay={0.15 + index * 0.12}>
                        <div className="relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-navy font-heading text-lg font-bold text-gold shadow-lg ring-4 ring-white">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                      </ScrollAnimate>
                      {/* Connecting line between circles (not after last) */}
                      {index < approachPoints.length - 1 && (
                        <div className="relative mx-1 h-[2px] flex-1">
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-gold/50 to-gold/20"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.6, delay: 0.3 + index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                            style={{ transformOrigin: 'left' }}
                          />
                          {/* Small gold diamond at midpoint */}
                          <motion.div
                            className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-gold/30"
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.6 + index * 0.15 }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Content cards row — aligned under each circle */}
              <StaggerContainer className="grid grid-cols-4 gap-5" staggerDelay={0.1}>
                {approachPoints.map((point, index) => (
                  <StaggerItem key={index} variant="fadeUp">
                    <div className="group h-full rounded-2xl border border-transparent bg-[#f8f9fa] p-5 ring-1 ring-black/[0.03] transition-all duration-500 hover:-translate-y-1 hover:border-gold/20 hover:shadow-xl hover:shadow-navy/[0.06]">
                      <p className="text-sm leading-relaxed text-[#1f2937]">{point}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>

            {/* ── Mobile: Vertical timeline (< lg) ── */}
            <div className="lg:hidden">
              <div className="relative ml-6">
                {/* Vertical gold line */}
                <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-gradient-to-b from-gold/40 via-gold/25 to-gold/10" />

                <div className="space-y-6">
                  {approachPoints.map((point, index) => (
                    <ScrollAnimate key={index} delay={index * 0.1}>
                      <div className="group relative flex items-start gap-5">
                        {/* Circle on the line */}
                        <div className="relative z-10 -ml-6 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-navy font-heading text-base font-bold text-gold shadow-md ring-4 ring-white">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                        {/* Card */}
                        <div className="flex-1 rounded-xl bg-[#f8f9fa] p-4 ring-1 ring-black/[0.03]">
                          <p className="text-sm leading-relaxed text-[#1f2937]">{point}</p>
                        </div>
                      </div>
                    </ScrollAnimate>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* -- FAQ section ------------------------------------------------- */}
      {faqItems.length > 0 && (
        <section className="bg-[#f8f9fa] py-20 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-14 sm:mb-16">
              <ScrollAnimate>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                  FAQ
                </p>
              </ScrollAnimate>
              <ScrollAnimate delay={0.1}>
                <h2 className="font-heading text-4xl font-bold leading-[1.1] text-navy sm:text-5xl">
                  {faqTitle}
                </h2>
                <div className="mt-4 h-[2px] w-16 bg-gold" />
              </ScrollAnimate>
            </div>

            <div className="space-y-4">
              {faqItems.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <ScrollAnimate key={index} delay={index * 0.08}>
                    <div
                      className={`rounded-2xl bg-white shadow-sm ring-1 ring-black/[0.04] transition-all duration-300 ${
                        isOpen ? 'border-l-2 border-gold' : 'border-l-2 border-transparent'
                      }`}
                    >
                      {/* Clickable header */}
                      <button
                        type="button"
                        className="flex w-full items-center gap-4 p-6 text-left sm:p-8"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        aria-expanded={isOpen}
                      >
                        {/* Numbered badge */}
                        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gold/10 font-heading text-sm font-bold text-gold">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        {/* Question text */}
                        <span className="flex-1 font-heading text-lg font-bold text-navy sm:text-xl">
                          {faq.question}
                        </span>
                        {/* Chevron */}
                        <ChevronDown
                          className={`h-5 w-5 flex-shrink-0 text-gold transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {/* Answer with animation */}
                      <div className="overflow-hidden">
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                            >
                              <p className="px-6 pb-6 pt-0 text-base leading-relaxed text-text-secondary sm:px-8 sm:pb-8">
                                {faq.answer}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </ScrollAnimate>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
