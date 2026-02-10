# Stan Baculescu Law Firm - Style Guide

> **Design Philosophy:** Professional elegance meets modern accessibility. Inspired by the Lawfor aesthetic with dark navy sophistication, gold accents for prestige, and clean white spaces for clarity.

---

## Recent Design Changes (January 2026)

This section documents the most recent design updates implemented across the website. Always refer to these standards when creating new components.

### 1. Hero Section Updates

**IMPORTANT CHANGES:**
- ❌ **Removed:** Bottom gradient/blur effects on all hero sections
- ✅ **Updated:** Solid navy background (#003a70) without gradients or transitions
- ✅ **Standardized Padding:**
  - Mobile: `py-20` (5rem)
  - Tablet: `py-28` (7rem)
  - Desktop: `py-36` (9rem)

**Rationale:** Cleaner, more professional appearance with consistent spacing across all pages.

### 2. Call Button Design - New Pattern

**Integrated Phone Icon Button:**

The call button has been completely redesigned with an integrated icon pattern:

**Key Features:**
- **Phone icon** in a distinct rounded container with gold/10 background
- **Rounded-full** pill-shaped button
- **Stacked text layout** on desktop (label + number)
- **Inline text layout** on mobile (icon + number)

**Interactive States:**
- **Hover:** `bg-white/15`, `-translate-y-0.5`, `shadow-gold/20`
- **Active:** `scale-[0.98]`
- **Transition:** All properties animate over 300ms

**Implementation:**
```jsx
{/* Desktop */}
<a href="tel:+40261848015" className="rounded-full bg-gold px-6 py-3 hover:bg-white/15 hover:-translate-y-0.5 active:scale-[0.98]">
  <div className="h-12 w-12 rounded-full bg-gold/10">
    <Phone className="h-5 w-5 text-navy" />
  </div>
  <div className="flex flex-col">
    <span className="text-xs text-navy/70">Sună acum</span>
    <span className="text-base font-bold text-navy">(+40) 261-848-015</span>
  </div>
</a>
```

### 3. Header Navigation - Services Dropdown

**Desktop Navigation:**
- **Services dropdown** appears on hover
- **Navy background** dropdown with gold hover states
- **Icons** for each service (h-5 w-5)
- **2-column grid layout** for service items

**Mobile Navigation:**
- **Expandable accordion** for services
- **Chevron icon** rotates 180° when expanded
- **Nested service links** with icons
- **Smooth height animation** (max-h-0 to max-h-[500px])

**Implementation Details:**
- Hover state: `hover:bg-navy hover:text-gold`
- Icon color remains gold on hover
- Text turns white on hover
- Dropdown width: 600px (lg:w-[600px])

### 4. Contact Information Updates

**Current Official Information:**
- **Address:** Str. Mihail Kogălniceanu, nr. 10, Biroul 2, Pitești, Argeș
- **Phone:** (+40) 261-848-015
- **Phone (international format):** +40 261-848-015
- **Phone (clickable link):** `tel:+40261848015`

**Format Standards:**
- Display format: `(+40) 261-848-015` (with parentheses and dash)
- Link format: `+40261848015` (no spaces, no special characters)
- Address: Multi-line format with street on first line, city on second line

### Design System Consistency Checklist

When implementing new pages or components, ensure:

- [ ] Hero sections use `py-20 sm:py-28 lg:py-36` padding
- [ ] Hero sections have solid navy background (no gradients)
- [ ] Call buttons use the integrated icon pattern
- [ ] Services navigation includes dropdown (desktop) and expandable menu (mobile)
- [ ] Contact information uses the updated address and phone format
- [ ] All interactive elements have proper hover/active states
- [ ] Animations follow the established timing patterns (300ms standard)

---

## Quick Reference - Common Patterns

### Hero Section Pattern
```jsx
<section className="bg-navy py-20 sm:py-28 lg:py-36">
  {/* Content - NO gradient overlays */}
</section>
```

### Call Button Pattern
```jsx
<a href="tel:+40261848015" className="rounded-full bg-gold px-6 py-3 hover:bg-white/15 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300">
  <div className="h-12 w-12 rounded-full bg-gold/10">
    <Phone className="h-5 w-5 text-navy" />
  </div>
  <span className="font-bold text-navy">(+40) 261-848-015</span>
</a>
```

### Services Dropdown (Desktop)
```jsx
<NavigationMenuContent>
  <ul className="grid w-[600px] grid-cols-2 gap-3 p-4">
    <li className="rounded-md p-3 hover:bg-navy hover:text-gold">
      <Icon className="h-5 w-5 text-gold" />
      <span>Service Name</span>
    </li>
  </ul>
</NavigationMenuContent>
```

### Services Accordion (Mobile)
```jsx
<button onClick={toggle} className="py-4 hover:text-gold hover:pl-4">
  <span>Services</span>
  <ChevronDown className={cn("h-5 w-5", isOpen && "rotate-180")} />
</button>
<div className={cn("overflow-hidden transition-all", isOpen ? "max-h-[500px]" : "max-h-0")}>
  {/* Service links */}
</div>
```

---

## 1. Color Palette

### Primary Colors

```css
--primary-navy: #003a70;      /* Main brand color - headers, nav, hero */
--primary-gold: #d09c11;      /* Accent - CTAs, highlights, icons */
--primary-white: #ffffff;     /* Clean backgrounds, text on dark */
```

### Extended Palette

#### Background Colors
```css
--bg-navy-dark: #002a52;      /* Darker navy for depth/gradients */
--bg-navy-light: #004a8f;     /* Lighter navy for hover states */
--bg-white: #ffffff;          /* Main content background */
--bg-off-white: #f8f9fa;      /* Alternate section background */
--bg-light-gray: #f3f4f6;     /* Card backgrounds, subtle sections */
--bg-gold-light: #fef9e7;     /* Light gold for highlights/badges */
```

#### Text Colors
```css
--text-primary: #1f2937;      /* Main body text on light backgrounds */
--text-secondary: #4b5563;    /* Secondary text, descriptions */
--text-muted: #6b7280;        /* Captions, helper text, metadata */
--text-light: #9ca3af;        /* Disabled text, very subtle content */
--text-on-navy: #ffffff;      /* Text on dark navy backgrounds */
--text-on-gold: #003a70;      /* Text on gold backgrounds */
```

#### Border Colors
```css
--border-light: #e5e7eb;      /* Default borders, dividers */
--border-medium: #d1d5db;     /* Emphasized borders */
--border-gold: #d09c11;       /* Accent borders */
--border-navy: #003a70;       /* Strong borders */
```

#### State Colors
```css
--success: #10b981;           /* Success messages */
--error: #ef4444;             /* Error states */
--warning: #f59e0b;           /* Warnings */
--info: #3b82f6;              /* Information */
```

### Gradient Suggestions

```css
/* Hero Overlay Gradient */
--gradient-hero: linear-gradient(135deg, #002a52 0%, #003a70 50%, #004a8f 100%);

/* Navy to Transparent (for image overlays) */
--gradient-overlay: linear-gradient(180deg, rgba(0, 58, 112, 0.9) 0%, rgba(0, 58, 112, 0.7) 100%);

/* Gold Accent Gradient */
--gradient-gold: linear-gradient(135deg, #d09c11 0%, #e6b520 100%);

/* Subtle White Gradient (for cards) */
--gradient-card: linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%);
```

---

## 2. Typography

### Font Families

#### Headline Font (Serif - Elegance)
```css
--font-heading: 'Playfair Display', 'Georgia', serif;
```
**Usage:** H1, H2, H3, Hero headlines, Section titles
**Characteristics:** Elegant, authoritative, trustworthy
**Fallback:** Georgia, serif

#### Body Font (Sans-Serif - Readability)
```css
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```
**Usage:** Body text, navigation, buttons, forms
**Characteristics:** Modern, clean, highly readable
**Fallback:** System fonts

#### Monospace (Optional - for legal references)
```css
--font-mono: 'IBM Plex Mono', 'Courier New', monospace;
```

### Font Size Scale

```css
/* Mobile First Approach */
--text-xs: 0.75rem;       /* 12px - Small labels, captions */
--text-sm: 0.875rem;      /* 14px - Helper text, metadata */
--text-base: 1rem;        /* 16px - Body text */
--text-lg: 1.125rem;      /* 18px - Large body, lead paragraphs */
--text-xl: 1.25rem;       /* 20px - Small headings */
--text-2xl: 1.5rem;       /* 24px - H4 */
--text-3xl: 1.875rem;     /* 30px - H3 */
--text-4xl: 2.25rem;      /* 36px - H2 */
--text-5xl: 3rem;         /* 48px - H1, Hero mobile */
--text-6xl: 3.75rem;      /* 60px - Hero desktop */
--text-7xl: 4.5rem;       /* 72px - Extra large hero */
```

### Responsive Typography

#### Hero Section Typography (Two-Line Layout)

The hero section uses a distinctive two-line headline with different styling for each line:

**Line 1 - "Societate Civila de Avocati" (Firm Type)**
```css
.hero-title-line1 {
  font-size: 1.5rem;           /* text-2xl - Mobile */
  color: rgba(255, 255, 255, 0.7);  /* text-white/70 */
  font-weight: 500;            /* font-medium */
}

@media (min-width: 640px) {    /* sm breakpoint */
  .hero-title-line1 {
    font-size: 1.875rem;       /* text-3xl - Tablet */
  }
}

@media (min-width: 1024px) {   /* lg breakpoint */
  .hero-title-line1 {
    font-size: 2.5rem;         /* text-[2.5rem] - Desktop */
  }
}
```

**Tailwind Classes:** `text-2xl sm:text-3xl lg:text-[2.5rem] text-white/70 font-medium`

**Line 2 - "Stan-Baculescu" (Firm Name)**
```css
.hero-title-line2 {
  font-size: 3rem;             /* text-5xl - Mobile */
  color: #ffffff;              /* text-white */
  font-weight: 700;            /* font-bold */
}

@media (min-width: 640px) {    /* sm breakpoint */
  .hero-title-line2 {
    font-size: 3.75rem;        /* text-6xl - Tablet */
  }
}

@media (min-width: 1024px) {   /* lg breakpoint */
  .hero-title-line2 {
    font-size: 4.5rem;         /* text-7xl - Desktop */
  }
}
```

**Tailwind Classes:** `text-5xl sm:text-6xl lg:text-7xl text-white font-bold`

**Example Implementation:**
```jsx
<h1 className="font-heading">
  <span className="block text-2xl sm:text-3xl lg:text-[2.5rem] text-white/70 font-medium">
    Societate Civila de Avocati
  </span>
  <span className="block text-5xl sm:text-6xl lg:text-7xl text-white font-bold">
    Stan-Baculescu
  </span>
</h1>
```

#### General Typography

```css
/* H1 - Hero Headlines */
h1, .h1 {
  font-family: var(--font-heading);
  font-size: 3rem;           /* 48px mobile */
  line-height: 1.1;
  font-weight: 700;
  letter-spacing: -0.02em;
}
@media (min-width: 768px) {
  h1, .h1 { font-size: 3.75rem; } /* 60px tablet */
}
@media (min-width: 1024px) {
  h1, .h1 { font-size: 4.5rem; }  /* 72px desktop */
}

/* H2 - Section Headings */
h2, .h2 {
  font-family: var(--font-heading);
  font-size: 2.25rem;        /* 36px mobile */
  line-height: 1.2;
  font-weight: 700;
  letter-spacing: -0.01em;
}
@media (min-width: 768px) {
  h2, .h2 { font-size: 3rem; }    /* 48px desktop */
}

/* H3 - Subsection Headings */
h3, .h3 {
  font-family: var(--font-heading);
  font-size: 1.875rem;       /* 30px mobile */
  line-height: 1.3;
  font-weight: 600;
}
@media (min-width: 768px) {
  h3, .h3 { font-size: 2.25rem; } /* 36px desktop */
}

/* H4 - Card Titles */
h4, .h4 {
  font-family: var(--font-heading);
  font-size: 1.5rem;         /* 24px */
  line-height: 1.4;
  font-weight: 600;
}

/* H5 - Small Headings */
h5, .h5 {
  font-family: var(--font-body);
  font-size: 1.25rem;        /* 20px */
  line-height: 1.5;
  font-weight: 600;
}

/* H6 - Labels */
h6, .h6 {
  font-family: var(--font-body);
  font-size: 1.125rem;       /* 18px */
  line-height: 1.5;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Body Text */
body, .body {
  font-family: var(--font-body);
  font-size: 1rem;           /* 16px */
  line-height: 1.7;
  font-weight: 400;
  color: var(--text-primary);
}

/* Lead Paragraph */
.lead {
  font-size: 1.125rem;       /* 18px mobile */
  line-height: 1.8;
  font-weight: 400;
  color: var(--text-secondary);
}
@media (min-width: 768px) {
  .lead { font-size: 1.25rem; }  /* 20px desktop */
}

/* Small Text */
.small, small {
  font-size: 0.875rem;       /* 14px */
  line-height: 1.6;
}
```

### Font Weights

```css
--font-light: 300;         /* Light - subtle emphasis */
--font-regular: 400;       /* Regular - body text */
--font-medium: 500;        /* Medium - semi-emphasis */
--font-semibold: 600;      /* Semibold - subheadings */
--font-bold: 700;          /* Bold - headings */
--font-extrabold: 800;     /* Extra bold - hero text */
```

### Line Heights

```css
--leading-none: 1;         /* Tight headlines */
--leading-tight: 1.1;      /* Hero text */
--leading-snug: 1.3;       /* H2, H3 */
--leading-normal: 1.5;     /* Default for headings */
--leading-relaxed: 1.7;    /* Body text */
--leading-loose: 1.9;      /* Spacious body text */
```

### Letter Spacing

```css
--tracking-tighter: -0.02em;  /* Large headlines */
--tracking-tight: -0.01em;    /* H2, H3 */
--tracking-normal: 0;         /* Body text */
--tracking-wide: 0.025em;     /* Button text */
--tracking-wider: 0.05em;     /* Uppercase labels */
--tracking-widest: 0.1em;     /* All caps headings */
```

---

## 3. Spacing System

### Base Spacing Scale (8px base unit)

```css
--space-0: 0;
--space-1: 0.25rem;    /* 4px */
--space-2: 0.5rem;     /* 8px */
--space-3: 0.75rem;    /* 12px */
--space-4: 1rem;       /* 16px */
--space-5: 1.25rem;    /* 20px */
--space-6: 1.5rem;     /* 24px */
--space-8: 2rem;       /* 32px */
--space-10: 2.5rem;    /* 40px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
--space-20: 5rem;      /* 80px */
--space-24: 6rem;      /* 96px */
--space-32: 8rem;      /* 128px */
```

### Section Spacing

```css
/* Mobile */
--section-padding-mobile: 4rem 1.5rem;     /* 64px top/bottom, 24px sides */

/* Tablet */
--section-padding-tablet: 5rem 2rem;       /* 80px top/bottom, 32px sides */

/* Desktop */
--section-padding-desktop: 6rem 4rem;      /* 96px top/bottom, 64px sides */

/* Large Desktop */
--section-padding-xl: 8rem 6rem;           /* 128px top/bottom, 96px sides */
```

### Component Spacing

```css
/* Card Padding */
--card-padding: 1.5rem;                    /* 24px mobile */
--card-padding-lg: 2rem;                   /* 32px desktop */

/* Container Max Width */
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1536px;

/* Grid Gap */
--gap-xs: 1rem;        /* 16px - tight grids */
--gap-sm: 1.5rem;      /* 24px - default cards */
--gap-md: 2rem;        /* 32px - spacious grids */
--gap-lg: 2.5rem;      /* 40px - large sections */
--gap-xl: 3rem;        /* 48px - hero elements */
```

---

## 4. Components Style

### Buttons

#### Primary Call Button (Integrated Phone Icon Design)

**Updated Design Pattern:** The primary call button features an integrated phone icon with distinct styling for visual hierarchy.

**Structure:**
- Rounded-full pill shape
- Phone icon in a distinct background container
- Stacked text layout (desktop) / Inline text (mobile)

```jsx
{/* Desktop: Stacked Text Layout */}
<a
  href="tel:+40261848015"
  className="group hidden sm:flex items-center gap-3 rounded-full bg-gold px-6 py-3 shadow-lg shadow-gold/20 transition-all duration-300 hover:bg-white/15 hover:-translate-y-0.5 hover:shadow-gold/20 active:scale-[0.98]"
>
  {/* Icon Container */}
  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10">
    <Phone className="h-5 w-5 text-navy" />
  </div>

  {/* Stacked Text */}
  <div className="flex flex-col">
    <span className="text-xs text-navy/70">{t('call')}</span>
    <span className="text-base font-bold text-navy">(+40) 261-848-015</span>
  </div>
</a>

{/* Mobile: Inline Text Layout */}
<a
  href="tel:+40261848015"
  className="flex sm:hidden items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 shadow-lg shadow-gold/20 transition-all duration-300 hover:bg-white/15 hover:-translate-y-0.5 hover:shadow-gold/20 active:scale-[0.98]"
>
  <Phone className="h-5 w-5 text-navy" />
  <span className="text-base font-semibold text-navy">(+40) 261-848-015</span>
</a>
```

**Call Button Styling:**
```css
.call-button {
  display: flex;
  align-items: center;
  gap: 0.75rem;           /* gap-3 */
  border-radius: 9999px;  /* rounded-full */
  background: #d09c11;    /* bg-gold */
  padding: 0.75rem 1.5rem; /* px-6 py-3 */
  box-shadow: 0 10px 15px -3px rgba(208, 156, 17, 0.2); /* shadow-lg shadow-gold/20 */
  transition: all 0.3s ease;
}

.call-button:hover {
  background: rgba(255, 255, 255, 0.15); /* hover:bg-white/15 */
  transform: translateY(-2px); /* hover:-translate-y-0.5 */
  box-shadow: 0 10px 15px -3px rgba(208, 156, 17, 0.2); /* hover:shadow-gold/20 */
}

.call-button:active {
  transform: scale(0.98); /* active:scale-[0.98] */
}

/* Icon Container */
.call-button-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;           /* h-12 */
  width: 3rem;            /* w-12 */
  border-radius: 9999px;  /* rounded-full */
  background: rgba(208, 156, 17, 0.1); /* bg-gold/10 */
}

/* Stacked Text (Desktop) */
.call-button-text-stacked {
  display: flex;
  flex-direction: column;
}

.call-button-label {
  font-size: 0.75rem;     /* text-xs */
  color: rgba(0, 58, 112, 0.7); /* text-navy/70 */
}

.call-button-number {
  font-size: 1rem;        /* text-base */
  font-weight: 700;       /* font-bold */
  color: #003a70;         /* text-navy */
}

/* Inline Text (Mobile) */
.call-button-text-inline {
  font-size: 1rem;        /* text-base */
  font-weight: 600;       /* font-semibold */
  color: #003a70;         /* text-navy */
}
```

**Tailwind Classes Reference:**
```
Base: rounded-full bg-gold px-6 py-3 shadow-lg shadow-gold/20
Hover: hover:bg-white/15 hover:-translate-y-0.5 hover:shadow-gold/20
Active: active:scale-[0.98]
Transition: transition-all duration-300
```

#### Primary Button (Gold CTA - Standard)
```css
.btn-primary {
  background: linear-gradient(135deg, #d09c11 0%, #e6b520 100%);
  color: #003a70;
  font-family: var(--font-body);
  font-size: 1rem;           /* 16px */
  font-weight: 600;
  letter-spacing: 0.025em;
  padding: 0.875rem 2rem;    /* 14px 32px */
  border-radius: 0.375rem;   /* 6px */
  border: none;
  box-shadow: 0 4px 6px rgba(208, 156, 17, 0.2);
  transition: all 0.3s ease;
  text-transform: none;
  cursor: pointer;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(208, 156, 17, 0.3);
  background: linear-gradient(135deg, #e6b520 0%, #f0c940 100%);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(208, 156, 17, 0.2);
}
```

#### Secondary Button (Navy Outline)
```css
.btn-secondary {
  background: transparent;
  color: #003a70;
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.025em;
  padding: 0.875rem 2rem;
  border-radius: 0.375rem;
  border: 2px solid #003a70;
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-secondary:hover {
  background: #003a70;
  color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 58, 112, 0.2);
}
```

#### Tertiary Button (Text Link)
```css
.btn-tertiary {
  background: transparent;
  color: #003a70;
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border: none;
  border-bottom: 2px solid #d09c11;
  border-radius: 0;
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-tertiary:hover {
  color: #d09c11;
  border-bottom-color: #003a70;
}
```

#### Button Sizes
```css
/* Small */
.btn-sm {
  padding: 0.625rem 1.5rem;  /* 10px 24px */
  font-size: 0.875rem;       /* 14px */
}

/* Medium (Default) */
.btn-md {
  padding: 0.875rem 2rem;    /* 14px 32px */
  font-size: 1rem;           /* 16px */
}

/* Large */
.btn-lg {
  padding: 1.125rem 2.5rem;  /* 18px 40px */
  font-size: 1.125rem;       /* 18px */
}

/* Extra Large (Hero CTA) */
.btn-xl {
  padding: 1.25rem 3rem;     /* 20px 48px */
  font-size: 1.25rem;        /* 20px */
}
```

### Cards

#### Service Card
```css
.card-service {
  background: #ffffff;
  border-radius: 0.75rem;    /* 12px */
  padding: 2rem;             /* 32px */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.card-service::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #003a70 0%, #d09c11 100%);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.card-service:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 58, 112, 0.15);
}

.card-service:hover::before {
  transform: scaleX(1);
}

.card-service-icon {
  width: 3rem;               /* 48px */
  height: 3rem;
  color: #d09c11;
  margin-bottom: 1.5rem;
}

.card-service-title {
  font-family: var(--font-heading);
  font-size: 1.5rem;         /* 24px */
  font-weight: 600;
  color: #003a70;
  margin-bottom: 1rem;
}

.card-service-description {
  font-size: 1rem;
  line-height: 1.7;
  color: #4b5563;
}
```

#### Team Card
```css
.card-team {
  background: #ffffff;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.card-team:hover {
  box-shadow: 0 12px 24px rgba(0, 58, 112, 0.15);
}

.card-team-image {
  width: 100%;
  height: 320px;
  object-fit: cover;
  object-position: center;
}

.card-team-content {
  padding: 1.5rem;
}

.card-team-name {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 600;
  color: #003a70;
  margin-bottom: 0.5rem;
}

.card-team-title {
  font-size: 1rem;
  color: #d09c11;
  font-weight: 500;
  margin-bottom: 1rem;
}

.card-team-bio {
  font-size: 0.875rem;
  line-height: 1.6;
  color: #6b7280;
}
```

#### Blog Card
```css
.card-blog {
  background: #ffffff;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid #e5e7eb;
}

.card-blog:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 58, 112, 0.1);
}

.card-blog-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-blog-content {
  padding: 1.5rem;
}

.card-blog-category {
  display: inline-block;
  background: #fef9e7;
  color: #d09c11;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
}

.card-blog-title {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 600;
  color: #003a70;
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.card-blog-excerpt {
  font-size: 0.875rem;
  line-height: 1.6;
  color: #6b7280;
  margin-bottom: 1rem;
}

.card-blog-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.75rem;
  color: #9ca3af;
}
```

### Navigation

#### Desktop Navigation

**Updated Design Pattern:** Services dropdown with hover interaction and icons for each service.

```css
.navbar {
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.navbar-brand {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  color: #003a70;
  text-decoration: none;
}

.navbar-nav {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 500;
  color: #1f2937;
  text-decoration: none;
  padding: 0.5rem 0;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
}

.nav-link:hover,
.nav-link.active {
  color: #003a70;
  border-bottom-color: #d09c11;
}
```

**Services Dropdown (Desktop - Hover Trigger):**

```jsx
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger className="text-base font-medium text-gray-700 hover:text-navy">
        {t('nav.services')}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px] lg:grid-cols-2">
          {services.map((service) => (
            <li key={service.href}>
              <NavigationMenuLink asChild>
                <Link
                  href={service.href}
                  className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-navy hover:text-gold focus:bg-navy focus:text-gold"
                >
                  <div className="flex items-center gap-3">
                    <service.icon className="h-5 w-5 text-gold group-hover:text-gold transition-colors" />
                    <div className="text-sm font-semibold leading-none group-hover:text-white">
                      {service.title}
                    </div>
                  </div>
                </Link>
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

**Services Dropdown Styling:**

```css
/* Dropdown Container */
.services-dropdown {
  background: #ffffff;
  border-radius: 0.5rem; /* rounded-md */
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  width: 600px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem; /* gap-3 */
}

/* Dropdown Item */
.services-dropdown-item {
  display: block;
  padding: 0.75rem; /* p-3 */
  border-radius: 0.375rem; /* rounded-md */
  transition: all 0.3s ease;
}

.services-dropdown-item:hover {
  background: #003a70; /* hover:bg-navy */
}

/* Icon + Text Container */
.services-dropdown-item-content {
  display: flex;
  align-items: center;
  gap: 0.75rem; /* gap-3 */
}

/* Service Icon */
.services-dropdown-icon {
  height: 1.25rem; /* h-5 */
  width: 1.25rem;  /* w-5 */
  color: #d09c11;  /* text-gold */
  transition: color 0.3s ease;
}

.services-dropdown-item:hover .services-dropdown-icon {
  color: #d09c11; /* Stays gold on hover */
}

/* Service Title */
.services-dropdown-title {
  font-size: 0.875rem; /* text-sm */
  font-weight: 600;    /* font-semibold */
  color: #1f2937;      /* Default text color */
  transition: color 0.3s ease;
}

.services-dropdown-item:hover .services-dropdown-title {
  color: #ffffff; /* hover:text-white */
}
```

**Tailwind Classes Reference:**
```
Dropdown container: w-[600px] grid grid-cols-2 gap-3 p-4 rounded-md shadow-lg
Dropdown item: block p-3 rounded-md hover:bg-navy hover:text-gold transition-colors
Icon: h-5 w-5 text-gold
Title: text-sm font-semibold group-hover:text-white
```

#### Mobile Menu (Enhanced Design)

The mobile menu features a sophisticated gradient background with decorative elements and polished interactions.

**Services Expandable Menu (Mobile):**

In mobile view, services appear as an expandable accordion section instead of a dropdown.

```jsx
{/* Services Accordion Item */}
<div className="border-b border-white/10">
  <button
    onClick={() => setIsServicesOpen(!isServicesOpen)}
    className="flex w-full items-center justify-between py-4 text-xl font-medium text-white transition-all duration-300 hover:text-gold hover:pl-4"
  >
    <span>{t('nav.services')}</span>
    <ChevronDown
      className={cn(
        "h-5 w-5 transition-transform duration-300",
        isServicesOpen && "rotate-180"
      )}
    />
  </button>

  {/* Expandable Services List */}
  <div
    className={cn(
      "overflow-hidden transition-all duration-300",
      isServicesOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
    )}
  >
    <div className="space-y-2 pb-4 pl-4">
      {services.map((service) => (
        <Link
          key={service.href}
          href={service.href}
          className="flex items-center gap-3 py-2 text-base text-white/70 transition-colors hover:text-gold"
          onClick={() => setIsOpen(false)}
        >
          <service.icon className="h-4 w-4" />
          <span>{service.title}</span>
        </Link>
      ))}
    </div>
  </div>
</div>
```

**Mobile Services Menu Styling:**

```css
/* Services Accordion Button */
.mobile-services-toggle {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0; /* py-4 */
  font-size: 1.25rem; /* text-xl */
  font-weight: 500; /* font-medium */
  color: #ffffff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.mobile-services-toggle:hover {
  color: #d09c11; /* hover:text-gold */
  padding-left: 1rem; /* hover:pl-4 */
}

/* Chevron Icon */
.mobile-services-icon {
  height: 1.25rem; /* h-5 */
  width: 1.25rem; /* w-5 */
  transition: transform 0.3s ease;
}

.mobile-services-icon.open {
  transform: rotate(180deg); /* rotate-180 when open */
}

/* Services List Container */
.mobile-services-list {
  overflow: hidden;
  transition: all 0.3s ease;
}

.mobile-services-list.open {
  max-height: 500px;
  opacity: 1;
}

.mobile-services-list.closed {
  max-height: 0;
  opacity: 0;
}

/* Individual Service Link */
.mobile-service-link {
  display: flex;
  align-items: center;
  gap: 0.75rem; /* gap-3 */
  padding: 0.5rem 0; /* py-2 */
  padding-left: 1rem; /* pl-4 */
  font-size: 1rem; /* text-base */
  color: rgba(255, 255, 255, 0.7); /* text-white/70 */
  transition: color 0.3s ease;
}

.mobile-service-link:hover {
  color: #d09c11; /* hover:text-gold */
}

.mobile-service-link .icon {
  height: 1rem; /* h-4 */
  width: 1rem; /* w-4 */
}
```

**Tailwind Classes Reference:**
```
Toggle button: flex w-full items-center justify-between py-4 text-xl font-medium text-white hover:text-gold hover:pl-4
Chevron: h-5 w-5 transition-transform duration-300 [open]:rotate-180
Container: overflow-hidden transition-all duration-300 [open]:max-h-[500px] [open]:opacity-100 [closed]:max-h-0 [closed]:opacity-0
Service link: flex items-center gap-3 py-2 text-base text-white/70 hover:text-gold
```

**Background & Structure**
```css
.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  /* Gradient background */
  background: linear-gradient(180deg, #002a52 0%, #003a70 50%, #004a8f 100%);
  padding: 2rem;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: 100;
  overflow: hidden;
}

.mobile-menu.active {
  transform: translateX(0);
}
```

**Tailwind Classes (Container):**
```html
<div className="fixed inset-0 z-50 bg-gradient-to-b from-[#002a52] via-[#003a70] to-[#004a8f]">
```

**Decorative Gold Circles (Blur Effect)**
```jsx
{/* Background decorative elements */}
<div className="absolute top-20 right-10 h-32 w-32 rounded-full bg-gold/10 blur-3xl" />
<div className="absolute bottom-40 left-10 h-40 w-40 rounded-full bg-gold/5 blur-3xl" />
```

**Navigation Items with Hover Slide Effect**
```css
.mobile-menu-link {
  display: block;
  font-family: var(--font-body);
  font-size: 1.5rem;
  font-weight: 500;
  color: #ffffff;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  padding-left: 0;
}

.mobile-menu-link:hover {
  color: #d09c11;
  padding-left: 1rem; /* Slide effect on hover */
}

/* Gold active indicator */
.mobile-menu-link.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 60%;
  background: #d09c11;
  border-radius: 2px;
}
```

**Tailwind Implementation:**
```jsx
<Link
  href="/about"
  className={cn(
    "block py-4 text-xl font-medium text-white border-b border-white/10 transition-all duration-300 hover:text-gold hover:pl-4",
    pathname === "/about" && "text-gold pl-4 border-l-4 border-gold"
  )}
