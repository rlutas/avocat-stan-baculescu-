import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowLeft, Shield, Database, Clock, UserCheck, Share2, Mail } from 'lucide-react';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === 'ro'
      ? 'Politica de Confidentialitate | Cabinet de Avocatura Stan-Baculescu'
      : 'Privacy Policy | Stan-Baculescu Law Firm';
  const description =
    locale === 'ro'
      ? 'Politica de confidentialitate a Cabinetului de Avocatura Stan-Baculescu. Aflati cum colectam, utilizam si protejam datele dumneavoastra personale.'
      : 'Privacy Policy of Stan-Baculescu Law Firm. Learn how we collect, use, and protect your personal data.';

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

function PrivacyPolicyContent() {
  const t = useTranslations('PrivacyPolicy');

  const sections = [
    {
      id: 'introduction',
      icon: Shield,
      title: t('sections.introduction.title'),
      content: t('sections.introduction.content'),
    },
    {
      id: 'dataCollected',
      icon: Database,
      title: t('sections.dataCollected.title'),
      content: t('sections.dataCollected.content'),
      items: [
        t('sections.dataCollected.items.item1'),
        t('sections.dataCollected.items.item2'),
        t('sections.dataCollected.items.item3'),
        t('sections.dataCollected.items.item4'),
        t('sections.dataCollected.items.item5'),
      ],
    },
    {
      id: 'purpose',
      icon: UserCheck,
      title: t('sections.purpose.title'),
      content: t('sections.purpose.content'),
      items: [
        t('sections.purpose.items.item1'),
        t('sections.purpose.items.item2'),
        t('sections.purpose.items.item3'),
        t('sections.purpose.items.item4'),
      ],
    },
    {
      id: 'retention',
      icon: Clock,
      title: t('sections.retention.title'),
      content: t('sections.retention.content'),
    },
    {
      id: 'rights',
      icon: UserCheck,
      title: t('sections.rights.title'),
      content: t('sections.rights.content'),
      items: [
        t('sections.rights.items.item1'),
        t('sections.rights.items.item2'),
        t('sections.rights.items.item3'),
        t('sections.rights.items.item4'),
        t('sections.rights.items.item5'),
        t('sections.rights.items.item6'),
      ],
    },
    {
      id: 'thirdParties',
      icon: Share2,
      title: t('sections.thirdParties.title'),
      content: t('sections.thirdParties.content'),
      items: [
        t('sections.thirdParties.items.item1'),
        t('sections.thirdParties.items.item2'),
        t('sections.thirdParties.items.item3'),
      ],
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
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Shield className="h-4 w-4" />
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
          className="inline-flex items-center gap-2 text-[#003a70] hover:text-amber-600 transition-colors"
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
            <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">{t('lastUpdated')}:</span> {t('lastUpdatedDate')}
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-12">
              {sections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <div key={section.id} className="scroll-mt-24" id={section.id}>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-amber-600" />
                      </div>
                      <h2 className="font-heading text-2xl md:text-3xl font-bold text-[#003a70] pt-2">
                        {section.title}
                      </h2>
                    </div>
                    <div className="ml-16">
                      <p className="text-gray-600 leading-relaxed mb-4">{section.content}</p>
                      {section.items && (
                        <ul className="space-y-2">
                          {section.items.map((item, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <span className="flex-shrink-0 w-2 h-2 bg-amber-500 rounded-full mt-2" />
                              <span className="text-gray-600">{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Contact Section for Data Protection */}
            <div className="mt-16 p-8 bg-gradient-to-r from-[#003a70] to-[#004a8f] rounded-xl text-white">
              <h3 className="font-heading text-xl md:text-2xl font-bold mb-4">
                {t('dataProtection.title')}
              </h3>
              <p className="text-white/90 mb-6">{t('dataProtection.description')}</p>
              <div className="space-y-3">
                <p className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-amber-400" />
                  <span>office@stanbaculescu.ro</span>
                </p>
                <p className="text-white/80 text-sm">{t('dataProtection.address')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default async function PrivacyPolicyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PrivacyPolicyContent />;
}
