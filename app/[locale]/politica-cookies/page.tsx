import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import CookiePolicyContent from './cookie-policy-content';

const BASE_URL = 'https://stanbaculescu.ro';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === 'ro'
      ? 'Politica de Cookies | Stan-Baculescu'
      : 'Cookie Policy | Stan-Baculescu Law Firm';
  const description =
    locale === 'ro'
      ? 'Politica de cookies a Stan-Baculescu. Aflati ce cookie-uri folosim si cum puteti gestiona preferintele.'
      : 'Cookie Policy of Stan-Baculescu Law Firm. Learn what cookies we use and how you can manage your preferences.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'ro' ? 'ro_RO' : 'en_US',
      url: `${BASE_URL}/${locale}/politica-cookies`,
    },
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/politica-cookies`,
      languages: {
        'ro-RO': `${BASE_URL}/ro/politica-cookies`,
        'en-US': `${BASE_URL}/en/politica-cookies`,
        'x-default': `${BASE_URL}/ro/politica-cookies`,
      },
    },
  };
}

export default async function CookiePolicyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CookiePolicyContent />;
}
