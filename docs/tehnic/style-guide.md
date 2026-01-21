# Stan Baculescu Law Firm - Style Guide

> **Design Philosophy:** Professional elegance meets modern accessibility. Inspired by the Lawfor aesthetic with dark navy sophistication, gold accents for prestige, and clean white spaces for clarity.

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

#### Primary Button (Gold CTA)
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

#### Mobile Menu
```css
.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #003a70;
  padding: 2rem;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: 100;
}

.mobile-menu.active {
  transform: translateX(0);
}

.mobile-menu-link {
  display: block;
  font-family: var(--font-body);
  font-size: 1.5rem;
  font-weight: 500;
  color: #ffffff;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  text-decoration: none;
  transition: color 0.3s ease;
}

.mobile-menu-link:hover {
  color: #d09c11;
}
```

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

```html
<section class="hero">
  <div class="hero-overlay"></div>
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
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #002a52 0%, #003a70 50%, #004a8f 100%);
  background-image: url('/images/hero-bg.jpg');
  background-size: cover;
  background-position: center;
  padding: 4rem 2rem;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(0, 58, 112, 0.9) 0%, rgba(0, 58, 112, 0.7) 100%);
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
              <p>123 Legal Street, City</p>
            </div>
          </div>

          <div class="contact-detail-item">
            <div class="contact-icon">📞</div>
            <div>
              <h4>Phone</h4>
              <p>+40 123 456 789</p>
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