>
  Despre Noi
</Link>
```

**Language Switcher (Pill Design with Flags)**
```jsx
<div className="flex items-center gap-2 bg-white/10 rounded-full p-1">
  <button
    className={cn(
      "flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-all duration-300",
      locale === 'ro'
        ? "bg-gold text-navy"
        : "text-white/70 hover:text-white"
    )}
  >
    <span>🇷🇴</span>
    <span>RO</span>
  </button>
  <button
    className={cn(
      "flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-all duration-300",
      locale === 'en'
        ? "bg-gold text-navy"
        : "text-white/70 hover:text-white"
    )}
  >
    <span>🇬🇧</span>
    <span>EN</span>
  </button>
</div>
```

**Close Button**
```css
.mobile-menu-close {
  padding: 0.5rem;           /* p-2 */
  border-radius: 0.5rem;     /* rounded-lg */
  color: #ffffff;            /* text-white */
  background: transparent;
  transition: all 0.3s ease;
}

.mobile-menu-close:hover {
  color: #d09c11;            /* text-gold on hover */
  background: rgba(208, 156, 17, 0.1);
}
```

**Tailwind Classes:** `p-2 rounded-lg text-white hover:text-gold hover:bg-gold/10 transition-all duration-300`

**CTA Buttons in Mobile Menu**

Primary CTA - "Suna acum" (Call Now):
```jsx
<a
  href="tel:+40261848015"
  className="flex items-center justify-center gap-2 w-full h-14 bg-gold text-navy font-semibold rounded-full shadow-lg shadow-gold/30 animate-pulse-glow"
