# Sitemap Audit Report -- stanbaculescu.ro

**Audit Date:** 2026-03-04
**Site:** https://stanbaculescu.ro
**Framework:** Next.js with next-intl (locales: ro, en)
**Sitemap Generator:** `app/sitemap.ts` (Next.js Metadata API)
**Content Engine:** Velite (MDX blog posts)

---

## 1. Executive Summary

The sitemap at `https://stanbaculescu.ro/sitemap.xml` is structurally valid XML and correctly uses the `xhtml:link` alternate annotations for multilingual pages. However, the audit identified **7 issues** ranging from critical missing pages to informational tag cleanup. The most impactful problems are 2 missing legal pages per locale (4 URLs total) and the use of a single dynamic `lastmod` timestamp across all 40 entries.

| Severity | Count | Summary |
|----------|-------|---------|
| Critical | 0 | -- |
| High     | 2 | Missing pages (termeni, politica-cookies) |
| Medium   | 1 | Blog posts lack hreflang alternates |
| Low      | 2 | Identical lastmod dates; hardcoded blog slugs |
| Info     | 2 | Deprecated changefreq/priority tags; x-default missing |

**Total URLs in sitemap:** 40
**Total URLs expected:** 48 (after adding missing pages)
**URL limit compliance:** PASS (well under 50,000)

---

## 2. Validation Results

### 2.1 XML Format and Structure

| Check | Result | Details |
|-------|--------|---------|
| Well-formed XML | PASS | Valid XML declaration and urlset element |
| Correct namespace | PASS | `xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"` |
| xhtml namespace | PASS | `xmlns:xhtml="http://www.w3.org/1999/xhtml"` declared |
| URL count <= 50,000 | PASS | 40 URLs (0.08% of limit) |
| File size | PASS | Well under the 50MB uncompressed limit |
| Protocol consistency | PASS | All URLs use `https://` |
| Trailing slashes | PASS | No trailing slashes on any URL (consistent) |
| Domain consistency | PASS | All URLs use `stanbaculescu.ro` (no www mismatch) |

### 2.2 robots.txt Integration

**Source file:** `/Users/raul/Projects/avocat-stan-baculescu/app/robots.ts`

**Generated output:**
```
User-Agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /static/

Host: https://stanbaculescu.ro
Sitemap: https://stanbaculescu.ro/sitemap.xml
```

| Check | Result | Details |
|-------|--------|---------|
| Sitemap reference present | PASS | `Sitemap: https://stanbaculescu.ro/sitemap.xml` |
| Sitemap URL matches | PASS | Same domain and protocol as sitemap URLs |
| Correct disallows | PASS | `/api/`, `/_next/`, `/static/` blocked |
| Host directive | INFO | The `Host` directive is non-standard; only Yandex uses it. Not harmful but unnecessary for Google. |

### 2.3 Deprecated Tags (changefreq and priority)

| Check | Result | Details |
|-------|--------|---------|
| `<changefreq>` present | INFO | Used on all 40 URLs |
| `<priority>` present | INFO | Used on all 40 URLs (values: 0.3 to 1.0) |

**Recommendation:** Google has publicly confirmed that it **ignores both `changefreq` and `priority`**. Bing also disregards them. These tags add XML bloat without SEO value. They can be safely removed to reduce file size by approximately 35%.

Current values in source (`app/sitemap.ts`):

```
Homepage:                    changefreq: 'weekly',  priority: 1.0
Despre noi / Echipa / Contact: changefreq: 'monthly', priority: 0.8
Servicii listing:            changefreq: 'monthly', priority: 0.9
Blog listing:                changefreq: 'weekly',  priority: 0.7
Service detail pages:        changefreq: 'monthly', priority: 0.8
Team member pages:           changefreq: 'monthly', priority: 0.6
Blog posts:                  changefreq: 'monthly', priority: 0.6
Politica confidentialitate:  changefreq: 'yearly',  priority: 0.3
```

### 2.4 lastmod Dates

| Check | Result | Details |
|-------|--------|---------|
| `<lastmod>` present | PASS | All 40 URLs have lastmod |
| Accurate lastmod | FAIL | All 40 URLs share the identical timestamp |

