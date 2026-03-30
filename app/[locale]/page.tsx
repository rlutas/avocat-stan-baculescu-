import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/hero';
import { HomeServices } from '@/components/home/home-services';
import { HomeWhyUs } from '@/components/home/home-why-us';
import { HomeVideo } from '@/components/home/home-video';
import { HomeMethodology } from '@/components/home/home-methodology';
import { HomeTeam } from '@/components/home/home-team';
import { Testimonials } from '@/components/testimonials';
import { HomeCta } from '@/components/home/home-cta';

const BASE_URL = 'https://stanbaculescu.ro';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === 'ro'
      ? 'Avocat Satu Mare - Servicii Juridice | Societate Civilă de Avocați Stan-Baculescu'
      : 'Lawyer Satu Mare - Legal Services | Stan-Baculescu Law Firm';
  const description =
    locale === 'ro'
      ? 'Societate civila de avocati cu experienta de 20 de ani in Satu Mare. Servicii juridice profesionale: malpraxis medical, drept civil, penal si familiei.'
      : 'Law firm with nearly 20 years of experience in Satu Mare, Romania. Professional legal services: medical malpractice, civil, criminal and family law.';

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
        'x-default': `${BASE_URL}/ro`,
      },
    },
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    name:
      locale === 'ro'
        ? 'Stan-Baculescu - Societate Civila de Avocati'
        : 'Stan-Baculescu Law Firm',
    url: BASE_URL,
    publisher: {
      '@id': `${BASE_URL}/#organization`,
    },
    inLanguage: locale === 'ro' ? 'ro-RO' : 'en-US',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <Hero />
      <HomeServices />
      <HomeWhyUs />
      <HomeVideo />
      <HomeMethodology />
      <HomeTeam />
      <Testimonials />
      <HomeCta />
    </>
  );
}
