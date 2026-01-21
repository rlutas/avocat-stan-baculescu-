'use client';

const BASE_URL = 'https://stanbaculescu.ro';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${BASE_URL}/#organization`,
  name: 'SCA Stan-Baculescu',
  alternateName: 'Stan-Baculescu Law Firm',
  url: BASE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${BASE_URL}/images/logo.png`,
    width: 200,
    height: 60,
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+40-261-848-015',
    contactType: 'customer service',
    availableLanguage: ['Romanian', 'English'],
    areaServed: 'RO',
  },
  sameAs: [
    'https://www.facebook.com/stanbaculescu',
    'https://www.instagram.com/stanbaculescu',
    'https://www.tiktok.com/@stanbaculescu',
  ],
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  '@id': `${BASE_URL}/#localbusiness`,
  name: 'SCA Stan-Baculescu',
  image: `${BASE_URL}/images/office.jpg`,
  url: BASE_URL,
  telephone: '+40-261-848-015',
  email: 'office@stanbaculescu.ro',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Str. Aurel Popp 2',
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
      opens: '09:00',
      closes: '17:00',
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
        name: 'Medical Malpractice',
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
        name: 'Civil Law',
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
        name: 'Criminal Law',
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
        name: 'Family Law',
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
