# PRD: Stan-Baculescu Law Firm Website

## Introduction

Professional presentation website for Societate Civila de Avocati Stan-Baculescu, a Romanian law firm based in Satu Mare. The website will replace their existing WordPress site with a modern, performant Next.js application featuring bilingual content (Romanian/English), 8 practice area pages, lawyer profiles, a blog with CMS, and GDPR-compliant features.

**Client:** Societate Civila de Avocati Stan-Baculescu
**Contract:** WEB0001/2026
**Budget:** €3,500 + TVA
**Deadline:** 60 days from advance payment (target: 15 March 2026)

---

## Goals

- Replace outdated WordPress website with modern, high-performance Next.js application
- Establish professional online presence reflecting the firm's expertise in 8 practice areas
- Enable bilingual content (Romanian primary, English secondary) for international clients
- Implement SEO optimization for improved visibility in local legal service searches
- Provide scalable architecture ready for future features (authentication, booking, client portal)
- Ensure GDPR compliance with cookie consent and privacy policy
- Integrate with Google services (Analytics, Maps, Reviews) for analytics and credibility
- Create easy-to-manage blog/CMS for ongoing content updates

---

## User Stories

### US-001: Homepage Hero Section
**Description:** As a visitor, I want to see a professional hero section with the firm's team photo so that I immediately understand this is a reputable law firm.

**Acceptance Criteria:**
- [x] Hero section displays team photo prominently
- [x] Clear headline communicating the firm's value proposition
- [x] Call-to-action button leading to contact page
- [x] Responsive layout adapting to mobile/tablet/desktop
- [x] Fast loading (image optimized with Next.js Image component)
- [x] Typecheck passes
- [x] Verify in browser using dev-browser skill

---

### US-002: Navigation and Language Switcher
**Description:** As a visitor, I want clear navigation and the ability to switch between Romanian and English so that I can browse in my preferred language.

**Acceptance Criteria:**
- [x] Header with logo and main navigation menu
- [x] Navigation links: Acasa, Despre Noi, Echipa, Servicii, Blog, Contact
- [x] Language switcher visible in header (RO/EN toggle)
- [x] Language persists across page navigation
- [x] Mobile hamburger menu for smaller screens
- [x] Sticky header on scroll
- [x] Typecheck passes
- [x] Verify in browser using dev-browser skill

---

### US-003: About Us Page
**Description:** As a potential client, I want to learn about the firm's history, values, and methodology so that I can assess if they're the right fit for my legal needs.

**Acceptance Criteria:**
- [x] Page displays firm history and background
- [x] Values section: Profesionalism, Adaptabilitate, Loialitate
- [x] Principles section: Motivatie, Seriozitate, Experienta
- [x] Working methodology description
- [x] Professional imagery/graphics
- [x] Full bilingual content (RO/EN)
- [x] SEO metadata (title, description, OG tags)
- [x] Typecheck passes
- [x] Verify in browser using dev-browser skill

---

### US-004: Team Page with Lawyer Profiles
**Description:** As a potential client, I want to see all lawyers with their individual profiles so that I can learn about their expertise and choose who to contact.

**Acceptance Criteria:**
- [x] Grid/list of all 6 team members with photos
- [x] Founders section: Camelia Stan, Vlad Baculescu
- [x] Collaborators section: Diana Antonia Chincea, Gabriela Tarța, Alexandra Rusu
- [x] Staff section: Cristina Tenteș (Client Relations)
- [x] Each profile shows: name, title, photo, brief bio
- [x] Click to individual profile page with full details
- [x] Individual profile pages with: biography, specializations, contact info
- [x] Bilingual content for all profiles
- [x] Typecheck passes
- [x] Verify in browser using dev-browser skill

---

### US-005: Services Overview Page
**Description:** As a visitor, I want to see all practice areas at a glance so that I can quickly find the legal service I need.

