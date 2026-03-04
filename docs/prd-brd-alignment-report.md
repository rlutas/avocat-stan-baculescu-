# PRD-BRD Alignment Report
## Variant 1: Professional Presentation Website

**Date:** 2026-01-20
**PRD Document:** `tasks/prd-stan-baculescu-website.md`
**BRD Document:** `docs/client/business-requirements.md`
**Contract Scope:** Variant 1 ONLY (Professional Presentation Website)
**Budget:** EUR 3,500 + TVA
**Timeline:** 60 days from advance payment

---

## Executive Summary

The PRD is **largely well-aligned** with the Variant 1 scope from the BRD. The document correctly defines a professional presentation website with appropriate Non-Goals excluding Variant 2 features. However, there are several items requiring attention:

- **17 items correctly aligned**
- **3 items potentially over-scoped** for Variant 1
- **2 items missing or under-specified** from Variant 1 requirements
- **4 recommendations** for PRD improvements

---

## 1. Correctly Aligned Items

### 1.1 Core Website Features

| BRD Requirement (Section 5.1) | PRD Coverage | Status |
|-------------------------------|--------------|--------|
| Modern, responsive design using shadcn/ui | US-015, Technical Stack specifies shadcn/ui + Tailwind | Aligned |
| Homepage with firm overview and value proposition | US-001 Hero Section with founders photos, headline, CTA | Aligned |
| Practice areas/services pages | US-005 (overview) + US-006 (8 individual pages) | Aligned |
| Lawyer profiles with bios and photos | US-004 with 7 team members (2 founders: Av. Camelia Stan, Av. Vlad Baculescu; 3 collaborators: Diana Chincea, Cristina Blan, Alexandra Rusu; 1 client relations: Diana Vereș) and individual profiles | Aligned |
| Contact information and forms | US-008 with validation, anti-spam, email delivery | Aligned |
| Mobile-first responsive design | US-015 with specific breakpoints | Aligned |
| Fast loading performance | Performance targets: LCP <2.5s, Lighthouse 90+ | Aligned |

### 1.2 SEO and Compliance

| BRD Requirement | PRD Coverage | Status |
|-----------------|--------------|--------|
| SEO optimization | US-013 comprehensive SEO with structured data, sitemap, hreflang | Aligned |
| GDPR-compliant cookie consent | US-011 with Accept/Reject/Customize options | Aligned |
| Legal pages (Privacy Policy, Terms, Cookie Policy) | US-012, FR-11 mentions all three pages | Aligned |

### 1.3 Analytics and Integration

| BRD Requirement | PRD Coverage | Status |
|-----------------|--------------|--------|
| Basic analytics integration | US-014 Google Analytics 4 with consent | Aligned |
| Google Search Console | US-014 mentions verification meta tag | Aligned |

### 1.4 Architecture Preparation for Future

| BRD Requirement (Section 5.1) | PRD Coverage | Status |
|-------------------------------|--------------|--------|
| Authentication system foundation (ready to activate) | US-017: "Supabase client initialized but auth not active" | Aligned |
| Database schema designed for future expansion | US-017: "Database schema designed for future expansion" | Aligned |
| Component architecture supporting future features | Goal: "Provide scalable architecture ready for future features" | Aligned |
| API routes structure for booking/payment (dormant) | Implicit in US-017 Supabase setup | Aligned |

### 1.5 Technical Stack Alignment

| BRD Recommendation (Section 8.1) | PRD Specification | Status |
|----------------------------------|-------------------|--------|
| Next.js 14+ | Next.js 14+ (App Router) | Aligned |
| TypeScript | TypeScript | Aligned |
| shadcn/ui | shadcn/ui | Aligned |
| Tailwind CSS | Tailwind CSS | Aligned |
| React Hook Form + Zod | React Hook Form + Zod | Aligned |
| Supabase | Supabase (prepared, not active) | Aligned |
| Vercel hosting | Vercel | Aligned |
| Resend for email | Resend API | Aligned |

### 1.6 Non-Goals Correctly Exclude Variant 2 Features

