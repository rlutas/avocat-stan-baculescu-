# Technical SEO Audit Report

**Website:** https://stanbaculescu.ro
**Project:** SCA Stan-Baculescu Law Firm (Next.js 16 rebuild)
**Audit Date:** 2026-03-04
**Auditor:** Claude Opus 4.6 (Automated Technical SEO Audit)

---

## Executive Summary

This audit evaluates the **Next.js 16 source code** (pre-deployment) for technical SEO readiness, supplemented by analysis of the **currently live WordPress site** at stanbaculescu.ro. The Next.js rebuild is not yet deployed to the production domain -- the live site is still running WordPress on LiteSpeed.

**Overall Technical SEO Score: 72 / 100**

The Next.js codebase has strong fundamentals: proper SSR/SSG architecture, well-structured meta tags per page, hreflang alternates on every page, structured data (JSON-LD), and good security headers. However, there are several critical and high-priority issues that must be resolved before deployment.

### Issue Summary

| Severity | Count | Status |
|----------|-------|--------|
| Critical | 3     | Must fix before launch |
| High     | 6     | Fix before or immediately after launch |
| Medium   | 8     | Fix within first month |
| Low      | 5     | Improve over time |

---

## 1. Crawlability

**Status: PASS (with issues)**
**Score: 7 / 10**

### 1.1 robots.txt

**Source file:** `/Users/raul/Projects/avocat-stan-baculescu/app/robots.ts`

```typescript
export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://stanbaculescu.ro';
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/static/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
```

**Findings:**

- **[PASS]** Correct base URL `https://stanbaculescu.ro`
- **[PASS]** Blocks `/api/`, `/_next/`, `/static/` -- appropriate for Next.js
- **[PASS]** References sitemap at correct URL
- **[PASS]** Uses Next.js Metadata API (auto-generates valid robots.txt)
- **[CRITICAL] Missing AI crawler management rules.** No rules for GPTBot, CCBot, ClaudeBot/anthropic-ai, Google-Extended, Bytespider, PerplexityBot, or other AI training crawlers. For a law firm, content scraping by AI bots could be a concern.
- **[MEDIUM]** The `host` directive is non-standard and ignored by major search engines. Not harmful, but unnecessary.

**Recommended robots.ts:**
```typescript
export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://stanbaculescu.ro';
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/static/'],
      },
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        disallow: '/',
      },
      {
        userAgent: 'ClaudeBot',
        disallow: '/',
      },
      {
        userAgent: 'Google-Extended',
        disallow: '/',
      },
      {
        userAgent: 'Bytespider',
        disallow: '/',
      },
      {
        userAgent: 'PerplexityBot',
        disallow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
```

### 1.2 Sitemap

**Source file:** `/Users/raul/Projects/avocat-stan-baculescu/app/sitemap.ts`

**Findings:**

- **[PASS]** Uses Next.js `MetadataRoute.Sitemap` (auto-generates valid XML)
- **[PASS]** Includes all locales (`ro`, `en`) for every page
- **[PASS]** Includes `alternates.languages` for hreflang in sitemap
- **[PASS]** Includes `changeFrequency` and `priority` for all URLs
- **[PASS]** Includes static pages, service pages, team member pages, and blog posts
- **[HIGH] Missing pages from sitemap:**
  - `/ro/termeni` and `/en/termeni` (Terms of Service)
  - `/ro/politica-cookies` and `/en/politica-cookies` (Cookie Policy)
  - These pages exist in the app but are not in `staticPages` array
- **[HIGH] `lastModified` uses `new Date().toISOString()` for ALL URLs.** This means every URL gets the current timestamp on every build/request. Search engines may distrust lastmod values if they always change. Use static dates or content-based dates instead.
- **[MEDIUM] Blog posts in sitemap are hardcoded slugs.** The comment says "in real app, these would be fetched from Velite" -- this needs to be implemented before launch. Currently, blog post slugs in the sitemap may not match actual Velite-generated content.
- **[MEDIUM] Blog posts lack hreflang alternates in sitemap.** Blog entries at lines 114-124 do not include `alternates.languages`, unlike all other URLs. This means search engines cannot discover ro/en blog post pairs through the sitemap.

**URLs generated (count): ~64 URLs total**
- 14 static pages (7 pages x 2 locales)
- 16 service pages (8 services x 2 locales)
- 12 team member pages (6 members x 2 locales)
- 6 blog posts (3 slugs x 2 locales)

