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
git clone https://github.com/FeuPhoenix/otiumate-portfolio.git
cd otiumate-portfolio

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

Before going live, update these in `index.html`:

- [ ] `<title>` — your real page title
- [ ] `<meta name="description">` — compelling 150-char description
- [ ] `og:url` — your actual domain
- [ ] `og:image` — create a 1200×630px OG image and host it
- [ ] `twitter:site` — your Twitter/X handle
- [ ] Canonical URL
- [ ] Update `public/sitemap.xml` with your real domain
- [ ] Update `public/robots.txt` sitemap URL

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
