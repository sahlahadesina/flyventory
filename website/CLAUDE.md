# Flyventory website

Marketing site for Flyventory, a drone and software system that checks warehouse inventory. The site has one job: get warehouse and logistics managers in the UAE to join the pilot list (pilots open in a later phase). Every section should move a visitor toward the "Join the pilot list" button.

## Stack

- Astro (static output) + Tailwind CSS. No backend.
- Single page with anchor sections (`/`), plus a simple `/privacy` page.
- Contact form: an embedded form service (Tally or Formspree). Leave a clearly marked placeholder until we give you the embed code.
- Deploy target: Vercel, connected to the GitHub repo.
- Domain: getflyventory.com (being registered by the KUEC Incubator).

## Content rules (most important)

- All copy comes from `content/site-copy.md`. Do not write new marketing claims.
- Never invent numbers, statistics, customer names, client logos, testimonials, awards, partners or press mentions. If a section needs one we don't have, leave a visible `TODO` placeholder.
- Describe the product as it works today: an operator flies the drone; the software scans barcodes and QR codes, verifies presence and quantity, and logs results to a dashboard. Autonomous flight and WMS integration are roadmap items and must only appear in the Roadmap section, labelled as in development.
- Lines marked `[CONFIRM]` in the copy file are unverified. Render them, but list every one in your summary so we can check them.
- Writing style: plain, specific, short sentences. No buzzwords ("revolutionize", "cutting-edge", "seamless", "unlock", "leverage", "AI-powered" as a headline). Never use em dashes; use commas, colons, periods or parentheses.

## Brand

Follow `docs/Flyventory-Brand-Guidelines.pdf`. Summary:

- Colors (define as Tailwind theme tokens):
  - navy `#182E52`: logo, headings, body text, dark sections
  - blue `#3A63B1`: accents, links, primary call to action in the header
  - light `#F4F7FD`: alternate section backgrounds and panels
  - white `#FFFFFF`: main background
  - slate `#5B6475`: secondary text and captions
- Contrast: navy on white/light for text. White text on navy or blue only. Never navy text on blue.
- Fonts (Google Fonts): Antonio 500 for small uppercase eyebrows and labels (letter-spacing about 0.15em); Montserrat 400/600/700 for everything else. Self-host or use `font-display: swap`.
- Logos in `public/brand/`:
  - Header on light: `flyventory-logo-horizontal-color.svg`
  - Header or footer on navy: `flyventory-logo-horizontal-white.svg`
  - Hero or about section (large only): `flyventory-logo-color.svg`
  - Never stretch, recolor, rotate, or add effects. Do not rebuild the logo in HTML/CSS.
- Favicons are in `public/`: `favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`. Add a web manifest.
- Buttons: primary is navy fill with white text, secondary is white with navy outline, the header CTA is blue. Radius 8px.
- Look and feel: clean, industrial, lots of white space, confident type. Not playful, no gradients-everywhere, no glassmorphism.
- The brand is fixed. Design skills (frontend-design, ui-ux-pro-max and its siblings) may guide layout, spacing, hierarchy, UX patterns, motion and accessibility, but must not change our colors, fonts or logo. Do not run `--design-system` generation for palettes or fonts, do not generate logos, banners or brand identities, and do not create a `design-system/` folder that competes with this file.

## Images and media

- Our drone and software appear only through our own files in `public/media/` (real drone photos, detection screenshots, demo video).
- Licensed stock photos and videos (Pexels or Unsplash, free commercial licence) are allowed ONLY for warehouse environments: aisles, racks, staging areas, pallets, workers, loading docks.
- Never use stock images of drones, never other companies' hardware (DJI etc.), and never anything that implies a customer, partner or result we don't have (no visible client branding, no "our customer" framing).
- Before downloading any stock file, give a shortlist (preview link, licence, where it would go) and wait for approval. Record the source URL and licence of every stock file used.
- Compress everything: images as AVIF/WebP under 200 KB; background video MP4 under 3 MB, muted, with a poster image.
- Video: muted, looping, `playsinline`, with a poster image; never autoplay with sound.
- If a slot has no real or approved file, do not render it.

## Quality bar

- Mobile first. Check at 375px, 768px and 1440px widths. No horizontal scroll.
- Lighthouse 90+ on performance, accessibility, best practices, SEO.
- Semantic HTML, one `h1`, alt text on every image, visible focus states, keyboard-navigable menu.
- SEO: title, meta description, Open Graph image, canonical URL for getflyventory.com.
- After each meaningful change, run the dev server and take screenshots with Playwright at mobile and desktop widths, look at them, and fix what looks off before telling me it's done.

## Workflow

- Plan first, then build one section at a time.
- Keep components small: `Header`, `Hero`, `Problem`, `HowItWorks`, `UseCases`, `BuiltToday`, `Roadmap`, `Team`, `FAQ`, `PilotCTA`, `Footer`.
- Commit after each section with a clear message.