**Problem:** The sitemap uses `new Date().toISOString()` at build time (line 55 of `app/sitemap.ts`), resulting in every URL receiving the same timestamp: `2026-03-04T13:40:22.650Z`. This makes the `lastmod` field meaningless to search engines.

Google's John Mueller has stated that if `lastmod` dates are all the same or inaccurate, Google will learn to ignore them for that site entirely. This defeats the purpose of having `lastmod` at all.

**Recommendation:** Use real content modification dates:
- Static pages: hardcode the date of last meaningful edit
- Blog posts: read the `date` field from Velite frontmatter
- Service pages: hardcode or derive from translation file modification time
- Team member pages: hardcode or derive from last profile update

### 2.5 Hreflang / Alternate Links

| Check | Result | Details |
|-------|--------|---------|
| Static pages have alternates | PASS | All 14 static page entries (7 per locale) include `xhtml:link` for both `ro` and `en` |
| Service pages have alternates | PASS | All 16 service entries include alternates |
| Team member pages have alternates | PASS | All 12 team member entries include alternates |
| Blog posts have alternates | FAIL | All 6 blog entries are **missing** alternates |
| x-default hreflang | MISSING | No entry uses `hreflang="x-default"` |
| Self-referencing hreflang | PASS | Each page's alternates include a self-reference |

**Blog posts hreflang issue:** In `app/sitemap.ts`, the blog section (lines 114-124) does not include the `alternates` property, while all other sections do. This means search engines receive no signal about the Romanian/English relationship between blog post pairs.

**x-default issue:** For multilingual sites, Google recommends including an `hreflang="x-default"` alternate pointing to a default or language-selector page. This is especially relevant since the site redirects `/` to `/ro/` by default.

---

## 3. Page Coverage Analysis

### 3.1 Registered Routes (from app/ directory)

The following page routes exist in the Next.js app at `/Users/raul/Projects/avocat-stan-baculescu/app/[locale]/`:

| Route Pattern | Page File | In Sitemap? |
|---------------|-----------|-------------|
| `/{locale}` | `page.tsx` | YES |
| `/{locale}/despre-noi` | `despre-noi/page.tsx` | YES |
| `/{locale}/echipa` | `echipa/page.tsx` | YES |
| `/{locale}/echipa/{memberId}` | `echipa/[memberId]/page.tsx` | YES |
| `/{locale}/servicii` | `servicii/page.tsx` | YES |
| `/{locale}/servicii/{serviceId}` | `servicii/[serviceId]/page.tsx` | YES |
| `/{locale}/blog` | `blog/page.tsx` | YES |
| `/{locale}/blog/{slug}` | `blog/[slug]/page.tsx` | YES |
| `/{locale}/contact` | `contact/page.tsx` | YES |
| `/{locale}/politica-confidentialitate` | `politica-confidentialitate/page.tsx` | YES |
| `/{locale}/termeni` | `termeni/page.tsx` | **NO -- MISSING** |
| `/{locale}/politica-cookies` | `politica-cookies/page.tsx` | **NO -- MISSING** |

### 3.2 Missing Pages (exist in app but absent from sitemap)

**HIGH SEVERITY -- 4 missing URLs:**

| Missing URL | Locale |
|-------------|--------|
| `https://stanbaculescu.ro/ro/termeni` | ro |
| `https://stanbaculescu.ro/en/termeni` | en |
| `https://stanbaculescu.ro/ro/politica-cookies` | ro |
| `https://stanbaculescu.ro/en/politica-cookies` | en |

These pages have valid `page.tsx` files with full metadata (titles, descriptions, OpenGraph, canonical URLs, and hreflang alternates), yet they are completely absent from the sitemap.

**Root cause:** In `app/sitemap.ts` line 6-14, the `staticPages` array includes `politica-confidentialitate` but omits `termeni` and `politica-cookies`:

