import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowLeft, FileText, Users, AlertTriangle, Scale, BookOpen, Mail } from 'lucide-react';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === 'ro'
      ? 'Termeni si Conditii | Cabinet de Avocatura Stan-Baculescu'
      : 'Terms of Service | Stan-Baculescu Law Firm';
  const description =
    locale === 'ro'
      ? 'Termenii si conditiile de utilizare a site-ului web al Cabinetului de Avocatura Stan-Baculescu. Cititi cu atentie inainte de a utiliza serviciile noastre.'
      : 'Terms and conditions for using the Stan-Baculescu Law Firm website. Please read carefully before using our services.';

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

function TermsOfServiceContent() {
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
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#002a52] via-[#003a70] to-[#004a8f] py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-gold/20 text-gold px-4 py-2 rounded-full text-sm font-medium mb-6">
              <FileText className="h-4 w-4" />
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
                      {section.items && (
                        <ul className="space-y-2">
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

export default async function TermsOfServicePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <TermsOfServiceContent />;
}
