# Sistemul de Blog - Documentatie Completa

Ultima actualizare: 5 Martie 2026

---

## 1. Prezentare Generala

Blogul SCA Stan-Baculescu este construit pe urmatoarea arhitectura:

- **Velite** -- compileaza fisierele MDX din `content/blog/` in date statice (output in `.velite/`)
- **MDX** -- permite scrierea continutului in Markdown cu componente React custom (KeyPoints, Callout, LegalCitation)
- **rehype-slug** -- genereaza automat id-uri pe heading-uri (necesare pentru Table of Contents si anchor links)
- **next-intl** -- gestioneaza limba (RO/EN) cu traduceri in `messages/ro.json` si `messages/en.json`
- **Server Components** -- paginile (`page.tsx`) sunt Server Components care filtreaza articolele dupa `locale` si `published`
- **Client Components** -- toate componentele de UI din `components/blog/` sunt Client Components (`'use client'`)

**Fluxul datelor:**

```
content/blog/*.mdx
    |
    v
velite.config.ts (compilare MDX + schema validare)
    |
    v
.velite/ (date compilate, importate ca `#site/content`)
    |
    v
app/[locale]/blog/page.tsx (lista articole, filtrate dupa locale)
app/[locale]/blog/[slug]/page.tsx (articol individual)
    |
    v
