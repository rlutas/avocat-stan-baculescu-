import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { AboutHero } from '@/components/about/about-hero';
import { AboutHistory } from '@/components/about/about-history';
import { AboutValues } from '@/components/about/about-values';
import { AboutPrinciples } from '@/components/about/about-principles';
import { AboutMethodology } from '@/components/about/about-methodology';
import { AboutCta } from '@/components/about/about-cta';
import { BreadcrumbSchema } from '@/components/seo';

const BASE_URL = 'https://stanbaculescu.ro';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === 'ro'
      ? 'Despre Noi - Avocati cu Experienta | SCA Stan-Baculescu'
      : 'About Us - Experienced Lawyers | SCA Stan-Baculescu';
  const description =
    locale === 'ro'
      ? 'Descopera povestea, valorile si metodologia de lucru a SCA Stan-Baculescu din Satu Mare. Peste 20 de ani de experienta in servicii juridice de excelenta.'
      : 'Discover the story, values and working methodology of Stan-Baculescu Law Firm in Satu Mare. Over 20 years of experience delivering excellent legal services.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'ro' ? 'ro_RO' : 'en_US',
      url: `${BASE_URL}/${locale}/despre-noi`,
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/despre-noi`,
      languages: {
        'ro-RO': `${BASE_URL}/ro/despre-noi`,
        'en-US': `${BASE_URL}/en/despre-noi`,
        'x-default': `${BASE_URL}/ro/despre-noi`,
      },
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: locale === 'ro' ? 'Acasă' : 'Home', url: `https://stanbaculescu.ro/${locale}` },
          { name: locale === 'ro' ? 'Despre Noi' : 'About Us' },
        ]}
      />
      <main>
        <AboutHero />
        <AboutHistory />
        <AboutValues />
        <AboutPrinciples />
        <AboutMethodology />
        <AboutCta />
      </main>
    </>
  );
}