**Acceptance Criteria:**
- [x] Grid/cards displaying all 8 practice areas
- [x] Each service shows: icon/image, title, brief description
- [x] Click through to individual service page
- [x] Clear visual hierarchy and professional design
- [x] Bilingual content
- [x] SEO optimized
- [x] Typecheck passes
- [x] Verify in browser using dev-browser skill

---

### US-006: Individual Service Pages (8 pages)
**Description:** As a potential client interested in a specific legal area, I want detailed information about that practice area so that I can understand how the firm can help me.

**Acceptance Criteria:**
- [x] 8 individual service pages created:
  - `/servicii/malpraxis-medical` - Malpraxis Medical
  - `/servicii/drept-civil` - Drept Civil
  - `/servicii/drept-penal` - Drept Penal
  - `/servicii/drept-familiei` - Drept Familiei
  - `/servicii/dreptul-muncii` - Dreptul Muncii
  - `/servicii/drept-comercial` - Drept Comercial
  - `/servicii/accidente-rutiere` - Accidente Rutiere
  - `/servicii/drept-administrativ-fiscal` - Drept Administrativ si Fiscal
- [x] Each page includes: detailed description, common cases handled, approach
- [x] Call-to-action to contact the firm
- [x] Related services suggestions
- [x] Bilingual content (RO/EN)
- [x] SEO metadata per page (unique titles, descriptions)
- [x] Structured data (JSON-LD) for legal services
- [x] Typecheck passes
- [x] Verify in browser using dev-browser skill

---

### US-007: Blog/Articles Section
**Description:** As a visitor interested in legal topics, I want to read articles and legal updates so that I can learn about relevant legal matters.

**Acceptance Criteria:**
- [x] Blog listing page with article cards (title, excerpt, date, category)
- [x] Pagination or infinite scroll for article list
- [x] Category filtering
- [x] Individual article pages with full content
- [x] Author attribution
- [x] Related articles suggestions
- [x] Social sharing buttons
- [x] CMS integration (MDX + Velite) for easy content management
- [x] Bilingual article support
- [x] SEO metadata per article
- [x] Typecheck passes
- [x] Verify in browser using dev-browser skill

---

### US-008: Contact Page with Complex Form
**Description:** As a potential client, I want to easily contact the firm with details about my legal matter so that I can request a consultation.

**Acceptance Criteria:**
- [x] Contact form fields: name, email, phone, subject/service area, message
- [x] Form validation with clear error messages
- [x] Anti-spam protection (honeypot or reCAPTCHA)
- [ ] Email sent to office@stanbaculescu.ro on submission
- [x] Success confirmation message to user
- [x] Google Maps integration showing office location (Str. Aurel Popp 2, Satu Mare)
- [x] Contact details displayed: phone (+40 261-848-015), email, address
- [x] Working hours: Luni-Duminica 09:00-17:00
- [x] Social media links (Facebook, Instagram, TikTok)
- [x] Bilingual content
- [x] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-009: Google Reviews/Testimonials Integration
**Description:** As a visitor, I want to see client testimonials so that I can gauge the firm's reputation and service quality.

**Implementation Approach:**
- **Primary:** Google Places API integration (requires API key and Places ID)
- **Fallback:** Static testimonials from curated Google Reviews (manually updated)
- **Alternative:** Google Reviews iframe widget embed

**Acceptance Criteria:**
- [x] Section displaying Google Reviews testimonials on homepage and/or contact page
- [x] Shows: star rating (1-5), reviewer name, review excerpt (max 200 chars), date
- [x] Minimum 3-5 testimonials displayed
- [x] Link to Google My Business profile for more reviews
- [x] Carousel layout on mobile, grid (3 columns) on desktop
- [x] If API unavailable: graceful fallback to static testimonials
- [x] Loading state while fetching reviews
- [x] Error handling if API fails (show static fallback, no broken UI)
- [x] Reviews cached for 24 hours to reduce API calls
- [x] Typecheck passes
- [ ] Verify in browser using dev-browser skill

