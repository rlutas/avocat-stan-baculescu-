import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import PrivacyPolicyContent from './privacy-policy-content';

const BASE_URL = 'https://stanbaculescu.ro';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === 'ro'
      ? 'Politica de Confidentialitate | SCA Stan-Baculescu'
      : 'Privacy Policy | Stan-Baculescu Law Firm';
  const description =
    locale === 'ro'
      ? 'Politica de confidentialitate a SCA Stan-Baculescu. Aflati cum colectam, utilizam si protejam datele dumneavoastra personale.'
      : 'Privacy Policy of Stan-Baculescu Law Firm. Learn how we collect, use, and protect your personal data.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'ro' ? 'ro_RO' : 'en_US',
      url: `${BASE_URL}/${locale}/politica-confidentialitate`,
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/politica-confidentialitate`,
      languages: {
        'ro-RO': `${BASE_URL}/ro/politica-confidentialitate`,
        'en-US': `${BASE_URL}/en/politica-confidentialitate`,
        'x-default': `${BASE_URL}/ro/politica-confidentialitate`,
      },
    },
  };
}

export default async function PrivacyPolicyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PrivacyPolicyContent />;
}