### 1.3 Crawl Blocking

- **[PASS]** No `noindex` directives found on any page
- **[PASS]** Middleware does not block search engine bots
- **[PASS]** Middleware correctly matches all pages except static assets, API, and Next.js internal routes
- **[LOW]** The `localeDetection: false` in routing config is good -- prevents the Accept-Language redirect that could confuse crawlers

---

## 2. Indexability

**Status: PASS (with issues)**
**Score: 7 / 10**

### 2.1 Canonical Tags

**Findings:**

Every page in the application correctly sets canonical URLs using Next.js `metadata.alternates.canonical`:

- **[PASS]** Homepage: `https://stanbaculescu.ro/{locale}`
- **[PASS]** Service pages: `https://stanbaculescu.ro/{locale}/servicii/{serviceId}`
- **[PASS]** Team pages: `https://stanbaculescu.ro/{locale}/echipa/{memberId}`
- **[PASS]** Blog pages: `https://stanbaculescu.ro/{locale}/blog/{slug}`
- **[PASS]** Legal pages: `https://stanbaculescu.ro/{locale}/politica-confidentialitate` etc.
- **[PASS]** All canonicals include the locale prefix, which matches the `localePrefix: 'always'` routing strategy

- **[HIGH] Root layout canonical is wrong.** In `/Users/raul/Projects/avocat-stan-baculescu/app/[locale]/layout.tsx` line 98:
  ```typescript
  alternates: {
    canonical: BASE_URL, // https://stanbaculescu.ro (no locale!)
  }
  ```
  The root layout sets `canonical: BASE_URL` (without locale), but individual pages override this correctly. However, if any page fails to set its own canonical, the fallback from the layout is a bare domain without `/ro` or `/en`, which could cause indexing confusion. This should be locale-aware.

### 2.2 Hreflang Tags

**Source pattern used consistently across all pages:**
```typescript
alternates: {
  languages: {
    'ro-RO': `${BASE_URL}/ro${page.path}`,
    'en-US': `${BASE_URL}/en${page.path}`,
  },
}
```

**Findings:**

- **[PASS]** Every page defines hreflang for both `ro-RO` and `en-US`
- **[PASS]** Language codes use proper BCP 47 format (`ro-RO`, `en-US`)
- **[PASS]** All hreflang URLs are absolute with HTTPS
- **[PASS]** Hreflang is self-referencing (each locale version points to itself and the other)
- **[PASS]** Sitemap includes `alternates.languages` for static, service, and team pages
- **[CRITICAL] No `x-default` hreflang tag.** None of the pages define an `x-default` alternate. For users whose language is neither Romanian nor English, there is no fallback specified. This is critical for proper international SEO. The `x-default` should point to the Romanian version (default locale) or the bare domain.

  **Implementation:** Add `x-default` to each page's alternates:
  ```typescript
  alternates: {
    canonical: `${BASE_URL}/${locale}/servicii`,
    languages: {
      'ro-RO': `${BASE_URL}/ro/servicii`,
      'en-US': `${BASE_URL}/en/servicii`,
      'x-default': `${BASE_URL}/ro/servicii`,
    },
  },
  ```

- **[HIGH] Blog posts have potentially incorrect hreflang.** In `/Users/raul/Projects/avocat-stan-baculescu/app/[locale]/blog/[slug]/page.tsx`, the hreflang alternates use the same slug for both locales:
  ```typescript
  languages: {
    'ro-RO': `${BASE_URL}/ro/blog/${slug}`,
    'en-US': `${BASE_URL}/en/blog/${slug}`,
  },
  ```
  However, the sitemap reveals that Romanian and English blog posts use different slugs (e.g., `drepturile-pacientului-malpraxis` vs. `patient-rights-malpractice`). The hreflang on a Romanian blog post points to `/en/blog/drepturile-pacientului-malpraxis`, which likely returns a 404. **Blog post hreflang pairs must map to the correct translated slug, not reuse the same slug.**

### 2.3 Duplicate Content

- **[PASS]** The `localePrefix: 'always'` strategy prevents bare `/about` URLs from existing alongside `/ro/about` and `/en/about`
- **[PASS]** Root domain `/` redirects to `/ro` via next-intl middleware
- **[MEDIUM]** No trailing slash policy is explicitly defined. Next.js defaults to no trailing slashes, but this should be explicitly configured with `trailingSlash: false` in `next.config.ts` for consistency.

