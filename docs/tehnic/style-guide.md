# Stan-Baculescu Law Firm — Design System & Style Guide

> **Design Philosophy:** Professional elegance meets modern accessibility. Navy sophistication, gold accents for prestige, clean white spaces for clarity. Every page must feel like walking into a premium law office — not a generic AI-generated website.

> **Last updated:** March 2026 — Based on the finalized landing page design.

---

## 1. Color Palette

| Token | Tailwind Class | Hex | Usage |
|---|---|---|---|
| Navy | `bg-navy` / `text-navy` | `#003a70` | Primary brand, dark backgrounds, headings on light bg |
| Navy Dark | `bg-navy-dark` | `#002a52` | Deeper navy panels, gradient start points |
| Navy Light | `bg-navy-light` | `#004a8f` | Gradient end points, subtle card backgrounds |
| Gold | `bg-gold` / `text-gold` | `#d09c11` | Primary accent — all labels, dividers, CTAs, hover states |
| Gold Light | `bg-gold-light` | `#e6b520` | Gold hover/active states |
| Off-White | `bg-[#f8f9fa]` | `#f8f9fa` | Alternating section backgrounds |
| White | `bg-white` | `#ffffff` | Cards, alternating sections |
| Text Secondary | `text-text-secondary` | `#4b5563` | Body copy on light backgrounds |

### Opacity Standards

On **navy backgrounds:**
- Primary text: `text-white`
- Secondary text: `text-white/70` or `text-white/60`
- Tertiary/muted: `text-white/50` or `text-white/45`
- Borders: `border-white/[0.06]` to `border-white/20`
- Card fills: `bg-white/[0.03]` to `bg-white/[0.06]`