components/blog/* (randare UI)
```

---

## 2. Structura Fisierelor

```
content/
  blog/
    drepturile-pacientului-malpraxis.mdx      # RO - Malpraxis
    patient-rights-malpractice.mdx            # EN - Malpractice
    procedura-divortului-romania.mdx          # RO - Divort
    divorce-procedure-romania.mdx             # EN - Divorce
    drepturile-angajatului-concediere.mdx     # RO - Concediere
    employee-rights-dismissal.mdx             # EN - Dismissal

public/images/blog/
    malpraxis-medical.webp                    # Imagine articol malpraxis
    divort.webp                               # Imagine articol divort
    dreptul-muncii.webp                       # Imagine articol dreptul muncii

app/[locale]/blog/
    page.tsx                  # Pagina lista articole (Server Component)
    [slug]/page.tsx           # Pagina articol individual (Server Component)

components/blog/
    index.ts                  # Barrel exports
    blog-article.tsx          # Componenta principala articol (Client)
    blog-card.tsx             # Card articol pentru grid (Client)
    blog-grid.tsx             # Grid articole cu paginare si filtrare (Client)
    blog-list-client.tsx      # Wrapper client cu state (categorie, pagina)
    blog-hero.tsx             # Hero sectiune pagina blog
    blog-cta.tsx              # CTA la finalul listei
    related-articles.tsx      # Articole similare (aceeasi categorie)
    social-share.tsx          # Butoane distribuire (Facebook, Twitter, LinkedIn, copy)
    table-of-contents.tsx     # Cuprins auto-generat din H2
    author-bio.tsx            # Bio autor cu date hardcodate
    key-points.tsx            # Componenta MDX - Puncte Cheie
    callout.tsx               # Componenta MDX - Callout (info/warning)
    legal-citation.tsx        # Componenta MDX - Citatie legala

lib/mdx.ts                   # Runtime MDX (useMDXComponent)
velite.config.ts              # Configurare Velite + schema colectii

messages/ro.json              # Traduceri RO (sectiunea "BlogPage")
messages/en.json              # Traduceri EN (sectiunea "BlogPage")
```

---

## 3. Cum sa Scrii un Articol Nou

### Pasul 1: Creeaza fisierul MDX

Creeaza un fisier nou in `content/blog/`. Numele fisierului devine slug-ul (fara extensia `.mdx`).

**Conventie de numire:**
- RO: `subiect-descriptiv-in-romana.mdx` (ex: `drepturile-pacientului-malpraxis.mdx`)
- EN: `descriptive-subject-in-english.mdx` (ex: `patient-rights-malpractice.mdx`)

### Pasul 2: Adauga frontmatter

Fiecare articol incepe cu un bloc frontmatter YAML delimitat de `---`. Toate campurile sunt obligatorii, cu exceptia celor marcate ca optionale.

```yaml
---
title: "Titlul Articolului"                          # OBLIGATORIU - max 99 caractere
slug: "slug-ul-articolului"                           # OBLIGATORIU - trebuie sa coincida cu numele fisierului
description: "Descrierea scurta a articolului"        # OBLIGATORIU - max 200 caractere (folosit in meta/SEO)
date: 2026-03-05                                      # OBLIGATORIU - format ISO (YYYY-MM-DD)
author: "Camelia Stan"                                # OBLIGATORIU - trebuie sa existe in authorData din author-bio.tsx
authorImage: "/images/team/camielia-stan.webp"        # OPTIONAL - calea catre poza autorului
category: "Malpraxis Medical"                         # OBLIGATORIU - folosit pentru filtrare si articole similare
image: "/images/blog/malpraxis-medical.webp"          # OPTIONAL - imagine articol (featured image)
locale: ro                                            # OBLIGATORIU - "ro" sau "en"
published: true                                       # OPTIONAL - default true, pune false pentru draft
---
```

**Autori disponibili** (definiti in `author-bio.tsx`):
| Nume | Rol | `authorImage` |
|------|-----|---------------|
| Camelia Stan | Avocat Fondator | `/images/team/camielia-stan.webp` |
| Vlad Baculescu | Avocat Fondator | `/images/team/vlad-baculescu.webp` |
| Diana Antonia Chincea | Avocat Colaborator | `/images/team/diana-chincea.webp` |
| Cristina Blan | Avocat Colaborator | `/images/team/cristina-blan.webp` |
| Alexandra Rusu | Avocat Colaborator | `/images/team/alexandra-rusu.webp` |
| Diana Veres | Relatii Clienti | `/images/team/diana-veres.webp` |

**NOTA:** Daca adaugi un autor nou, trebuie adaugat si in obiectul `authorData` din `components/blog/author-bio.tsx`.

**Categorii existente:**
- RO: `Malpraxis Medical`, `Dreptul Familiei`, `Dreptul Muncii`
- EN: `Medical Malpractice`, `Family Law`, `Employment Law`

Poti crea categorii noi -- apar automat ca filtre pe pagina blog.

### Pasul 3: Scrie continutul

Dupa frontmatter, scrie continutul in format Markdown. Foloseste H2 (`##`) pentru sectiunile principale si H3 (`###`) pentru subsectiuni.

```markdown
## Aceasta este o sectiune principala

Text introductiv al sectiunii. Textul **bold** apare in navy.
Linkurile se coloreaza automat in gold.

### Aceasta este o subsectiune

- Element lista cu bullet gold (diamond)
- Alt element

1. Element lista numerotata cu numar gold
2. Alt element

> Acesta este un blockquote -- apare cu border gold si background crem

| Coloana 1 | Coloana 2 |
|-----------|-----------|
| Date      | Date      |
```

### Pasul 4: Adauga imagine articol

1. Converteste imaginea in WebP: `cwebp -q 82 imagine.jpg -o imagine.webp`
2. Pune fisierul in `public/images/blog/`
3. Referentiaza in frontmatter: `image: "/images/blog/imagine.webp"`

Dimensiune recomandata: aspect ratio 21:9 (ex: 1260x540 px). Imaginea apare ca "featured image" sub hero.

### Pasul 5: Creeaza versiunea in cealalta limba

Pentru fiecare articol RO, creeaza echivalentul EN (si invers). Articolul EN trebuie sa aiba:
- Acelasi `date`, `authorImage`
- `locale: en`
- `slug`, `title`, `description`, `category` traduse in engleza

### Pasul 6: Adauga slug mapping pentru hreflang

In `app/[locale]/blog/[slug]/page.tsx`, adauga perechea de slug-uri in obiectul `blogSlugPairs`:

```typescript
const blogSlugPairs: Record<string, string> = {
  // RO -> EN
  'slug-ul-romanesc': 'english-slug',
  // EN -> RO
  'english-slug': 'slug-ul-romanesc',
  // ... perechile existente
};
```

**IMPORTANT:** Maparea trebuie sa fie bidirectionala (ambele directii).

### Pasul 7: Rebuild

Ruleaza `npm run build` (sau `npm run dev` in development). Velite compileaza automat fisierele MDX noi.

---

## 4. Componente Disponibile in MDX

Aceste componente pot fi folosite direct in fisierele MDX, fara import. Sunt inregistrate automat prin `mdxComponents` in `blog-article.tsx`.

### KeyPoints

Afiseaza o caseta cu puncte cheie, cu gradient navy-to-gold in partea de sus si icon de balanta.

**Props:**
| Prop | Tip | Obligatoriu | Descriere |
|------|-----|-------------|-----------|
| `children` | `ReactNode` | Da | Continutul (de regula o lista `<ul>`) |

**Exemplu MDX:**

```mdx
<KeyPoints>
- Termenul de prescriptie pentru malpraxis este de 3 ani
- Sesizarea Comisiei de monitorizare este obligatorie
- Despagubirile pot include daune materiale si morale
- Asigurarea de malpraxis a medicului acopera partial daunele
</KeyPoints>
```

**Vizual:** Caseta cu background navy deschis, border navy subtil, bara gradient navy-gold in partea de sus, titlu "Puncte Cheie" cu icon Scale, si lista cu diamond bullets gold.

---

### Callout

Afiseaza o caseta de informatie sau avertisment, cu border lateral colorat.

**Props:**
| Prop | Tip | Obligatoriu | Descriere |
|------|-----|-------------|-----------|
| `type` | `'info' \| 'warning'` | Da | Tipul callout-ului |
| `title` | `string` | Nu | Titlu custom (default: "Informatie" / "Atentie") |
| `children` | `ReactNode` | Da | Continutul |

**Exemplu MDX (info):**

```mdx
<Callout type="info">
Comisia de monitorizare si competenta profesionala functioneaza in cadrul
Directiei de Sanatate Publica a fiecarui judet si este formata din
5 membri: 3 medici si 2 juristi.
</Callout>
```

**Exemplu MDX (warning cu titlu custom):**

```mdx
<Callout type="warning" title="Termen important">
Termenul de prescriptie pentru actiunea in malpraxis este de **3 ani**
de la data la care pacientul a cunoscut sau ar fi trebuit sa cunoasca
prejudiciul suferit.
</Callout>
```

**Vizual:**
- **info** -- border stanga navy, background navy deschis, icon Info, titlu navy
- **warning** -- border stanga gold, background gold deschis, icon AlertTriangle, titlu gold

---

### LegalCitation

Afiseaza o citatie din legislatie, cu simbolul paragraf (§) decorativ in stanga.

**Props:**
| Prop | Tip | Obligatoriu | Descriere |
|------|-----|-------------|-----------|
| `source` | `string` | Nu | Sursa citatiei (apare sub text, in gold, uppercase) |
| `children` | `ReactNode` | Da | Textul citatiei |

**Exemplu MDX:**

```mdx
<LegalCitation source="Art. 642, Legea nr. 95/2006">
Malpraxisul medical este eroarea profesionala savarsita in exercitarea
actului medical sau medico-farmaceutic, generatoare de prejudicii asupra
pacientului.
</LegalCitation>
```

**Vizual:** Caseta cu background navy deschis, simbolul § mare gold in stanga, text italic navy, sursa in gold uppercase sub text.

---

## 5. Stilizare CSS (.blog-content)

Toate stilurile articolului sunt definite in `app/globals.css` sub clasa `.blog-content`. Elementele sunt stilizate automat -- nu trebuie adaugate clase manual in MDX.

### Elemente stilizate

| Element | Stilizare |
|---------|-----------|
| `h2` | Font Playfair Display, navy, border stanga 4px gold, padding-left. Responsive: 1.625rem / 1.875rem |
| `h3` | Font Playfair Display, navy, linie gold 2.5rem sub titlu (pseudo-element `::after`) |
| `h4` | Font Playfair Display, navy, 1.125rem |
| `p` | Gri (#374151), line-height 1.85, font-size responsive 1rem / 1.0625rem |
| `p:first-child` | Primul paragraf mai mare (1.125rem / 1.1875rem) -- efect de "lead paragraph" |
| `a` | Gold, font-weight 600, underline subtil gold cu hover |
| `strong` | Navy, bold |
| `ul` | Lista cu diamond bullets gold (patrate rotite 45deg) |
| `ul ul` | Lista nested cu diamond bullets outline (border gold, fara fill) |
| `ol` | Lista numerotata cu numere gold pe fundal gold deschis (rounded square) |
| `blockquote` | Border stanga gold, background crem gradient, text Playfair Display navy |
| `table` | Header navy cu text alb, randuri alternate (#f8f9fa), hover gold subtil |
| `hr` | Linie gradient gold cu diamond gold in centru |
| `code` (inline) | Background gri, text navy, border subtil |
| `pre` (code block) | Background #1f2937, text deschis, border-radius 0.75rem |
| `img` | Border-radius 0.75rem, shadow subtil |
| `h2[id]` | scroll-margin-top 5rem (pentru anchor links sub header fix) |

---

## 6. Table of Contents (Cuprins)

**Componenta:** `components/blog/table-of-contents.tsx`

Cuprinsul se genereaza automat din toate heading-urile `## ` (H2) din continutul brut (raw) al articolului.

**Cum functioneaza:**
1. Primeste `content` (raw MDX text) ca prop
2. Extrage toate H2 cu regex: `^## (.+)$`
3. Genereaza slug-uri din text (lowercase, fara diacritice, spatii devin cratima)
4. Randeaza o lista numerotata cu link-uri ancora catre fiecare H2
5. `rehype-slug` (din velite.config.ts) adauga automat `id` pe heading-uri in HTML-ul compilat

**Vizual:** Caseta gri deschis cu border, titlu "Cuprins" cu icon List, lista numerotata cu numere gold.

**NOTA:** Cuprinsul apare DOAR daca articolul are cel putin un H2. Daca nu exista niciun H2, componenta returneaza `null`.

**Slugify:** Functia de slugify scoate diacriticile, transforma in lowercase si inlocuieste spatiile cu cratime. Exemplu:
- "Drepturile pacientului conform Legii nr. 46/2003" devine `drepturile-pacientului-conform-legii-nr-462003`

---

## 7. Author Bio (Biografia Autorului)

**Componenta:** `components/blog/author-bio.tsx`

Apare la finalul fiecarui articol, sub continut si deasupra butoanelor de share.

**Date autori:** Sunt definite static in obiectul `authorData` din componenta. Pentru a adauga un autor nou:

1. Deschide `components/blog/author-bio.tsx`
2. Adauga o intrare noua in `authorData`:

```typescript
const authorData: Record<string, { role: string; bio: string }> = {
  // ... autori existenti
  'Nume Prenume': {
    role: 'Rolul in firma',
    bio: 'Descrierea scurta a autorului, experienta si specializare.',
  },
};
```

3. Asigura-te ca valoarea `author` din frontmatter corespunde exact cheii din `authorData`

**NOTA:** Daca `name` nu exista in `authorData`, componenta returneaza `null` (nu afiseaza nimic).

---

## 8. Schema SEO

Fiecare articol genereaza automat doua structuri JSON-LD:

### Article Schema

Generata in `app/[locale]/blog/[slug]/page.tsx`:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Titlul articolului",
  "description": "Descrierea articolului",
  "image": "https://stanbaculescu.ro/images/blog/imagine.webp",
  "datePublished": "2026-01-15",
  "dateModified": "2026-01-15",
  "author": {
    "@type": "Person",
    "name": "Camelia Stan"
  },
  "publisher": {
    "@id": "https://stanbaculescu.ro/#organization"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://stanbaculescu.ro/ro/blog/slug-articol"
  }
}
```

### BreadcrumbList Schema

Generata prin componenta `BreadcrumbSchema`:

```
Acasa > Blog > Titlul Articolului
```

### OpenGraph & Twitter Cards

Generate automat din frontmatter in `generateMetadata`:
- `og:type` = "article"
- `og:published_time` = data articolului
- `og:authors` = autorul
- `twitter:card` = "summary_large_image"

---

## 9. Hreflang (Cross-Locale Slug Mapping)

Sistemul de hreflang permite motoarelor de cautare sa inteleaga legatura dintre articolele RO si EN.

**Unde se configureaza:** `app/[locale]/blog/[slug]/page.tsx` -- obiectul `blogSlugPairs`

```typescript
const blogSlugPairs: Record<string, string> = {
  // RO -> EN
  'drepturile-pacientului-malpraxis': 'patient-rights-malpractice',
  'procedura-divortului-romania': 'divorce-procedure-romania',
  'drepturile-angajatului-concediere': 'employee-rights-dismissal',
  // EN -> RO (bidirectional)
  'patient-rights-malpractice': 'drepturile-pacientului-malpraxis',
  'divorce-procedure-romania': 'procedura-divortului-romania',
  'employee-rights-dismissal': 'drepturile-angajatului-concediere',
};
```

**Ce genereaza:** Tag-uri `<link rel="alternate" hreflang="...">` in metadata:
- `hreflang="ro-RO"` -- URL articol romanesc
- `hreflang="en-US"` -- URL articol englezesc
- `hreflang="x-default"` -- URL articol romanesc (default)

**Daca un articol nu are pereche:** Slug-ul ramane acelasi pentru ambele limbi (fallback). Dar este recomandat sa existe intotdeauna perechea.

---

## 10. Articole Similare (Related Articles)

**Componenta:** `components/blog/related-articles.tsx`

Se afiseaza automat la finalul fiecarui articol. Logica de selectie (din `[slug]/page.tsx`):

1. Aceeasi `locale` cu articolul curent
2. `published: true`
3. Aceeasi `category` cu articolul curent
4. Slug diferit de articolul curent
5. Sortate descrescator dupa data
6. Maxim **3 articole**

Daca nu exista articole similare (ex: singura categorie), sectiunea nu se afiseaza.

---

## 11. Paginare si Filtrare

**Componenta:** `components/blog/blog-list-client.tsx`

- **Paginare:** 6 articole pe pagina (configurabil prin prop `postsPerPage`)
- **Filtrare:** Butoane cu categorii (extrase automat din articolele existente)
- **Comportament:** La schimbarea categoriei, pagina revine la 1
- **State:** Totul se gestioneaza client-side (useState)

---

## 12. Social Share

**Componenta:** `components/blog/social-share.tsx`

Butoane de distribuire la finalul articolului:
- **Facebook** -- sharer.php
- **Twitter/X** -- intent/tweet
- **LinkedIn** -- shareArticle
- **Copy Link** -- clipboard API cu fallback

URL-ul se obtine din `window.location.href` in `useEffect` (pentru a evita hydration mismatch).

---

## 13. Checklist Articol Nou

Inainte de a publica un articol nou, verifica urmatoarele:

### Fisier MDX
- [ ] Fisier creat in `content/blog/` cu nume descriptiv (va deveni slug)
- [ ] Frontmatter complet: `title`, `slug`, `description`, `date`, `author`, `category`, `locale`
- [ ] `slug` corespunde cu numele fisierului (fara `.mdx`)
- [ ] `title` max 99 caractere
- [ ] `description` max 200 caractere (apare in meta SEO si pe card)
- [ ] `author` exista in `authorData` din `author-bio.tsx`
- [ ] `locale` setat corect (`ro` sau `en`)
- [ ] `published: true` (sau omis -- default este true)

### Imagine
- [ ] Imagine convertita in WebP (`cwebp -q 82`)
- [ ] Plasata in `public/images/blog/`
- [ ] Referentiata in frontmatter (`image: "/images/blog/..."`)
- [ ] Aspect ratio recomandat 21:9

### Continut
- [ ] Articolul incepe cu un paragraf introductiv (fara heading)
- [ ] Sectiunile principale folosesc `##` (H2) -- apar in Table of Contents
- [ ] Subsectiunile folosesc `###` (H3)
- [ ] Citatiile legale folosesc componenta `<LegalCitation>` sau bold + referinta
- [ ] Informatii importante in `<Callout type="info">` sau `<Callout type="warning">`
- [ ] Punctele cheie sumarizate in `<KeyPoints>`

### Traducere si Hreflang
- [ ] Versiunea in cealalta limba creata (RO si EN)
- [ ] Slug mapping adaugat in `blogSlugPairs` (bidirectional)
- [ ] Categoriile sunt traduse corespunzator

### Verificare finala
- [ ] `npm run build` ruleaza fara erori
- [ ] Articolul apare pe pagina blog (`/ro/blog` sau `/en/blog`)
- [ ] Table of Contents generat corect
- [ ] Author Bio afisat
- [ ] Articole similare afisate (daca exista altele in aceeasi categorie)
- [ ] Schema JSON-LD verificata (Chrome DevTools > Elements > script[type="application/ld+json"])
- [ ] Meta tags verificate (og:title, og:description, og:image)

---

## Referinte Rapide

### Structura minimala fisier MDX

```mdx
---
title: "Titlul Articolului"
slug: "titlul-articolului"
description: "Descriere scurta pentru SEO, max 200 caractere."
date: 2026-03-05
author: "Camelia Stan"
authorImage: "/images/team/camielia-stan.webp"
category: "Malpraxis Medical"
image: "/images/blog/imagine.webp"
locale: ro
published: true
---

Paragraf introductiv care descrie pe scurt subiectul articolului.
Acesta va fi afisat cu font usor mai mare (efect lead paragraph).

## Prima Sectiune

Continut sectiune...

### Subsectiune

Continut subsectiune...

<KeyPoints>
- Punct cheie 1
- Punct cheie 2
- Punct cheie 3
</KeyPoints>

## A Doua Sectiune

Continut...

<LegalCitation source="Art. 123, Legea nr. 456/2007">
Textul citatiei din legislatie.
</LegalCitation>

<Callout type="warning" title="Termen limita">
Descrierea unui termen sau avertisment important.
</Callout>

## Concluzii

Paragraf de incheiere cu recomandari.
```