**Technical Notes:**
- Google Places API has usage limits (free tier: ~$200/month credit)
- Alternatively, use static JSON file with curated reviews (no API needed)
- Reviews should be fetched server-side to protect API key

---

### US-010: Footer Component
**Description:** As a visitor, I want a comprehensive footer with quick links and legal information so that I can easily navigate and find important policies.

**Acceptance Criteria:**
- [x] Contact information (address, phone, email)
- [x] Quick navigation links
- [x] Social media icons/links (Facebook, Instagram, TikTok)
- [x] Legal links: Privacy Policy, Cookie Policy, Terms of Service
- [x] Copyright notice
- [x] Bilingual content
- [x] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-011: GDPR Cookie Consent
**Description:** As a visitor, I need to consent to cookies before non-essential tracking so that my privacy preferences are respected.

**Acceptance Criteria:**
- [ ] Cookie consent banner on first visit
- [ ] Options: Accept All, Reject Non-Essential, Customize
- [ ] Preference saved and remembered
- [ ] Google Analytics only loads after consent
- [ ] Easy way to change preferences later
- [ ] Bilingual consent text
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-012: Privacy Policy Page
**Description:** As a visitor, I want to read the privacy policy so that I understand how my data is collected and used.

**Acceptance Criteria:**
- [ ] Comprehensive privacy policy page
- [ ] Sections: data collected, purpose, retention, rights, third parties
- [ ] Contact information for data protection inquiries
- [ ] Bilingual content (RO/EN)
- [ ] Last updated date visible
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-013: SEO Optimization
**Description:** As the firm owner, I want the website optimized for search engines so that potential clients can find us when searching for legal services in Satu Mare.

**Acceptance Criteria:**
- [ ] Semantic HTML5 structure
- [ ] Meta titles and descriptions for all pages
- [ ] Open Graph tags for social sharing
- [ ] Structured data (JSON-LD) for: Organization, LocalBusiness, LegalService
- [ ] XML sitemap generated
- [ ] robots.txt configured
- [ ] Canonical URLs set
- [ ] Alt text for all images
- [ ] Core Web Vitals targets: LCP < 2.5s, FID < 100ms, CLS < 0.1
- [ ] Mobile-friendly design (Google Mobile-Friendly Test pass)
- [ ] Typecheck passes

---

### US-014: Google Analytics Integration
**Description:** As the firm owner, I want to track website traffic and user behavior so that I can measure marketing effectiveness.

**Acceptance Criteria:**
- [ ] Google Analytics 4 integrated
- [ ] Only loads after cookie consent
- [ ] Page view tracking
- [ ] Contact form submission tracking as conversion event
- [ ] Google Search Console verification meta tag
- [ ] Typecheck passes

---

### US-015: Responsive Design Implementation
**Description:** As a visitor on any device, I want the website to display correctly so that I can browse comfortably on mobile, tablet, or desktop.

**Acceptance Criteria:**
- [ ] Mobile-first design approach
- [ ] Breakpoints: mobile (<768px), tablet (768-1024px), desktop (>1024px)
- [ ] Touch-friendly buttons and links on mobile
- [ ] Readable typography at all screen sizes
- [ ] Images scale appropriately
- [ ] No horizontal scroll on any device
- [ ] Tested on: iPhone, Android, iPad, Desktop browsers
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-016: Internationalization Setup (next-intl)
**Description:** As a developer, I need a robust i18n system so that all content can be translated and the site can support multiple languages.

**Acceptance Criteria:**
- [ ] next-intl configured for RO and EN locales
- [ ] Default locale: Romanian (ro)
- [ ] URL structure: `/ro/...` and `/en/...` or language prefix
- [ ] Translation files organized by page/component
- [ ] Date/time formatting localized
- [ ] Language switcher updates URL and content
- [ ] SEO: hreflang tags for language alternatives
- [ ] Typecheck passes

