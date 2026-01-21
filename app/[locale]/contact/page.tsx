import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  ContactHero,
  ContactForm,
  ContactInfo,
  ContactMap,
} from '@/components/contact';

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
    name: 'Societate Civila de Avocati Stan-Baculescu',
    description: t('meta.description'),
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Str. Aurel Popp 2',
      addressLocality: 'Satu Mare',
      postalCode: '440014',
      addressCountry: 'RO',
    },
    telephone: '+40261848015',
    email: 'office@stanbaculescu.ro',
    openingHours: 'Mo-Su 09:00-17:00',
    url: 'https://stanbaculescu.ro',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactHero />
      <section className="py-16 sm:py-24">
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