### 2.4 Thin Content Risk

- **[LOW]** Legal pages (terms, cookie policy, privacy policy) use dedicated content components -- these should have sufficient content
- **[LOW]** The error page (`app/error.tsx`) has hardcoded Romanian text without i18n -- this is acceptable since error pages are not indexed

---

## 3. Security

**Status: PASS**
**Score: 9 / 10**

### 3.1 HTTPS

- **[PASS]** All internal URLs use `https://stanbaculescu.ro`
- **[PASS]** The live site serves over HTTP/2 (H2) with HTTPS
- **[PASS]** HSTS header configured: `max-age=63072000; includeSubDomains; preload` (2 years, good)

### 3.2 Security Headers

**Source file:** `/Users/raul/Projects/avocat-stan-baculescu/next.config.ts`

| Header | Value | Status |
|--------|-------|--------|
| Strict-Transport-Security | `max-age=63072000; includeSubDomains; preload` | PASS |
| X-Frame-Options | `SAMEORIGIN` | PASS |
| X-Content-Type-Options | `nosniff` | PASS |
| X-DNS-Prefetch-Control | `on` | PASS |
| Referrer-Policy | `origin-when-cross-origin` | PASS |
| Permissions-Policy | `camera=(), microphone=(), geolocation=()` | PASS |
| Content-Security-Policy | **NOT SET** | MEDIUM |

- **[MEDIUM] Missing Content-Security-Policy (CSP) header.** No CSP header is configured. While not directly an SEO factor, CSP protects against XSS which can indirectly affect search rankings if the site gets compromised. Recommended to add at least a basic CSP policy, especially since the site loads Google Analytics scripts.

---

## 4. URL Structure

**Status: PASS**
**Score: 8 / 10**

### 4.1 URL Patterns

| Pattern | Example | Status |
|---------|---------|--------|
| Homepage | `/ro`, `/en` | PASS |
| Static pages | `/ro/despre-noi`, `/en/despre-noi` | PASS |
| Services | `/ro/servicii/malpraxis-medical` | PASS |
| Team members | `/ro/echipa/camelia-stan` | PASS |
| Blog | `/ro/blog/drepturile-pacientului-malpraxis` | PASS |
| Legal | `/ro/politica-confidentialitate` | PASS |

**Findings:**

- **[PASS]** Clean, human-readable URL slugs
- **[PASS]** Consistent use of hyphens (not underscores)
- **[PASS]** Locale prefix always present (`/ro/`, `/en/`)
- **[PASS]** No query parameters in content URLs
- **[PASS]** Hierarchical structure makes sense (`/servicii/drept-civil`)
- **[MEDIUM] URL paths are in Romanian for both locales.** English users see `/en/servicii/malpraxis-medical` instead of `/en/services/medical-malpractice`. While this is functionally fine and consistent, localized URL slugs can improve user experience and may provide minor SEO benefits for English queries. This is a design decision but worth noting.

### 4.2 Redirect Chain (Pre-deployment)

- **[PASS]** Middleware handles locale routing: bare paths redirect to `/ro/` prefix (default locale)
- **[PASS]** `localeDetection: false` prevents unwanted redirects based on Accept-Language
- **[MEDIUM]** When the Next.js site replaces the WordPress site, all existing WordPress URLs will need 301 redirects to the new URL structure. A redirect map should be prepared.

---

## 5. Mobile Optimization

**Status: PASS**
**Score: 8 / 10**

### 5.1 Viewport Meta Tag

- **[PASS]** Next.js 16 automatically sets the viewport meta tag (`width=device-width, initial-scale=1`)
- **[PASS]** `formatDetection` disabled for email, address, and telephone (prevents unwanted auto-linking)

### 5.2 Responsive Design

- **[PASS]** Tailwind CSS responsive classes used extensively (`sm:`, `md:`, `lg:`)
- **[PASS]** Hero section has three distinct layouts: mobile (<md), tablet (md-lg), and desktop (lg+)
- **[PASS]** Mobile hamburger menu implemented with Sheet component
- **[PASS]** Font sizes scale properly across breakpoints
- **[PASS]** Images use `sizes` attribute for responsive image loading:
  ```tsx
  sizes="(min-width: 1024px) 400px, 300px"
  ```