>
  <Phone className="h-5 w-5" />
  <span>Suna acum</span>
</a>
```

Secondary CTA - "Contact":
```jsx
<Link
  href="/contact"
  className="flex items-center justify-center w-full h-14 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300"
>
  Contact
</Link>
```

---

#### Hamburger Icon (Animated)

Custom animated hamburger menu icon that transforms to an X when open.

**Container Specifications**
```css
.hamburger-button {
  width: 3rem;               /* h-12 / w-12 (48px) */
  height: 3rem;
  background: transparent;   /* No background */
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;             /* 6px gap between lines */
}
```

**Line Specifications**
```css
.hamburger-line {
  width: 1.75rem;            /* w-7 (28px) */
  height: 2px;
  background: #ffffff;       /* white */
  border-radius: 1px;
  transition: all 300ms ease-out;
  transform-origin: center;
}

/* Open state - lines become gold and transform to X */
.hamburger-button.open .hamburger-line {
  background: #d09c11;       /* gold */
}

.hamburger-button.open .hamburger-line:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.hamburger-button.open .hamburger-line:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.hamburger-button.open .hamburger-line:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}
```

**React Implementation**
```jsx
<button
  onClick={() => setIsOpen(!isOpen)}
  className="relative h-12 w-12 flex flex-col items-center justify-center gap-1.5"
  aria-label={isOpen ? 'Close menu' : 'Open menu'}
