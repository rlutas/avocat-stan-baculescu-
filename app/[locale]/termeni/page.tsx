import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import TermsOfServiceContent from './terms-of-service-content';

const BASE_URL = 'https://stanbaculescu.ro';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === 'ro'
      ? 'Termeni si Conditii | SCA Stan-Baculescu'
      : 'Terms of Service | Stan-Baculescu Law Firm';
  const description =
    locale === 'ro'
      ? 'Termenii si conditiile de utilizare a site-ului web al SCA Stan-Baculescu. Cititi cu atentie inainte de a utiliza serviciile noastre.'
      : 'Terms and conditions for using the Stan-Baculescu Law Firm website. Please read carefully before using our services.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'ro' ? 'ro_RO' : 'en_US',
      url: `${BASE_URL}/${locale}/termeni`,
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/termeni`,
      languages: {
        'ro-RO': `${BASE_URL}/ro/termeni`,
        'en-US': `${BASE_URL}/en/termeni`,
      },
    },
  };
}

export default async function TermsOfServicePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <TermsOfServiceContent />;
}