### 5.3 Touch Targets

- **[PASS]** Navigation links have adequate padding (`px-4 py-3.5` in mobile menu)
- **[PASS]** CTA buttons are `h-12` or `h-14` (48px-56px) -- meets minimum 48px touch target requirement
- **[PASS]** Language switcher buttons have `px-4 py-2.5` padding

---

## 6. Core Web Vitals

**Status: NEEDS ATTENTION**
**Score: 6 / 10**

> Note: These are source-code-based predictions. Actual CWV scores require real-user monitoring (CrUX) or lab testing (Lighthouse) on the deployed site.

### 6.1 LCP (Largest Contentful Paint) -- Target: <2.5s

**Potential LCP elements:** Hero heading text, founder photos

**Risk factors:**

- **[HIGH] Multiple `priority` images loading simultaneously.** In the Hero component, 6 Image components have `priority={true}` (2 desktop founders, 2 tablet founders, 2 mobile founders). While only one set is visible due to CSS `hidden`/`lg:hidden`, the browser may still preload all of them. The `priority` prop adds `fetchpriority="high"` and a preload link for each. This could cause bandwidth contention and delay the actual LCP element.

  **Recommendation:** Only set `priority` on images that are above the fold AND visible for the current viewport. Consider using responsive image loading or conditionally setting priority.

- **[PASS]** Fonts use `display: 'swap'` -- prevents FOIT (Flash of Invisible Text)
- **[PASS]** Google Fonts loaded via `next/font/google` (self-hosted, no external round-trip)
- **[PASS]** Images use `next/image` for automatic optimization (WebP, responsive sizing)
- **[MEDIUM] Framer Motion dependency in Hero.** The Hero is a `'use client'` component that imports `framer-motion`. This library is ~30-50KB gzipped and must hydrate before the hero is interactive. While it does not block LCP rendering in SSR mode, it adds to the total JS bundle that needs to download and parse.

### 6.2 INP (Interaction to Next Paint) -- Target: <200ms

- **[PASS]** Server-side rendering for all pages (no pages use `'use client'` at the page level)
- **[PASS]** Client-side interactivity limited to header, hero animations, and cookie consent
- **[MEDIUM] Framer Motion animations on scroll.** Components like `ScrollAnimate` and motion-based animations could cause jank on lower-end devices if poorly optimized. The `mousemove` event listener in Hero runs on every mouse movement.
- **[LOW]** The language switcher uses `router.replace()`, which triggers a client-side navigation -- this is fast and should not cause INP issues.

### 6.3 CLS (Cumulative Layout Shift) -- Target: <0.1

- **[PASS]** `next/image` with `fill` prop and `sizes` attribute prevents image-based layout shifts
- **[PASS]** Font loading uses `display: 'swap'` with fallback system fonts
- **[HIGH] Hero section has animation-based entry effects.** The CSS `fadeInUp` animation starts elements at `opacity: 0; transform: translateY(30px)` and animates them in. Since these animations use `animation-fill-mode: both` (via the `animate-fade-in-up` class), elements are invisible initially. When they animate in, they occupy space that shifts surrounding content. This can cause CLS.

  **Recommendation:** Use `will-change: transform, opacity` and ensure elements reserve their space before animating. Consider using `transform` only (not affecting layout) or using CSS `contain: layout` on animated containers.

- **[MEDIUM] Floating badges in Hero animate with scale transforms.** The badges use `badgeFadeIn` which starts at `scale(0.8)` -- this could cause minor layout shift on load.
- **[LOW]** Header switches between transparent and white background on scroll -- this uses `fixed` positioning so it should not cause CLS.

---

## 7. Structured Data

**Status: PASS**
**Score: 8 / 10**

### 7.1 Organization Schema

**Source file:** `/Users/raul/Projects/avocat-stan-baculescu/components/seo/organization-schema.tsx`