| Variant 2 Feature | PRD Non-Goal Status | Status |
|-------------------|---------------------|--------|
| User authentication/login system | Listed as "infrastructure ready, not active" | Aligned |
| Client portal | Explicitly excluded | Aligned |
| Online booking/scheduling | Explicitly excluded | Aligned |
| Payment processing | Explicitly excluded | Aligned |
| AI-powered features | Explicitly excluded | Aligned |
| Calendar integration | Explicitly excluded | Aligned |
| Document upload functionality | Explicitly excluded | Aligned |

---

## 2. Items Potentially Over-Scoped for Variant 1

### 2.1 Bilingual Content (Romanian/English)

| Item | Analysis |
|------|----------|
| **PRD Scope** | Full bilingual support (RO/EN) throughout all 18+ pages with next-intl, hreflang tags, URL structure `/ro/...` and `/en/...` |
| **BRD Variant 1** | Section 7.4 states "Romanian (primary)" with "Future: Architecture supports i18n for multi-language" |
| **Concern** | Full bilingual implementation may exceed Variant 1 scope. BRD lists English as "optional future" |
| **Recommendation** | Clarify with client if full English translation is required now or if architecture-only preparation is sufficient |

**Risk Level:** Medium - Could add 15-20% additional content work and testing

### 2.2 Google Reviews/Testimonials Integration (US-009)

| Item | Analysis |
|------|----------|
| **PRD Scope** | Active integration with Google Reviews API, auto-refresh mechanism, carousel display |
| **BRD Variant 1** | Not explicitly listed in Section 5.1 core features |
| **Concern** | Google My Business API integration requires OAuth, API quota management, and ongoing maintenance |
| **Recommendation** | Consider simplifying to manually curated testimonials or static display with link to Google profile |

**Risk Level:** Low - Feature is nice-to-have but adds API complexity

### 2.3 Contact Form Submissions Stored in Database (US-017)

| Item | Analysis |
|------|----------|
| **PRD Scope** | "Contact form submissions stored in database (optional but recommended)" |
| **BRD Variant 1** | FR1.3 only requires email notification, no database storage mentioned |
| **Concern** | Database storage adds data retention obligations under GDPR |
| **Recommendation** | Keep as optional; if implemented, ensure GDPR data retention policy (BRD: 1 year for contact submissions) |

**Risk Level:** Low - Good practice but ensure compliance documentation

---

## 3. Missing or Under-Specified Variant 1 Requirements

### 3.1 Training and Documentation

| Item | Analysis |
|------|----------|
| **BRD Requirement** | Section 5.1 Deliverables explicitly lists: "Documentation for content updates" and "Training for administrative staff" |
| **PRD Coverage** | Not mentioned in User Stories, Functional Requirements, or Success Metrics |
| **Impact** | Client expectation gap - training is explicitly promised in BRD |
| **Recommendation** | Add US-019 for Admin Training and Documentation deliverable |

**Risk Level:** Medium - Explicit BRD deliverable missing from PRD

### 3.2 1-Year Technical Support

| Item | Analysis |
|------|----------|
| **BRD Requirement** | Section 5.1 states "1 year technical support included" |
| **PRD Coverage** | Not mentioned anywhere in the PRD |
| **Impact** | Post-launch support expectations not documented |
| **Recommendation** | Add section on Support Agreement or reference to separate support document |

**Risk Level:** Medium - Contractual obligation not reflected in PRD

### 3.3 Content Migration Strategy

| Item | Analysis |
|------|----------|
| **BRD Requirement** | Section 10.3 details WordPress content migration with SEO redirects (301) |
| **PRD Coverage** | Open Question #7 asks "which content from WordPress should be migrated vs. rewritten" but no user story covers migration |
| **Impact** | Migration work not estimated or planned |
| **Recommendation** | Add migration task or clarify if out of scope for development (client responsibility) |

**Risk Level:** Low - Addressed as open question but needs resolution

---

## 4. Success Metrics Alignment

### 4.1 Aligned Metrics

