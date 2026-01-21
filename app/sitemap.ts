import { MetadataRoute } from 'next';

const BASE_URL = 'https://stanbaculescu.ro';

// Static pages with their localized paths
const staticPages = [
  { path: '', changefreq: 'weekly' as const, priority: 1.0 },
  { path: '/despre-noi', changefreq: 'monthly' as const, priority: 0.8 },
  { path: '/echipa', changefreq: 'monthly' as const, priority: 0.8 },
  { path: '/servicii', changefreq: 'monthly' as const, priority: 0.9 },
  { path: '/blog', changefreq: 'weekly' as const, priority: 0.7 },
  { path: '/contact', changefreq: 'monthly' as const, priority: 0.8 },
  { path: '/politica-confidentialitate', changefreq: 'yearly' as const, priority: 0.3 },
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
  'gabriela-tarta',
  'alexandra-rusu',
  'cristina-tentes',
];

// Blog post slugs - in real app, these would be fetched from Velite
const blogSlugs = {
  ro: [
    'drepturile-pacientului-malpraxis',
    'procedura-divortului-romania',
    'drepturile-angajatului-concediere',
  ],
  en: [
    'patient-rights-malpractice',
    'divorce-procedure-romania',
    'employee-rights-dismissal',
  ],
};

const locales = ['ro', 'en'];

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  const urls: MetadataRoute.Sitemap = [];

  // Add static pages for each locale
  for (const locale of locales) {
    for (const page of staticPages) {
      urls.push({
        url: `${BASE_URL}/${locale}${page.path}`,
        lastModified: currentDate,
        changeFrequency: page.changefreq,
        priority: page.priority,
        alternates: {
          languages: {
            ro: `${BASE_URL}/ro${page.path}`,
            en: `${BASE_URL}/en${page.path}`,
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
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: {
          languages: {
            ro: `${BASE_URL}/ro/servicii/${serviceId}`,
            en: `${BASE_URL}/en/servicii/${serviceId}`,
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
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: {
          languages: {
            ro: `${BASE_URL}/ro/echipa/${memberId}`,
            en: `${BASE_URL}/en/echipa/${memberId}`,
          },
        },
      });
    }
  }

  // Add blog posts for each locale
  for (const locale of locales) {
    const slugs = blogSlugs[locale as keyof typeof blogSlugs];
    for (const slug of slugs) {
      urls.push({
        url: `${BASE_URL}/${locale}/blog/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  return urls;
}