- **[PASS]** Organization schema with `@id` for entity linking
- **[PASS]** LegalService (LocalBusiness) schema with full address, geo coordinates, opening hours
- **[PASS]** `OfferCatalog` listing key legal services
- **[PASS]** `sameAs` with social media profiles
- **[PASS]** Contact point with languages and area served
- **[MEDIUM] Social media URLs in schema do not match footer links.** Schema has:
  - `https://www.facebook.com/stanbaculescu`
  - `https://www.instagram.com/stanbaculescu`
  - `https://www.tiktok.com/@stanbaculescu`

  But footer links to:
  - `https://www.facebook.com/cabinetavocaturastanbaculescu`
  - `https://www.instagram.com/cabinet_stan_baculescu/`
  - `https://www.tiktok.com/@cabinetavocat`

  **These must be consistent.** Update the schema to use the actual social media URLs.

- **[MEDIUM] Missing `image` for Organization.** The Organization schema references `logo` but the referenced image path `/images/office.jpg` in the LegalService schema does not exist in the `public/images/` directory. Only `logo.webp` exists.

### 7.2 Page-Level Structured Data

| Page | Schema Type | Status |
|------|-------------|--------|
| Contact | LegalService | PASS |
| Service Detail | LegalService (per service) | PASS |
| Blog Post | Article | PASS |
| All Pages | Organization + LegalService (via layout) | PASS |

- **[PASS]** Blog articles include `headline`, `datePublished`, `author`, `publisher`
- **[PASS]** Service pages generate per-service LegalService schema
- **[LOW]** Blog article schema could benefit from `dateModified` and `image` fields

### 7.3 Missing Structured Data Opportunities

- **[MEDIUM]** No `BreadcrumbList` schema. Adding breadcrumbs would enhance SERP appearance.
- **[LOW]** No `FAQPage` schema on service pages (if FAQ content exists)
- **[LOW]** Team member pages lack `Person` schema (currently no structured data)

---

## 8. JavaScript Rendering

**Status: PASS**
**Score: 9 / 10**

### 8.1 Server-Side Rendering (SSR) vs Client-Side Rendering (CSR)

- **[PASS]** All page components are server components (no `'use client'` on any page file)
- **[PASS]** `setRequestLocale()` used for static generation support
- **[PASS]** `generateStaticParams()` implemented for dynamic routes:
  - Service detail pages (8 services)
  - Team member pages (6 members)
  - Blog posts (from Velite content)
- **[PASS]** Meta tags, structured data, and content all render server-side
- **[PASS]** Search engines receive fully-rendered HTML without needing JavaScript execution

### 8.2 Client Components

The following components are `'use client'`:
- `Header` -- interactive navigation, scroll detection
- `Hero` -- framer-motion animations, mouse parallax
- `Footer` -- interactive cookie settings button
- `CookieConsent` -- consent management
- `GoogleAnalytics` -- conditional script loading
- `NotFound` -- animations
- `OrganizationSchema` -- JSON-LD injection

- **[MEDIUM] `OrganizationSchema` is marked `'use client'`.** This is unnecessary and means the structured data JSON-LD is injected client-side. If a search engine renders without JS, it might miss this schema. Change this to a server component.

### 8.3 JavaScript Bundle Concerns

- **[MEDIUM]** `framer-motion` (12.34.5) is a significant JS dependency (~50KB gzipped) loaded on multiple pages. Consider using CSS animations for simple effects and reserving framer-motion for complex interactions.
- **[PASS]** Google Analytics loaded with `strategy="afterInteractive"` and only with cookie consent

---

## 9. Meta Tags Implementation

**Status: PASS (with issues)**
**Score: 7 / 10**

### 9.1 Title Tags

| Page | RO Title | EN Title | Status |
|------|----------|----------|--------|
| Homepage | SCA Stan-Baculescu \| Satu Mare | Stan-Baculescu Law Firm \| Satu Mare, Romania | PASS |
| Services | Servicii Juridice \| SCA Stan-Baculescu | Legal Services \| Stan-Baculescu Law Firm | PASS |
| About | Despre Noi \| SCA Stan-Baculescu | About Us \| Stan-Baculescu Law Firm | PASS |
| Team | Echipa Noastra \| SCA Stan-Baculescu | Our Team \| Stan-Baculescu Law Firm | PASS |
| Blog | Blog Juridic \| SCA Stan-Baculescu | Legal Blog \| Stan-Baculescu Law Firm | PASS |
| Contact | *(from translations)* | *(from translations)* | PASS |

- **[PASS]** Unique titles per page
- **[PASS]** Template pattern: `%s | Stan-Baculescu` (from root layout)
- **[PASS]** Titles are descriptive and include location (Satu Mare)
- **[LOW]** Some titles could be more keyword-optimized (e.g., "Avocat Satu Mare" is a key search term)

