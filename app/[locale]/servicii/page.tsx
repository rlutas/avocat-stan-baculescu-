import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ServicesHero, ServicesGrid, ServicesCta } from '@/components/services';

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
    },
  };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <ServicesHero />
      <ServicesGrid />
      <ServicesCta />
    </main>
  );
}