>
  <span
    className={cn(
      "block h-0.5 w-7 rounded-full transition-all duration-300 ease-out",
      isOpen
        ? "bg-gold translate-y-2 rotate-45"
        : "bg-white"
    )}
  />
  <span
    className={cn(
      "block h-0.5 w-7 rounded-full transition-all duration-300 ease-out",
      isOpen
        ? "bg-gold opacity-0 scale-x-0"
        : "bg-white"
    )}
  />
  <span
    className={cn(
      "block h-0.5 w-7 rounded-full transition-all duration-300 ease-out",
      isOpen
        ? "bg-gold -translate-y-2 -rotate-45"
        : "bg-white"
    )}
  />
</button>
```

**Animation Properties**
| Property | Value | Notes |
|----------|-------|-------|
| Transition duration | 300ms | Smooth but snappy |
| Easing | ease-out | Quick start, gentle finish |
| Line width | 28px (w-7) | Comfortable touch target |
| Line height | 2px (h-0.5) | Visible but refined |
| Gap between lines | 6px (gap-1.5) | Proper spacing for X transform |
| Container size | 48px (h-12 w-12) | Touch-friendly target |
| Color (closed) | white | Visible on navy background |
| Color (open) | gold (#d09c11) | Indicates active state |

### Forms

#### Input Fields
```css
.form-input {
  width: 100%;
  font-family: var(--font-body);
  font-size: 1rem;
  color: #1f2937;
  background: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.875rem 1rem;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #003a70;
  box-shadow: 0 0 0 3px rgba(0, 58, 112, 0.1);
}

.form-input::placeholder {
  color: #9ca3af;
}

.form-input.error {
  border-color: #ef4444;
}
```

#### Textarea
```css
.form-textarea {
  width: 100%;
  font-family: var(--font-body);
  font-size: 1rem;
  color: #1f2937;
  background: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.875rem 1rem;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;
}