---

### US-017: Supabase Infrastructure Setup (Future-Ready)
**Description:** As a developer, I need the database infrastructure prepared so that future features (auth, booking) can be easily added.

**Acceptance Criteria:**
- [ ] Supabase project created and connected
- [ ] Environment variables configured (.env.local)
- [ ] Database schema designed for future expansion
- [ ] Contact form submissions stored in database (optional but recommended)
- [ ] Supabase client initialized but auth not active
- [ ] Documentation for future activation
- [ ] Typecheck passes

---

### US-018: Email Service Integration (Resend)
**Description:** As the firm owner, I want contact form submissions delivered reliably to my email so that I never miss a potential client inquiry.

**Acceptance Criteria:**
- [ ] Resend API integrated
- [ ] Contact form sends formatted email to office@stanbaculescu.ro
- [ ] Email includes: sender name, email, phone, subject, message, timestamp
- [ ] Error handling if email fails
- [ ] Optional: auto-reply confirmation to sender
- [ ] Typecheck passes

---

### US-019: Terms of Service Page
**Description:** As a visitor, I want to read the terms of service so that I understand the conditions for using the website and services.

**Acceptance Criteria:**
- [ ] Dedicated terms of service page at `/termeni` (RO) and `/en/terms` (EN)
- [ ] Sections: service description, user obligations, liability limitations, governing law
- [ ] Contact information for legal inquiries
- [ ] Bilingual content (RO/EN)
- [ ] Last updated date visible
- [ ] Linked from footer
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-020: Cookie Policy Page
**Description:** As a visitor, I want to read the cookie policy so that I understand what cookies are used and why.

**Acceptance Criteria:**
- [ ] Dedicated cookie policy page at `/politica-cookies` (RO) and `/en/cookie-policy` (EN)
- [ ] List of all cookies used: essential, analytics, optional
- [ ] Purpose and duration of each cookie
- [ ] Instructions for managing/deleting cookies
- [ ] Bilingual content (RO/EN)
- [ ] Last updated date visible
- [ ] Linked from footer and cookie consent banner
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-021: 404 Error Page
**Description:** As a visitor who lands on a non-existent page, I want a helpful error page so that I can navigate back to useful content.

**Acceptance Criteria:**
- [ ] Custom 404 page with professional design matching site
- [ ] Clear message that the page was not found
- [ ] Search bar or navigation suggestions
- [ ] Link to homepage
- [ ] Links to main sections (Services, Contact)
- [ ] Bilingual content (RO/EN)
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-022: Admin Training and Documentation
**Description:** As a client/admin, I want documentation and training so that I can manage blog content independently.

**Acceptance Criteria:**
- [ ] Written documentation for blog content management (PDF or Markdown)
- [ ] Step-by-step guide for: creating articles, editing content, adding images
- [ ] 30-minute online training session delivered (per contract requirement)
- [ ] Documentation in Romanian
- [ ] Troubleshooting section for common issues
- [ ] Contact information for technical support

---

## Functional Requirements

- **FR-1:** Display homepage with hero section, team photo, and CTA
- **FR-2:** Implement bilingual content system (RO/EN) using next-intl
- **FR-3:** Create 6 main pages: Homepage, About, Team, Services, Blog, Contact
- **FR-4:** Create 8 individual service pages with unique content
- **FR-5:** Create individual profile pages for 6 team members
- **FR-6:** Implement blog with CMS (MDX + Velite) for article management
- **FR-7:** Build contact form with validation, anti-spam, and email notification
- **FR-8:** Integrate Google Maps on contact page
- **FR-9:** Display Google Reviews testimonials
- **FR-10:** Implement GDPR-compliant cookie consent banner
- **FR-11:** Create Privacy Policy, Cookie Policy, and Terms of Service pages
- **FR-12:** Integrate Google Analytics 4 (with consent)
- **FR-13:** Generate XML sitemap and configure robots.txt
- **FR-14:** Implement responsive design for mobile, tablet, desktop
- **FR-15:** Add social media links (Facebook, Instagram, TikTok)
- **FR-16:** Configure Supabase connection for future scalability
- **FR-17:** Set up Resend for email delivery
- **FR-18:** Implement custom 404 error page with navigation
- **FR-19:** Create admin documentation and deliver 30-minute training session
- **FR-20:** Set up error monitoring with Sentry
- **FR-21:** Implement automated testing (unit + E2E)

