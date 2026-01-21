import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AboutHero } from '@/components/about/about-hero';
import { AboutHistory } from '@/components/about/about-history';
import { AboutValues } from '@/components/about/about-values';
import { AboutPrinciples } from '@/components/about/about-principles';
import { AboutMethodology } from '@/components/about/about-methodology';
import { AboutCta } from '@/components/about/about-cta';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'AboutPage' });

  const title =
    locale === 'ro'
      ? 'Despre Noi | SCA Stan-Baculescu'
      : 'About Us | Stan-Baculescu Law Firm';
  const description =
    locale === 'ro'
      ? 'Descopera povestea, valorile si metodologia de lucru a SCA Stan-Baculescu din Satu Mare. Peste 15 ani de experienta in servicii juridice.'
      : 'Discover the story, values, and working methodology of Stan-Baculescu Law Firm in Satu Mare. Over 15 years of experience in legal services.';

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

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <AboutHero />
      <AboutHistory />
      <AboutValues />
      <AboutPrinciples />
      <AboutMethodology />
      <AboutCta />
    </main>
  );
}