.form-textarea:focus {
  outline: none;
  border-color: #003a70;
  box-shadow: 0 0 0 3px rgba(0, 58, 112, 0.1);
}
```

#### Labels
```css
.form-label {
  display: block;
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.form-label.required::after {
  content: '*';
  color: #ef4444;
  margin-left: 0.25rem;
}
```

#### Error Messages
```css
.form-error {
  font-size: 0.875rem;
  color: #ef4444;
  margin-top: 0.5rem;
}
```

### Footer

#### Footer Logo

The footer uses the actual logo image converted to white using CSS filters.

```css
.footer-logo {
  height: 3.5rem;            /* h-14 (56px) */
  width: auto;               /* w-auto - maintains aspect ratio */
  filter: brightness(0) invert(1);  /* Converts to white */
}
```

**Next.js Image Implementation:**
```jsx
<Image
  src="/images/logo.png"
  alt="Stan Baculescu Law Firm"
  width={200}
  height={56}
  className="h-14 w-auto brightness-0 invert"
/>
```

**Filter Explanation:**
- `brightness(0)` - Makes the image completely black
- `invert(1)` - Inverts black to white, creating a white version of the logo

**Tailwind Classes:** `h-14 w-auto brightness-0 invert`

#### Footer Layout

```css
.footer {
  background: #003a70;
  color: #ffffff;
  padding: 4rem 2rem 2rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer-column-title {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 600;
  color: #d09c11;
  margin-bottom: 1.5rem;
}

.footer-link {
  display: block;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  margin-bottom: 0.75rem;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #d09c11;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
  text-align: center;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
}
```

---

## 5. Layout Patterns

### Hero Section

**IMPORTANT: Current Design Standards (Updated January 2026)**

All hero sections must follow these updated standards:
- **NO bottom gradient/blur effects**
- **Solid navy background** (#003a70) without gradients or transitions
- **Consistent padding:** `py-20 sm:py-28 lg:py-36`
- Clean, minimal design philosophy

```html
<section class="hero">
  <div class="hero-content">
    <span class="hero-badge">Badge/Category</span>
    <h1 class="hero-title">
      Main Headline with
      <span class="hero-highlight">Gold Highlight</span>
    </h1>
    <p class="hero-subtitle">Supporting text or description</p>
    <div class="hero-cta">
      <button class="btn-primary btn-xl">Primary CTA</button>
      <button class="btn-secondary btn-xl">Secondary CTA</button>
    </div>
  </div>
</section>
```

```css
.hero {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #003a70; /* Solid navy - NO gradients */
  padding: 5rem 2rem; /* py-20 mobile */
}

@media (min-width: 640px) {
  .hero {
    padding: 7rem 2rem; /* py-28 tablet */
  }
}

@media (min-width: 1024px) {
  .hero {
    padding: 9rem 2rem; /* py-36 desktop */
  }
}

.hero-content {
  position: relative;
  z-index: 10;
  max-width: 1024px;
  text-align: center;
}

.hero-badge {
  display: inline-block;
  background: rgba(208, 156, 17, 0.2);
  color: #d09c11;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0.5rem 1.5rem;
  border-radius: 2rem;
  border: 1px solid #d09c11;
  margin-bottom: 2rem;
}

.hero-title {
  color: #ffffff;
  margin-bottom: 1.5rem;
}

.hero-highlight {
  color: #d09c11;
  position: relative;
  display: inline-block;
}

.hero-highlight::after {
  content: '';
  position: absolute;
  bottom: 0.25rem;
  left: 0;
  width: 100%;
  height: 3px;
  background: #d09c11;
}

.hero-subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.25rem;
  line-height: 1.8;
  max-width: 600px;
  margin: 0 auto 2.5rem;
}

.hero-cta {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .hero-cta {
    flex-direction: column;
    align-items: center;
  }

  .hero-cta button {
    width: 100%;
    max-width: 300px;
  }
}
```

### Services Grid

```html
<section class="services">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title">Our Services</h2>
      <p class="section-subtitle">Comprehensive legal solutions</p>
    </div>

    <div class="services-grid">
      <!-- Service Card -->
      <div class="card-service">
        <div class="card-service-icon">
          <!-- Icon SVG -->
        </div>
        <h3 class="card-service-title">Service Name</h3>
        <p class="card-service-description">Service description</p>
        <a href="#" class="card-service-link">Learn More →</a>
      </div>
      <!-- Repeat for other services -->
    </div>
  </div>
</section>
```

```css
.services {
  padding: 6rem 2rem;
  background: #f8f9fa;
}

.section-header {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem;
}

.section-title {
  color: #003a70;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.25rem;
  color: #6b7280;
  line-height: 1.7;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1280px;
  margin: 0 auto;
}

.card-service-link {
  display: inline-flex;
  align-items: center;
  color: #003a70;
  font-weight: 600;
  text-decoration: none;
  margin-top: 1rem;
  transition: color 0.3s ease;
}

.card-service-link:hover {
  color: #d09c11;
}
```

### Team Section

```html
<section class="team">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title">Our Team</h2>
      <p class="section-subtitle">Experienced legal professionals</p>
    </div>

    <div class="team-grid">
      <!-- Team Card -->
      <div class="card-team">
        <img src="/images/team-member.jpg" alt="Team Member" class="card-team-image">
        <div class="card-team-content">
          <h3 class="card-team-name">John Doe</h3>
          <p class="card-team-title">Senior Partner</p>
          <p class="card-team-bio">Brief bio or specialization</p>
        </div>
      </div>
      <!-- Repeat for other team members -->
    </div>
  </div>
</section>
```

```css
.team {
  padding: 6rem 2rem;
  background: #ffffff;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
  max-width: 1280px;
  margin: 0 auto;
}
```

### Testimonials

```html
<section class="testimonials">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title">Client Testimonials</h2>
      <p class="section-subtitle">What our clients say</p>
    </div>

    <div class="testimonials-grid">
      <!-- Testimonial Card -->
      <div class="card-testimonial">
        <div class="testimonial-quote-icon">"</div>
        <p class="testimonial-text">Client testimonial text goes here...</p>
        <div class="testimonial-author">
          <img src="/images/client.jpg" alt="Client" class="testimonial-avatar">
          <div>
            <p class="testimonial-name">Client Name</p>
            <p class="testimonial-role">Role/Company</p>
          </div>
        </div>
      </div>
      <!-- Repeat for other testimonials -->
    </div>
  </div>
</section>
```

```css
.testimonials {
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #002a52 0%, #003a70 100%);
}

.testimonials .section-title {
  color: #ffffff;
}

.testimonials .section-subtitle {
  color: rgba(255, 255, 255, 0.8);
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  max-width: 1280px;
  margin: 0 auto;
}

.card-testimonial {
  background: #ffffff;
  border-radius: 0.75rem;
  padding: 2.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
}

.testimonial-quote-icon {
  font-family: var(--font-heading);
  font-size: 4rem;
  color: #d09c11;
  opacity: 0.2;
  position: absolute;
  top: 1rem;
  left: 1.5rem;
  line-height: 1;
}

.testimonial-text {
  font-size: 1rem;
  line-height: 1.8;
  color: #4b5563;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.testimonial-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.testimonial-name {
  font-weight: 600;
  color: #003a70;
  margin-bottom: 0.25rem;
}

.testimonial-role {
  font-size: 0.875rem;
  color: #6b7280;
}
```

### FAQ Accordion

```html
<section class="faq">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title">Frequently Asked Questions</h2>
      <p class="section-subtitle">Find answers to common questions</p>
    </div>

    <div class="faq-list">
      <!-- FAQ Item -->
      <div class="faq-item">
        <button class="faq-question">
          <span>Question text goes here?</span>
          <span class="faq-icon">+</span>
        </button>
        <div class="faq-answer">
          <p>Answer text goes here...</p>
        </div>
      </div>
      <!-- Repeat for other FAQs -->
    </div>
  </div>
</section>
```

```css
.faq {
  padding: 6rem 2rem;
  background: #ffffff;
}

.faq-list {
  max-width: 900px;
  margin: 0 auto;
}

.faq-item {
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 1rem;
}

.faq-question {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  font-family: var(--font-heading);
  font-size: 1.125rem;
  font-weight: 600;
  color: #003a70;
  background: transparent;
  border: none;
  padding: 1.5rem 0;
  cursor: pointer;
  transition: color 0.3s ease;
}

.faq-question:hover {
  color: #d09c11;
}

.faq-icon {
  font-size: 1.5rem;
  color: #d09c11;
  transition: transform 0.3s ease;
}

.faq-item.active .faq-icon {
  transform: rotate(45deg);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.faq-item.active .faq-answer {
  max-height: 500px;
  padding-bottom: 1.5rem;
}

.faq-answer p {
  font-size: 1rem;
  line-height: 1.7;
  color: #4b5563;
}
```

### Blog Section

```html
<section class="blog">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title">Latest Insights</h2>
      <p class="section-subtitle">Legal news and updates</p>
    </div>

    <div class="blog-grid">
      <!-- Blog Card (use card-blog from Components) -->
    </div>

    <div class="blog-cta">
      <a href="/blog" class="btn-secondary">View All Articles</a>
    </div>
  </div>
</section>
```

```css
.blog {
  padding: 6rem 2rem;
  background: #f8f9fa;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  max-width: 1280px;
  margin: 0 auto 3rem;
}

.blog-cta {
  text-align: center;
}
```

### Contact Section

**Updated Contact Information:**
- **Address:** Str. Mihail Kogălniceanu, nr. 10, Biroul 2, Pitești, Argeș
- **Phone:** (+40) 261-848-015
- **Email:** contact@example.com

```html
<section class="contact">
  <div class="container">
    <div class="contact-wrapper">
      <!-- Contact Info -->
      <div class="contact-info">
        <h2 class="contact-title">Get in Touch</h2>
        <p class="contact-description">Description text...</p>

        <div class="contact-details">
          <div class="contact-detail-item">
            <div class="contact-icon">📍</div>
            <div>
              <h4>Address</h4>
              <p>Str. Mihail Kogălniceanu, nr. 10, Biroul 2</p>
              <p>Pitești, Argeș</p>
            </div>
          </div>

          <div class="contact-detail-item">
            <div class="contact-icon">📞</div>
            <div>
              <h4>Phone</h4>
              <p>(+40) 261-848-015</p>
            </div>
          </div>

          <div class="contact-detail-item">
            <div class="contact-icon">✉️</div>
            <div>
              <h4>Email</h4>
              <p>contact@example.com</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Form -->
      <div class="contact-form-wrapper">
        <form class="contact-form">
          <div class="form-group">
            <label class="form-label required">Full Name</label>
            <input type="text" class="form-input" placeholder="John Doe">
          </div>

          <div class="form-group">
            <label class="form-label required">Email</label>
            <input type="email" class="form-input" placeholder="john@example.com">
          </div>

          <div class="form-group">
            <label class="form-label">Phone</label>
            <input type="tel" class="form-input" placeholder="+40 123 456 789">
          </div>

          <div class="form-group">
            <label class="form-label required">Message</label>
            <textarea class="form-textarea" placeholder="Your message..."></textarea>
          </div>

          <button type="submit" class="btn-primary btn-lg">Send Message</button>
        </form>
      </div>
    </div>
  </div>
</section>
```

```css
.contact {
  padding: 6rem 2rem;
  background: #ffffff;
}

.contact-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  max-width: 1280px;
  margin: 0 auto;
  align-items: start;
}

@media (max-width: 768px) {
  .contact-wrapper {
    grid-template-columns: 1fr;
  }
}

.contact-info {
  padding: 2rem;
}

.contact-title {
  font-family: var(--font-heading);
  font-size: 2.25rem;
  color: #003a70;
  margin-bottom: 1rem;
}

.contact-description {
  font-size: 1rem;
  line-height: 1.7;
  color: #6b7280;
  margin-bottom: 2.5rem;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.contact-detail-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.contact-icon {
  width: 48px;
  height: 48px;
  background: #fef9e7;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.contact-detail-item h4 {
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 600;
  color: #003a70;
  margin-bottom: 0.25rem;
}

.contact-detail-item p {
  font-size: 0.875rem;
  color: #6b7280;
}

.contact-form-wrapper {
  background: #f8f9fa;
  padding: 2.5rem;
  border-radius: 0.75rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.contact-form button[type="submit"] {
  width: 100%;
}
```

---

## 6. Visual Elements

### Shadow Styles

```css
/* Elevation System */
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.05);
--shadow-lg: 0 8px 16px rgba(0, 58, 112, 0.1);
--shadow-xl: 0 12px 24px rgba(0, 58, 112, 0.15);
--shadow-2xl: 0 24px 48px rgba(0, 58, 112, 0.2);

/* Colored Shadows (for CTAs) */
--shadow-gold: 0 4px 6px rgba(208, 156, 17, 0.2);
--shadow-gold-lg: 0 8px 16px rgba(208, 156, 17, 0.3);

/* Inner Shadow */
--shadow-inner: inset 0 2px 4px rgba(0, 0, 0, 0.06);
```

### Border Radius

```css
--radius-none: 0;
--radius-sm: 0.25rem;     /* 4px - small elements */
--radius-md: 0.375rem;    /* 6px - buttons, inputs */
--radius-lg: 0.5rem;      /* 8px - default cards */
--radius-xl: 0.75rem;     /* 12px - large cards */
--radius-2xl: 1rem;       /* 16px - special cards */
--radius-full: 9999px;    /* Full rounded - badges, avatars */
```

### Icon Style Recommendations

**Icon Library:** Lucide React or Heroicons
**Icon Size:** 24px default, 48px for service cards, 16px for inline
**Icon Color:** Gold (#d09c11) for primary icons, Navy (#003a70) for secondary
**Icon Style:** Outline for most use cases, solid for emphasis

```css
.icon-primary {
  width: 24px;
  height: 24px;
  color: #d09c11;
  stroke-width: 2px;
}

.icon-secondary {
  width: 24px;
  height: 24px;
  color: #003a70;
  stroke-width: 2px;
}

.icon-large {
  width: 48px;
  height: 48px;
}

.icon-small {
  width: 16px;
  height: 16px;
}
```

### Image Treatment

**Photography Style:**
- Professional headshots with neutral backgrounds
- Office/consultation imagery with warm lighting
- Avoid stock photos that look obviously staged
- Use images with navy/neutral color tones for brand consistency

**Image Specifications:**
```css
/* Hero Background */
.hero-image {
  min-width: 1920px;
  min-height: 1080px;
  object-fit: cover;
  filter: brightness(0.7);
}

/* Team Photos */
.team-image {
  width: 400px;
  height: 500px;
  object-fit: cover;
  object-position: center top;
}

/* Blog Images */
.blog-image {
  width: 800px;
  height: 450px;
  object-fit: cover;
}

/* Image Overlay Effect */
.image-overlay {
  position: relative;
  overflow: hidden;
}

.image-overlay::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 58, 112, 0.3) 100%);
  transition: opacity 0.3s ease;
}

