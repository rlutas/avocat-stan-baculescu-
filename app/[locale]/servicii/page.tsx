import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { ServicesHero, ServicesGrid, ServicesCta } from '@/components/services';

const BASE_URL = 'https://stanbaculescu.ro';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === 'ro'
      ? 'Servicii Juridice | SCA Stan-Baculescu'
      : 'Legal Services | Stan-Baculescu Law Firm';
  const description =
    locale === 'ro'
      ? 'Descopera serviciile juridice oferite de SCA Stan-Baculescu: malpraxis medical, drept civil, penal, familiei, muncii, comercial, accidente rutiere si drept administrativ.'
      : 'Discover the legal services offered by Stan-Baculescu Law Firm: medical malpractice, civil law, criminal law, family law, labor law, commercial law, traffic accidents, and administrative law.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'ro' ? 'ro_RO' : 'en_US',
      url: `${BASE_URL}/${locale}/servicii`,
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/servicii`,
      languages: {
        'ro-RO': `${BASE_URL}/ro/servicii`,
        'en-US': `${BASE_URL}/en/servicii`,
        'x-default': `${BASE_URL}/ro/servicii`,
      },
    },
  };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const title =
    locale === 'ro'
      ? 'Servicii Juridice | SCA Stan-Baculescu'
      : 'Legal Services | Stan-Baculescu Law Firm';
  const description =
    locale === 'ro'
      ? 'Descopera serviciile juridice oferite de SCA Stan-Baculescu: malpraxis medical, drept civil, penal, familiei, muncii, comercial, accidente rutiere si drept administrativ.'
      : 'Discover the legal services offered by Stan-Baculescu Law Firm: medical malpractice, civil law, criminal law, family law, labor law, commercial law, traffic accidents, and administrative law.';

  const serviceIds = [
    'malpraxis-medical',
    'drept-civil',
    'drept-penal',
    'drept-familiei',
    'dreptul-muncii',
    'drept-comercial',
    'accidente-rutiere',
    'drept-administrativ-fiscal',
  ];

  const serviceListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: title,
    description: description,
    numberOfItems: serviceIds.length,
    itemListElement: serviceIds.map((serviceId, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${BASE_URL}/${locale}/servicii/${serviceId}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceListJsonLd) }}
      />
      <main>
        <ServicesHero />
        <ServicesGrid />
        <ServicesCta />
      </main>
    </>
  );
}
