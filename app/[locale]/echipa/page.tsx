import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { TeamHero, TeamGrid, TeamCta } from '@/components/team';
import { BreadcrumbSchema } from '@/components/seo';

const BASE_URL = 'https://stanbaculescu.ro';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === 'ro'
      ? 'Echipa de Avocati Satu Mare | SCA Stan-Baculescu'
      : 'Our Legal Team in Satu Mare | SCA Stan-Baculescu';
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
      images: [
        {
          url: `${BASE_URL}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: locale === 'ro' ? 'Echipa SCA Stan-Baculescu' : 'SCA Stan-Baculescu Team',
        },
      ],
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

  const teamMemberIds = [
    'camelia-stan',
    'vlad-baculescu',
    'diana-chincea',
    'cristina-blan',
    'alexandra-rusu',
    'diana-veres',
  ];

  const teamListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: locale === 'ro' ? 'Echipa de Avocati' : 'Legal Team',
    numberOfItems: teamMemberIds.length,
    itemListElement: teamMemberIds.map((memberId, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${BASE_URL}/${locale}/echipa/${memberId}`,
    })),
  };

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: locale === 'ro' ? 'Acasă' : 'Home', url: `https://stanbaculescu.ro/${locale}` },
          { name: locale === 'ro' ? 'Echipa' : 'Team' },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(teamListJsonLd) }}
      />
      <main>
        <TeamHero />
        <TeamGrid />
        <TeamCta />
      </main>
    </>
  );
}
