import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  ContactHero,
  ContactForm,
  ContactInfo,
  ContactMap,
} from '@/components/contact';
import { Clock, Gift } from 'lucide-react';

const BASE_URL = 'https://stanbaculescu.ro';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ContactPage.meta' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: locale === 'ro' ? 'ro_RO' : 'en_US',
      url: `${BASE_URL}/${locale}/contact`,
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/contact`,
      languages: {
        'ro-RO': `${BASE_URL}/ro/contact`,
        'en-US': `${BASE_URL}/en/contact`,
      },
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'ContactPage' });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'STAN-BACULESCU-SOCIETATE CIVILA DE AVOCATI',
    description: t('meta.description'),
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Str. Decebal Nr. 4, Et. 1',
      addressLocality: 'Satu Mare',
      postalCode: '440014',
      addressCountry: 'RO',
    },
    telephone: '+40745466720',
    email: 'office@stanbaculescu.ro',
    openingHours: 'Mo-Su 09:00-17:00',
    url: 'https://stanbaculescu.ro',
  };

  return (
    <>
      <style>{`
        @keyframes float-up {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        @keyframes float-down {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(8px);
          }
        }
        @keyframes badgeFadeIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-float-up {
          animation: float-up 4s ease-in-out infinite;
        }
        .animate-float-down {
          animation: float-down 4s ease-in-out infinite;
        }
        .animate-badge {
          animation: badgeFadeIn 0.8s ease-out both;
        }
      `}</style>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactHero />
      <section className="relative py-16 sm:py-24">
        {/* Floating Badges - Desktop only */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Left Badge */}
          <div className="animate-badge animate-float-up absolute left-4 top-32 hidden xl:block" style={{ animationDelay: '900ms' }}>
            <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-lg ring-1 ring-gold/20">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fef9e7]">
                <Clock className="h-4 w-4 text-gold" />
              </div>
              <span className="text-sm font-semibold text-navy">{t('floatingBadges.response')}</span>
            </div>
          </div>
          {/* Right Badge */}
          <div className="animate-badge animate-float-down absolute right-4 top-48 hidden xl:block" style={{ animationDelay: '1000ms' }}>
            <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-lg ring-1 ring-gold/20">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fef9e7]">
                <Gift className="h-4 w-4 text-gold" />
              </div>
              <span className="text-sm font-semibold text-navy">{t('floatingBadges.consultation')}</span>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </section>
      <ContactMap />
    </>
  );
}
