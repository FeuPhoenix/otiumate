# Otiumate Portfolio

Production-ready startup portfolio website built with React + Vite + TypeScript + Tailwind CSS + Framer Motion.

## Tech Stack

- **Framework:** React 18 + Vite 5 + TypeScript
- **Styling:** Tailwind CSS v3 + custom CSS variables
- **Animations:** Framer Motion 11
- **Icons:** Lucide React
- **Deploy:** Vercel

---

## Local Setup

```bash
# 1. Clone the repo
git clone https://github.com/FeuPhoenix/otiumate.git
cd otiumate

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Updating Content

All site content lives in plain TypeScript files — no component code needed:

| File | What it controls |
|------|-----------------|
| `src/data/team.ts` | Team members, bios, photos, social links |
| `src/data/projects.ts` | Projects, descriptions, tags, status, links |
| `src/data/stack.ts` | Tech stack items in the marquee |
| `src/data/testimonials.ts` | Testimonial quotes |
| `src/components/About.tsx` | Mission statement, story paragraphs, stats (top of file) |
| `src/components/Hero.tsx` | Tagline copy (top of file) |
| `src/components/Contact.tsx` | Email address, social links, Formspree endpoint |
| `src/components/Footer.tsx` | Social links |

### Adding your logo

Drop your logo file into `public/logo.png`. The navbar and footer will automatically pick it up.

### Adding images

Team photos and project shots are served as WebP. Drop the full-resolution file
into `public/` using the existing naming (`team-<name>.png`, `sortak.png`, …)
and run:

```bash
npm run optimize:images
```

This downscales to the widest size the site actually renders, re-encodes to
WebP, and deletes the original. Then point the `photo` / `image` field in
`src/data/` at the new `.webp` file.

> Camera-resolution PNGs are 7–8 MB each; optimized they land around 150 KB.
> Don't reference an unoptimized file directly.

### Regenerating the social card

`public/og-image.png` (1200×630) is generated from the brand colours and
tagline. If either changes:

```bash
npm run generate:og
```

### Regenerating the reel poster

`public/reel-poster.webp` is the still shown before `reel.mp4` loads. It's a
branded backdrop, not a real frame — if you'd rather use an actual frame from
the video, export one at 720×1280 and save it over that file.

```bash
npm run generate:poster
```

---

## Analytics

GA4 fires custom events through `src/lib/analytics.ts`. Every helper no-ops
when `gtag` is absent (ad blockers, dev, the prerender pass), so callers never
need to guard.

| Event | Fires when |
|-------|-----------|
| `cta_click` | Hero buttons, navbar/mobile Contact button |
| `project_open` | A project card is opened |
| `contact_submit` | Form submit — `success`, `error`, or `invalid` |
| `reel_play` | Showreel is played |
| `outbound_click` | A social link is clicked |

These are custom events, so they need to be registered as conversions in the
GA4 UI before they show up in conversion reports.

---

## Contact Form Setup (Formspree)

1. Sign up free at [formspree.io](https://formspree.io)
2. Create a new form, copy your Form ID (e.g. `xpwzgkla`)
3. Open `src/components/Contact.tsx` and replace the endpoint:

```ts
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'
// becomes:
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xpwzgkla'
```

---

## Analytics Setup (Google Analytics)

1. Create a GA4 property at [analytics.google.com](https://analytics.google.com)
2. Copy your Measurement ID (e.g. `G-ABC123`)
3. Open `index.html` and replace both instances of `G-XXXXXXXXXX` with your real ID

---

## SEO Checklist

- [x] `<title>` and `<meta name="description">`
- [x] `og:url` / canonical → `https://otiumate.com`
- [x] `og:image` → `public/og-image.png` (see *Regenerating the social card*)
- [x] `twitter:site` → `@otiumate`
- [x] `public/sitemap.xml` and `public/robots.txt` point at the real domain
- [ ] Keep `<lastmod>` in `public/sitemap.xml` current on significant updates

---

## Deploy to Vercel

### Option A — Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option B — GitHub Integration

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your repo
4. Framework preset: **Vite** (auto-detected)
5. Click **Deploy**

The `vercel.json` in this repo handles SPA routing and sets security headers automatically.

---

## Build

```bash
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```

`build` runs four steps:

1. `tsc` — type check
2. `vite build` — client bundle → `dist/`
3. `vite build --ssr` — server bundle → `dist-ssr/` (gitignored)
4. `scripts/prerender.mjs` — renders the app to HTML and injects it into
   `dist/index.html`

### Why prerendering

Without step 4 the deployed HTML is a ~3.5 KB shell with an empty `#root`, so
every crawler and link-preview scraper has to execute our JavaScript to see any
content. Prerendering puts ~3.8 KB of real text in the HTML instead. The client
then calls `hydrateRoot` rather than `createRoot` and reuses that markup.

Two rules keep hydration working — break either and React throws the
prerendered DOM away at runtime:

- **Anything browser-dependent goes inside `<ClientOnly>`.** Pointer type,
  canvas, and timers differ between the build machine and the visitor, so
  `CustomCursor` and `Preloader` render nothing until after mount.
- **The preloader must not gate content.** It's an overlay on top of a
  fully-mounted page, not a switch that decides whether the page exists.

`npm run dev` serves an empty root and takes the `createRoot` path, so dev is
unaffected.

---

## Accessibility

The site respects `prefers-reduced-motion` in three places, and all three need
to stay in sync if you add animation:

| Motion | Where it's suppressed |
|--------|----------------------|
| Framer Motion | `<MotionConfig reducedMotion="user">` in `App.tsx` |
| CSS (grain, marquees, smooth scroll) | media query at the bottom of `src/index.css` |
| Hero particle canvas | early return in `src/hooks/useParticles.ts` |

---

## Project Structure

```
src/
  components/     UI components
  data/           Content data files (edit these)
  hooks/          useInView, useParticles
  App.tsx
  index.css       CSS variables, fonts, global styles
  main.tsx
public/
  logo.png        ← drop your logo here
  favicon.svg
  robots.txt
  sitemap.xml
```