---

## Non-Goals (Out of Scope)

- User authentication/login system (infrastructure ready, not active)
- Client portal
- Online booking/scheduling
- Payment processing
- AI-powered features
- Mobile native app
- Case management system
- Multi-firm/marketplace functionality
- SMS notifications
- Calendar integration
- Document upload functionality

---

## Design Considerations

> **Full Style Guide:** See `docs/tehnic/style-guide.md` for complete design specifications including all color variants, typography scales, spacing system, and component styles.

### Color Palette

| Color | HEX Code | CSS Variable | Usage |
|-------|----------|--------------|-------|
| **Navy Blue** | `#003a70` | `--primary-navy` | Headers, navigation, hero backgrounds, primary text |
| **Gold** | `#d09c11` | `--primary-gold` | CTAs, highlights, icons, accent borders |
| **White** | `#ffffff` | `--primary-white` | Backgrounds, text on dark backgrounds |

**Extended Colors:**
- Dark Navy: `#002a52` (gradients, depth)
- Light Navy: `#004a8f` (hover states)
- Off-White: `#f8f9fa` (alternate section backgrounds)
- Text Primary: `#1f2937` (body text on light backgrounds)
- Text Secondary: `#4b5563` (descriptions, secondary content)

### Typography

| Element | Font | Weight | Usage |
|---------|------|--------|-------|
| **Headlines (H1-H4)** | Playfair Display | 600-700 | Hero titles, section headings, card titles |
| **Body & UI** | Inter | 400-600 | Body text, navigation, buttons, forms |

**Font Loading:** Use `next/font` for optimized Google Fonts loading.

### Visual Style
- **Aesthetic:** Professional elegance meets modern accessibility (Lawfor-inspired)
- **Hero:** Dark navy background with gradient overlay, gold accent CTAs
- **Cards:** White backgrounds with subtle shadows, gold accent on hover
- **Sections:** Alternating white/off-white backgrounds for visual rhythm
- **Icons:** Lucide React icons, gold color for service icons

### UI Components (shadcn/ui)
- Navigation (desktop + mobile hamburger)
- Hero section
- Service cards
- Team member cards
- Testimonial carousel
- Contact form
- Cookie consent banner
- Footer
- Blog article cards

### Existing Design References
- Current WordPress site (stanbaculescu.ro) for content reference
- Modern law firm websites for design inspiration
- Example landing page (Lawfor style) in `docs/example lading pages/`

---

## Technical Considerations

### Stack
| Component | Technology |
|-----------|------------|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| i18n | next-intl |
| CMS | MDX + Velite (or next-mdx-remote) |
| Forms | React Hook Form + Zod |
| Email | Resend API |
| Maps | Google Maps Embed |
| Analytics | Google Analytics 4 |
| Database | Supabase (prepared, not active) |
| Hosting | Vercel |

### Performance Targets
- Lighthouse Score: 90+ (Performance, Accessibility, Best Practices, SEO)
- LCP: < 2.5 seconds
- FID: < 100ms
- CLS: < 0.1
- Page load: < 2 seconds

### SEO Requirements
- Meta tags for all pages
- Structured data (JSON-LD): Organization, LocalBusiness, LegalService, Article
- XML sitemap
- robots.txt
- hreflang tags for RO/EN
- Canonical URLs