| BRD Metric (Section 13.1) | PRD Metric | Status |
|---------------------------|------------|--------|
| Launch within 4 weeks | 60 days from advance | Aligned (PRD allows more time) |
| Page Load Speed < 2 seconds | LCP < 2.5s, page load < 2 seconds | Aligned |
| SEO Score 90+ | Lighthouse 90+ across all categories | Aligned |
| Uptime 99.5%+ | Not specified | Gap |
| Contact Form Submissions 10+ first month | "Contact form submissions successfully delivered" | Partial |
| Mobile Usability 100% | Mobile-friendly test passes | Aligned |

### 4.2 PRD Additional Metrics (Appropriate)

| PRD Metric | Assessment |
|------------|------------|
| All 18 pages fully translated (RO + EN) | Aligned with bilingual scope (if confirmed) |
| Zero critical bugs at launch | Good practice |
| Admin can update blog without developer | Aligned with BRD usability goal |
| Google Analytics tracking verified | Aligned with BRD analytics requirement |

### 4.3 Missing BRD Metrics

| BRD Metric | Status |
|------------|--------|
| Organic Traffic Growth 20% in 3 months | Not in PRD success metrics |
| Content easily updatable (< 5min per page) | Not specified |
| Zero critical bugs in first month | PRD says "at launch" not ongoing |

---

## 5. Technical Architecture Alignment

### 5.1 Fully Aligned Components

| BRD Recommendation | PRD Specification | Notes |
|--------------------|-------------------|-------|
| Next.js 14+ App Router | Next.js 14+ (App Router) | Exact match |
| TypeScript | TypeScript | Exact match |
| shadcn/ui | shadcn/ui | Exact match |
| Tailwind CSS | Tailwind CSS | Exact match |
| React Hook Form | React Hook Form | Exact match |
| Zod | Zod | Exact match |
| Supabase | Supabase (prepared, not active) | Appropriate for V1 |
| Vercel | Vercel | Exact match |
| Resend | Resend API | Exact match |

### 5.2 PRD Additions (Appropriate)

| PRD Technology | Assessment |
|----------------|------------|
| MDX + Contentlayer for CMS | Appropriate for blog/CMS, lightweight alternative to full DB CMS |
| next-intl for i18n | Good choice if bilingual confirmed |
| Google Maps Embed | Appropriate for contact page |

### 5.3 BRD Technologies Not in PRD (Appropriate Exclusion)

| BRD Technology | Reason for Exclusion |
|----------------|---------------------|
| TanStack Query | Not needed for V1 static/SSG pages |
| Framer Motion | Now actively used for scroll-triggered animations (fadeUp, fadeIn, scaleUp, etc.) via custom ScrollAnimate wrapper components |
| Prisma ORM | Not needed if using MDX for content |
| date-fns | Not needed without booking system |

---

## 6. Recommendations Summary

### 6.1 High Priority

1. **Add Training Deliverable (US-019)**
   - Create user story for admin training and documentation
   - BRD explicitly lists this as Variant 1 deliverable
   - Include video tutorials or written guide for blog CMS

2. **Clarify Bilingual Scope**
   - Confirm with client: Full RO/EN now or architecture-only?
   - If full bilingual, update timeline estimate
   - If architecture-only, simplify US-016 scope

### 6.2 Medium Priority

3. **Add Support Agreement Reference**
   - Reference 1-year technical support commitment
   - Define what support includes (bug fixes, content help, etc.)
   - Add to PRD appendix or separate document reference

4. **Simplify Google Reviews (US-009)**
   - Consider static testimonials instead of API integration
   - Reduces complexity and ongoing maintenance
   - Manual update is acceptable for V1 scope

### 6.3 Low Priority

5. **Add Uptime Monitoring to Success Metrics**
   - BRD specifies 99.5% uptime target
   - Add to Success Metrics section

6. **Resolve Content Migration Open Question**
   - Determine if migration is in-scope or client responsibility
   - If in-scope, add migration task with 301 redirects

---

## 7. Alignment Score Summary

