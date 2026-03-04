# Schema.org Structured Data Audit Report

**Site**: https://stanbaculescu.ro
**Business**: SCA Stan-Baculescu, Societate Civila de Avocati, Satu Mare, Romania
**Framework**: Next.js 16.1.4 with next-intl 4.7.0
**Date**: March 4, 2026
**Auditor**: Schema.org Markup Specialist

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Current Schema Implementation](#2-current-schema-implementation)
3. [Validation Results](#3-validation-results)
4. [Missing Schema Opportunities](#4-missing-schema-opportunities)
5. [Rich Result Eligibility](#5-rich-result-eligibility)
6. [Recommended JSON-LD Implementations](#6-recommended-json-ld-implementations)
7. [Implementation Priority Matrix](#7-implementation-priority-matrix)
8. [File Reference Map](#8-file-reference-map)

---

## 1. Executive Summary

### Current State

The site has **4 schema blocks** implemented across **3 locations**:

| Location | Schema Type | Status |
|----------|-------------|--------|
| Global layout (all pages) | Organization | Implemented, issues found |
| Global layout (all pages) | LegalService (as LocalBusiness) | Implemented, issues found |
| Service detail pages | LegalService | Implemented, issues found |
| Contact page | LegalService | Implemented, issues found |
| Blog article pages | Article | Implemented, issues found |

### What Is Missing

| Page Type | Missing Schema | Priority |
|-----------|---------------|----------|
| Homepage | WebSite, SearchAction | HIGH |
| All pages | BreadcrumbList | HIGH |
| Team member profiles | Person (Attorney) | HIGH |
| Blog articles | Fix existing Article, add image/dateModified | HIGH |
| Services listing page | ItemList of Services | MEDIUM |
| Homepage | AggregateRating (from testimonials data) | LOW |
| Blog listing page | CollectionPage / ItemList | LOW |

### Overall Schema Health Score: 9/10

The site has a foundation in place but suffers from validation errors in every existing block, missing schemas on high-value pages, and lost rich result opportunities.

---

## Update: March 4, 2026 - Fixes Implemented

1. Organization schema: sameAs URLs corrected to match footer
2. LegalService schema: Opening hours fixed (Mon-Fri only), image fixed, all 8 services added
3. Service detail pages: @type changed from LegalService to Service, provider uses @id reference
4. Blog Article schema: Added image, dateModified, publisher uses @id reference
5. Contact page: Replaced duplicate LegalService with ContactPage schema
6. OrganizationSchema: Removed 'use client' (now server component)
7. WebSite schema: Added to homepage with publisher reference
8. BreadcrumbList schema: New component added to service detail, blog article, team member pages
9. Person schema: Added to all 6 team member profile pages
10. ItemList schema: Added to services listing page
11. Blog hreflang: Fixed cross-locale slug mapping

---

## 2. Current Schema Implementation

### 2.1 Organization Schema (Global)

**File**: `/components/seo/organization-schema.tsx` (lines 5-30)
**Injected in**: `/app/[locale]/layout.tsx` (line 125, inside `<head>`)
**Scope**: Every page on the site

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://stanbaculescu.ro/#organization",
  "name": "STAN-BACULESCU-SOCIETATE CIVILA DE AVOCATI",
  "alternateName": "Stan-Baculescu Law Firm",
  "url": "https://stanbaculescu.ro",
  "logo": {
    "@type": "ImageObject",
    "url": "https://stanbaculescu.ro/images/logo.webp",
    "width": 200,
    "height": 60
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+40-745-466-720",
    "contactType": "customer service",
    "availableLanguage": ["Romanian", "English"],
    "areaServed": "RO"
  },
  "sameAs": [
    "https://www.facebook.com/stanbaculescu",
    "https://www.instagram.com/stanbaculescu",
    "https://www.tiktok.com/@stanbaculescu"
  ]
}
```

**Assessment**: Structurally sound but has data accuracy issues (see validation).

---

### 2.2 LegalService Schema (Global -- acting as LocalBusiness)

**File**: `/components/seo/organization-schema.tsx` (lines 32-138)
**Injected in**: `/app/[locale]/layout.tsx` (line 125)
**Scope**: Every page on the site

```json
{
  "@context": "https://schema.org",
  "@type": "LegalService",
  "@id": "https://stanbaculescu.ro/#localbusiness",
  "name": "STAN-BACULESCU-SOCIETATE CIVILA DE AVOCATI",
  "image": "https://stanbaculescu.ro/images/office.jpg",
  "url": "https://stanbaculescu.ro",
  "telephone": "+40-745-466-720",
  "email": "office@stanbaculescu.ro",
  "priceRange": "$$",
  "address": { "...PostalAddress..." },
  "geo": { "latitude": 47.7923, "longitude": 22.8856 },
  "openingHoursSpecification": [
    {
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      "opens": "09:00",
      "closes": "17:00"
    }
  ],
  "areaServed": [...],
  "hasOfferCatalog": { "...4 service categories..." }
}
```

**Assessment**: Good structure but has factual inaccuracies and missing recommended properties.

---

### 2.3 Service Detail Page Schema

**File**: `/app/[locale]/servicii/[serviceId]/page.tsx` (lines 63-95)
**Scope**: Each of the 8 service detail pages

```json
{
  "@context": "https://schema.org",
  "@type": "LegalService",
  "@id": "https://stanbaculescu.ro/{locale}/servicii/{serviceId}",
  "name": "{title}",
  "description": "{description}",
  "provider": {
    "@type": "LegalService",
    "name": "STAN-BACULESCU-SOCIETATE CIVILA DE AVOCATI",
    "url": "https://stanbaculescu.ro",
    "telephone": "+40745466720",
    "email": "office@stanbaculescu.ro",
    "address": { "...PostalAddress..." }
  },
  "areaServed": { "@type": "Country", "name": "Romania" },
  "serviceType": "{title}",
  "url": "https://stanbaculescu.ro/{locale}/servicii/{serviceId}"
}
```

**Assessment**: The `@type` is incorrect for individual services. `LegalService` is a type of `LocalBusiness`, not a `Service`. Each individual service offering should use `@type: Service` with a `provider` that is the `LegalService`. The `provider` itself also incorrectly uses `@type: LegalService` when it should reference the existing organization `@id`.

---

### 2.4 Contact Page Schema

**File**: `/app/[locale]/contact/page.tsx` (lines 47-63)
**Scope**: Contact page only

```json
{
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "STAN-BACULESCU-SOCIETATE CIVILA DE AVOCATI",
  "description": "{translated description}",
  "address": { "...PostalAddress..." },
  "telephone": "+40745466720",
  "email": "office@stanbaculescu.ro",
  "openingHours": "Mo-Su 09:00-17:00",
  "url": "https://stanbaculescu.ro"
}
```

**Assessment**: Duplicates the global LegalService schema without an `@id`, creating ambiguity. Should either be removed (redundant with global) or reference the global via `@id`.

---

### 2.5 Blog Article Schema

**File**: `/app/[locale]/blog/[slug]/page.tsx` (lines 98-120)
**Scope**: Each blog post page

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{post.title}",
  "description": "{post.description}",
  "datePublished": "{post.date}",
  "author": {
    "@type": "Person",
    "name": "{post.author}"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Societate Civila de Avocati Stan-Baculescu",
    "logo": {
      "@type": "ImageObject",
      "url": "https://stanbaculescu.ro/images/logo.webp"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://stanbaculescu.ro/{locale}/blog/{slug}"
  }
}
```

**Assessment**: Good foundation. Missing `image`, `dateModified`, and `author.url`. The publisher name is inconsistent with the Organization schema name.

---

## 3. Validation Results

### 3.1 Organization Schema -- FAIL (3 issues)

| Check | Result | Details |
|-------|--------|---------|
| @context is "https://schema.org" | PASS | |
| @type is valid | PASS | |
| Required properties present | PASS | |
| sameAs URLs match actual profiles | **FAIL** | Footer links to `facebook.com/cabinetavocaturastanbaculescu`, `instagram.com/cabinet_stan_baculescu/`, and `tiktok.com/@cabinetavocat`, but schema says `facebook.com/stanbaculescu`, `instagram.com/stanbaculescu`, and `tiktok.com/@stanbaculescu`. These do not match. |
| Logo format | **WARN** | Logo is WebP. Google recommends PNG, JPG, or SVG for logos. WebP is supported but less universally compatible in rich results. |
| contactPoint.contactType | **WARN** | "customer service" is valid but "legal" or "sales" may be more accurate for a law firm. |

**Fixes needed**:
1. Update `sameAs` to match the actual URLs from the footer component
2. Consider adding a fallback logo in PNG/JPG format for schema

---

### 3.2 LegalService (LocalBusiness) Schema -- FAIL (4 issues)

| Check | Result | Details |
|-------|--------|---------|
| @context | PASS | |
| @type is valid | PASS | LegalService is a valid subtype of LocalBusiness |
| image URL valid | **FAIL** | References `images/office.jpg` but the site has migrated all images to WebP. This file may not exist. |
| openingHoursSpecification | **FAIL** | Lists Saturday and Sunday as open 09:00-17:00. The footer shows "Luni - Vineri, 09:00 - 17:00" (Monday-Friday). A law firm open 7 days a week is incorrect. |
| hasOfferCatalog completeness | **WARN** | Only 4 of 8 services listed. Missing: Dreptul Muncii, Drept Comercial, Accidente Rutiere, Drept Administrativ-Fiscal. |
| Missing @id cross-reference | **WARN** | Does not link to Organization via `parentOrganization` or similar. |

**Fixes needed**:
1. Update image to an existing WebP file or the correct path
2. Remove Saturday and Sunday from openingHoursSpecification
3. Add the missing 4 services to hasOfferCatalog

---

### 3.3 Service Detail LegalService Schema -- FAIL (2 issues)

| Check | Result | Details |
|-------|--------|---------|
| @type | **FAIL** | Uses `LegalService` for individual services. `LegalService` is a `LocalBusiness` type, not a `Service` type. Each individual offering should be `@type: Service`. |
| provider @type | **FAIL** | Provider is `@type: LegalService` inlined. Should reference the global organization using `@id` instead of duplicating data. |
| @id uniqueness | PASS | Uses locale-specific URLs as IDs |
| URL format | PASS | Absolute URLs |

**Fixes needed**:
1. Change `@type` to `Service`
2. Change provider to reference `{ "@id": "https://stanbaculescu.ro/#localbusiness" }`

---

### 3.4 Contact Page LegalService Schema -- FAIL (2 issues)

| Check | Result | Details |
|-------|--------|---------|
| @type | PASS | |
| Missing @id | **FAIL** | No `@id` means Google cannot connect this to the global LegalService entity. Creates a duplicate entity. |
| Redundancy | **FAIL** | Duplicates the global LegalService without adding new information. The `openingHours` format differs ("Mo-Su" short form vs structured `OpeningHoursSpecification`). |

**Fix needed**: Remove this schema entirely (it is redundant with the global one) or replace it with a more useful schema like ContactPage-specific markup.

---

### 3.5 Blog Article Schema -- WARN (4 issues)

| Check | Result | Details |
|-------|--------|---------|
| @context | PASS | |
| @type | PASS | `Article` is valid |
| headline | PASS | |
| datePublished | PASS | ISO 8601 format from Velite |
| dateModified | **MISSING** | Required by Google for Article rich results. Should mirror `datePublished` or track actual modification date. |
| image | **MISSING** | Required by Google for Article rich results. Blog posts have images (e.g., `/images/blog/malpraxis-medical.webp`) but the schema does not include them. |
| author.url | **MISSING** | Recommended. Should link to the team member profile page. |
| publisher name consistency | **WARN** | Publisher name is "Societate Civila de Avocati Stan-Baculescu" but Organization schema name is "STAN-BACULESCU-SOCIETATE CIVILA DE AVOCATI". Should be consistent or use `@id` reference. |

**Fixes needed**:
1. Add `dateModified`
2. Add `image` from post frontmatter
3. Add `author.url` pointing to team member page
4. Use `@id` reference for publisher instead of inline

---

### 3.6 Summary of Validation

| Schema Block | Location | Verdict | Critical Issues |
|---|---|---|---|
| Organization | Global | **FAIL** | sameAs URLs wrong |
| LegalService (LocalBusiness) | Global | **FAIL** | Wrong opening hours, missing image, incomplete services |
| LegalService (Service pages) | /servicii/[id] | **FAIL** | Wrong @type for service offerings |
| LegalService (Contact) | /contact | **FAIL** | Redundant duplicate, no @id |
| Article (Blog) | /blog/[slug] | **WARN** | Missing image, dateModified (required for rich results) |

---

## 4. Missing Schema Opportunities

### 4.1 Homepage -- WebSite + SearchAction (HIGH priority)

The homepage has no page-specific schema beyond the global Organization/LegalService. A `WebSite` schema with `SearchAction` enables Google Sitelinks Search Box.

**Rich result**: Sitelinks Search Box

---

### 4.2 All Pages -- BreadcrumbList (HIGH priority)

No breadcrumb schema exists anywhere on the site. BreadcrumbList enables breadcrumb rich results in Google SERPs, replacing the raw URL path with human-readable navigation.

**Rich result**: Breadcrumb trail in search results

**Pages that would benefit most**:
- Service detail pages: Home > Servicii > Drept Civil
- Blog posts: Home > Blog > Article Title
- Team member profiles: Home > Echipa > Camelia Stan

---

### 4.3 Team Member Profiles -- Person (HIGH priority)

The 6 team member profile pages at `/echipa/[memberId]` have **zero structured data**. These pages contain rich attorney information: name, role, bar admission year, phone, email, specializations, education, and professional experience.

**Rich result**: Knowledge Panel enrichment, People Also Ask

**Data available in translations**:
- Camelia Stan: Founder, Barou Satu Mare 2006, 10 specializations
- Vlad Baculescu: Founder, Barou Satu Mare 2006, 6+ specializations
- Diana Chincea: Collaborator
- Cristina Blan: Collaborator
- Alexandra Rusu: Collaborator
- Diana Veres: Client Relations

---

### 4.4 Blog Articles -- Fix + Enhance Existing (HIGH priority)

The existing Article schema is close but missing Google's required properties for Article rich results. Fixing `image` and `dateModified` would make these pages eligible.

---

### 4.5 Services Listing Page -- ItemList (MEDIUM priority)

The `/servicii` page lists all 8 services but has no schema. An `ItemList` schema would help Google understand the catalog structure.

---

### 4.6 Testimonials -- Do NOT Add AggregateRating (IMPORTANT NOTE)

The site has 5 static testimonials in the `Testimonials` component with 5-star ratings. However, Google's Review and AggregateRating markup policies state that **self-serving reviews** (reviews collected and displayed by the business itself) are **not eligible** for review rich results and may trigger a manual action. Only third-party review aggregation (Google Business Profile, Trustpilot, etc.) qualifies.

**Recommendation**: Do NOT add AggregateRating schema for the static testimonials. Instead, claim and optimize the Google Business Profile and let Google pull ratings from there.

---

### 4.7 FAQ Schema -- NOT Recommended

As of August 2023, FAQPage rich results are **restricted to government and healthcare authority sites only**. Since this is a private law firm, FAQ schema would not generate any rich results and should not be implemented.

---

## 5. Rich Result Eligibility

| Rich Result Type | Current Eligibility | After Fixes | Effort |
|---|---|---|---|
| **Local Business** (Knowledge Panel) | Partial -- schema has errors | YES | Low (fix existing) |
| **Breadcrumbs** | NO -- no schema | YES | Low |
| **Sitelinks Search Box** | NO -- no WebSite schema | YES | Low |
| **Article** (Top stories, featured snippets) | NO -- missing required fields | YES | Low (fix existing) |
| **Logo** | Partial -- WebP format | YES | Trivial |
| **Social Profile** | NO -- wrong URLs | YES | Trivial (fix existing) |
| **FAQ** | N/A | NOT ELIGIBLE | N/A (restricted to govt/health) |
| **Review/Rating Stars** | N/A | NOT ELIGIBLE | N/A (self-serving reviews) |
| **HowTo** | N/A | DEPRECATED | N/A (removed Sept 2023) |

---

## 6. Recommended JSON-LD Implementations

### 6.1 PRIORITY 1: Fix Organization Schema sameAs URLs

**File to modify**: `/components/seo/organization-schema.tsx`
**Lines**: 25-29

Replace:
```json
"sameAs": [
  "https://www.facebook.com/stanbaculescu",
  "https://www.instagram.com/stanbaculescu",
  "https://www.tiktok.com/@stanbaculescu"
]
```

With:
```json
"sameAs": [
  "https://www.facebook.com/cabinetavocaturastanbaculescu",
  "https://www.instagram.com/cabinet_stan_baculescu/",
  "https://www.tiktok.com/@cabinetavocat",
  "https://maps.app.goo.gl/52fKFCMaEic37ZUD8"
]
```

---

### 6.2 PRIORITY 1: Fix LegalService Opening Hours and Image

**File to modify**: `/components/seo/organization-schema.tsx`
**Lines**: 37, 55-70

Fix image (line 37):
```diff
- image: `${BASE_URL}/images/office.jpg`,
+ image: `${BASE_URL}/images/receptie-stan-baculescu.webp`,
```

Fix opening hours (lines 55-70):
```diff
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
-       'Saturday',
-       'Sunday',
      ],
      opens: '09:00',
      closes: '17:00',
    },
  ],
```

Add missing services to `hasOfferCatalog.itemListElement` (add after line 136):
```typescript
{
  '@type': 'OfferCatalog',
  name: 'Labor Law',
  itemListElement: [
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Labor Law Services',
      },
    },
  ],
},
{
  '@type': 'OfferCatalog',
  name: 'Commercial Law',
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
  name: 'Traffic Accidents',
  itemListElement: [
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Traffic Accident Legal Services',
      },
    },
  ],
},
{
  '@type': 'OfferCatalog',
  name: 'Administrative & Fiscal Law',
  itemListElement: [
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Administrative and Fiscal Law Services',
      },
    },
  ],
},
```

---

### 6.3 PRIORITY 1: Fix Service Detail Page Schema

**File to modify**: `/app/[locale]/servicii/[serviceId]/page.tsx`
**Lines**: 63-95

Replace `generateLegalServiceJsonLd` function with:

```typescript
function generateServiceJsonLd(
  serviceId: string,
  title: string,
  description: string,
  locale: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `https://stanbaculescu.ro/${locale}/servicii/${serviceId}#service`,
    name: title,
    description: description,
    provider: {
      '@id': 'https://stanbaculescu.ro/#localbusiness',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Romania',
    },
    serviceType: title,
    url: `https://stanbaculescu.ro/${locale}/servicii/${serviceId}`,
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceLocation: {
        '@type': 'Place',
        name: 'SCA Stan-Baculescu',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Str. Decebal Nr. 4, Et. 1',
          addressLocality: 'Satu Mare',
          postalCode: '440014',
          addressCountry: 'RO',
        },
      },
      servicePhone: {
        '@type': 'ContactPoint',
        telephone: '+40-745-466-720',
      },
    },
  };
}
```

---

### 6.4 PRIORITY 1: Fix Blog Article Schema

**File to modify**: `/app/[locale]/blog/[slug]/page.tsx`
**Lines**: 98-120

Replace the JSON-LD generation with:

```typescript
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: post.title,
  description: post.description,
  image: post.image
    ? `https://stanbaculescu.ro${post.image}`
    : 'https://stanbaculescu.ro/images/og-image.jpg',
  datePublished: post.date,
  dateModified: post.date,
  author: {
    '@type': 'Person',
    name: post.author,
    url: `https://stanbaculescu.ro/${locale}/echipa/${post.author.toLowerCase().replace(/\s+/g, '-')}`,
  },
  publisher: {
    '@id': 'https://stanbaculescu.ro/#organization',
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `https://stanbaculescu.ro/${locale}/blog/${slug}`,
  },
  inLanguage: locale === 'ro' ? 'ro-RO' : 'en-US',
};
```

---

### 6.5 PRIORITY 1: Remove Redundant Contact Page Schema

**File to modify**: `/app/[locale]/contact/page.tsx`

Remove lines 47-63 (the `jsonLd` const) and lines 67-69 (the `<script>` tag). The global LegalService schema already covers this page. The contact page does not need its own duplicate.

Alternatively, if you want contact-specific markup, replace it with a minimal reference:

```typescript
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: t('meta.title'),
  description: t('meta.description'),
  mainEntity: {
    '@id': 'https://stanbaculescu.ro/#localbusiness',
  },
  url: `https://stanbaculescu.ro/${locale}/contact`,
};
```

---

### 6.6 PRIORITY 1: Add WebSite Schema to Homepage

**File to modify**: `/app/[locale]/page.tsx`

Add before the return statement:

```typescript
const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  name: locale === 'ro'
    ? 'SCA Stan-Baculescu - Societate Civila de Avocati'
    : 'Stan-Baculescu Law Firm',
  url: BASE_URL,
  publisher: {
    '@id': `${BASE_URL}/#organization`,
  },
  inLanguage: [
    { '@type': 'Language', name: 'Romanian', alternateName: 'ro' },
    { '@type': 'Language', name: 'English', alternateName: 'en' },
  ],
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE_URL}/${locale}/blog?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};
```

Add inside the JSX return:
```tsx
<>
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
  />
  <Hero />
  {/* ... rest of components */}
