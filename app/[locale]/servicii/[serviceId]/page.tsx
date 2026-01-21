import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import {
  ServiceDetailHero,
  ServiceDetailContent,
  ServiceDetailRelated,
  ServiceDetailCta,
} from '@/components/service-detail';

const validServiceIds = [
  'malpraxis-medical',
  'drept-civil',
  'drept-penal',
  'drept-familiei',
  'dreptul-muncii',
  'drept-comercial',
  'accidente-rutiere',
  'drept-administrativ-fiscal',
];

type Props = {
  params: Promise<{ locale: string; serviceId: string }>;
};

export async function generateStaticParams() {
  return validServiceIds.map((serviceId) => ({ serviceId }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, serviceId } = await params;

  if (!validServiceIds.includes(serviceId)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: 'ServiceDetail' });
  const title = t(`${serviceId}.meta.title`);
  const description = t(`${serviceId}.meta.description`);

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

function generateLegalServiceJsonLd(
  serviceId: string,
  title: string,
  description: string,
  locale: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    '@id': `https://stanbaculescu.ro/${locale}/servicii/${serviceId}`,
    name: title,
    description: description,
    provider: {
      '@type': 'LegalService',
      name: 'Cabinet de Avocatura Stan-Baculescu',
      url: 'https://stanbaculescu.ro',
      telephone: '+40261848015',
      email: 'office@stanbaculescu.ro',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Str. Aurel Popp 2',
        addressLocality: 'Satu Mare',
        addressCountry: 'RO',
      },
    },
    areaServed: {
      '@type': 'Country',
      name: 'Romania',
    },
    serviceType: title,
    url: `https://stanbaculescu.ro/${locale}/servicii/${serviceId}`,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, serviceId } = await params;
  setRequestLocale(locale);

  if (!validServiceIds.includes(serviceId)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'ServiceDetail' });
  const title = t(`${serviceId}.title`);
  const description = t(`${serviceId}.meta.description`);

  const jsonLd = generateLegalServiceJsonLd(
    serviceId,
    title,
    description,
    locale
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <ServiceDetailHero serviceId={serviceId} />
        <ServiceDetailContent serviceId={serviceId} />
        <ServiceDetailRelated currentServiceId={serviceId} />
        <ServiceDetailCta />
      </main>
    </>
  );
}
