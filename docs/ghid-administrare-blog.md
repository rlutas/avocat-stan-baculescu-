# Ghid de Administrare Blog

## Cuprins

1. [Introducere](#introducere)
2. [Cerinte Tehnice](#cerinte-tehnice)
3. [Crearea unui Articol Nou](#crearea-unui-articol-nou)
4. [Editarea Articolelor Existente](#editarea-articolelor-existente)
5. [Adaugarea Imaginilor](#adaugarea-imaginilor)
6. [Categorii si Metadata](#categorii-si-metadata)
7. [Publicare si Previzualizare](#publicare-si-previzualizare)
8. [Depanare Probleme Frecvente](#depanare-probleme-frecvente)
9. [Contact Suport Tehnic](#contact-suport-tehnic)

---

## Introducere

Acest ghid va ajuta sa administrati sectiunea de blog a site-ului Stan-Baculescu. Articolele sunt scrise in format MDX (Markdown extins) si sunt stocate in folderul `content/blog/`.

### Ce este MDX?

MDX este un format de scriere care combina:
- **Markdown** - sintaxa simpla pentru formatare text
- **JSX** - posibilitatea de a include componente React (optional)

Nu aveti nevoie de cunostinte de programare pentru a scrie articole!

---

## Cerinte Tehnice

### Software Necesar

1. **Editor de text** - Recomandam:
   - [Visual Studio Code](https://code.visualstudio.com/) (gratuit)
   - [Sublime Text](https://www.sublimetext.com/)
   - Notepad++ (Windows)

2. **Git** - pentru sincronizarea modificarilor (optional, daca lucrati local)

### Acces la Fisiere

Articolele se gasesc in:
```
/content/blog/
```

Fiecare articol este un fisier `.mdx` separat.

---

## Crearea unui Articol Nou

### Pasul 1: Creati un Fisier Nou

1. Deschideti folderul `content/blog/`
2. Creati un fisier nou cu extensia `.mdx`
3. Numele fisierului devine URL-ul articolului

**Exemplu:** `drepturile-pacientului.mdx` → `/blog/drepturile-pacientului`

### Pasul 2: Adaugati Metadata (Frontmatter)

La inceputul fiecarui articol, adaugati informatiile despre articol:

```yaml
---
title: "Titlul Articolului"
slug: "titlul-articolului"
description: "O scurta descriere a articolului (150-160 caractere)"
date: 2026-01-21
author: "Camelia Stan"
authorImage: "/images/team/camelia-stan.webp"
category: "Malpraxis Medical"
locale: ro
image: "/images/blog/nume-imagine.webp"
published: true
---
```

### Explicatia Campurilor

| Camp | Descriere | Obligatoriu |
|------|-----------|-------------|
| `title` | Titlul afisat al articolului | Da |
| `slug` | URL-ul articolului (fara spatii, cu cratime) | Da |
| `description` | Descriere pentru SEO si previzualizare | Da |
| `date` | Data publicarii (format: YYYY-MM-DD) | Da |
| `author` | Numele autorului | Da |
| `authorImage` | Calea catre poza autorului din echipa | Da |
| `category` | Categoria articolului | Da |
| `locale` | Limba: "ro" pentru romana, "en" pentru engleza | Da |
| `image` | Calea catre imaginea principala (format WebP) | Nu |
| `published` | Afiseaza articolul pe site (true/false) | Da |

### Categorii Disponibile

- `Malpraxis Medical` - Malpraxis Medical
- `Drept Civil` - Drept Civil
- `Drept Penal` - Drept Penal
- `Dreptul Familiei` - Dreptul Familiei
- `Dreptul Muncii` - Dreptul Muncii
- `Drept Comercial` - Drept Comercial
- `Accidente Rutiere` - Accidente Rutiere
- `Drept Administrativ si Fiscal` - Drept Administrativ si Fiscal

### Pasul 3: Scrieti Continutul

Dupa frontmatter, scrieti articolul folosind Markdown:

```markdown
---
title: "Drepturile Pacientului in Romania"
slug: "drepturile-pacientului"
description: "Ghid complet despre drepturile pacientilor conform legislatiei romanesti"
date: "2026-01-21"
author: "Camelia Stan"
category: "malpraxis"
locale: "ro"
---

## Introducere

Acest articol prezinta drepturile fundamentale ale pacientilor...

## Dreptul la Informare

Pacientii au dreptul sa fie informati despre:

- Diagnosticul medical
- Tratamentele disponibile
- Riscurile asociate

### Consimtamantul Informat

Inainte de orice procedura medicala, pacientul trebuie sa-si dea **acordul scris**.

> "Consimtamantul informat este obligatoriu pentru toate procedurile medicale invazive."

## Concluzie

Pentru asistenta juridica in cazuri de malpraxis, contactati biroul nostru.
```

---

## Formatare Markdown

### Titluri

```markdown
# Titlu Principal (H1) - folosit o singura data
## Sectiune (H2)
### Subsectiune (H3)
#### Sub-subsectiune (H4)
```

### Text

```markdown
Text normal

**Text bold**

*Text italic*

***Text bold si italic***

~~Text taiat~~
```

### Liste

**Lista cu puncte:**
```markdown
- Element 1
- Element 2
  - Sub-element
  - Alt sub-element
- Element 3
```

**Lista numerotata:**
```markdown
1. Primul pas
2. Al doilea pas
3. Al treilea pas
```

### Link-uri

```markdown
[Text afisat](https://example.com)

[Link catre pagina de contact](/contact)
```

### Citate

```markdown
> Acesta este un citat sau o referinta importanta.
```

### Cod sau Legi

```markdown
`Art. 1357 Cod Civil`

sau bloc de text:

```
Art. 1357 - Conditiile raspunderii
(1) Cel care cauzeaza altuia un prejudiciu printr-o fapta ilicita...
```
```

### Tabele

```markdown
| Coloana 1 | Coloana 2 | Coloana 3 |
|-----------|-----------|-----------|
| Valoare 1 | Valoare 2 | Valoare 3 |
| Valoare 4 | Valoare 5 | Valoare 6 |
```

---

## Adaugarea Imaginilor

### Pasul 1: Pregatiti Imaginea

1. **Format recomandat:** WebP (convertiti din PNG/JPG folosind `cwebp -q 82 input.png -o output.webp`)
2. **Dimensiune:** Maximum 1536x1024 pixeli
3. **Marime fisier:** Sub 500KB pentru performanta

### Pasul 2: Salvati Imaginea

Salvati imaginea in folderul:
```
/public/images/blog/
```

**Denumire fisier:** folositi cratime, fara spatii sau diacritice
- Bine: `drepturile-pacientului-imagine.jpg`
- Gresit: `Drepturile Pacientului Imagine.jpg`

### Pasul 3: Includeti in Articol

```markdown
![Descriere imagine](/images/blog/nume-imagine.jpg)
```

**Exemplu:**
```markdown
![Sala de judecata](/images/blog/sala-judecata.jpg)
```

### Imagine cu Legenda

```markdown
![Descriere imagine](/images/blog/nume-imagine.jpg)
*Aceasta este legenda imaginii*
```

---

## Articole Bilingve (RO/EN)

Pentru a crea versiunea in engleza a unui articol:

1. Creati un fisier nou cu acelasi slug dar `locale: "en"`
2. Traduceti continutul
3. Pastrati aceeasi categorie

**Exemplu:**

Fisier romanesc: `drepturile-pacientului-ro.mdx`
```yaml
---
title: "Drepturile Pacientului"
slug: "drepturile-pacientului"
locale: "ro"
---
```

Fisier englezesc: `drepturile-pacientului-en.mdx`
```yaml
---
title: "Patient Rights"
slug: "drepturile-pacientului"
locale: "en"
---
```

---

## Publicare si Previzualizare

### Previzualizare Locala

1. Rulati serverul de dezvoltare:
   ```bash
   npm run dev
   ```
2. Accesati `http://localhost:3000/blog`
3. Verificati articolul

### Publicare

1. Salvati fisierul `.mdx`
2. Efectuati commit in Git:
   ```bash
   git add content/blog/nume-articol.mdx
   git commit -m "Articol nou: Titlul articolului"
   git push
   ```
3. Asteptati rebuild-ul automat (2-3 minute)

---

## Depanare Probleme Frecvente

### Articolul nu apare pe site

**Cauze posibile:**

1. **Frontmatter invalid**
   - Verificati ca toate campurile obligatorii sunt completate
   - Verificati ghilimelele: folositi `"text"` nu `„text"`

2. **Data gresita**
   - Formatul trebuie sa fie: `YYYY-MM-DD` (ex: `2026-01-21`)
   - Nu folositi alte formate

3. **Slug duplicat**
   - Verificati ca nu exista alt articol cu acelasi slug

### Imaginile nu se incarca

**Solutii:**

1. Verificati calea: trebuie sa inceapa cu `/images/blog/`
2. Verificati numele fisierului (fara spatii sau diacritice)
3. Verificati extensia (`.jpg`, `.png`, `.webp`)

### Erori de formatare

**Probleme comune:**

1. **Frontmatter:** Asigurati-va ca exista `---` la inceput si sfarsit
2. **Titluri:** Lasati un rand gol dupa titluri
3. **Liste:** Lasati un rand gol inainte si dupa liste

### Textul apare incorect

- Verificati codificarea fisierului: trebuie sa fie **UTF-8**
- In VS Code: vezi bara de jos, click pe encoding si alege "UTF-8"

---

## Sfaturi pentru SEO

### Titlu

- Lungime ideala: 50-60 caractere
- Includeti cuvinte cheie relevante
- Faceti-l atractiv pentru cititori

### Descriere

- Lungime ideala: 150-160 caractere
- Rezumat clar al continutului
- Includeti un apel la actiune

### Continut

- Folositi titluri (H2, H3) pentru structura
- Paragrafele sa aiba 2-3 propozitii
- Includeti link-uri catre alte articole sau pagini
- Adaugati imagini relevante

### URL (Slug)

- Folositi cuvinte cheie
- Separati cu cratime
- Evitati caractere speciale si diacritice

---

## Contact Suport Tehnic

### Pentru Probleme Tehnice

**Email:** [developer contact - to be configured]

### Pentru Intrebari despre Continut

**Email:** office@stanbaculescu.ro

### Ore de Suport

Luni - Vineri: 09:00 - 17:00

### Informatii de Inclus in Cerere

Cand contactati suportul tehnic, includeti:

1. Descrierea problemei
2. Numele fisierului afectat
3. Captura de ecran (daca este cazul)
4. Pasii pentru reproducerea problemei

---

## Anexa: Sablon Articol

Copiati acest sablon pentru articole noi:

```markdown
---
title: "Titlul Articolului"
slug: "titlul-articolului"
description: "Descriere scurta pentru SEO (150-160 caractere)"
date: 2026-01-21
author: "Camelia Stan"
authorImage: "/images/team/camelia-stan.webp"
category: "Malpraxis Medical"
locale: ro
image: "/images/blog/imagine-articol.webp"
published: true
---

## Introducere

Introducere in subiectul articolului...

## Sectiunea Principala

Continutul principal al articolului...

### Subsectiune

Detalii suplimentare...

## Concluzie

Rezumat si apel la actiune...

---

Pentru asistenta juridica, contactati-ne la [contact](/contact).
```

---

*Ultima actualizare: 4 Martie 2026*