### 9.2 Description Tags

- **[PASS]** Unique descriptions per page
- **[PASS]** Descriptions are bilingual (different content for RO and EN)
- **[PASS]** Reasonable length (120-160 characters)
- **[PASS]** Include relevant keywords

### 9.3 Open Graph Tags

- **[PASS]** `og:type`, `og:title`, `og:description`, `og:locale`, `og:url` set per page
- **[PASS]** `og:locale:alternate` configured in root layout
- **[HIGH] Missing og-image.** The root layout references `${BASE_URL}/images/og-image.jpg`, but this file does NOT exist in `public/images/`. The glob search returned no results. This means social sharing previews will have no image.
- **[PASS]** Blog posts use `og:type: article` with `publishedTime` and `authors`
- **[PASS]** Team member pages use `og:type: profile`

### 9.4 Twitter Card Tags

- **[PASS]** `twitter:card: summary_large_image` configured in root layout
- **[PASS]** Blog posts have per-article Twitter cards

### 9.5 Robots Meta Tags

- **[PASS]** Global robots meta: `index: true, follow: true`
- **[PASS]** GoogleBot-specific directives: `max-video-preview: -1, max-image-preview: large, max-snippet: -1`
- **[PASS]** No pages set `noindex`

### 9.6 Google Search Console Verification

- **[MEDIUM]** Verification code is set via environment variable `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`. The `.env.example` shows a placeholder value. Ensure the real verification code is set in production environment variables before launch.

---

## 10. Hreflang Deep Analysis

**Status: NEEDS FIXES**
**Score: 6 / 10**

### 10.1 Implementation Pattern

All pages follow this pattern in their `generateMetadata` function:

```typescript
alternates: {
  canonical: `${BASE_URL}/${locale}/page-path`,
  languages: {
    'ro-RO': `${BASE_URL}/ro/page-path`,
    'en-US': `${BASE_URL}/en/page-path`,
  },
},
```

### 10.2 Page-by-Page Hreflang Analysis

| Page | ro-RO | en-US | x-default | Self-referencing | Valid |
|------|-------|-------|-----------|-----------------|-------|
| Homepage | /ro | /en | MISSING | Yes | Partial |
| About | /ro/despre-noi | /en/despre-noi | MISSING | Yes | Partial |
| Team | /ro/echipa | /en/echipa | MISSING | Yes | Partial |
| Services | /ro/servicii | /en/servicii | MISSING | Yes | Partial |
| Service Detail | /ro/servicii/{id} | /en/servicii/{id} | MISSING | Yes | Partial |
| Blog Index | /ro/blog | /en/blog | MISSING | Yes | Partial |
| Blog Post | /ro/blog/{slug} | /en/blog/{slug} | MISSING | Yes | BROKEN |
| Contact | /ro/contact | /en/contact | MISSING | Yes | Partial |
| Privacy | /ro/politica-confidentialitate | /en/politica-confidentialitate | MISSING | Yes | Partial |
| Cookies | /ro/politica-cookies | /en/politica-cookies | MISSING | Yes | Partial |
| Terms | /ro/termeni | /en/termeni | MISSING | Yes | Partial |
| Team Member | /ro/echipa/{id} | /en/echipa/{id} | MISSING | Yes | Partial |

### 10.3 Critical Hreflang Issues

1. **[CRITICAL] No x-default anywhere.** Every page is missing `x-default`. Google recommends `x-default` for users whose language/location does not match any hreflang variant. This should point to the Romanian version (the default locale).

2. **[HIGH] Blog post hreflang uses same slug for both locales.** Romanian blogs have slugs like `drepturile-pacientului-malpraxis` while English blogs have `patient-rights-malpractice`. The hreflang on each blog post points to the other locale with the SAME slug, creating broken cross-references:
   - `/ro/blog/drepturile-pacientului-malpraxis` points to `/en/blog/drepturile-pacientului-malpraxis` (404)
   - `/en/blog/patient-rights-malpractice` points to `/ro/blog/patient-rights-malpractice` (404)

   **Fix:** Blog posts need a way to reference their translated counterpart's slug. This could be done via Velite frontmatter (e.g., a `translationSlug` field) or a mapping file.