On **light backgrounds:**
- Primary text: `text-navy`
- Secondary text: `text-text-secondary` (#4b5563)
- Borders: `ring-black/[0.04]` or `border-gray-200`

---

## 2. Typography

### Font Families
- **Headings:** Playfair Display (serif) — via `font-heading` class
- **Body:** Inter (sans-serif) — default
- **Global heading style:** `letter-spacing: -0.01em` applied to `.font-heading`

### Heading Scale (Responsive)

| Level | Mobile | SM (640px) | LG (1024px) |
|---|---|---|---|
| h1 line 1 | `text-2xl` | `text-3xl` | `text-[2.5rem]` |
| h1 line 2 | `text-5xl` | `text-6xl` | `text-7xl` |
| h2 (section) | `text-4xl` | `text-5xl` | `text-6xl` |
| h2 (panel) | `text-3xl` | `text-4xl` | `text-5xl` |
| h3 (card title) | `text-lg` | `text-xl` | — |
| h3 (large card) | `text-2xl` | `text-3xl` | — |

All headings use: `font-heading font-bold leading-[1.1]`

### Body Text
- Standard: `text-lg leading-relaxed` (on both light and dark backgrounds)
- Card descriptions: `text-sm leading-relaxed`
- Small labels: `text-sm` or `text-xs`

---

## 3. Section Layout Standards

### Container
All sections (except Hero): `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`

Hero uses wider: `mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8`

### Section Padding
Standard: `py-20 sm:py-32` (80px mobile / 128px desktop)

### Background Alternation Pattern
The landing page alternates backgrounds to create visual rhythm:

| # | Section | Background |
|---|---|---|
| 1 | Hero | `bg-navy` |
| 2 | Services | `bg-[#f8f9fa]` |
| 3 | Why Us | `bg-white` |
| 4 | Methodology | `bg-navy` |
| 5 | Team | `bg-white` |
| 6 | Testimonials | `bg-[#f8f9fa]` |
| 7 | CTA | transparent (white) with `bg-navy rounded-3xl` card |
| 8 | Footer | `bg-navy` |

**Rule:** Never place two navy sections or two identical backgrounds adjacent to each other.

---

## 4. Section Header Pattern

Every section follows a consistent header structure with slight variations.

### Centered Header (Services, Testimonials)
```
mb-14 text-center sm:mb-16
```
- Label: `mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold`
- Heading: `font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-navy`
- Gold bar: `mx-auto mt-4 h-[2px] w-24 bg-gold` (centered)
- Description: `mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary`

### Left-Aligned Header (Methodology, Why Us)
```
mb-14 sm:mb-16
```
Same typography but NO `text-center` or `mx-auto` on elements.
Gold bar: `mt-4 h-[2px] w-20 bg-gold` (left-aligned)

### Split Header with Button (Team)
```
mb-14 flex flex-col gap-6 sm:mb-16 lg:flex-row lg:items-end lg:justify-between
```
Left side: `max-w-xl` with label + h2 + gold bar + description
Right side: outline button, bottom-aligned

### On Navy Backgrounds
Same pattern but: `text-white` headings, `text-white/60` description

### Gold Divider Bar Widths
| Section | Width | Alignment |
|---|---|---|
| Services | `w-24` | Centered |
| Why Us | `w-16` | Left |
| Methodology | `w-20` | Left |
| Team | `w-12` | Left |

All: `h-[2px] bg-gold mt-4`

### ScrollAnimate Delay Cascade
- Label: delay `0` (default)
- h2 + gold bar: delay `0.1`
- Description: delay `0.2`
- Button (if present): delay `0.3`

---

## 5. Card Patterns

### Standard Card (Light Background — Services, Testimonials)
```
rounded-2xl bg-white shadow-sm ring-1 ring-black/[0.04]
transition-all duration-500
hover:-translate-y-2 hover:shadow-xl hover:shadow-navy/10
```
- Lift on hover: `-translate-y-2` (8px) for content cards, `-translate-y-1` (4px) for testimonials
- Always `overflow-hidden` when card has image header
- Gold bottom accent on hover: `absolute bottom-0 left-0 h-[2px] w-0 bg-gold transition-all duration-500 group-hover:w-full`

### Dark Card (Navy Background — Methodology, Why Us values)
```
rounded-2xl border border-white/[0.06] bg-white/[0.03]
transition-all duration-500
hover:-translate-y-2 hover:border-gold/20 hover:bg-white/[0.06]
```

### Card Image Header
- Height: `h-48 sm:h-56` (services) or `h-44 sm:h-48` (methodology)
- Dark overlay: `bg-gradient-to-t from-navy/80 via-navy/50 to-navy/30`
- Hover: overlay lightens ~10% per stop
- Number watermark: `font-heading text-[120px] sm:text-[150px] font-bold text-white/[0.06]` → hover `text-white/[0.10]`
- Icon container: `h-20 w-20 sm:h-24 sm:w-24 rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur-sm`
- Icon hover: `scale-110 bg-white/15 ring-gold/40` (services) or `bg-gold/20 ring-gold/30` (methodology)

### Card Content Area
- Padding: `p-5 sm:p-6`
- Title: `mb-2 font-heading text-xl font-semibold text-navy` → hover `text-gold duration-300`
- Description: `text-sm leading-relaxed text-text-secondary line-clamp-3`
- CTA link: `mt-auto flex items-center gap-2 text-sm font-semibold text-gold` → hover `gap-3`

### Team Photo Cards
- Founder (large): `aspect-[3/4] sm:aspect-[4/5]`, overlay `from-navy via-navy/30 to-transparent`
- Collaborator (small): `aspect-[3/4]`, 3-column grid always
- Name hover: `text-white → text-gold duration-300`
- Reveal link on hover: `opacity-0 → group-hover:opacity-100` (founders only)

---

## 6. Button Patterns

### Primary CTA (Gold)
```
h-14 rounded-full bg-gold px-8 text-base font-semibold text-navy
shadow-[var(--shadow-gold)]
transition-all duration-300
hover:bg-gold-light hover:shadow-[var(--shadow-gold-lg)]
```
Wrapped in `<GlowWrapper className="rounded-full">` for cursor-tracking glow.

### Outline Button (Navy on Light)
```
group h-12 rounded-full border-2 border-navy bg-transparent px-8
text-base font-semibold text-navy
transition-all duration-300 hover:bg-navy hover:text-white
```
With arrow: `ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1`

### Outline Button (Gold on Dark)
```
group h-11 rounded-full border-2 border-gold bg-transparent px-6
text-sm font-semibold text-gold
transition-all duration-300 hover:bg-gold hover:text-navy
```

### Phone Button (Pill with Icon Section)
```
group relative flex h-14 items-center overflow-hidden rounded-full
bg-white/5 ring-1 ring-white/20
transition-all duration-300
hover:bg-white/15 hover:ring-gold/40 hover:shadow-lg hover:shadow-gold/20
hover:-translate-y-0.5
active:scale-[0.98] active:translate-y-0
```
- Icon section: `w-12 sm:w-14 bg-gold/10 group-hover:bg-gold/20`
- Phone icon: `h-5 w-5 text-gold group-hover:scale-110 group-hover:rotate-12`

---

## 7. Animation System

### ScrollAnimate (Scroll-triggered)
All use `whileInView` with `viewport: { once: true }` and easing `[0.25, 0.1, 0.25, 1]`.

| Variant | Initial | Final |
|---|---|---|
| `fadeUp` (default) | `opacity: 0, y: 30` | `opacity: 1, y: 0` |
| `fadeIn` | `opacity: 0` | `opacity: 1` |
| `fadeLeft` | `opacity: 0, x: -40` | `opacity: 1, x: 0` |
| `fadeRight` | `opacity: 0, x: 40` | `opacity: 1, x: 0` |
| `scaleUp` | `opacity: 0, scale: 0.92` | `opacity: 1, scale: 1` |
| `slideUp` | `opacity: 0, y: 60` | `opacity: 1, y: 0` |

Default duration: `0.6s`

### StaggerContainer
Used for card grids. Configurable `staggerDelay` prop (typically `0.08`–`0.15`).

### CSS Load Animations (Hero only)
Sequential delays from 100ms to 1100ms for staged entrance.

### Hover Transitions
- Standard: `transition-all duration-300`
- Cards: `transition-all duration-500`
- Images: `transition-transform duration-700` (slower for scale effects)
- Borders/Rings: `transition-colors duration-300`

### Micro-interactions
- Card lift: `-translate-y-2` (content) or `-translate-y-1` (testimonials)
- Arrow nudge: `group-hover:translate-x-1`
- Icon scale: `group-hover:scale-110`
- Gold line reveal: `w-0 → group-hover:w-full` (duration-500)
- Badge float: `gentleFloat` keyframe (translateY -6px, 5-6s cycle)

---

## 8. Shadow Tokens

| Token | Value | Usage |
|---|---|---|
| `--shadow-gold` | `0 4px 6px rgba(208,156,17,0.2)` | Gold CTA buttons default |
| `--shadow-gold-lg` | `0 8px 16px rgba(208,156,17,0.3)` | Gold CTA hover state |
| `--shadow-lg` | `0 8px 16px rgba(0,58,112,0.1)` | General elevation |
| `--shadow-xl` | `0 12px 24px rgba(0,58,112,0.15)` | High elevation |
| `--shadow-2xl` | `0 24px 48px rgba(0,58,112,0.2)` | Hero-level elevation |

Card shadows: `shadow-sm` default → `shadow-xl shadow-navy/10` on hover

---

## 9. Interactive Components

### GlowWrapper
Cursor-tracking white glow applied to primary CTAs:
- `h-32 w-32 rounded-full bg-white/20 blur-xl`
- Tracks mouse position, centered at cursor
- Fade `opacity: 0 → 1` on hover, `transition-opacity duration-300`
- Container: `relative overflow-hidden` with `rounded-full`

### Mobile Hamburger
Three animated bars (`h-0.5 rounded-full w-7`):
- Open: top → `rotate-45`, middle → `opacity-0 translate-x-3`, bottom → `-rotate-45`
- Color: open → `bg-gold`, transparent header → `bg-white`, default → `bg-navy`

### Mobile Sheet (Drawer)
- Width: `w-[85vw] max-w-sm`
- Background: `bg-gradient-to-br from-navy-dark via-navy to-navy-light`
- Decorative gold blur orbs in corners
- Nav items: `font-heading text-base` with `rounded-xl px-4 py-3.5`
- Active: `bg-gold/20 text-gold` + gold left bar indicator (`w-1 rounded-r-full bg-gold`)
- Hover: `hover:bg-white/5 hover:text-gold hover:translate-x-1`

### Carousel (Testimonials Mobile)
- Swipe/auto-play (5s interval)
- Dots: active → `h-2 w-6 rounded-full bg-gold`, inactive → `h-2 w-2 bg-navy/15`
- Nav buttons: `rounded-full border border-gray-200 bg-white p-2.5 hover:border-gold hover:bg-gold`

---

## 10. Image & Photo Standards

### Team Photos
- Format: WebP (quality 82)
- Object fit: `object-cover object-top`
- Hover: `transition-transform duration-700 group-hover:scale-105`
- Overlay: `bg-gradient-to-t from-navy via-navy/[30-70%] to-transparent`

### Service/Methodology Images
- Format: WebP
- Object fit: `object-cover`
- Hover: `transition-transform duration-700 group-hover:scale-110`
- Dark overlay with hover-lightening effect

### Decorative Elements
- Radial glow: `radial-gradient(circle, rgba(208,156,17, 0.15-0.18) ...)` — gold toned
- Grid pattern: `60x60px` white lines at `opacity-[0.03]` on navy backgrounds
- Gold shimmer: `animate-shimmer 3s ease-in-out infinite` on CTA top bar

---

## 11. Spacing Reference

### Section Header Spacing
- Label → h2: `mb-3` (12px)
- h2 → gold bar: `mt-4` (16px)
- Gold bar → description: `mt-5` or `mt-6` (20-24px)
- Header block → content: `mb-14 sm:mb-16` (56-64px)

### Card Content Spacing
- Padding: `p-5 sm:p-6`
- Title → description: `mb-2` (8px)
- Description → CTA: `mb-4` (16px)

### Between Sections
Standard padding handles this: `py-20 sm:py-32`

---

## 12. Header & Footer

### Header
- Fixed: `fixed top-0 z-50`
- Height: `h-20` (80px)
- Homepage transparent → white on scroll (`backdrop-blur-sm shadow-[0_1px_3px_rgba(0,0,0,0.05)]`)
- Logo: `h-16 w-auto`, inverted on transparent (`brightness-0 invert`)
- Nav: `text-sm font-medium`, active = gold underline pseudo-element
- Services dropdown: CSS `group-hover` trigger, `bg-navy rounded-lg shadow-xl min-w-[280px]`
- Language switcher: pill with `RO` / `EN` text (no emoji flags)

### Footer
- Background: `bg-navy`
- 4-column grid: Brand | Navigation | Services | Contact
- Column headings: `font-heading text-sm font-semibold uppercase tracking-wider text-gold`
- Links: `text-sm text-white/70 hover:text-gold`
- Social icons: `h-10 w-10 rounded-full bg-white/10 hover:bg-gold hover:text-navy`
- Bottom bar: `border-t border-white/10`, copyright `text-white/50`

---

## 13. Rules for New Pages

### MUST follow:
1. Same background alternation logic (navy / off-white / white — never two same adjacent)
2. Same section header pattern (label → h2 → gold bar → description)
3. Same ScrollAnimate delay cascade (0, 0.1, 0.2, 0.3)
4. Same card patterns (rounded-2xl, shadow-sm, hover lift, gold bottom line)
5. Same button patterns (gold CTA with GlowWrapper, navy outline)
6. Same typography scale (Playfair Display headings, Inter body)
7. Same container (`max-w-7xl px-4 sm:px-6 lg:px-8`)
8. Same section padding (`py-20 sm:py-32`)

### MUST NOT do:
1. Use generic blue/purple gradients
2. Use default Tailwind shadows without navy/gold tint
3. Use Inter or system fonts for headings
4. Use emoji in UI elements
5. Create flat, textureless sections — use overlays, gradients, subtle patterns
6. Use identical card heights without stagger/offset effects
7. Use basic hover states (opacity-only) — always combine transform + color + shadow
8. Hardcode strings — always use `useTranslations`
9. Skip scroll animations — every section must have entrance animation
10. Use `items-center` on flex containers where content may overflow viewport on mobile

### Design Differentiators (What Makes This NOT Generic):
- **Staggered grid offsets** (`sm:mt-8` on alternating cards)
- **Photo overlays** with gradient-to-navy and name/role at bottom
- **Gold bottom line reveal** on card hover (w-0 → w-full)
- **Number watermarks** behind service cards (120-150px, 6% opacity)
- **Split panels** (Why Us: photo flush against content panel)
- **Cursor-tracking glow** on primary CTAs
- **Floating stat badges** with gentle animation
- **Decorative gold separator lines** between elements
- **Multiple icon container styles** (glassmorphism backdrop-blur on dark, solid fill on light)

---

## 14. Contact Page Patterns

### Section Layout
- Single unified section on `bg-[#f8f9fa]` background
- Section header: centered, standard pattern (gold label → heading → gold bar → description)
- No floating badge pills - use plain gold text labels only
- Two-column layout: `grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-10`
- Map integrated inline below the form+info grid (not a separate section)

### Contact Form
- White card: `rounded-2xl bg-white p-8 shadow-lg sm:p-10`
- Fields in 2-column grid where appropriate: `grid grid-cols-1 sm:grid-cols-2 gap-5`
- Input styling: `h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:border-gold focus:bg-white`
- Radio pill buttons: `rounded-full border border-gray-200 bg-gray-50/50 px-4 py-2.5 peer-checked:border-gold peer-checked:bg-gold/10`
- GDPR checkbox: custom styled with gold checked state
- Submit: GlowWrapper gold rounded-full button

### Contact Info Cards
- Icon containers: `h-11 w-11 rounded-xl bg-gold/10` → hover `bg-gold`
- Social media buttons: `h-12 w-12 rounded-xl border-navy/10 bg-navy/[0.03]` → hover `bg-gold text-white`

### Map Section
- Mini section header within main section: gold label + `font-heading text-2xl sm:text-3xl` heading + gold bar + subtitle
- Map container: `rounded-2xl shadow-lg ring-1 ring-black/[0.04]`
- Google Maps embed: use search query format (`?q=...&output=embed`) for reliable pin display

---

## 15. Blog Page Patterns

### Blog Grid
- Section header with gold category filter pills
- Cards in responsive grid with StaggerContainer/StaggerItem

### Blog Card
- `rounded-2xl border border-gray-100 bg-white shadow-sm`
- Featured image: `aspect-[16/9]` with navy gradient overlay
- Category badge: gold pill in top-left corner
- Author: gold dot + name (no icon)
- Gold bottom line reveal on hover: `h-[3px] w-0 → group-hover:w-full`

### Blog Article (Single Post)
- Navy hero with: back link, gold category badge, title, description, author photo + meta row
- No decorative circles/rings — keep hero clean
- Featured image: `aspect-[21/9] -mt-16 rounded-2xl shadow-2xl` (overlaps into hero)
- Content: prose styling with `prose-headings:font-heading prose-headings:text-navy`
- Gold ornamental divider between sections
- Author photos from team (`authorImage` MDX frontmatter field)

### Blog Article Content Styling
Custom `.blog-content` CSS class replaces Tailwind prose for MDX rendering, giving full control over article typography and decorative elements.

**Headings:**
- **H2:** Gold left border (`4px solid gold`), Playfair Display (`font-heading`), `1.625rem` mobile / `1.875rem` desktop, `text-navy`
- **H3:** Gold underline accent via `::after` pseudo-element (`2.5rem` width, `2px` height), proper hierarchy below H2

**Lists:**
- **UL:** Custom gold diamond bullet markers — 7px rotated squares (`rotate(45deg)`) positioned via `::before`. Nested lists get outlined diamonds (border-only, no fill)
- **OL:** Gold numbered markers in Playfair Display inside rounded badge containers (`1.75rem` diameter circle, `bg-gold/10` fill, gold text)

**Blockquote:**
- Gold left border (`4px solid gold`) + light gold gradient background (`gold/3` to `gold/8`)
- Text in Playfair Display, slightly larger (`1.0625rem` / `1.125rem`)

**Tables:**
- Navy header row (`bg-navy`, white text, Playfair Display)
- Striped even rows (`#f8f9fa`)
- Gold hover on rows (`bg-gold/5`)
- Rounded corners on container, subtle ring border

**HR:**
- Gold gradient line with center diamond ornament (8px rotated square, gold fill)
- Uses `::before` pseudo-element on a wrapper `div`

**Code:**
- Inline: gray background (`#f3f4f6`), slightly smaller text, rounded
- Blocks: dark background (`#1f2937`), rounded-xl, horizontal scroll

**Special treatments:**
- First paragraph: slightly larger (`1.125rem` / `1.1875rem`) for editorial feel
- Images: `rounded-xl` with subtle shadow (`shadow-md`)

### MDX Content Rendering
- Velite `s.mdx()` outputs compiled JS function strings, not HTML
- Use `useMDXComponent` from `lib/mdx.ts` (uses `new Function()` + `react/jsx-runtime`)
- Never use `dangerouslySetInnerHTML` for velite MDX content

### Blog Images
- Format: WebP (quality 82, converted via `cwebp -q 82`)
- Dimensions: 1536x1024 (16:9 ratio approximation)
- Stored in: `public/images/blog/`

---

## 16. Hero Enhancements (All Pages)

### Landing Page Hero
- CSS `@property` animated gradient shift (40s cycle)
- SVG noise/grain texture at 3% opacity
- Two `motion.path` gold lines with draw animation
- Mouse parallax on founder photos (desktop only)

### All Page Heroes (About, Team, Services, Blog, Contact)
- Noise grain texture: SVG `feTurbulence` at 3% opacity, unique filter IDs per page
- Gold line art: two `motion.path` curves with staggered draw animation (1.2s/1.5s delay)
- Scroll parallax: `useScroll`/`useTransform` content moves -50px on scroll
- Gold shimmer line at top: `animate-shimmer 3s ease-in-out infinite`
- Gold radial glow on right side

### Individual Pages (Member Profile, Service Detail)
- Same noise + gold lines pattern
- Server components: use CSS `stroke-dasharray`/`stroke-dashoffset` animation (no framer-motion)
- Client components: use `motion.path` with `pathLength`

---

## 17. SEO & Structured Data Patterns

### Schema Types Used
- **Organization** + **LegalService** (global, all pages via layout.tsx)
- **WebSite** (homepage only)
- **Service** (individual service detail pages)
- **Article** (blog posts, with image + dateModified)
- **Person** (team member profiles)
- **BreadcrumbList** (service detail, blog article, team member pages)
- **ItemList** (services listing page)
- **ContactPage** (contact page)

### Schema Components
- `components/seo/organization-schema.tsx` — Global Organization + LegalService
- `components/seo/breadcrumb-schema.tsx` — Reusable BreadcrumbList
- `components/seo/index.ts` — Barrel exports

### Hreflang Pattern
Every page must include in `generateMetadata`:
```typescript
alternates: {
  canonical: `${BASE_URL}/${locale}/page-path`,
  languages: {
    'ro-RO': `${BASE_URL}/ro/page-path`,
    'en-US': `${BASE_URL}/en/page-path`,
    'x-default': `${BASE_URL}/ro/page-path`,
  },
},
```

### Blog Hreflang
Blog posts use different slugs per locale. Cross-locale mapping is maintained in:
- `app/[locale]/blog/[slug]/page.tsx` — `blogSlugPairs` constant
- `app/sitemap.ts` — `blogPostPairs` array

Both must be updated when adding new blog posts.

### robots.txt
Search AI crawlers (GPTBot, PerplexityBot) ALLOWED for AI search visibility. Training crawlers (CCBot, anthropic-ai, ClaudeBot, Google-Extended, Bytespider) BLOCKED. Normal search engine crawlers are allowed.

### llms.txt
`llms.txt` file at `/public/llms.txt` provides AI crawlers with structured content guidance about the firm, services, and site structure.

### proxy.ts (Next.js 16)
`middleware.ts` renamed to `proxy.ts` per Next.js 16 convention. Handles locale routing via `next-intl`.

### Sitemap
- All pages must be in `app/sitemap.ts`
- Use static lastmod dates (update when content actually changes)
- Include x-default in all alternates
- Blog posts need cross-locale hreflang alternates
