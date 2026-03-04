import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import {
  ServiceDetailHero,
  ServiceDetailContent,
  ServiceDetailRelated,
  ServiceDetailCta,
} from '@/components/service-detail';
import { BreadcrumbSchema } from '@/components/seo';

const BASE_URL = 'https://stanbaculescu.ro';

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
      url: `${BASE_URL}/${locale}/servicii/${serviceId}`,
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/servicii/${serviceId}`,
      languages: {
        'ro-RO': `${BASE_URL}/ro/servicii/${serviceId}`,
        'en-US': `${BASE_URL}/en/servicii/${serviceId}`,
        'x-default': `${BASE_URL}/ro/servicii/${serviceId}`,
      },
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
    '@type': 'Service',
    '@id': `https://stanbaculescu.ro/${locale}/servicii/${serviceId}`,
    name: title,
    description: description,
    provider: {
      '@id': 'https://stanbaculescu.ro/#localbusiness',
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
      <BreadcrumbSchema
        items={[
          { name: locale === 'ro' ? 'Acasă' : 'Home', url: `https://stanbaculescu.ro/${locale}` },
          { name: locale === 'ro' ? 'Servicii' : 'Services', url: `https://stanbaculescu.ro/${locale}/servicii` },
          { name: title },
        ]}
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
