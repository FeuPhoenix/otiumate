/**
 * Generates public/og-image.png (1200x630) — the social card used by
 * og:image / twitter:image in index.html.
 *
 *   npm run generate:og
 *
 * Re-run this if the brand colours or tagline change.
 */
import sharp from 'sharp'
import { readFile } from 'node:fs/promises'

const W = 1200
const H = 630

const publicDir = new URL('../public/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')

const logo = await sharp(`${publicDir}logo.png`)
  .resize({ width: 96, height: 96, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer()

const svg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="wordmark" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%"   stop-color="#FFFFFF"/>
      <stop offset="60%"  stop-color="#60A5FA"/>
      <stop offset="100%" stop-color="#2563EB"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="0%" r="75%">
      <stop offset="0%"   stop-color="#2563EB" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#2563EB" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#1E1E1E" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="${W}" height="${H}" fill="#090909"/>
  <rect width="${W}" height="${H}" fill="url(#grid)" opacity="0.6"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <!-- accent rule -->
  <rect x="80" y="188" width="64" height="3" fill="#2563EB"/>

  <text x="80" y="164"
        font-family="Consolas, 'Courier New', monospace"
        font-size="22" letter-spacing="4" fill="#6B7280">
    THE NEXT FACE OF AI IN EGYPT
  </text>

  <text x="80" y="310"
        font-family="'Segoe UI', Inter, Arial, sans-serif"
        font-size="118" font-weight="700" letter-spacing="-2"
        fill="url(#wordmark)">
    Otiumate
  </text>

  <text x="80" y="392"
        font-family="'Segoe UI', Inter, Arial, sans-serif"
        font-size="42" font-weight="400" fill="#FFFFFF">
    Turn AI potential into real products.
  </text>

  <text x="80" y="452"
        font-family="'Segoe UI', Inter, Arial, sans-serif"
        font-size="27" font-weight="400" fill="#6B7280">
    AI automation &amp; products studio — strategy, design, engineering.
  </text>

  <line x1="80" y1="524" x2="1120" y2="524" stroke="#1E1E1E" stroke-width="1"/>

  <text x="80" y="568"
        font-family="Consolas, 'Courier New', monospace"
        font-size="24" fill="#60A5FA">
    otiumate.com
  </text>
</svg>`

await sharp(Buffer.from(svg))
  .composite([{ input: logo, top: 458, left: 1016 }])
  .png({ compressionLevel: 9 })
  .toFile(`${publicDir}og-image.png`)

const { size } = await (await import('node:fs/promises')).stat(`${publicDir}og-image.png`)
console.log(`og-image.png written — ${W}x${H}, ${Math.round(size / 1024)} KB`)