.image-overlay:hover::after {
  opacity: 0.8;
}
```

### Dividers & Decorative Elements

```css
/* Section Divider */
.section-divider {
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #003a70 0%, #d09c11 100%);
  margin: 2rem auto;
}

/* Decorative Gold Line */
.gold-accent-line {
  display: inline-block;
  width: 60px;
  height: 3px;
  background: #d09c11;
  margin-bottom: 1rem;
}

/* Quote Border */
.quote-border {
  border-left: 4px solid #d09c11;
  padding-left: 1.5rem;
  font-style: italic;
  color: #4b5563;
}
```

---

## 7. Tailwind CSS Configuration

### tailwind.config.ts

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        navy: {
          dark: "#002a52",
          DEFAULT: "#003a70",
          light: "#004a8f",
        },
        gold: {
          dark: "#b88810",
          DEFAULT: "#d09c11",
          light: "#e6b520",
        },

        // Background Colors
        background: {
          DEFAULT: "#ffffff",
          secondary: "#f8f9fa",
          tertiary: "#f3f4f6",
          "gold-light": "#fef9e7",
        },

        // Text Colors
        text: {
          primary: "#1f2937",
          secondary: "#4b5563",
          muted: "#6b7280",
          light: "#9ca3af",
        },

        // Border Colors
        border: {
          light: "#e5e7eb",
          DEFAULT: "#d1d5db",
          gold: "#d09c11",
          navy: "#003a70",
        },

        // State Colors
        success: "#10b981",
        error: "#ef4444",
        warning: "#f59e0b",
        info: "#3b82f6",
      },

      fontFamily: {
        heading: ['"Playfair Display"', "Georgia", "serif"],
        body: ['"Inter"', "-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "sans-serif"],
        mono: ['"IBM Plex Mono"', '"Courier New"', "monospace"],
      },

      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.6" }],
        sm: ["0.875rem", { lineHeight: "1.6" }],
        base: ["1rem", { lineHeight: "1.7" }],
        lg: ["1.125rem", { lineHeight: "1.8" }],
        xl: ["1.25rem", { lineHeight: "1.5" }],
        "2xl": ["1.5rem", { lineHeight: "1.4" }],
        "3xl": ["1.875rem", { lineHeight: "1.3" }],
        "4xl": ["2.25rem", { lineHeight: "1.2" }],
        "5xl": ["3rem", { lineHeight: "1.1" }],
        "6xl": ["3.75rem", { lineHeight: "1.1" }],
        "7xl": ["4.5rem", { lineHeight: "1" }],
      },

      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "100": "25rem",
        "112": "28rem",
        "128": "32rem",
      },

      boxShadow: {
        xs: "0 1px 2px rgba(0, 0, 0, 0.05)",
        sm: "0 2px 4px rgba(0, 0, 0, 0.05)",
        DEFAULT: "0 4px 6px rgba(0, 0, 0, 0.05)",
        md: "0 4px 6px rgba(0, 0, 0, 0.05)",
        lg: "0 8px 16px rgba(0, 58, 112, 0.1)",
        xl: "0 12px 24px rgba(0, 58, 112, 0.15)",
        "2xl": "0 24px 48px rgba(0, 58, 112, 0.2)",
        gold: "0 4px 6px rgba(208, 156, 17, 0.2)",
        "gold-lg": "0 8px 16px rgba(208, 156, 17, 0.3)",
        inner: "inset 0 2px 4px rgba(0, 0, 0, 0.06)",
      },

      borderRadius: {
        sm: "0.25rem",
        DEFAULT: "0.375rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },

      backgroundImage: {
        "gradient-hero": "linear-gradient(135deg, #002a52 0%, #003a70 50%, #004a8f 100%)",
        "gradient-overlay": "linear-gradient(180deg, rgba(0, 58, 112, 0.9) 0%, rgba(0, 58, 112, 0.7) 100%)",
        "gradient-gold": "linear-gradient(135deg, #d09c11 0%, #e6b520 100%)",
        "gradient-card": "linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)",
      },

      animation: {
        "fade-in": "fadeIn 0.5s ease-in",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
```

### shadcn/ui Theme Customization

For shadcn/ui components, add these CSS variables to your `globals.css`:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 220 13% 13%;

    --card: 0 0% 100%;
    --card-foreground: 220 13% 13%;

    --popover: 0 0% 100%;
    --popover-foreground: 220 13% 13%;

    --primary: 209 100% 22%;      /* Navy #003a70 */
    --primary-foreground: 0 0% 100%;

    --secondary: 44 85% 45%;      /* Gold #d09c11 */
    --secondary-foreground: 209 100% 22%;

    --muted: 220 13% 96%;
    --muted-foreground: 220 9% 46%;

    --accent: 44 85% 45%;         /* Gold */
    --accent-foreground: 209 100% 22%;

    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;

    --border: 220 13% 91%;
    --input: 220 13% 91%;
    --ring: 209 100% 22%;

    --radius: 0.5rem;
  }
}
```

---

## 8. Accessibility Guidelines

### Color Contrast
- **Body text on white:** Minimum 4.5:1 contrast ratio (WCAG AA)
- **Large text (18pt+):** Minimum 3:1 contrast ratio
- **Primary navy (#003a70) on white:** 9.1:1 (Excellent)
- **Gold (#d09c11) on navy:** Test in context, may need adjustment for small text

### Focus States
```css
*:focus-visible {
  outline: 2px solid #d09c11;
  outline-offset: 2px;
  border-radius: 0.25rem;
}