3. **[MEDIUM] Hreflang uses BCP 47 language-region codes (`ro-RO`, `en-US`).** While technically valid, Google recommends using just the language code (`ro`, `en`) when there is no regional distinction. Since there is only one Romanian version and one English version, using `ro` and `en` would be simpler and equally effective.

### 10.4 Sitemap Hreflang

The sitemap includes hreflang alternates for static pages, service pages, and team pages via the `alternates.languages` property in Next.js's sitemap API. This is correct and provides a secondary source of hreflang signals to search engines.

**However:** Blog posts in the sitemap do NOT include hreflang alternates (lines 114-124 of sitemap.ts lack the `alternates` property).

---

## 11. Additional Findings

### 11.1 Image Optimization

- **[PASS]** All images use `next/image` component (automatic WebP, responsive sizing)
- **[PASS]** Team photos available in WebP format
- **[PASS]** Images have descriptive `alt` text (member names)
- **[HIGH] Referenced image `office.jpg` does not exist.** The LegalService schema in `organization-schema.tsx` references `/images/office.jpg`, but this file does not exist. This results in a broken image reference in structured data.
- **[LOW]** The `camielia-stan.webp` filename has a typo (should be `camelia-stan.webp`). While this works as long as all references match, it could cause confusion.

### 11.2 Font Loading

- **[PASS]** Playfair Display and Inter loaded via `next/font/google`
- **[PASS]** Both use `display: 'swap'` to prevent FOIT
- **[PASS]** Fonts are self-hosted by Next.js (no external requests to fonts.googleapis.com)
- **[LOW]** Playfair Display loads 5 weights (400-800), Inter loads 5 weights (300-700). Consider reducing to only the weights actually used.

### 11.3 Analytics Integration

- **[PASS]** Google Analytics loaded only with cookie consent (GDPR compliant)
- **[PASS]** Uses `strategy="afterInteractive"` (does not block page load)
- **[PASS]** `anonymize_ip: true` set for privacy
- **[MEDIUM]** Google Search Console verification code is pending (placeholder in .env.example). Must be configured before launch.

### 11.4 Error Handling

- **[PASS]** Custom 404 page with helpful navigation links
- **[PASS]** Custom error page with retry functionality
- **[PASS]** Global error boundary implemented
- **[MEDIUM]** The `error.tsx` page has hardcoded Romanian text ("Eroare", "Ceva nu a functionat corect"). This should use i18n translations for English users. However, since error boundaries may not have access to the locale context, this is a known limitation.

### 11.5 WordPress to Next.js Migration Considerations

**[CRITICAL] The live site at stanbaculescu.ro is still running WordPress** (LiteSpeed server, wp-json API visible in headers, Rank Math SEO plugin generating sitemaps). Before deploying the Next.js site:

1. **Create a comprehensive 301 redirect map** from all existing WordPress URLs to their Next.js equivalents
2. **Preserve or redirect the existing WordPress sitemap URL** (`/sitemap_index.xml`) or ensure the new `/sitemap.xml` is submitted to Google Search Console
3. **Notify Google Search Console** of the site change
4. **Monitor crawl errors** closely in the first 2-4 weeks after migration
5. **Keep the WordPress site's `robots.txt` rules** in mind when creating the new one

---

## Prioritized Action Items

### Critical (Must fix before launch)

| # | Issue | File | Description |
|---|-------|------|-------------|
| C1 | Missing x-default hreflang | All page files | Add `'x-default': '${BASE_URL}/ro${path}'` to every page's `alternates.languages` |
| C2 | Missing AI crawler rules | `app/robots.ts` | Add Disallow rules for GPTBot, CCBot, ClaudeBot, anthropic-ai, Google-Extended, Bytespider, PerplexityBot |
| C3 | WordPress migration redirect map | New file needed | Create 301 redirect map from all WordPress URLs to Next.js equivalents before DNS cutover |

### High (Fix before or immediately after launch)

| # | Issue | File | Description |
|---|-------|------|-------------|
| H1 | Blog post hreflang broken | `app/[locale]/blog/[slug]/page.tsx` | Blog hreflang uses same slug for both locales -- need translation slug mapping |
| H2 | Missing pages in sitemap | `app/sitemap.ts` | Add `/termeni` and `/politica-cookies` to staticPages array |
| H3 | Missing og-image.jpg | `public/images/` | Create and add the OG image file (1200x630px recommended) |
| H4 | Dynamic lastModified in sitemap | `app/sitemap.ts` | Replace `new Date().toISOString()` with static or content-based dates |
| H5 | Social media URL mismatch | `components/seo/organization-schema.tsx` | Update `sameAs` URLs to match actual social media profiles in footer |
| H6 | Missing office.jpg | `public/images/` | Add the referenced office image or update the schema |

