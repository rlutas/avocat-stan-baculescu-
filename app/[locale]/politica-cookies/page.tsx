import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import CookiePolicyContent from './cookie-policy-content';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === 'ro'
      ? 'Politica de Cookies | SCA Stan-Baculescu'
      : 'Cookie Policy | Stan-Baculescu Law Firm';
  const description =
    locale === 'ro'
      ? 'Politica de cookies a SCA Stan-Baculescu. Aflati ce cookie-uri folosim si cum puteti gestiona preferintele.'
      : 'Cookie Policy of Stan-Baculescu Law Firm. Learn what cookies we use and how you can manage your preferences.';

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

export default async function CookiePolicyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CookiePolicyContent />;
}
