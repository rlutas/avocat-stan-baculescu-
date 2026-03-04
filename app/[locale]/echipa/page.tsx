import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { TeamHero, TeamGrid, TeamCta } from '@/components/team';

const BASE_URL = 'https://stanbaculescu.ro';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === 'ro'
      ? 'Echipa Noastra | SCA Stan-Baculescu'
      : 'Our Team | Stan-Baculescu Law Firm';
  const description =
    locale === 'ro'
      ? 'Cunoasteti echipa de avocati profesionisti de la SCA Stan-Baculescu. Avocati cu experienta in drept civil, penal, familiei si comercial din Satu Mare.'
      : 'Meet the professional team of lawyers at Stan-Baculescu Law Firm. Experienced attorneys in civil, criminal, family, and commercial law in Satu Mare.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'ro' ? 'ro_RO' : 'en_US',
      url: `${BASE_URL}/${locale}/echipa`,
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/echipa`,
      languages: {
        'ro-RO': `${BASE_URL}/ro/echipa`,
        'en-US': `${BASE_URL}/en/echipa`,
        'x-default': `${BASE_URL}/ro/echipa`,
      },
    },
  };
}

export default async function TeamPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <TeamHero />
      <TeamGrid />
      <TeamCta />
    </main>
  );
}
