'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowLeft, FileText, Users, AlertTriangle, Scale, BookOpen, Mail } from 'lucide-react';

export default function TermsOfServiceContent() {
  const t = useTranslations('TermsOfService');

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
          width: 350px;
          height: 350px;
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
          width: 300px;
          height: 300px;
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
      `}</style>

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-navy py-16 md:py-20">
        {/* Gold decorative elements */}
        <div className="gold-decoration"></div>
        <div className="gold-ring"></div>

        <div className="relative container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            {/* Trust Badge */}
            <div className="animate-fade-in-up inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-2 rounded-full text-sm font-medium mb-6 ring-1 ring-gold/20">
              <FileText className="h-4 w-4" />
              <span>{t('badge')}</span>
            </div>

            {/* Two-line Headline */}
            <h1 className="animate-fade-in-up delay-100 font-heading font-bold leading-tight text-white mb-4">
              <span className="block text-lg sm:text-xl lg:text-2xl text-white/70 font-medium">{t('hero.titleLine1')}</span>
              <span className="block text-3xl sm:text-4xl md:text-5xl">{t('hero.titleLine2')}</span>
            </h1>

            {/* Subtitle */}
            <p className="animate-fade-in-up delay-200 text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              {t('hero.subtitle')}
            </p>
          </div>
        </div>
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