button:focus-visible,
a:focus-visible {
  outline: 2px solid #d09c11;
  outline-offset: 2px;
}
```

### Interactive Elements
- Minimum touch target size: 44x44px
- Clear hover states for all interactive elements
- Keyboard navigation support
- Screen reader friendly labels

---

## 9. Performance Considerations

### Image Optimization
- Use WebP format with JPEG fallback
- Implement lazy loading for images below fold
- Use Next.js Image component for automatic optimization
- Serve responsive images with srcset

### Font Loading
```css
/* Preload critical fonts */
<link rel="preload" href="/fonts/playfair-display.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>

/* Font display strategy */
@font-face {
  font-family: 'Playfair Display';
  font-display: swap;
  /* ... */
}
```

### CSS Organization
- Use CSS modules or Tailwind for scoped styles
- Minimize custom CSS where Tailwind utilities suffice
- Use CSS variables for theme values
- Critical CSS inline, defer non-critical styles

---

## 10. Responsive Breakpoints

```css
/* Mobile First Approach */
--breakpoint-sm: 640px;    /* Small devices (landscape phones) */
--breakpoint-md: 768px;    /* Medium devices (tablets) */
--breakpoint-lg: 1024px;   /* Large devices (laptops) */
--breakpoint-xl: 1280px;   /* Extra large devices (desktops) */
--breakpoint-2xl: 1536px;  /* 2XL devices (large desktops) */
```

### Responsive Design Guidelines
- **Mobile (< 640px):** Single column, stacked navigation, full-width CTAs
- **Tablet (640-1024px):** 2-column grids, compact navigation, flexible images
- **Desktop (> 1024px):** 3+ column grids, full navigation, optimized spacing
- **Max content width:** 1536px (2xl container)

---

## 11. Component Library Recommendations

### Suggested shadcn/ui Components to Install

```bash
# Core UI Components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add label
npx shadcn-ui@latest add accordion
npx shadcn-ui@latest add navigation-menu
npx shadcn-ui@latest add sheet  # For mobile menu
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add form
npx shadcn-ui@latest add toast
```

---

## 12. Animation & Transitions

### Default Transitions
```css
--transition-fast: 150ms ease;
--transition-base: 250ms ease;
--transition-slow: 350ms ease;
--transition-bounce: 300ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Hover Animations
```css
/* Card Lift */
.card-lift:hover {
  transform: translateY(-8px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* Button Shine Effect */
.btn-shine {
  position: relative;
  overflow: hidden;
}

.btn-shine::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.btn-shine:hover::before {
  left: 100%;
}
```

---

## 13. Animation & Interaction Patterns

This section documents the animation patterns established in the Hero component. These patterns should be reused consistently across the site for a cohesive user experience.

### 13.1 CSS Keyframe Animations

#### fadeInUp - Text Element Entry Animation

Used for text content that slides up while fading in. Ideal for headlines, paragraphs, and CTA elements.

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 1s ease-out both;
}
```

**Properties:**
- Duration: 1s
- Easing: ease-out
- Fill mode: both (maintains final state)
- Transform distance: 30px vertical

#### photoFadeIn - Photo/Image Entry Animation

Used for image cards and photo elements. Combines scale and translate for a more dramatic entrance.

```css
@keyframes photoFadeIn {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.animate-photo {
  animation: photoFadeIn 1.2s ease-out both;
}
```

**Properties:**
- Duration: 1.2s (slightly longer for visual weight)
- Easing: ease-out
- Transform distance: 40px vertical
- Scale: 0.95 to 1

#### badgeFadeIn - Badge/Stat Entry Animation

Used for floating badges and stat cards. Uses scale transformation for a "pop-in" effect.

```css
@keyframes badgeFadeIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-badge {
  animation: badgeFadeIn 0.8s ease-out both;
}
```

**Properties:**
- Duration: 0.8s (shorter for snappier feel)
- Easing: ease-out
- Scale: 0.8 to 1

#### shimmer - Photo Highlight Effect

A subtle light sweep effect that adds polish to photo cards.

```css
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.photo-shimmer {
  position: relative;
  overflow: hidden;
}

.photo-shimmer::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    105deg,
    transparent 40%,
    rgba(255, 255, 255, 0.03) 45%,
    rgba(255, 255, 255, 0.06) 50%,
    rgba(255, 255, 255, 0.03) 55%,
    transparent 60%
  );
  animation: shimmer 6s ease-in-out infinite;
  pointer-events: none;
}
```

**Properties:**
- Duration: 6s (slow, subtle effect)
- Easing: ease-in-out
- Repeat: infinite
- Gradient angle: 105deg for diagonal sweep

#### float-up / float-down - Ambient Floating Animation

Creates gentle floating motion for badges and decorative elements.

```css
@keyframes float-up {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

@keyframes float-down {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(8px);
  }
}

.animate-float-up {
  animation: float-up 4s ease-in-out infinite;
}

.animate-float-down {
  animation: float-down 4s ease-in-out infinite;
}
```

**Properties:**
- Duration: 4s
- Easing: ease-in-out
- Movement: 8px up or down
- Repeat: infinite

**Usage:** Use opposite directions (up/down) for paired elements to create visual interest.

#### pulse-glow - CTA Button Glow Effect

Draws attention to primary call-to-action buttons with a pulsing glow.

```css
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 4px 15px rgba(208, 156, 17, 0.3);
  }
  50% {
    box-shadow: 0 6px 25px rgba(208, 156, 17, 0.6);
  }
}

.animate-pulse-glow {
  animation: pulse-glow 1.5s ease-in-out infinite;
}
```

**Properties:**
- Duration: 1.5s
- Easing: ease-in-out
- Shadow color: Gold with varying opacity (0.3 to 0.6)
- Repeat: infinite

#### subtle-glow - Photo Card Ambient Effect

Optional subtle glow for photo cards or featured elements.

```css
@keyframes subtle-glow {
  0%, 100% {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  }
  50% {
    box-shadow: 0 8px 40px rgba(208, 156, 17, 0.15);
  }
}

.animate-subtle-glow {
  animation: subtle-glow 4s ease-in-out infinite;
}
```

**Properties:**
- Duration: 4s
- Transitions between neutral shadow and gold-tinted shadow

---

### 13.2 Animation Delay System (Sequential Loading Pattern)

Animation delays create a staggered, sequential reveal that guides the user's eye through content. Apply delays using these utility classes:

```css
.delay-100 { animation-delay: 100ms; }
.delay-200 { animation-delay: 200ms; }
.delay-300 { animation-delay: 300ms; }
.delay-400 { animation-delay: 400ms; }
.delay-500 { animation-delay: 500ms; }
.delay-600 { animation-delay: 600ms; }
.delay-700 { animation-delay: 700ms; }
.delay-800 { animation-delay: 800ms; }
.delay-900 { animation-delay: 900ms; }
.delay-1000 { animation-delay: 1000ms; }
.delay-1100 { animation-delay: 1100ms; }
.delay-1200 { animation-delay: 1200ms; }
```

#### Delay Timing Guidelines

| Content Type | Delay Range | Rationale |
|--------------|-------------|-----------|
| **Text Elements** | 0-400ms | Primary content loads first |
| **CTA Buttons** | 300-400ms | After headline/description |
| **Supporting Info** | 400-500ms | Secondary text elements |
| **Photos/Images** | 600-700ms | Visual elements after text |
| **Badges/Stats** | 900-1000ms | Decorative elements load last |

#### Example: Hero Section Timing

```html
<!-- Trust Badge - No delay (immediate) -->
<div class="animate-fade-in-up mb-6">...</div>

<!-- Headline - 100ms delay -->
<h1 class="animate-fade-in-up delay-100">...</h1>

<!-- Description - 200ms delay -->
<p class="animate-fade-in-up delay-200">...</p>

<!-- CTA Buttons - 300ms delay -->
<div class="animate-fade-in-up delay-300">...</div>

<!-- Operating Hours - 400ms delay -->
<div class="animate-fade-in-up delay-400">...</div>

<!-- Photo 1 - 600ms delay -->
<div class="animate-photo delay-600">...</div>

<!-- Photo 2 - 700ms delay -->
<div class="animate-photo delay-700">...</div>

<!-- Badge 1 - 900ms delay -->
<div class="animate-badge delay-900">...</div>

