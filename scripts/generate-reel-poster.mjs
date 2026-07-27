/**
 * Generates public/reel-poster.webp — the still frame shown before reel.mp4
 * loads. Without a poster the player is a black rectangle until metadata
 * arrives, which on a slow connection is most of the time the section is
 * on screen.
 *
 *   npm run generate:poster
 *
 * This is a branded backdrop rather than a frame from the video. If you'd
 * rather use a real frame, export one at 720x1280 and save it over this file.
 */
import sharp from 'sharp'
import { stat } from 'node:fs/promises'

const W = 720
const H = 1280

const publicDir = new URL('../public/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')

const logo = await sharp(`${publicDir}logo.png`)
  .resize({ width: 132, height: 132, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer()

const svg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="50%" cy="38%" r="62%">
      <stop offset="0%"   stop-color="#2563EB" stop-opacity="0.30"/>
      <stop offset="100%" stop-color="#2563EB" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#1E1E1E" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="${W}" height="${H}" fill="#090909"/>
  <rect width="${W}" height="${H}" fill="url(#grid)" opacity="0.5"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <!-- bottom scrim so the player's overlaid label stays readable -->
  <rect x="0" y="${H - 260}" width="${W}" height="260" fill="#090909" opacity="0.55"/>
</svg>`

await sharp(Buffer.from(svg))
  .composite([{ input: logo, top: Math.round(H * 0.38) - 66, left: Math.round(W / 2) - 66 }])
  .webp({ quality: 82, effort: 6 })
  .toFile(`${publicDir}reel-poster.webp`)

const { size } = await stat(`${publicDir}reel-poster.webp`)
console.log(`reel-poster.webp written — ${W}x${H}, ${Math.round(size / 1024)} KB`)
