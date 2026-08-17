# LIWA Festival Website

The public-facing website for the Liwa International Festival (11 December 2026 – 3 January 2027), Al Dhafra, Abu Dhabi.

Owned and maintained by **LINKVIVA** (linkvivaevents.onmicrosoft.com).

---

## Technology

A dependency-free static website. There is no framework, no bundler and no build step — the files in this repository are the files that get served.

| Layer | Technology |
| --- | --- |
| Markup | Hand-authored HTML5, one file per page |
| Styling | A single `styles.css` (design tokens, layout utilities, components) |
| Behaviour | A single vanilla-JavaScript `script.js` (ES2020, no modules) |
| Fonts | Google Fonts — Manrope, Noto Sans Arabic (loaded via CDN) |
| Animation | GSAP 3.13 + ScrollTrigger + SplitText, loaded from jsDelivr CDN on the homepage only, with a graceful fallback when the CDN is unavailable |
| Storage | `localStorage` (itinerary builder) and `sessionStorage` (ticketing flow) |

---

## Requirements

Any static web server. For local development, either of the following is enough:

- Python 3 (pre-installed on macOS)
- Node.js 18 or newer

No package installation is required.

---

## Installation

```bash
git clone https://github.com/linkvivauae/liwa-festival-website.git
cd liwa-festival-website
```

That is the whole installation. There are no dependencies to install.

---

## Development command

Serve the folder over HTTP — do not open `index.html` directly from the filesystem, because `file://` blocks the fetch and history APIs the ticketing flow relies on.

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000

Node alternative:

```bash
npx serve .
```

---

## Production build command

There is no build step. The repository contents are the production artefact.

If you want to verify the site before publishing, serve it locally and confirm every page loads without console errors:

```bash
python3 -m http.server 8000
```

---

## Deployment

The site is deployed with **GitHub Pages**, served from the `main` branch, root folder.

1. Repository → Settings → Pages
2. Source: *Deploy from a branch*
3. Branch: `main`, folder: `/ (root)`

Every push to `main` republishes the site automatically.

All internal links and asset paths are relative, so the site works correctly both at a domain root and under a project sub-path such as `https://linkvivauae.github.io/liwa-festival-website/`.

To publish on the live festival domain, add a `CNAME` file containing the domain and point the DNS record at GitHub Pages. The `<link rel="canonical">` tags on every page already reference `https://www.liwainternationalfestival.ae/`.

---

## Environment variables

None. The site makes no authenticated API calls and holds no credentials. If a booking or CMS integration is added later, keep real values out of the repository and document the variable names in a `.env.example` file.

---

## Folder structure

```
liwa-festival-website/
├── index.html              Homepage — hero video, countdown, festival overview
├── experience-liwa.html    Experiences, galleries, heritage forts
├── the-trail.html          The Liwa Trail — nine stops
├── programming.html        Full programme with search and category filters
├── motorsport.html         Motorsport hub — Tal Moreeb
├── event-detail.html       Single-event template, rendered from ?event= query string
├── tickets.html            Five-step ticketing flow
├── plan-your-visit.html    Travel, access, facilities, interactive map
├── stay-and-dine.html      Hotels and dining directory
├── contact.html            Contact and accessibility
├── feedback.html           Feedback and newsletter forms
├── privacy.html            Privacy policy
├── terms.html              Terms and conditions
├── styles.css              Complete stylesheet
├── script.js               Shared application script, loaded on every page
└── assets/                 Images, video, logos
```

`script.js` is organised in numbered sections — sample data, utilities, header and navigation, scroll animation, countdown, programme filtering, event detail, itinerary builder, carousels and lightbox, ticketing state machine, forms, and a page-init dispatcher.

---

## Notes for future developers

- **Content is static sample data.** The `EVENTS`, `TICKET_TYPES`, `HOTELS`, `DINING` and `FORTS` arrays at the top of `script.js` are placeholders awaiting a real CMS or booking API. Record IDs are deliberately stable, because `localStorage` and `sessionStorage` entries reference them — keep the IDs if you replace the data source.
- **Event, hotel, dining and fort imagery is placeholder stock photography** hotlinked from Unsplash inside `script.js`. This must be replaced with licensed LIWA photography before the site goes live. LIWA's own images live in `assets/` and are already used across the page headers and heroes.
- **Forms are client-side only.** The feedback, newsletter and ticketing forms validate in the browser and do not submit anywhere. Wire them to a real endpoint before launch.
- **The ticketing flow does not take payment.** It is a five-step interface prototype backed by `sessionStorage`.
- **Images have been optimised for the web** — resized to a 2400 px bound and re-encoded. The original full-resolution masters are held separately by LINKVIVA and are not stored in this repository.
- **The interactive map uses percentage coordinates** over a static aerial image. A production build should replace that layer with surveyed GPS pins on Leaflet or the Google Maps JavaScript API.
- Bilingual English/Arabic support is scaffolded in the language toggle and the `Noto Sans Arabic` font, but the Arabic dictionary is not complete.

---

## Ownership

© LINKVIVA. This repository and its contents are the property of LINKVIVA and are maintained for the Liwa International Festival. Not for redistribution.
