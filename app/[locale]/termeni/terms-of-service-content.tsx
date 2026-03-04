'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowLeft, FileText, Users, AlertTriangle, Scale, BookOpen, Mail } from 'lucide-react';

export default function TermsOfServiceContent() {
  const t = useTranslations('TermsOfService');

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const sections = [
    {
      id: 'introduction',
      icon: FileText,
      title: t('sections.introduction.title'),
      content: t('sections.introduction.content'),
    },
    {
      id: 'serviceDescription',
      icon: BookOpen,
      title: t('sections.serviceDescription.title'),
      content: t('sections.serviceDescription.content'),
      items: [
        t('sections.serviceDescription.items.item1'),
        t('sections.serviceDescription.items.item2'),
        t('sections.serviceDescription.items.item3'),
        t('sections.serviceDescription.items.item4'),
      ],
    },
    {
      id: 'userObligations',
      icon: Users,
      title: t('sections.userObligations.title'),
      content: t('sections.userObligations.content'),
      items: [
        t('sections.userObligations.items.item1'),
        t('sections.userObligations.items.item2'),
        t('sections.userObligations.items.item3'),
        t('sections.userObligations.items.item4'),
        t('sections.userObligations.items.item5'),
      ],
    },
    {
      id: 'intellectualProperty',
      icon: FileText,
      title: t('sections.intellectualProperty.title'),
      content: t('sections.intellectualProperty.content'),
    },
    {
      id: 'liability',
      icon: AlertTriangle,
      title: t('sections.liability.title'),
      content: t('sections.liability.content'),
      items: [
        t('sections.liability.items.item1'),
        t('sections.liability.items.item2'),
        t('sections.liability.items.item3'),
      ],
    },
    {
      id: 'governingLaw',
      icon: Scale,
      title: t('sections.governingLaw.title'),
      content: t('sections.governingLaw.content'),
    },
    {
      id: 'modifications',
      icon: FileText,
      title: t('sections.modifications.title'),
      content: t('sections.modifications.content'),
    },
    {
      id: 'contact',
      icon: Mail,
      title: t('sections.contact.title'),
      content: t('sections.contact.content'),
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes lineReveal {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>

      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden bg-[linear-gradient(135deg,#002a52_0%,#003a70_60%,#004a8f_100%)] pt-32 pb-20 sm:pt-40 sm:pb-28">
        {/* Subtle grid texture */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        {/* Gold radial glow — right side */}
        <div
          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3"
          style={{
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(208,156,17,0.18) 0%, rgba(208,156,17,0.06) 45%, transparent 70%)',
          }}
        />

        {/* Gold accent top line with shimmer */}
        <div className="absolute left-0 right-0 top-0 h-[2px] animate-shimmer bg-[length:200%_100%] bg-[linear-gradient(90deg,transparent_0%,#d09c11_25%,#e6b520_50%,#d09c11_75%,transparent_100%)]" />

        {/* Noise grain texture */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.03] mix-blend-soft-light" aria-hidden="true">
          <filter id="termsHeroNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#termsHeroNoise)" />
        </svg>

        {/* Animated gold line art */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true">
          <motion.path
            d="M-50 800 Q350 400 700 500 T1450 100"
            stroke="rgba(208, 156, 17, 0.10)"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: 3, ease: "easeInOut", delay: 1.2 },
              opacity: { duration: 0.5, delay: 1.2 }
            }}
          />
          <motion.path
            d="M-50 830 Q350 430 700 530 T1450 130"
            stroke="rgba(208, 156, 17, 0.05)"
            strokeWidth="1"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: 3.5, ease: "easeInOut", delay: 1.5 },
              opacity: { duration: 0.5, delay: 1.5 }
            }}
          />
        </svg>

        <motion.div style={{ y: contentY }} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            {/* Gold label */}
            <p
              className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-gold"
              style={{ animation: 'fadeInUp 0.8s ease-out both' }}
            >
              {t('badge')}
            </p>

            {/* Heading */}
            <h1
              className="font-heading font-bold leading-[1.05] text-white"
              style={{ animation: 'fadeInUp 0.8s ease-out 120ms both' }}
            >
              <span className="mb-1 block text-2xl font-semibold text-gold/90 sm:text-3xl">
                {t('hero.titleLine1')}
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl">
                {t('hero.titleLine2')}
              </span>
            </h1>

            {/* Animated gold bar */}
            <div
              className="mt-5 h-[2px] w-16 origin-left bg-gold"
              style={{ animation: 'lineReveal 1.2s ease-out 200ms both' }}
            />

            {/* Description */}
            <p
              className="mt-6 max-w-lg text-lg leading-relaxed text-white/70"
              style={{ animation: 'fadeInUp 0.8s ease-out 280ms both' }}
            >
              {t('hero.subtitle')}
            </p>
          </div>
        </motion.div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/[0.04] to-transparent" />
      </section>

      {/* Back Link */}
      <div className="container mx-auto px-4 md:px-6 py-6">
        <Link
          href="/"
          className="animate-fade-in-up delay-300 inline-flex items-center gap-2 text-navy hover:text-gold transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{t('backToHome')}</span>
        </Link>
      </div>

      {/* Content */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Last Updated */}
            <div className="mb-8 p-4 bg-[#f8f9fa] rounded-xl border border-navy/10 hover:border-gold/30 transition-colors">
              <p className="text-sm text-[#4b5563]">
                <span className="font-semibold text-navy">{t('lastUpdated')}:</span> {t('lastUpdatedDate')}
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-12">
              {sections.map((section, sectionIndex) => {
                const IconComponent = section.icon;
                return (
                  <div
                    key={section.id}
                    className="scroll-mt-24 group"
                    id={section.id}
                    style={{
                      animation: 'fadeInUp 1s ease-out both',
                      animationDelay: `${(sectionIndex + 1) * 100}ms`
                    }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-[#fef9e7] rounded-xl flex items-center justify-center group-hover:bg-gold transition-colors">
                        <IconComponent className="h-6 w-6 text-gold group-hover:text-navy transition-colors" />
                      </div>
                      <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy pt-2">
                        {section.title}
                      </h2>
                    </div>
                    <div className="ml-16">
                      <p className="text-[#4b5563] leading-relaxed mb-4">{section.content}</p>
                      {section.items && (
                        <ul className="space-y-3">
                          {section.items.map((item, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#f8f9fa] transition-colors"
                            >
                              <span className="flex-shrink-0 w-2 h-2 bg-gold rounded-full mt-2" />
                              <span className="text-[#4b5563]">{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Contact Section */}
            <div className="mt-16 p-8 bg-navy rounded-2xl text-white relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gold/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

              <div className="relative">
                <h3 className="font-heading text-xl md:text-2xl font-bold mb-4">
                  {t('questions.title')}
                </h3>
                <p className="text-white/90 mb-6">{t('questions.description')}</p>
                <div className="space-y-3">
                  <p className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-10 h-10 bg-[#fef9e7] rounded-lg flex items-center justify-center">
                      <Mail className="h-5 w-5 text-gold" />
                    </span>
                    <span className="font-medium">office@stanbaculescu.ro</span>
                  </p>
                  <p className="text-white/80 text-sm ml-13">{t('questions.address')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
