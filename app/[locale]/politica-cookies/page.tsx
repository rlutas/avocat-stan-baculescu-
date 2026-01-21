import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowLeft, Cookie, Settings, BarChart3, Megaphone, Clock, Shield, Mail } from 'lucide-react';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === 'ro'
      ? 'Politica de Cookies | Cabinet de Avocatura Stan-Baculescu'
      : 'Cookie Policy | Stan-Baculescu Law Firm';
  const description =
    locale === 'ro'
      ? 'Politica de cookies a Cabinetului de Avocatura Stan-Baculescu. Aflati ce cookie-uri folosim si cum puteti gestiona preferintele.'
      : 'Cookie Policy of Stan-Baculescu Law Firm. Learn what cookies we use and how you can manage your preferences.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'ro' ? 'ro_RO' : 'en_US',
    },
  };
}

function CookiePolicyContent() {
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
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#002a52] via-[#003a70] to-[#004a8f] py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-gold/20 text-gold px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Cookie className="h-4 w-4" />
              <span>{t('badge')}</span>
            </div>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {t('hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              {t('hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Back Link */}
      <div className="container mx-auto px-4 md:px-6 py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-navy hover:text-gold transition-colors"
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
            <div className="mb-8 p-4 bg-[#f8f9fa] rounded-lg border border-navy/10">
              <p className="text-sm text-[#4b5563]">
                <span className="font-semibold text-navy">{t('lastUpdated')}:</span> {t('lastUpdatedDate')}
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-12">
              {sections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <div key={section.id} className="scroll-mt-24" id={section.id}>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-[#fef9e7] rounded-lg flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-gold" />
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
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-[#f8f9fa]">
                                <th className="text-left p-3 text-navy font-semibold border border-navy/10">
                                  {t('table.name')}
                                </th>
                                <th className="text-left p-3 text-navy font-semibold border border-navy/10">
                                  {t('table.purpose')}
                                </th>
                                <th className="text-left p-3 text-navy font-semibold border border-navy/10">
                                  {t('table.duration')}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {section.cookies.map((cookie, index) => (
                                <tr key={index} className="hover:bg-[#f8f9fa]/50">
                                  <td className="p-3 text-[#4b5563] border border-navy/10 font-mono text-sm">
                                    {cookie.name}
                                  </td>
                                  <td className="p-3 text-[#4b5563] border border-navy/10">
                                    {cookie.purpose}
                                  </td>
                                  <td className="p-3 text-[#4b5563] border border-navy/10">
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
                        <ul className="space-y-2 mt-4">
                          {section.items.map((item, index) => (
                            <li key={index} className="flex items-start gap-3">
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
            <div className="mt-16 p-8 bg-[linear-gradient(135deg,#002a52_0%,#003a70_50%,#004a8f_100%)] rounded-xl text-white">
              <h3 className="font-heading text-xl md:text-2xl font-bold mb-4">
                {t('questions.title')}
              </h3>
              <p className="text-white/90 mb-6">{t('questions.description')}</p>
              <div className="space-y-3">
                <p className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gold" />
                  <span>office@stanbaculescu.ro</span>
                </p>
                <p className="text-white/80 text-sm">{t('questions.address')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default async function CookiePolicyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CookiePolicyContent />;
}