### Medium (Fix within first month)

| # | Issue | File | Description |
|---|-------|------|-------------|
| M1 | Blog posts missing hreflang in sitemap | `app/sitemap.ts` | Add `alternates.languages` to blog post entries |
| M2 | OrganizationSchema is client component | `components/seo/organization-schema.tsx` | Remove `'use client'` directive -- make it a server component |
| M3 | No Content-Security-Policy header | `next.config.ts` | Add CSP header to the headers configuration |
| M4 | Blog sitemap slugs hardcoded | `app/sitemap.ts` | Fetch blog slugs from Velite instead of hardcoding |
| M5 | No trailing slash config | `next.config.ts` | Add `trailingSlash: false` explicitly |
| M6 | No BreadcrumbList schema | Components needed | Add breadcrumb structured data for enhanced SERPs |
| M7 | Root layout canonical lacks locale | `app/[locale]/layout.tsx` | Make the fallback canonical locale-aware |
| M8 | Google Search Console verification | `.env` (production) | Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` with real verification code |

### Low (Improve over time)

| # | Issue | File | Description |
|---|-------|------|-------------|
| L1 | Reduce font weight loading | `app/[locale]/layout.tsx` | Audit which font weights are actually used and remove extras |
| L2 | Consider localized URL slugs for EN | Routing config | Evaluate `/en/services/` instead of `/en/servicii/` |
| L3 | Add FAQPage schema to service pages | Service detail pages | If FAQ content exists, wrap in FAQ structured data |
| L4 | Add Person schema to team members | Team member pages | Add structured data for attorney profiles |
| L5 | Error page i18n | `app/error.tsx` | Translate error page text (if technically feasible) |

---

## Category Scores Summary

| Category | Score | Status |
|----------|-------|--------|
| 1. Crawlability | 7/10 | PASS with issues |
| 2. Indexability | 7/10 | PASS with issues |
| 3. Security | 9/10 | PASS |
| 4. URL Structure | 8/10 | PASS |
| 5. Mobile Optimization | 8/10 | PASS |
| 6. Core Web Vitals (predicted) | 6/10 | NEEDS ATTENTION |
| 7. Structured Data | 8/10 | PASS |
| 8. JavaScript Rendering | 9/10 | PASS |
| 9. Meta Tags | 7/10 | PASS with issues |
| 10. Hreflang | 6/10 | NEEDS FIXES |
| **Overall** | **72/100** | |

---

## Appendix: Key Source Files

| File | Purpose |
|------|---------|
| `/Users/raul/Projects/avocat-stan-baculescu/app/robots.ts` | robots.txt generation |
| `/Users/raul/Projects/avocat-stan-baculescu/app/sitemap.ts` | Sitemap generation |
| `/Users/raul/Projects/avocat-stan-baculescu/app/[locale]/layout.tsx` | Root layout with global meta tags |
| `/Users/raul/Projects/avocat-stan-baculescu/app/[locale]/page.tsx` | Homepage metadata |
| `/Users/raul/Projects/avocat-stan-baculescu/next.config.ts` | Security headers, Next.js config |
| `/Users/raul/Projects/avocat-stan-baculescu/i18n/routing.ts` | Locale routing configuration |
| `/Users/raul/Projects/avocat-stan-baculescu/middleware.ts` | Request middleware for i18n |
| `/Users/raul/Projects/avocat-stan-baculescu/components/seo/organization-schema.tsx` | Organization + LegalService JSON-LD |
| `/Users/raul/Projects/avocat-stan-baculescu/components/hero.tsx` | Hero section (LCP candidate) |
| `/Users/raul/Projects/avocat-stan-baculescu/components/analytics/google-analytics.tsx` | GA4 integration |

---

*This audit was performed by analyzing source code and the live WordPress site. A follow-up audit should be conducted after the Next.js site is deployed to production to validate actual HTTP headers, redirect behavior, Core Web Vitals scores (via CrUX/Lighthouse), and rendered HTML output.*
