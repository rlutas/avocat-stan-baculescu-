import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/hero';
import { Testimonials } from '@/components/testimonials';

const BASE_URL = 'https://stanbaculescu.ro';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'HomePage' });

  const title =
    locale === 'ro'
      ? 'Cabinet de Avocatura Stan-Baculescu | Satu Mare'
      : 'Stan-Baculescu Law Firm | Satu Mare, Romania';
  const description =
    locale === 'ro'
      ? 'Cabinet de avocatura cu experienta de peste 15 ani in Satu Mare. Servicii juridice profesionale: malpraxis medical, drept civil, drept penal, drept al familiei.'
      : 'Law firm with over 15 years of experience in Satu Mare, Romania. Professional legal services: medical malpractice, civil law, criminal law, family law.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'ro' ? 'ro_RO' : 'en_US',
      url: `${BASE_URL}/${locale}`,
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        'ro-RO': `${BASE_URL}/ro`,
        'en-US': `${BASE_URL}/en`,
      },
    },
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Testimonials />
    </>
  );
}