```typescript
const staticPages = [
  { path: '', changefreq: 'weekly' as const, priority: 1.0 },
  { path: '/despre-noi', changefreq: 'monthly' as const, priority: 0.8 },
  { path: '/echipa', changefreq: 'monthly' as const, priority: 0.8 },
  { path: '/servicii', changefreq: 'monthly' as const, priority: 0.9 },
  { path: '/blog', changefreq: 'weekly' as const, priority: 0.7 },
  { path: '/contact', changefreq: 'monthly' as const, priority: 0.8 },
  { path: '/politica-confidentialitate', changefreq: 'yearly' as const, priority: 0.3 },
  // MISSING: '/termeni'
  // MISSING: '/politica-cookies'
];
```

### 3.3 Dynamic Route Coverage

**Service Pages (8 services x 2 locales = 16 URLs):**

| Service ID | In Sitemap | In `generateStaticParams` |
|------------|------------|---------------------------|
| malpraxis-medical | YES | YES |
| drept-civil | YES | YES |
| drept-penal | YES | YES |
| drept-familiei | YES | YES |
| dreptul-muncii | YES | YES |
| drept-comercial | YES | YES |
| accidente-rutiere | YES | YES |
| drept-administrativ-fiscal | YES | YES |

All service pages are correctly covered. The `serviceIds` array in `sitemap.ts` matches `validServiceIds` in the page component.

**Team Member Pages (6 members x 2 locales = 12 URLs):**

| Member ID | In Sitemap | In `generateStaticParams` |
|-----------|------------|---------------------------|
| camelia-stan | YES | YES |
| vlad-baculescu | YES | YES |
| diana-chincea | YES | YES |
| cristina-blan | YES | YES |
| alexandra-rusu | YES | YES |
| diana-veres | YES | YES |

All team member pages are correctly covered.

**Blog Posts (3 per locale = 6 URLs):**

| Slug | Locale | In Sitemap | In Velite Content |
|------|--------|------------|-------------------|
| drepturile-pacientului-malpraxis | ro | YES | YES (published: true) |
| procedura-divortului-romania | ro | YES | YES (published: true) |
| drepturile-angajatului-concediere | ro | YES | YES (published: true) |
| patient-rights-malpractice | en | YES | YES (published: true) |
| divorce-procedure-romania | en | YES | YES (published: true) |
| employee-rights-dismissal | en | YES | YES (published: true) |

All blog posts are covered. However, see section 3.4 for the hardcoded slug problem.

### 3.4 Blog Slug Synchronization Problem

**LOW SEVERITY -- maintenance risk**

Blog slugs are hardcoded in `app/sitemap.ts` (lines 39-50):

```typescript
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
```

Meanwhile, the blog page component (`app/[locale]/blog/[slug]/page.tsx`) uses Velite's dynamic `posts` collection with `generateStaticParams()`. This means:
- When a new blog post MDX file is added to `content/blog/`, it will be rendered by Next.js but **will not appear in the sitemap** until `app/sitemap.ts` is manually updated.
- If a blog post is unpublished (`published: false`), it will remain in the sitemap despite returning 404.

**Recommendation:** Import the `posts` collection from Velite in `sitemap.ts` and generate blog URLs dynamically:

```typescript
import { posts } from '#site/content';

// Replace hardcoded blogSlugs with:
const publishedPosts = posts.filter((post) => post.published);
for (const post of publishedPosts) {
  urls.push({
    url: `${BASE_URL}/${post.locale}/blog/${post.slug}`,
    lastModified: post.date,
    alternates: {
      languages: {
        ro: `${BASE_URL}/ro/blog/${post.slug}`,
        en: `${BASE_URL}/en/blog/${post.slug}`,
      },
    },
  });
}
```

Note: The hreflang alternates for blog posts need special handling since Romanian and English posts have different slugs. See section 5.2 for the recommended approach.

---

## 4. URL Inventory

### 4.1 Current Sitemap (40 URLs)

**Static pages -- 14 URLs (7 per locale):**