### Security
- HTTPS (via Vercel) with SSL certificate included
- Form input sanitization (server-side Zod validation)
- Anti-spam protection (honeypot + rate limiting)
- Environment variables for API keys
- No sensitive data exposed client-side
- Rate limiting: 3 contact form submissions per hour per IP
- CSP headers configured for XSS protection
- Server-side validation for all form inputs (never trust client)

### Testing Strategy
| Type | Tool | Coverage Target |
|------|------|-----------------|
| Unit Tests | Vitest + React Testing Library | 70%+ for utils and components |
| E2E Tests | Playwright | Critical user flows (contact form, navigation, language switch) |
| Visual Regression | Playwright screenshots | Key pages across breakpoints |
| Accessibility | axe-core + manual testing | WCAG 2.1 AA compliance |

**Test Commands:**
- `pnpm test` - Run unit tests
- `pnpm test:e2e` - Run E2E tests
- `pnpm test:a11y` - Run accessibility tests

### Error Monitoring
| Service | Purpose |
|---------|---------|
| **Sentry** | Error tracking and performance monitoring |
| **Vercel Analytics** | Real user monitoring and Web Vitals |
| **UptimeRobot** | Uptime monitoring with alerts (free tier) |

**Sentry Configuration:**
- Track JavaScript errors in production
- Source maps uploaded for debugging
- Performance monitoring enabled
- Alert on error spike (>10 errors/hour)

---

## Post-Launch Support

**Per Contract WEB0001/2026:**
- **Support Period:** 20 months from launch date
- **Warranty Period:** 12 months correct functionality guarantee
- **Includes:** Bug fixes, security updates, technical assistance
- **Excludes:** New features, major design changes, migration to different hosting

**Training Deliverable:**
- 30-minute online training session (per Anexa 1)
- Written documentation for blog content management

---

## Success Metrics

- Website launches within 60 days of advance payment
- Lighthouse scores 90+ across all categories
- Mobile-friendly test passes
- Contact form submissions successfully delivered (100% delivery rate)
- All 22 pages fully translated (RO + EN)
- Zero critical bugs at launch
- Admin can update blog content without developer assistance
- Admin can publish a new blog post in under 10 minutes
- Google Analytics tracking verified
- Zero critical accessibility violations (WCAG 2.1 AA)
- Site indexed by Google within 7 days of launch
- Uptime 99.5%+ in first 3 months

---

## Open Questions

1. ~~**Logo and exact color codes:**~~ ✅ RESOLVED - Colors defined: Navy `#003a70`, Gold `#d09c11`, White `#ffffff`. See `docs/tehnic/style-guide.md`
2. **Team photos:** Client to provide professional photos (team + individual)
3. **Lawyer biographies:** Client to provide detailed bios for each team member
4. **Service descriptions:** Need client input/approval for detailed service page content
5. **Instagram and TikTok links:** Client to provide social media profile URLs
6. **Google Reviews API:** Need access to Google My Business for testimonials integration
7. **Content migration:** Confirm which content from WordPress should be migrated vs. rewritten
8. **Domain access:** Need DNS access for domain configuration

---

## Appendix: Content Required from Client

| Item | Format | Deadline |
|------|--------|----------|
| Logo | SVG/PNG (vectorial) | 7 days from contract |
| ~~Color guide~~ | ~~HEX codes~~ | ✅ DONE - See style-guide.md |
| Team photo | High-res JPG (min 1920px) | 14 days from contract |
| Individual photos (6) | High-res JPG, uniform style | 14 days from contract |
| Lawyer biographies (6) | Text document | 14 days from contract |
| Service descriptions input | Text document | 14 days from contract |
| Instagram link | URL | 7 days from contract |
| TikTok link | URL | 7 days from contract |
| Google My Business access | Admin access | 7 days from contract |

---

*Document generated based on Contract WEB0001/2026*