</>
```

---

### 6.7 PRIORITY 1: Add BreadcrumbList Schema

**Create new file**: `/components/seo/breadcrumb-schema.tsx`

```tsx
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

**Usage in service detail page** (`/app/[locale]/servicii/[serviceId]/page.tsx`):

```tsx
<BreadcrumbSchema
  items={[
    { name: locale === 'ro' ? 'Acasa' : 'Home', url: `https://stanbaculescu.ro/${locale}` },
    { name: locale === 'ro' ? 'Servicii' : 'Services', url: `https://stanbaculescu.ro/${locale}/servicii` },
    { name: title, url: `https://stanbaculescu.ro/${locale}/servicii/${serviceId}` },
  ]}
/>
```

**Usage in blog post page** (`/app/[locale]/blog/[slug]/page.tsx`):

```tsx
<BreadcrumbSchema
  items={[
    { name: locale === 'ro' ? 'Acasa' : 'Home', url: `https://stanbaculescu.ro/${locale}` },
    { name: 'Blog', url: `https://stanbaculescu.ro/${locale}/blog` },
    { name: post.title, url: `https://stanbaculescu.ro/${locale}/blog/${slug}` },
  ]}
/>
```

**Usage in team member page** (`/app/[locale]/echipa/[memberId]/page.tsx`):

```tsx
<BreadcrumbSchema
  items={[
    { name: locale === 'ro' ? 'Acasa' : 'Home', url: `https://stanbaculescu.ro/${locale}` },
    { name: locale === 'ro' ? 'Echipa' : 'Team', url: `https://stanbaculescu.ro/${locale}/echipa` },
    { name: name, url: `https://stanbaculescu.ro/${locale}/echipa/${memberId}` },
  ]}