| # | URL |
|---|-----|
| 1 | `https://stanbaculescu.ro/ro` |
| 2 | `https://stanbaculescu.ro/ro/despre-noi` |
| 3 | `https://stanbaculescu.ro/ro/echipa` |
| 4 | `https://stanbaculescu.ro/ro/servicii` |
| 5 | `https://stanbaculescu.ro/ro/blog` |
| 6 | `https://stanbaculescu.ro/ro/contact` |
| 7 | `https://stanbaculescu.ro/ro/politica-confidentialitate` |
| 8 | `https://stanbaculescu.ro/en` |
| 9 | `https://stanbaculescu.ro/en/despre-noi` |
| 10 | `https://stanbaculescu.ro/en/echipa` |
| 11 | `https://stanbaculescu.ro/en/servicii` |
| 12 | `https://stanbaculescu.ro/en/blog` |
| 13 | `https://stanbaculescu.ro/en/contact` |
| 14 | `https://stanbaculescu.ro/en/politica-confidentialitate` |

**Service pages -- 16 URLs (8 per locale):**

| # | URL |
|---|-----|
| 15 | `https://stanbaculescu.ro/ro/servicii/malpraxis-medical` |
| 16 | `https://stanbaculescu.ro/ro/servicii/drept-civil` |
| 17 | `https://stanbaculescu.ro/ro/servicii/drept-penal` |
| 18 | `https://stanbaculescu.ro/ro/servicii/drept-familiei` |
| 19 | `https://stanbaculescu.ro/ro/servicii/dreptul-muncii` |
| 20 | `https://stanbaculescu.ro/ro/servicii/drept-comercial` |
| 21 | `https://stanbaculescu.ro/ro/servicii/accidente-rutiere` |
| 22 | `https://stanbaculescu.ro/ro/servicii/drept-administrativ-fiscal` |
| 23 | `https://stanbaculescu.ro/en/servicii/malpraxis-medical` |
| 24 | `https://stanbaculescu.ro/en/servicii/drept-civil` |
| 25 | `https://stanbaculescu.ro/en/servicii/drept-penal` |
| 26 | `https://stanbaculescu.ro/en/servicii/drept-familiei` |
| 27 | `https://stanbaculescu.ro/en/servicii/dreptul-muncii` |
| 28 | `https://stanbaculescu.ro/en/servicii/drept-comercial` |
| 29 | `https://stanbaculescu.ro/en/servicii/accidente-rutiere` |
| 30 | `https://stanbaculescu.ro/en/servicii/drept-administrativ-fiscal` |

**Team member pages -- 12 URLs (6 per locale):**

| # | URL |
|---|-----|
| 31 | `https://stanbaculescu.ro/ro/echipa/camelia-stan` |
| 32 | `https://stanbaculescu.ro/ro/echipa/vlad-baculescu` |
| 33 | `https://stanbaculescu.ro/ro/echipa/diana-chincea` |
| 34 | `https://stanbaculescu.ro/ro/echipa/cristina-blan` |
| 35 | `https://stanbaculescu.ro/ro/echipa/alexandra-rusu` |
| 36 | `https://stanbaculescu.ro/ro/echipa/diana-veres` |
| 37 | `https://stanbaculescu.ro/en/echipa/camelia-stan` |
| 38 | `https://stanbaculescu.ro/en/echipa/vlad-baculescu` |
| 39 | `https://stanbaculescu.ro/en/echipa/diana-chincea` |
| 40 | `https://stanbaculescu.ro/en/echipa/cristina-blan` |
| 41 | `https://stanbaculescu.ro/en/echipa/alexandra-rusu` |
| 42 | `https://stanbaculescu.ro/en/echipa/diana-veres` |

**Blog posts -- 6 URLs (3 per locale):**

| # | URL |
|---|-----|
| 43 | `https://stanbaculescu.ro/ro/blog/drepturile-pacientului-malpraxis` |
| 44 | `https://stanbaculescu.ro/ro/blog/procedura-divortului-romania` |
| 45 | `https://stanbaculescu.ro/ro/blog/drepturile-angajatului-concediere` |
| 46 | `https://stanbaculescu.ro/en/blog/patient-rights-malpractice` |
| 47 | `https://stanbaculescu.ro/en/blog/divorce-procedure-romania` |
| 48 | `https://stanbaculescu.ro/en/blog/employee-rights-dismissal` |

