import { MetadataRoute } from 'next';

const BASE_URL = 'https://stanbaculescu.ro';

// Static pages with their lastmod dates
const staticPages = [
  { path: '', lastmod: '2026-03-04' },
  { path: '/despre-noi', lastmod: '2026-03-01' },
  { path: '/echipa', lastmod: '2026-03-01' },
  { path: '/servicii', lastmod: '2026-02-15' },
  { path: '/blog', lastmod: '2026-01-15' },
  { path: '/contact', lastmod: '2026-03-01' },
];

// Service pages
const serviceIds = [
  'malpraxis-medical',
  'drept-civil',
  'drept-penal',
  'drept-familiei',
  'dreptul-muncii',
  'drept-comercial',
  'accidente-rutiere',
  'drept-administrativ-fiscal',
];

// Team member pages
const teamMemberIds = [
  'camelia-stan',
  'vlad-baculescu',
  'diana-chincea',
  'cristina-blan',
  'alexandra-rusu',
  'diana-veress',
];

// Blog post slug mapping between languages (ro <-> en)
const blogPostPairs = [
  {
    ro: 'drepturile-pacientului-malpraxis',
    en: 'patient-rights-malpractice',
    lastmod: '2026-01-10',
  },
  {
    ro: 'procedura-divortului-romania',
    en: 'divorce-procedure-romania',
    lastmod: '2026-01-05',
  },
  {
    ro: 'drepturile-angajatului-concediere',
    en: 'employee-rights-dismissal',
    lastmod: '2025-12-20',
  },
];

const locales = ['ro', 'en'];

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  // Add static pages for each locale
  for (const locale of locales) {
    for (const page of staticPages) {
      urls.push({
        url: `${BASE_URL}/${locale}${page.path}`,
        lastModified: page.lastmod,
        alternates: {
          languages: {
            ro: `${BASE_URL}/ro${page.path}`,
            en: `${BASE_URL}/en${page.path}`,
            'x-default': `${BASE_URL}/ro${page.path}`,
          },
        },
      });
    }
  }

  // Add service pages for each locale
  for (const locale of locales) {
    for (const serviceId of serviceIds) {
      urls.push({
        url: `${BASE_URL}/${locale}/servicii/${serviceId}`,
        lastModified: '2026-02-15',
        alternates: {
          languages: {
            ro: `${BASE_URL}/ro/servicii/${serviceId}`,
            en: `${BASE_URL}/en/servicii/${serviceId}`,
            'x-default': `${BASE_URL}/ro/servicii/${serviceId}`,
          },
        },
      });
    }
  }

  // Add team member pages for each locale
  for (const locale of locales) {
    for (const memberId of teamMemberIds) {
      urls.push({
        url: `${BASE_URL}/${locale}/echipa/${memberId}`,
        lastModified: '2026-03-01',
        alternates: {
          languages: {
            ro: `${BASE_URL}/ro/echipa/${memberId}`,
            en: `${BASE_URL}/en/echipa/${memberId}`,
            'x-default': `${BASE_URL}/ro/echipa/${memberId}`,
          },
        },
      });
    }
  }

  // Add blog posts for each locale with correct cross-language slugs
  for (const locale of locales) {
    for (const pair of blogPostPairs) {
      const slug = pair[locale as keyof typeof pair] as string;
      urls.push({
        url: `${BASE_URL}/${locale}/blog/${slug}`,
        lastModified: pair.lastmod,
        alternates: {
          languages: {
            ro: `${BASE_URL}/ro/blog/${pair.ro}`,
            en: `${BASE_URL}/en/blog/${pair.en}`,
            'x-default': `${BASE_URL}/ro/blog/${pair.ro}`,
          },
        },
      });
    }
  }

  return urls;
}
