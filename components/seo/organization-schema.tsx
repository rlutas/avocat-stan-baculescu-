const BASE_URL = 'https://stanbaculescu.ro';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${BASE_URL}/#organization`,
  name: 'STAN-BACULESCU-SOCIETATE CIVILA DE AVOCATI',
  alternateName: 'Stan-Baculescu Law Firm',
  url: BASE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${BASE_URL}/images/logo.webp`,
    width: 200,
    height: 60,
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+40-745-466-720',
    contactType: 'customer service',
    availableLanguage: ['Romanian', 'English'],
    areaServed: 'RO',
  },
  sameAs: [
    'https://www.facebook.com/cabinetavocaturastanbaculescu',
    'https://www.instagram.com/cabinet_stan_baculescu/',
    'https://www.tiktok.com/@cabinetavocat',
  ],
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  '@id': `${BASE_URL}/#localbusiness`,
  name: 'STAN-BACULESCU-SOCIETATE CIVILA DE AVOCATI',
  image: `${BASE_URL}/images/logo.webp`,
  url: BASE_URL,
  telephone: '+40-745-466-720',
  email: 'office@stanbaculescu.ro',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Str. Decebal Nr. 4, Et. 1',
    addressLocality: 'Satu Mare',
    addressRegion: 'Satu Mare',
    postalCode: '440014',
    addressCountry: 'RO',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 47.7923,
    longitude: 22.8856,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
  ],
  areaServed: [
    {
      '@type': 'City',
      name: 'Satu Mare',
    },
    {
      '@type': 'Country',
      name: 'Romania',
    },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Legal Services',
    itemListElement: [
      {
        '@type': 'OfferCatalog',
        name: 'Malpraxis Medical',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Medical Malpractice Consultation',
            },
          },
        ],
      },
      {
        '@type': 'OfferCatalog',
        name: 'Drept Civil',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Civil Law Representation',
            },
          },
        ],
      },
      {
        '@type': 'OfferCatalog',
        name: 'Drept Penal',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Criminal Defense',
            },
          },
        ],
      },
      {
        '@type': 'OfferCatalog',
        name: 'Dreptul Familiei',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Family Law Services',
            },
          },
        ],
      },
      {
        '@type': 'OfferCatalog',
        name: 'Dreptul Muncii',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Employment Law Services',
            },
          },
        ],
      },
      {
        '@type': 'OfferCatalog',
        name: 'Drept Comercial',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Commercial Law Services',
            },
          },
        ],
      },
      {
        '@type': 'OfferCatalog',
        name: 'Accidente Rutiere',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Road Accident Legal Services',
            },
          },
        ],
      },
      {
        '@type': 'OfferCatalog',
        name: 'Drept Administrativ-Fiscal',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Administrative and Tax Law Services',
            },
          },
        ],
      },
    ],
  },
};

export function OrganizationSchema() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
    </>
  );
}