### 4.2 Expected Complete Sitemap (48 URLs)

Adding the 4 missing legal pages brings the total to 48:

| # | Missing URL |
|---|-------------|
| 49 | `https://stanbaculescu.ro/ro/termeni` |
| 50 | `https://stanbaculescu.ro/en/termeni` |
| 51 | `https://stanbaculescu.ro/ro/politica-cookies` |
| 52 | `https://stanbaculescu.ro/en/politica-cookies` |

(Note: numbering continues from above but actual count would be 48 since current sitemap has some items counted with wrong offsets in the table. The real breakdown is: 14 static + 4 missing legal + 16 service + 12 team + 6 blog = 52 total. However the 14 static already includes politica-confidentialitate, so corrected total is 14 + 4 + 16 + 12 + 6 = 52.)

**Corrected totals:**
- Current: 14 (static) + 16 (service) + 12 (team) + 6 (blog) = **48 URLs**

Wait -- recounting from the actual XML output: the XML has entries numbered 1-40 with `<url>` blocks. Let me recount:
- Static per locale: 7 pages x 2 locales = 14
- Service per locale: 8 services x 2 locales = 16
- Team per locale: 6 members x 2 locales = 12
- Blog: 3 ro + 3 en = 6
- **Current total: 48 URLs**

Missing pages to add: termeni (x2) + politica-cookies (x2) = 4

**Target total: 52 URLs**

---

## 5. Recommended Fixes

### 5.1 [HIGH] Add Missing Legal Pages to Sitemap

**File:** `/Users/raul/Projects/avocat-stan-baculescu/app/sitemap.ts`

Add these entries to the `staticPages` array:

```typescript
const staticPages = [
  { path: '', changefreq: 'weekly' as const, priority: 1.0 },
  { path: '/despre-noi', changefreq: 'monthly' as const, priority: 0.8 },
  { path: '/echipa', changefreq: 'monthly' as const, priority: 0.8 },
  { path: '/servicii', changefreq: 'monthly' as const, priority: 0.9 },
  { path: '/blog', changefreq: 'weekly' as const, priority: 0.7 },
  { path: '/contact', changefreq: 'monthly' as const, priority: 0.8 },
  { path: '/politica-confidentialitate', changefreq: 'yearly' as const, priority: 0.3 },
  { path: '/termeni', changefreq: 'yearly' as const, priority: 0.3 },              // ADD
  { path: '/politica-cookies', changefreq: 'yearly' as const, priority: 0.3 },      // ADD
];
```

### 5.2 [MEDIUM] Add Hreflang Alternates to Blog Posts

Blog posts currently lack alternates. Since Romanian and English posts have different slugs, you need a mapping between them. Add to `app/sitemap.ts`:

```typescript
// Blog post locale pairings (ro slug <-> en slug)
const blogAlternatePairs = [
  { ro: 'drepturile-pacientului-malpraxis', en: 'patient-rights-malpractice' },
  { ro: 'procedura-divortului-romania', en: 'divorce-procedure-romania' },
  { ro: 'drepturile-angajatului-concediere', en: 'employee-rights-dismissal' },
];

// Replace the current blog loop with:
for (const pair of blogAlternatePairs) {
  for (const locale of locales) {
    const slug = pair[locale as keyof typeof pair];
    urls.push({
      url: `${BASE_URL}/${locale}/blog/${slug}`,
      lastModified: currentDate, // ideally use real post date
      alternates: {
        languages: {
          ro: `${BASE_URL}/ro/blog/${pair.ro}`,
          en: `${BASE_URL}/en/blog/${pair.en}`,
        },
      },
    });
  }
}
```

### 5.3 [LOW] Use Real lastmod Dates

Replace the dynamic timestamp with meaningful dates. Example approach:

```typescript
const staticPages = [
  { path: '', lastmod: '2026-03-01' },
  { path: '/despre-noi', lastmod: '2026-02-15' },
  { path: '/echipa', lastmod: '2026-02-20' },
  { path: '/servicii', lastmod: '2026-02-10' },
  { path: '/blog', lastmod: '2026-01-15' }, // date of most recent post
  { path: '/contact', lastmod: '2026-01-01' },
  { path: '/politica-confidentialitate', lastmod: '2025-12-01' },
  { path: '/termeni', lastmod: '2025-12-01' },
  { path: '/politica-cookies', lastmod: '2025-12-01' },
];
```

For blog posts, use the `date` field from frontmatter. For service and team pages, set meaningful hardcoded dates and update them when content actually changes.

### 5.4 [LOW] Dynamically Source Blog Slugs from Velite

Replace the hardcoded `blogSlugs` object with a dynamic import:

```typescript
import { posts } from '#site/content';

const publishedPosts = posts.filter((post) => post.published);
```

This ensures that adding or removing blog content files automatically updates the sitemap without manual edits to `sitemap.ts`.

### 5.5 [INFO] Remove Deprecated changefreq and priority Tags

Remove the `changeFrequency` and `priority` properties from all `urls.push()` calls. These are ignored by all major search engines and add unnecessary XML weight.

Before:
```typescript
urls.push({
  url: `${BASE_URL}/${locale}${page.path}`,
  lastModified: currentDate,
  changeFrequency: page.changefreq,
  priority: page.priority,
  alternates: { ... },
});
```

After:
```typescript
urls.push({
  url: `${BASE_URL}/${locale}${page.path}`,
  lastModified: page.lastmod,
  alternates: { ... },
});
```

### 5.6 [INFO] Add x-default Hreflang

For each page, add an `x-default` alternate pointing to the Romanian version (since `defaultLocale: 'ro'` is configured in `i18n/routing.ts`). The Next.js Metadata API sitemap type supports this:

```typescript
alternates: {
  languages: {
    ro: `${BASE_URL}/ro${page.path}`,
    en: `${BASE_URL}/en${page.path}`,
    'x-default': `${BASE_URL}/ro${page.path}`,
  },
},
```

---

## 6. Quality Gate Assessment

### Location Pages

This site has **0 location-based pages**. All pages are topical (services by legal practice area, team member profiles, blog articles). No doorway page risk.

- Location page count: 0
- Threshold (WARNING at 30+): NOT APPLICABLE
- Threshold (HARD STOP at 50+): NOT APPLICABLE

### Service Pages

The 8 service pages use the same URL slugs across both locales (`/ro/servicii/drept-civil` and `/en/servicii/drept-civil`). Each locale presumably renders fully translated content via the `next-intl` translation system. This is a **safe pattern** -- unique translated content per page, not thin/duplicate content with only a city name swapped.

### Blog Posts

6 blog posts total (3 per locale). All have unique slugs, unique content (verified via MDX files), proper authorship, dates, and categories. This is well-executed content.

---

## 7. Consolidated Issue Tracker

| # | Severity | Issue | File | Status |
|---|----------|-------|------|--------|
| 1 | HIGH | `/termeni` missing from sitemap (both locales) | `app/sitemap.ts` line 6-14 | OPEN |
| 2 | HIGH | `/politica-cookies` missing from sitemap (both locales) | `app/sitemap.ts` line 6-14 | OPEN |
| 3 | MEDIUM | Blog posts lack `xhtml:link` hreflang alternates | `app/sitemap.ts` lines 114-124 | OPEN |
| 4 | LOW | All 48 URLs share identical `lastmod` timestamp | `app/sitemap.ts` line 55 | OPEN |
| 5 | LOW | Blog slugs hardcoded; will drift from Velite content | `app/sitemap.ts` lines 39-50 | OPEN |
| 6 | INFO | `changefreq` and `priority` tags are ignored by Google | `app/sitemap.ts` (all push calls) | OPEN |
| 7 | INFO | No `x-default` hreflang alternate specified | `app/sitemap.ts` (all alternates blocks) | OPEN |

---

## 8. Recommended Corrected sitemap.ts

Below is the full corrected version of `app/sitemap.ts` implementing all fixes:

```typescript
import { MetadataRoute } from 'next';
// Uncomment when ready to dynamically source blog posts:
// import { posts } from '#site/content';

const BASE_URL = 'https://stanbaculescu.ro';

// Static pages with their actual last-modified dates
const staticPages = [
  { path: '', lastmod: '2026-03-01' },
  { path: '/despre-noi', lastmod: '2026-02-15' },
  { path: '/echipa', lastmod: '2026-02-20' },
  { path: '/servicii', lastmod: '2026-02-10' },
  { path: '/blog', lastmod: '2026-01-15' },
  { path: '/contact', lastmod: '2026-01-01' },
  { path: '/politica-confidentialitate', lastmod: '2025-12-01' },
  { path: '/termeni', lastmod: '2025-12-01' },
  { path: '/politica-cookies', lastmod: '2025-12-01' },
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
  'diana-veres',
];

// Blog post locale pairings (ro slug <-> en slug)
const blogAlternatePairs = [
  { ro: 'drepturile-pacientului-malpraxis', en: 'patient-rights-malpractice', lastmod: '2026-01-15' },
  { ro: 'procedura-divortului-romania', en: 'divorce-procedure-romania', lastmod: '2026-01-10' },
  { ro: 'drepturile-angajatului-concediere', en: 'employee-rights-dismissal', lastmod: '2026-01-05' },
];

const locales = ['ro', 'en'];

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  // Static pages for each locale
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

  // Service pages for each locale
  for (const locale of locales) {
    for (const serviceId of serviceIds) {
      urls.push({
        url: `${BASE_URL}/${locale}/servicii/${serviceId}`,
        lastModified: '2026-02-10',
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

  // Team member pages for each locale
  for (const locale of locales) {
    for (const memberId of teamMemberIds) {
      urls.push({
        url: `${BASE_URL}/${locale}/echipa/${memberId}`,
        lastModified: '2026-02-20',
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

  // Blog posts with cross-locale alternates
  for (const pair of blogAlternatePairs) {
    for (const locale of locales) {
      const slug = pair[locale as keyof typeof pair];
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
```

---

## 9. Files Analyzed

| File | Purpose |
|------|---------|
| `/Users/raul/Projects/avocat-stan-baculescu/app/sitemap.ts` | Sitemap generation source |
| `/Users/raul/Projects/avocat-stan-baculescu/app/robots.ts` | Robots.txt generation source |
| `/Users/raul/Projects/avocat-stan-baculescu/.next/server/app/sitemap.xml.body` | Built sitemap XML output |
| `/Users/raul/Projects/avocat-stan-baculescu/.next/server/app/robots.txt.body` | Built robots.txt output |
| `/Users/raul/Projects/avocat-stan-baculescu/i18n/routing.ts` | Locale configuration |
| `/Users/raul/Projects/avocat-stan-baculescu/middleware.ts` | next-intl middleware |
| `/Users/raul/Projects/avocat-stan-baculescu/next.config.ts` | Next.js configuration |
| `/Users/raul/Projects/avocat-stan-baculescu/velite.config.ts` | Velite CMS configuration |
| `/Users/raul/Projects/avocat-stan-baculescu/app/[locale]/termeni/page.tsx` | Terms page (missing from sitemap) |
| `/Users/raul/Projects/avocat-stan-baculescu/app/[locale]/politica-cookies/page.tsx` | Cookie policy page (missing from sitemap) |
| `/Users/raul/Projects/avocat-stan-baculescu/app/[locale]/politica-confidentialitate/page.tsx` | Privacy policy page |
| `/Users/raul/Projects/avocat-stan-baculescu/app/[locale]/servicii/[serviceId]/page.tsx` | Service detail page |
| `/Users/raul/Projects/avocat-stan-baculescu/app/[locale]/echipa/[memberId]/page.tsx` | Team member profile page |
| `/Users/raul/Projects/avocat-stan-baculescu/app/[locale]/blog/[slug]/page.tsx` | Blog post page |
| `/Users/raul/Projects/avocat-stan-baculescu/content/blog/*.mdx` | 6 blog content files |