<!-- Badge 2 - 1000ms delay -->
<div class="animate-badge delay-1000">...</div>
```

---

### 13.3 Component Patterns

#### Photo Card with Staggered Positioning

Two-column photo layout with vertical offset for visual interest.

```jsx
{/* Photo Card Container Structure */}
<div className="flex items-start gap-5">
  {/* Column 1 - Badge Below */}
  <div className="flex flex-col items-center">
    <div className="animate-photo delay-600 photo-shimmer relative h-[380px] w-[260px] overflow-hidden rounded-2xl bg-gradient-to-b from-gold/5 to-navy-light/20 shadow-2xl ring-2 ring-white/20 transition-all duration-500 group-hover:ring-gold/60 group-hover:-translate-y-3 group-hover:shadow-gold/30">
      <Image ... />
      {/* Gradient Overlay */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy via-navy/70 to-transparent pt-16 pb-4">
        <div className="text-center">
          <p className="text-base font-bold text-white">Name</p>
          <p className="text-xs text-gold">Title</p>
        </div>
      </div>
    </div>
    {/* Badge Below */}
    <div className="animate-badge delay-1000 mt-8">...</div>
  </div>

  {/* Column 2 - Offset Down with Badge Above */}
  <div className="flex flex-col items-center mt-16">
    {/* Badge Above */}
    <div className="animate-badge delay-900 mb-8">...</div>
    <div className="animate-photo delay-700 photo-shimmer ...">...</div>
  </div>
</div>
```

**Photo Card Styling:**
- Dimensions: h-[380px] w-[260px]
- Border radius: rounded-2xl (1rem)
- Ring: ring-2 ring-white/20
- Shadow: shadow-2xl
- Background: bg-gradient-to-b from-gold/5 to-navy-light/20
- Vertical offset for second column: mt-16

#### Trust Badge / Stat Badge Styling

White background badges with gold accent icons and navy text.

```jsx
<div className="animate-badge delay-900">
  <div className="animate-float-up rounded-2xl bg-white px-5 py-3 shadow-xl">
    <div className="flex items-center gap-3">
      {/* Icon Container */}
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-gold to-gold-light shadow-md">
        <span className="text-base font-bold text-navy">15+</span>
      </div>
      {/* Text */}
      <p className="text-sm font-bold text-navy whitespace-nowrap">Ani Experienta</p>
    </div>
  </div>
</div>
```

**Badge Styling:**
- Background: bg-white
- Border radius: rounded-2xl
- Padding: px-5 py-3
- Shadow: shadow-xl
- Icon container: h-10 w-10, rounded-lg, bg-gradient-to-br from-gold to-gold-light
- Text: text-sm font-bold text-navy

#### Inline Trust Badge (Hero Top)

Small badge for section headers.

```jsx
<div className="animate-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-2 ring-1 ring-gold/20">
  <Award className="h-4 w-4 text-gold" />
  <span className="text-sm font-medium text-gold">15+ ani de excelenta juridica</span>
</div>
```

**Inline Badge Styling:**
- Background: bg-gold/10 (10% opacity gold)
- Border radius: rounded-full
- Ring: ring-1 ring-gold/20
- Padding: px-4 py-2
- Icon: h-4 w-4 text-gold

#### CTA Button with Glow Animation

Primary action button with attention-grabbing glow.

```jsx
<Button
  asChild
  size="lg"
  className="group animate-pulse-glow h-14 rounded-full bg-gold px-8 text-base font-semibold text-navy transition-all duration-300 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/30"
>
  <Link href="/contact">
    {t('cta')}
    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
  </Link>
</Button>
```

**CTA Button Styling:**
- Height: h-14
- Border radius: rounded-full
- Background: bg-gold
- Padding: px-8
- Font: text-base font-semibold
- Animation: animate-pulse-glow

#### Secondary CTA (Phone Link)

```jsx
<a
  href="tel:+40261848015"
  className="group flex h-14 items-center gap-3 rounded-full bg-white/5 px-6 ring-1 ring-white/20 transition-all duration-300 hover:bg-white/10 hover:ring-white/40"
>
  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20">
    <Phone className="h-4 w-4 text-gold" />
  </div>
  <div className="text-left">
    <p className="text-xs text-white/50">Suna acum</p>
    <p className="text-sm font-semibold text-white">+40 261-848-015</p>
  </div>
</a>
```

---

### 13.4 Hover Effects

#### Photo Card Hover

Multi-property transition for rich interaction feedback.

```css
/* Base State */
.photo-card {
  transition: all 0.5s ease;
  ring: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); /* shadow-2xl */
}

/* Hover State */
.photo-card:hover {
  transform: translateY(-12px); /* -translate-y-3 */
  ring-color: rgba(208, 156, 17, 0.6); /* ring-gold/60 */
  box-shadow: 0 25px 50px -12px rgba(208, 156, 17, 0.3); /* shadow-gold/30 */
}

/* Inner Image Scale */
.photo-card img {
  transition: transform 0.5s ease;
}

.photo-card:hover img {
  transform: scale(1.05);
}
```

**Tailwind Classes:**
```html
<div className="transition-all duration-500 group-hover:ring-gold/60 group-hover:-translate-y-3 group-hover:shadow-gold/30">
  <Image className="transition-transform duration-500 group-hover:scale-105" />
</div>
```

**Properties Changed on Hover:**
- translateY: -12px (lift effect)
- ring-color: gold/60 (highlight border)
- box-shadow: gold-tinted shadow
- Image scale: 1.05 (subtle zoom)
- Duration: 500ms for smooth animation

#### CTA Button Hover

```css
/* Base State */
.cta-button {
  background: var(--gold);
  transition: all 0.3s ease;
}

/* Hover State */
.cta-button:hover {
  background: var(--gold-light);
  box-shadow: 0 10px 15px -3px rgba(208, 156, 17, 0.3);
}

/* Arrow Icon Animation */
.cta-button .arrow-icon {
  transition: transform 0.3s ease;
}

.cta-button:hover .arrow-icon {
  transform: translateX(4px); /* translate-x-1 */
}
```

**Tailwind Classes:**
```html
<Button className="transition-all duration-300 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/30">
  <ArrowRight className="transition-transform group-hover:translate-x-1" />
</Button>
```

#### Secondary Link Hover

```css
/* Base State */
.secondary-link {
  background: rgba(255, 255, 255, 0.05);
  ring: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

/* Hover State */
.secondary-link:hover {
  background: rgba(255, 255, 255, 0.1);
  ring-color: rgba(255, 255, 255, 0.4);
}
```

**Tailwind Classes:**
```html
<a className="bg-white/5 ring-1 ring-white/20 transition-all duration-300 hover:bg-white/10 hover:ring-white/40">
```

---

### 13.5 Complete Animation Stylesheet

Copy this entire block into your component's `<style jsx>` tag or a dedicated CSS file:

```css
/* === KEYFRAME ANIMATIONS === */

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes photoFadeIn {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes badgeFadeIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes subtle-glow {
  0%, 100% {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  }
  50% {
    box-shadow: 0 8px 40px rgba(208, 156, 17, 0.15);
  }
}

@keyframes float-up {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

@keyframes float-down {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(8px);
  }
}

@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 4px 15px rgba(208, 156, 17, 0.3);
  }
  50% {
    box-shadow: 0 6px 25px rgba(208, 156, 17, 0.6);
  }
}

/* === ANIMATION UTILITY CLASSES === */

.animate-float-up {
  animation: float-up 4s ease-in-out infinite;
}

.animate-float-down {
  animation: float-down 4s ease-in-out infinite;
}

.animate-pulse-glow {
  animation: pulse-glow 1.5s ease-in-out infinite;
}

.animate-fade-in-up {
  animation: fadeInUp 1s ease-out both;
}

.animate-photo {
  animation: photoFadeIn 1.2s ease-out both;
}

.animate-badge {
  animation: badgeFadeIn 0.8s ease-out both;
}

.animate-subtle-glow {
  animation: subtle-glow 4s ease-in-out infinite;
}

/* === SHIMMER EFFECT === */

.photo-shimmer {
  position: relative;
  overflow: hidden;
}

.photo-shimmer::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    105deg,
    transparent 40%,
    rgba(255, 255, 255, 0.03) 45%,
    rgba(255, 255, 255, 0.06) 50%,
    rgba(255, 255, 255, 0.03) 55%,
    transparent 60%
  );
  animation: shimmer 6s ease-in-out infinite;
  pointer-events: none;
}

/* === ANIMATION DELAY UTILITIES === */

.delay-100 { animation-delay: 100ms; }
.delay-200 { animation-delay: 200ms; }
.delay-300 { animation-delay: 300ms; }
.delay-400 { animation-delay: 400ms; }
.delay-500 { animation-delay: 500ms; }
.delay-600 { animation-delay: 600ms; }
.delay-700 { animation-delay: 700ms; }
.delay-800 { animation-delay: 800ms; }
.delay-900 { animation-delay: 900ms; }
.delay-1000 { animation-delay: 1000ms; }
.delay-1100 { animation-delay: 1100ms; }
.delay-1200 { animation-delay: 1200ms; }
```

---

### 13.6 Animation Quick Reference

| Animation | Duration | Easing | Use Case |
|-----------|----------|--------|----------|
| `animate-fade-in-up` | 1s | ease-out | Text, headlines, paragraphs |
| `animate-photo` | 1.2s | ease-out | Photo cards, images |
| `animate-badge` | 0.8s | ease-out | Stat badges, floating elements |
| `animate-float-up` | 4s | ease-in-out | Ambient floating (upward) |
| `animate-float-down` | 4s | ease-in-out | Ambient floating (downward) |
| `animate-pulse-glow` | 1.5s | ease-in-out | Primary CTA buttons |
| `animate-subtle-glow` | 4s | ease-in-out | Featured cards, photos |
| `photo-shimmer` | 6s | ease-in-out | Light sweep on photos |

---

## Summary

This style guide provides a comprehensive foundation for building the Stan Baculescu Law Firm website with:

1. **Professional Color Palette** - Navy and gold conveying trust and prestige
2. **Elegant Typography** - Playfair Display for authority, Inter for readability
3. **Consistent Spacing** - 8px grid system for visual rhythm
4. **Reusable Components** - Cards, buttons, forms with detailed specifications
5. **Responsive Layouts** - Mobile-first patterns for all devices
6. **Tailwind Integration** - Pre-configured for rapid development
7. **Accessibility First** - WCAG AA compliant color contrasts and interactions

**Next Steps for Developers:**
1. Install Tailwind CSS and configure with provided settings
2. Add Playfair Display and Inter fonts
3. Install recommended shadcn/ui components
4. Build components following the specifications
5. Test across all breakpoints
6. Validate accessibility with automated tools

---

*Style Guide Version 1.0 | Created: January 2026 | For: Stan Baculescu Law Firm*
