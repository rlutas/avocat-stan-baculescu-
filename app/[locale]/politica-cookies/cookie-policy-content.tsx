'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowLeft, Cookie, Settings, BarChart3, Megaphone, Clock, Shield, Mail } from 'lucide-react';

export default function CookiePolicyContent() {
  const t = useTranslations('CookiePolicy');

  const sections = [
    {
      id: 'introduction',
      icon: Cookie,
      title: t('sections.introduction.title'),
      content: t('sections.introduction.content'),
    },
    {
      id: 'whatAreCookies',
      icon: Settings,
      title: t('sections.whatAreCookies.title'),
      content: t('sections.whatAreCookies.content'),
    },
    {
      id: 'essentialCookies',
      icon: Shield,
      title: t('sections.essentialCookies.title'),
      content: t('sections.essentialCookies.content'),
      cookies: [
        {
          name: 'cookie-consent',
          purpose: t('sections.essentialCookies.cookies.cookieConsent.purpose'),
          duration: t('sections.essentialCookies.cookies.cookieConsent.duration'),
        },
        {
          name: 'cookie-preferences',
          purpose: t('sections.essentialCookies.cookies.cookiePreferences.purpose'),
          duration: t('sections.essentialCookies.cookies.cookiePreferences.duration'),
        },
        {
          name: 'NEXT_LOCALE',
          purpose: t('sections.essentialCookies.cookies.nextLocale.purpose'),
          duration: t('sections.essentialCookies.cookies.nextLocale.duration'),
        },
      ],
    },
    {
      id: 'analyticsCookies',
      icon: BarChart3,
      title: t('sections.analyticsCookies.title'),
      content: t('sections.analyticsCookies.content'),
      cookies: [
        {
          name: '_ga',
          purpose: t('sections.analyticsCookies.cookies.ga.purpose'),
          duration: t('sections.analyticsCookies.cookies.ga.duration'),
        },
        {
          name: '_ga_*',
          purpose: t('sections.analyticsCookies.cookies.gaId.purpose'),
          duration: t('sections.analyticsCookies.cookies.gaId.duration'),
        },
      ],
    },
    {
      id: 'marketingCookies',
      icon: Megaphone,
      title: t('sections.marketingCookies.title'),
      content: t('sections.marketingCookies.content'),
    },
    {
      id: 'manageCookies',
      icon: Settings,
      title: t('sections.manageCookies.title'),
      content: t('sections.manageCookies.content'),
      items: [
        t('sections.manageCookies.items.item1'),
        t('sections.manageCookies.items.item2'),
        t('sections.manageCookies.items.item3'),
        t('sections.manageCookies.items.item4'),
      ],
    },
    {
      id: 'retention',
      icon: Clock,
      title: t('sections.retention.title'),
      content: t('sections.retention.content'),
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
              <Cookie className="h-4 w-4" />
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

                      {/* Cookie table */}
                      {'cookies' in section && section.cookies && (
                        <div className="mt-6 overflow-x-auto">
                          <table className="w-full border-collapse rounded-xl overflow-hidden">
                            <thead>
                              <tr className="bg-[#f8f9fa]">
                                <th className="text-left p-4 text-navy font-semibold border border-navy/10">
                                  {t('table.name')}
                                </th>
                                <th className="text-left p-4 text-navy font-semibold border border-navy/10">
                                  {t('table.purpose')}
                                </th>
                                <th className="text-left p-4 text-navy font-semibold border border-navy/10">
                                  {t('table.duration')}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {section.cookies.map((cookie, index) => (
                                <tr key={index} className="hover:bg-[#f8f9fa]/50 transition-colors">
                                  <td className="p-4 text-[#4b5563] border border-navy/10 font-mono text-sm">
                                    <span className="bg-gold/10 text-gold px-2 py-1 rounded">{cookie.name}</span>
                                  </td>
                                  <td className="p-4 text-[#4b5563] border border-navy/10">
                                    {cookie.purpose}
                                  </td>
                                  <td className="p-4 text-[#4b5563] border border-navy/10">
                                    {cookie.duration}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* Items list */}
                      {'items' in section && section.items && (
                        <ul className="space-y-3 mt-4">
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