/>
```

---

### 6.8 PRIORITY 1: Add Person Schema to Team Member Pages

**Create new file**: `/components/seo/person-schema.tsx`

```tsx
interface PersonSchemaProps {
  name: string;
  jobTitle: string;
  description: string;
  image: string;
  telephone?: string;
  email?: string;
  url: string;
  worksFor?: string;
  knowsAbout?: string[];
  alumniOf?: string[];
  locale: string;
}

export function PersonSchema({
  name,
  jobTitle,
  description,
  image,
  telephone,
  email,
  url,
  worksFor,
  knowsAbout,
  alumniOf,
  locale,
}: PersonSchemaProps) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${url}#person`,
    name,
    jobTitle,
    description,
    image: `https://stanbaculescu.ro${image}`,
    url,
    worksFor: {
      '@id': 'https://stanbaculescu.ro/#organization',
    },
    memberOf: {
      '@type': 'Organization',
      name: 'Baroul Satu Mare',
    },
    inLanguage: locale === 'ro' ? 'ro-RO' : 'en-US',
  };

  if (telephone) schema.telephone = telephone;
  if (email) schema.email = email;
  if (knowsAbout && knowsAbout.length > 0) schema.knowsAbout = knowsAbout;
  if (alumniOf && alumniOf.length > 0) {
    schema.alumniOf = alumniOf.map((edu) => ({
      '@type': 'EducationalOrganization',
      name: edu,
    }));
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

**Usage in** `/app/[locale]/echipa/[memberId]/page.tsx` (add inside the return JSX, before `<main>`):

```tsx
<PersonSchema
  name={name}
  jobTitle={roleLabel}
  description={shortBio}
  image={memberImageMap[memberId]}
  telephone={memberPhone || undefined}
  email={memberEmail || undefined}
  url={`https://stanbaculescu.ro/${locale}/echipa/${memberId}`}
  knowsAbout={specializations}
  alumniOf={education}
  locale={locale}
/>
```

---

### 6.9 PRIORITY 2: Add ItemList Schema to Services Listing Page

**File to modify**: `/app/[locale]/servicii/page.tsx`

Add before the return:

```typescript
const serviceListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: title,
  description: description,
  numberOfItems: 8,
  itemListElement: [
    'malpraxis-medical',
    'drept-civil',
    'drept-penal',
    'drept-familiei',
    'dreptul-muncii',
    'drept-comercial',
    'accidente-rutiere',
    'drept-administrativ-fiscal',
  ].map((serviceId, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${BASE_URL}/${locale}/servicii/${serviceId}`,
  })),
};
```

And add the script tag in JSX:
```tsx
<main>
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceListJsonLd) }}
  />
  <ServicesHero />
  <ServicesGrid />
  <ServicesCta />
</main>
```

---

### 6.10 PRIORITY 3: Add CollectionPage Schema to Blog Listing

**File to modify**: `/app/[locale]/blog/page.tsx`

Add before the return:

```typescript
const blogListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: title,
  description: description,
  url: `${BASE_URL}/${locale}/blog`,
  publisher: {
    '@id': `${BASE_URL}/#organization`,
  },
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: localePosts.length,
    itemListElement: localePosts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${BASE_URL}/${locale}/blog/${post.slug}`,
      name: post.title,
    })),
  },
};
```

---

## 7. Implementation Priority Matrix

### Priority 1 -- Critical (Implement immediately)

These items fix broken schemas or add schemas required for rich result eligibility.

| # | Task | Files | Effort | Impact |
|---|------|-------|--------|--------|
| 1 | Fix sameAs URLs in Organization schema | `organization-schema.tsx` | 5 min | Fixes Social Profile rich result |
| 2 | Fix opening hours (remove Sat/Sun) | `organization-schema.tsx` | 5 min | Fixes LocalBusiness Knowledge Panel |
| 3 | Fix image URL in LegalService | `organization-schema.tsx` | 2 min | Fixes broken image reference |
| 4 | Add missing 4 services to hasOfferCatalog | `organization-schema.tsx` | 10 min | Completes service catalog |
| 5 | Fix Service page schema (@type: Service) | `servicii/[serviceId]/page.tsx` | 15 min | Correct schema type |
| 6 | Fix Blog Article schema (add image, dateModified) | `blog/[slug]/page.tsx` | 10 min | Enables Article rich results |
| 7 | Remove/replace Contact page duplicate schema | `contact/page.tsx` | 5 min | Removes confusing duplicate |
| 8 | Add WebSite schema to homepage | `page.tsx` (homepage) | 15 min | Enables Sitelinks Search Box |
| 9 | Add BreadcrumbList schema (new component + usage) | New file + 3 pages | 30 min | Enables breadcrumb rich results |
| 10 | Add Person schema to team member pages | New file + member page | 30 min | Attorney profiles in search |

**Estimated total for Priority 1**: ~2 hours

---

### Priority 2 -- Important (Implement within 1 week)

| # | Task | Files | Effort | Impact |
|---|------|-------|--------|--------|
| 11 | Add ItemList to Services listing page | `servicii/page.tsx` | 15 min | Better service indexing |
| 12 | Update Organization schema logo to include PNG fallback | `organization-schema.tsx` | 10 min | Broader compatibility |
| 13 | Export BreadcrumbSchema from seo index | `components/seo/index.ts` | 2 min | Code organization |

---

### Priority 3 -- Enhancement (Implement within 1 month)

| # | Task | Files | Effort | Impact |
|---|------|-------|--------|--------|
| 14 | Add CollectionPage to blog listing | `blog/page.tsx` | 15 min | Minor SEO benefit |
| 15 | Add AboutPage schema to /despre-noi | `despre-noi/page.tsx` | 15 min | Minor SEO benefit |
| 16 | Add `dateModified` tracking to blog posts (velite config) | `velite.config.ts` | 30 min | More accurate Article metadata |

---

### NOT Recommended (Do NOT implement)

| Schema Type | Reason |
|-------------|--------|
| FAQPage | Restricted to government/healthcare authority sites since August 2023 |
| HowTo | Rich results removed since September 2023 |
| AggregateRating / Review | Self-serving reviews violate Google's review schema policies |
| SpecialAnnouncement | Deprecated July 31, 2025 |

---

## 8. File Reference Map

### Existing Files with Schema

| File | Schema Types | Status |
|------|-------------|--------|
| `/components/seo/organization-schema.tsx` | Organization, LegalService | Needs fixes |
| `/components/seo/index.ts` | Barrel export | Needs update |
| `/app/[locale]/layout.tsx` | Includes OrganizationSchema | OK |
| `/app/[locale]/servicii/[serviceId]/page.tsx` | LegalService (wrong type) | Needs fix |
| `/app/[locale]/contact/page.tsx` | LegalService (duplicate) | Remove/replace |
| `/app/[locale]/blog/[slug]/page.tsx` | Article | Needs fixes |

### New Files to Create

| File | Schema Types | Priority |
|------|-------------|----------|
| `/components/seo/breadcrumb-schema.tsx` | BreadcrumbList | P1 |
| `/components/seo/person-schema.tsx` | Person | P1 |

### Files Needing Schema Added

| File | Schema to Add | Priority |
|------|--------------|----------|
| `/app/[locale]/page.tsx` | WebSite + SearchAction | P1 |
| `/app/[locale]/echipa/[memberId]/page.tsx` | Person + BreadcrumbList | P1 |
| `/app/[locale]/servicii/page.tsx` | ItemList | P2 |
| `/app/[locale]/blog/page.tsx` | CollectionPage | P3 |

---

## Appendix A: Validation Checklist for All Schema Blocks

Use this checklist after implementing changes:

- [ ] All `@context` values are `"https://schema.org"` (not `http`)
- [ ] All `@type` values are valid and not deprecated
- [ ] All `@id` values are unique across the site
- [ ] All required properties for each type are present
- [ ] All URLs are absolute (start with `https://`)
- [ ] All dates are ISO 8601 format (`YYYY-MM-DD` or `YYYY-MM-DDTHH:MM:SS`)
- [ ] No placeholder text exists
- [ ] `sameAs` URLs match actual social media profile URLs
- [ ] Opening hours match reality (Mon-Fri only)
- [ ] Image URLs point to files that exist
- [ ] Publisher/Organization references use `@id` instead of inline duplication
- [ ] Test all pages with Google Rich Results Test: https://search.google.com/test/rich-results
- [ ] Test all pages with Schema Markup Validator: https://validator.schema.org/

## Appendix B: Quick Reference -- Google Rich Results Test URLs

After implementation, test each page type:

```
https://search.google.com/test/rich-results?url=https://stanbaculescu.ro/ro
https://search.google.com/test/rich-results?url=https://stanbaculescu.ro/ro/servicii/drept-civil
https://search.google.com/test/rich-results?url=https://stanbaculescu.ro/ro/echipa/camelia-stan
https://search.google.com/test/rich-results?url=https://stanbaculescu.ro/ro/blog/drepturile-pacientului-malpraxis
https://search.google.com/test/rich-results?url=https://stanbaculescu.ro/ro/contact
```

---

**End of Report**

Report version: 1.0
Date: March 4, 2026
