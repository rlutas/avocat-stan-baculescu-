# Confirmare Livrare Finala — Website Stan-Baculescu

**Data:** 26 martie 2026
**Contract:** WEB0001/2026
**Client:** Societate Civila de Avocati Stan-Baculescu
**Prestator:** eDigitalizare S.R.L.
**Website:** [stanbaculescu.ro](https://stanbaculescu.ro)

---

## 1. Rezumat

Website-ul pentru Societatea Civila de Avocati Stan-Baculescu este **complet livrat si LIVE** de la data de **25 martie 2026** pe domeniul `stanbaculescu.ro`. Platforma este functionala pe toate dispozitivele (desktop, tableta, mobil), bilingva (romana/engleza), cu SEO optimizat, tracking complet si formular de contact operational cu notificari email.

Toate obligatiile contractuale din **Articolul 1A (Dezvoltare Website)** au fost indeplinite integral, iar pe langa acestea au fost livrate gratuit **24 de extras-uri** cu o valoare estimata de **3.150-4.700 EUR**.

### Ultima actualizare: 10 august 2026

- Publicat **articol nou de blog** semnat de av. Camelia Stan — *"Cumperi un apartament de la dezvoltator? Iata etapele pe care trebuie sa le cunosti"* (Legea nr. 207/2025 — "Legea Nordis": rezervare, promisiune de vanzare-cumparare, contract de vanzare). Bilingv RO + EN, categorie noua **Drept Civil / Civil Law**, imagine featured dedicata (WebP 1680x720, 52 KB), mapare hreflang RO<->EN. Textul redactat de client a fost pastrat integral; a fost reconstruita o singura fraza deteriorata la copiere (penalitati / conditii de reziliere / modalitate de plata) — de confirmat cu autoarea. **Dedus 1 articol** din cele 12 contractate (Art. 1B.1)
- Total blog: **5 articole RO + 5 EN = 10** (de la 8). Raman **7 articole** de livrat pana in martie 2027
- Remediata o eroare latenta in randarea articolelor (`components/blog/blog-article.tsx`) — componentele MDX (Callout, Puncte Cheie, Citatie legala) erau definite dar nu erau transmise catre continut, iar orice articol care le folosea returna eroare 500. Problema nu se manifestase pana acum pentru ca niciun articol existent nu folosea aceste componente

### Actualizare anterioara: 19 mai 2026

- Productie **video reclama generala "Aveti nevoie de un avocat?"** — campanie noua complementara campaniei penale, design refacut conform brand-ului site-ului (Playfair Display + Inter, navy + gold, fara glow-uri aurii), CTA static cu detalii contact si buton "Contacteaza-ne acum" animat, poza echipei full-body pe vertical, 4 formate planificate (vertical 9:16, portrait 4:5, square 1:1, horizontal 16:9), 2 randate HQ pana acum (vertical + square) + muzica corporate-cinematic (Pixabay) + reorganizare structura `remotion-video/` pe campanii (per-campaign folders pentru intretinere). Dedus **5 posturi** din bonusul de 60 (Art. 1B.2)
- Productie **video reclama Drept Penal "Ai fost chemat la Politie"** — 4 formate (vertical 9:16, portrait 4:5, square 1:1, horizontal 16:9) + voiceover RO neural (Emil + Alina A/B) + design polish multiple iteratii + ghid complet de postare social media + Google Ads. Dedus **5 posturi** din bonusul de 60 (Art. 1B.2)
- Publicate **3 posturi suplimentare pe Facebook** post-lansare — deduse din bonusul de 60 posturi
- Total post-lansare: **6 posturi publicate pe Facebook** (3 reels anterior + 3 posturi noi) si **32 posturi deduse pentru productie**. Raman **22 posturi** (4 Facebook + 8 Instagram + 10 TikTok)

### Actualizare: 21 aprilie 2026

- Publicate **3 reels suplimentare pe Facebook** — deduse din bonusul de 60 posturi (Art. 1B.2)
- Confirmat: tranșele 1 și 2 facturate și încasate. Rămâne de facturat doar tranșa 3 (1.058,75 EUR) la lansare
- Actualizat profil Camelia Stan conform documentului revizuit de client (13 specializari, experienta reformulata, descriere corectata)
- Inlocuit prescurtarea "SCA Stan-Baculescu" cu denumirea completa "Societatea Civila de Avocati Stan-Baculescu" pe intreg site-ul (~50 locuri)
- Email unificat la office@stanbaculescu.ro pentru toti avocatii
- Redenumit specializari consistent la toti avocatii (sentence case, denumiri actualizate)
- Imbunatatit lizibilitatea textelor pe mobil la paginile de servicii (hyphens, text-pretty)
- Completat FAQ gol la Dreptul Familiei (partajul bunurilor la divort)
- Optimizat incarcarea paginii principale (preload imagini, eliminare flash la load)
- Corectat erori consola (slug-uri imagini, icon lipsa)

---

## 2. Livrabile Contract — Art. 1A (Dezvoltare Website)

### 2.1 Structura si Pagini

| # | Deliverable (Contract) | Status | Detalii |
|---|---|---|---|
| 1 | Homepage | ✅ Livrat | Hero animat, servicii, metodologie, echipa, testimoniale, video, CTA |
| 2 | Pagina Despre Noi | ✅ Livrat | Prezentare firma, valori, galerie foto, testimoniale |
| 3 | Pagina Echipa + 6 pagini individuale | ✅ Livrat | 2 fondatori + 3 colaboratori + 1 relatii clienti, profile detaliate |
| 4 | Pagina Servicii + 8 pagini individuale | ✅ Livrat | 8 contractate + **5 EXTRA** = 13 total (vezi Sect. 3) |
| 5 | Pagina Blog | ✅ Livrat | 5 articole RO + 5 EN = 10 total, MDX CMS, cuprins, progress bar |
| 6 | Pagina Contact | ✅ Livrat | Formular complex + Google Maps + date contact |

### 2.2 Functionalitati Tehnice

| Deliverable (Contract) | Status | Detalii |
|---|---|---|
| Design responsive | ✅ Livrat | Mobile-first, testat 320px - 4K |
| Bilingv RO/EN | ✅ Livrat | next-intl complet, hreflang pe toate paginile |
| SEO complet | ✅ Livrat | Meta tags, structured data JSON-LD, sitemap XML, robots.txt, llms.txt |
| Google Analytics | ✅ Livrat | GA4 `G-PRRH0P8T6D` prin GTM `GTM-TJPF6G9N` |
| Google Maps | ✅ Livrat | Harta interactiva pe pagina Contact |
| Testimoniale Google Reviews | ✅ Livrat | Sectiune pe homepage + Despre Noi, link Google My Business |
| Social media links | ✅ Livrat | Facebook, Instagram, TikTok — actualizate 26.03.2026 |
| Formular contact anti-spam | ✅ Livrat | React Hook Form + Zod + rate limiting 5 req/h/IP + honeypot |
| Notificari email | ✅ Livrat | Resend API — notificare birou + confirmare automata client |
| GDPR compliance | ✅ Livrat | Privacy Policy, Cookie Policy, Termeni si Conditii, Cookie Consent Banner |
| Pagina 404 custom | ✅ Livrat | Cu navigatie utila si catch-all route |
| Documentatie blog | ✅ Livrat | Ghid complet administrare blog in romana |

### 2.3 Livrabile la Finalizare (Anexa 1, Sectiunea 4)

| Deliverable (Contract) | Status | Detalii |
|---|---|---|
| Website live pe stanbaculescu.ro | ✅ Livrat | Live din 25.03.2026 |
| Acces cod sursa GitHub | ✅ Livrat | Repository privat GitHub |
| Acces panou hosting Vercel | ✅ Livrat | Dashboard Vercel configurat |
| Documentatie actualizare blog | ✅ Livrat | `docs/ghid-administrare-blog.md` |
| Training utilizare (30 minute) | ✅ Livrat | Sesiune efectuata |

**Concluzie Art. 1A: TOATE obligatiile contractuale au fost indeplinite 100%.**

---

## 3. Extra Livrat GRATUIT (in afara contractului)

Urmatoarele lucrari au fost realizate **integral gratuit**, ca bonus pentru colaborarea pe termen lung:

| # | Deliverable Extra | Valoare Estimata |
|---|---|---|
| 1 | **5 Servicii noi** — pagini complete bilingve: Achizitii Publice, Drept Contraventional, Dreptul Asigurarilor, Practician in Insolventa, Arbitraj Intern | 500-750 EUR |
| 2 | **Sectiune video prezentare homepage** — comprimat 344MB la 14MB, lazy load, click-to-play | 200-300 EUR |
| 3 | **Buton WhatsApp sticky** — contact rapid pe toate paginile, mesaj pre-completat | 100-150 EUR |
| 4 | **Diacritice complete limba romana** — tot site-ul, toate paginile si sectiunile | 200-300 EUR |
| 5 | **Favicon + OG Image profesional** — ICO, PNG, Apple Touch Icon, Web Manifest | 50-100 EUR |
| 6 | **Profile avocati extinse** — Decan Barou, YouTube, 7 articole presa, LinkedIn | 200-300 EUR |
| 7 | **Imbunatatiri UI/UX** — butoane hero mobile, CTA responsive, linii gold, callout colaborare | 150-200 EUR |
| 8 | **Migrare WordPress** — 75 redirecturi 301, analiza Search Console, articol migrat | 200-300 EUR |
| 9 | **GDPR compliance update** — GTM, GA4, Facebook Pixel documentate in politici | 100-150 EUR |
| 10 | **Tracking avansat** — GTM `GTM-TJPF6G9N`, GA4, 17 tag-uri, consent mode, enhanced conversions | 150-200 EUR |
| 11 | **Export texte editabile** — 11 fisiere DOCX, script regenerare | 100-150 EUR |
| 12 | **Import texte revizuite de avocati** — 6 fisiere, 8 typo-uri corectate, RO+EN | 100-150 EUR |
| 23 | **Actualizare profil Camelia Stan + branding** — 13 specializari, eliminare SCA, email unificat, mobile UX | 100-150 EUR |
| 13 | **Galerie foto profesionala** — 12 poze cu lightbox pe Despre Noi | 100-150 EUR |
| 14 | **Testimoniale pe Despre Noi** — reutilizare componenta Google Reviews | 50 EUR |
| 15 | **Semnaturi email profesionale HTML** — 6 semnaturi individuale echipa | 100-150 EUR |
| 16 | **Configurare DNS/MX/SPF** — email fix dupa migrare nameservers la Vercel | 50-100 EUR |
| 17 | **Google Ads RSA campaign copy** — 3 ad groups, 15 headlines fiecare, sitelinks, callouts | 200-300 EUR |
| 18 | **Facebook Ads video promo guide** — 5 variante ad copy, targeting, setup pas cu pas | 100-150 EUR |
| 19 | **Video promotional Remotion** — 3 formate (vertical, square, horizontal), 30 sec, muzica | 300-500 EUR |
| 20 | **Social media launch posts** — Facebook, Instagram, TikTok, LinkedIn | 100-150 EUR |
| 21 | **Google My Business optimizare completa** — descriere, servicii, poze, video, postare, Q&A | 100-150 EUR |
| 22 | **Schema markup** — Organization, LegalService, BreadcrumbList, WebSite, opening hours 24/7 | 100-150 EUR |
| | **TOTAL EXTRAS ESTIMAT** | **3.150-4.700 EUR** |

---

## 4. Bonusuri Gratuite — Art. 1B (Servicii Marketing Digital)

### B.1 Content Blog (12 luni)

| Indicator | Valoare |
|---|---|
| Articole contractate | 12 (1 pe luna, 12 luni) |
| Articole publicate la lansare | 4 RO + 4 EN = 8 total |
| Articole publicate post-lansare | 1 (august 2026 — achizitie apartament de la dezvoltator, Legea 207/2025) |
| Total pe site | 5 RO + 5 EN = 10 total |
| Articole ramase de livrat | 7 |
| Perioada | Aprilie 2026 - Martie 2027 |

### B.2 Management Social Media (12 luni)

| Platforme | Contractat | Dedus* | Publicate post-lansare | Ramas |
|---|---|---|---|---|
| Facebook | 20 posturi | — | 3 reels + 3 posturi | 4 posturi |
| Instagram | 20 posturi | — | — | 8 posturi |
| TikTok | 20 posturi | — | — | 10 posturi |
| **TOTAL** | **60 posturi** | **32 posturi** | **6 posturi** | **22 posturi** |

*\*Deducere detaliata in Sectiunea 5.*

### B.3 Publicitate Platita (Setup si Optimizare)

| Componenta | Status | Detalii |
|---|---|---|
| Google Ads | ✅ Campanie activa | 10 RON/zi, ruleaza din 26.03.2026, tracking conversii activ |
| Facebook Ads | ✅ Campanie activa | Ruleaza din 27.03.2026, video + copy configurate |
| Budget publicitar | Separat | Platit direct de Beneficiar catre platforme |

### B.4 Google My Business

| Componenta | Status |
|---|---|
| Descriere profil (750 caractere, 13 servicii) | ✅ Optimizat |
| Servicii adaugate (13 arii de practica) | ✅ Optimizat |
| Fotografii birou + echipa | ✅ Incarcate |
| Video promotional (format square) | ✅ Incarcat |
| Postare de lansare | ✅ Publicata |
| Q&A | ✅ Completat |

**Concluzie Art. 1B: Toate serviciile de marketing sunt active. Google Ads si Facebook Ads ruleaza. Postare Facebook de lansare publicata. Raman de livrat 7 articole blog si 22 posturi social media pe parcursul a 12 luni.**

---

## 5. Deducere Posturi Social Media

Timpul investit in productia de continut suplimentar (video, GMB, ads) se deduce din cele 60 de posturi social media incluse in Art. 1B.2:

| Activitate | Posturi deduse |
|---|---|
| Productie video Remotion (3 formate, setup, iteratii, render) | 10 |
| Optimizare profil Google My Business (descriere, servicii, foto, Q&A) | 4 |
| Postare lansare GMB + video | 2 |
| Facebook/Google Ads copy + setup | 4 |
| Postare Facebook (lansare website) | 1 |
| Postare Google My Business | 1 |
| Productie video reclama Drept Penal "Ai fost chemat la Politie" (4 formate + voiceover RO dual + design polish iteratii + ghid postare) | 5 |
| Productie video reclama generala "Aveti nevoie de un avocat?" (4 formate planificate, 2 randate HQ + design brand-aligned cu Playfair Display/Inter + CTA static animat + muzica corporate + reorganizare repo pe campanii) | 5 |
| **TOTAL DEDUS** | **32 posturi** |

La aceste deduceri de productie se adauga **6 posturi publicate pe Facebook post-lansare** (3 reels anterior + 3 posturi noi), rezultand **22 posturi ramase** de livrat pe parcursul celor 12 luni post-lansare (4 Facebook + 8 Instagram + 10 TikTok).

---

## 6. Suport Tehnic Post-Lansare — Art. 1C

| Indicator | Valoare |
|---|---|
| Perioada contractata | 20 luni de la lansare |
| Data inceput | 25 martie 2026 |
| Data sfarsit | Noiembrie 2027 |
| Include | Rezolvare bug-uri, actualizari securitate, asistenta tehnica |
| Nu include | Functionalitati noi, modificari majore de design |

---

## 7. Status Tehnic la Data Livrarii (26 martie 2026)

| Componenta | Status | Detalii |
|---|---|---|
| Website | LIVE | `stanbaculescu.ro` pe Vercel |
| DNS | Configurat | stanbaculescu.ro primary, www redirect 307 |
| GTM | Activ | `GTM-TJPF6G9N`, configurat pe Vercel |
| GA4 | Activ | `G-PRRH0P8T6D` prin GTM |
| Google Search Console | Configurat | Proprietate `https://stanbaculescu.ro` adaugata |
| Google Ads | Activ | Campanie ruleaza, 10 RON/zi, tracking conversii functional |
| Facebook Ads | Activ | Campanie ruleaza din 27.03.2026, video + copy configurate |
| Google My Business | Optimizat complet | Descriere, servicii, poze, video, postare, Q&A |
| Email | Functional | MX + SPF configurate, primire si trimitere OK |
| Formular contact | Functional | Notificari email prin Resend API |
| Training client | Efectuat | 30 minute online |

---

## 8. Plati (Contract WEB0001/2026)

| # | Transa | Procent | Suma (EUR cu TVA) | Status | Data |
|---|---|---|---|---|---|
| 1 | Avans (la semnare) | 50% | 2.117,50 EUR | ✅ Facturat si incasat | 04.02.2026 |
| 2 | Aprobare design | 25% | 1.058,75 EUR | ✅ Facturat si incasat | 11.03.2026 |
| 3 | Lansare website | 25% | 1.058,75 EUR | ⏳ De facturat si incasat | 26.03.2026 |
| | **TOTAL CONTRACT** | **100%** | **4.235,00 EUR** | | |
| | **RAMAS DE INCASAT** | | **1.058,75 EUR** | | |

---

## 9. Ramane de Facut

### Imediat

| Activitate | Responsabil | Termen |
|---|---|---|
| DKIM record (email deliverability) | Prestator | Aprilie 2026 |
| Facturare transa 3 (1.058,75 EUR) | Prestator | Imediat |
| Plata transa 3 (1.058,75 EUR) | Beneficiar | Conform contract |
| Card pentru Google Ads | Beneficiar | Cand disponibil |

### Actualizare 15 octombrie 2026 — tracking

Detalii complete in `docs/raport-performanta-2026-10.md`.

| Activitate | Responsabil | Status |
|---|---|---|
| Actiuni conversie Ads: Click telefon, Click WhatsApp, Formular contact (GTM), Apeluri din anunturi | Prestator | Create 15.10.2026 |
| Etichete reale + ID numeric in variabilele GTM | Prestator | Salvate in workspace, **de publicat GTM** |
| Actiunile vechi de formular (auto-detectate) trecute pe Secundara | Prestator | De facut |
| Fix `generate_lead` trimis dublu in GA4 | Prestator | Rezolvat, commit `84cf4df` |
| Marcare evenimente cheie in GA4 (`generate_lead`, `phone_click`, `whatsapp_click`) | Prestator | De facut |
| Legare Google Ads ↔ GA4 | Prestator | De facut |
| Unificare telefon Profil Google (0744 201 694) vs site (0745 466 720) | Beneficiar confirma | De clarificat |

### Post-lansare (12 luni — pana la martie 2027)

| Activitate | Cantitate | Frecventa |
|---|---|---|
| Articole blog | 8 ramase | ~1 pe luna |
| Posturi social media | 22 ramase (6 posturi deja publicate pe Facebook: 3 reels + 3 posturi) | ~2 pe luna |
| Suport tehnic | 20 luni | Continuu pana nov. 2027 |

---

## 10. Nota Privind Valoarea Extras-urilor

Toate extras-urile mentionate la Sectiunea 3 au fost livrate **integral gratuit** ca parte a colaborarii de calitate. Valoarea lor estimata de piata este de **3.050-4.550 EUR**, ceea ce reprezinta un bonus semnificativ fata de valoarea contractului de 4.235 EUR.

Referitor la **video promotional Remotion (10 posturi), optimizare GMB (4 posturi), postare GMB + video (2 posturi), setup campanii Facebook/Google Ads (4 posturi), postare Facebook lansare (1 post), postare GMB (1 post), video reclama Drept Penal "Ai fost chemat la Politie" cu voiceover RO dual si 4 formate (5 posturi) si video reclama generala "Aveti nevoie de un avocat?" cu design brand-aligned, CTA static animat si reorganizare repo pe campanii (5 posturi)**: orele de productie sunt defalcate din bonusul post-lansare de 12 luni (60 posturi social media). Se deduc **32 de posturi** (defalcare detaliata in Sectiunea 5). La acestea se adauga **6 posturi deja publicate pe Facebook post-lansare** (3 reels anterior + 3 posturi noi), ramanand **22 de posturi** de livrat pe parcursul celor 12 luni (4 Facebook + 8 Instagram + 10 TikTok).

---

## 11. Contact si Support

**Pentru asistenta tehnica post-lansare:**
- Email: contact@eghiseul.ro
- Raspuns: 24h (urgent), 48h (obisnuit)

**Perioada suport:** 20 luni de la lansare (25 martie 2026 - noiembrie 2027)

---

**Intocmit de:**
eDigitalizare S.R.L. — Lutas Raul
Data: 26 martie 2026

---

| PRESTATOR | BENEFICIAR |
|---|---|
| **EDIGITALIZARE S.R.L.** | **Societatea Civila de Avocati Stan-Baculescu** |
| Semnatura: _________________ | Semnatura: _________________ |
| Data: _________________ | Data: _________________ |