| Category | Score | Notes |
|----------|-------|-------|
| Core Features | 100% | All V1 features properly covered |
| Technical Stack | 100% | Exact alignment with BRD recommendations |
| Non-Goals | 100% | V2 features correctly excluded |
| Success Metrics | 85% | Minor gaps in uptime and traffic metrics |
| Deliverables | 75% | Missing training and support documentation |
| Scope Boundaries | 90% | Minor over-scoping concerns |

**Overall Alignment: 92%**

The PRD is well-constructed and demonstrates strong alignment with Variant 1 business requirements. The primary gaps are documentation/training deliverables and clarification of bilingual scope. These can be addressed with minor PRD updates.

---

## 8. Action Items

| # | Action | Owner | Priority |
|---|--------|-------|----------|
| 1 | Add US-019: Admin Training and Documentation | PRD Author | High |
| 2 | Confirm bilingual scope with client | Business Analyst | High |
| 3 | Add 1-year support reference to PRD | PRD Author | Medium |
| 4 | Evaluate Google Reviews API vs static testimonials | Tech Lead | Medium |
| 5 | Add uptime target to Success Metrics | PRD Author | Low |
| 6 | Resolve content migration open question | Business Analyst | Low |

---

*Report prepared by Business Analyst*
*Review date: 2026-01-20*

---

## 9. Update Log

### Update: March 4, 2026

**Team composition updated:**
- Removed Gabriela Tarta (collaborator) — replaced by Cristina Blan
- Removed Cristina Tentes (client relations) — replaced by Diana Vereș
- Current team: Founders (Av. Camelia Stan, Av. Vlad Baculescu), Collaborators (Diana Chincea, Cristina Blan, Alexandra Rusu), Client Relations (Diana Vereș)

**Tech stack updated:**
- Framer Motion is now actively used in production for scroll-triggered animations via custom ScrollAnimate wrapper components (no longer classified as "nice-to-have")

**Image format updated:**
- All site images are now served in WebP format

**Landing page sections updated to current implementation:**
1. **Hero** — Founders photos (Av. Camelia Stan, Av. Vlad Baculescu) with headline and CTA
2. **Services** — 8 practice areas displayed as photo cards
3. **Why Us** — Reception photo + statistics counters + value propositions
4. **Methodology** — 4 steps displayed as photo cards
5. **Team** — Founders + collaborators section
6. **Testimonials** — Google reviews integration
7. **CTA** — Final call-to-action section

**PRD alignment notes:**
- Section 1.1 (Hero) updated to reflect founders photos instead of generic team photo
- Section 1.1 (Lawyer profiles) updated to reflect current 7-member team roster
- Section 5.3 (Framer Motion) reclassified from excluded to actively used

### Update: March 4, 2026 (Continued)

**Contact page redesigned:**
- Removed floating badge/pill pattern ("CONTACTEAZA-NE", "LOCATIE") - replaced with proper section header pattern (gold text label, heading, gold bar, description)
- Form enhanced: split first/last name, preferred contact method (Phone/Email/WhatsApp radio pills), urgency level (Normal 48h/Urgent 24h), GDPR consent checkbox with privacy policy link, phone now required
- Map section integrated inline within contact section (no more separate section with visual break)
- Google Maps embed updated to use correct business CID (search query format for reliable pin display)
- Contact API route updated to handle new form fields, [URGENT] tag in email subject

**Blog system fixed:**
- MDX content rendering: replaced `dangerouslySetInnerHTML` with proper `useMDXComponent` pattern (velite's `s.mdx()` outputs compiled JS, not HTML)
- Created `lib/mdx.ts` utility for rendering velite MDX content
- Author photos: blog articles and cards now display team member photos from `authorImage` frontmatter field
- Removed decorative gold circle animation from blog article hero (not relevant to content)
- Blog images converted from PNG to WebP (quality 82), all MDX frontmatter references updated
- Author image references updated from .jpg to .webp to match actual team photo files

**Technical notes:**
- Velite's `s.mdx()` compiles MDX to a JavaScript function string, NOT HTML - requires `new Function()` + `react/jsx-runtime` to render
- Blog admin guide updated to reflect WebP image format requirement and `authorImage` frontmatter field
