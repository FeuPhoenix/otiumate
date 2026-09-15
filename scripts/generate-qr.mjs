/**
 * Generates branded QR codes with the Otiumate logo knocked out of the centre.
 *
 *   npm run generate:qr                    # defaults to https://otiumate.com
 *   npm run generate:qr -- https://otiumate.com/#contact
 *
 * Writes public/qr-otiumate-light.png (dark modules on white — use this one
 * for print) and public/qr-otiumate-dark.png (light modules on brand black,
 * for slides and dark backgrounds).
 *
 * Error correction is forced to level H (30% recovery), which is what makes
 * the centre logo safe: the knockout below removes ~5% of the modules.
 */
import sharp from 'sharp'
import QRCode from 'qrcode'
import { stat } from 'node:fs/promises'

const URL_TARGET = process.argv[2] || 'https://otiumate.com'

const SIZE = 1200          // output edge, px
const QUIET = 4            // quiet zone, in modules (spec minimum)
const PLATE_RATIO = 0.13   // logo plate radius as a fraction of SIZE

const publicDir = new URL('../public/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')

const VARIANTS = [
  { name: 'light', bg: '#FFFFFF', fg: '#090909', eye: '#2563EB', plate: '#FFFFFF' },
  { name: 'dark',  bg: '#090909', fg: '#FFFFFF', eye: '#60A5FA', plate: '#FFFFFF' },
]

const qr = QRCode.create(URL_TARGET, { errorCorrectionLevel: 'H' })
const count = qr.modules.size
const bits = qr.modules.data

const total = count + QUIET * 2
const mod = SIZE / total
const isDark = (row, col) => bits[row * count + col] === 1

// The three finder patterns are drawn by hand as rounded shapes, so the data
// loop has to skip the 7x7 blocks they occupy.
const finders = [
  { row: 0, col: 0 },
  { row: 0, col: count - 7 },
  { row: count - 7, col: 0 },
]
const inFinder = (row, col) =>
  finders.some((f) => row >= f.row && row < f.row + 7 && col >= f.col && col < f.col + 7)

// Modules under the logo plate are cleared rather than drawn over, so the mark
// sits on flat colour instead of a noisy background.
const centre = SIZE / 2
const plateR = SIZE * PLATE_RATIO
const underPlate = (row, col) => {
  const x = (col + QUIET + 0.5) * mod - centre
  const y = (row + QUIET + 0.5) * mod - centre
  return Math.hypot(x, y) < plateR + mod * 0.7
}

for (const v of VARIANTS) {
  const dots = []
  let cleared = 0

  for (let row = 0; row < count; row++) {
    for (let col = 0; col < count; col++) {
      if (!isDark(row, col) || inFinder(row, col)) continue
      if (underPlate(row, col)) { cleared++; continue }
      const x = (col + QUIET) * mod
      const y = (row + QUIET) * mod
      dots.push(
        `<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${mod.toFixed(2)}" height="${mod.toFixed(2)}" rx="${(mod * 0.3).toFixed(2)}" fill="${v.fg}"/>`,
      )
    }
  }

  // Three concentric filled rects, not a stroked ring: a centred stroke would
  // straddle the 7x7 boundary and destroy the 1:1:3:1:1 run ratio that
  // decoders use to locate the code. Corner rounding is safe — the ratio is
  // measured along scan lines through the centre.
  const eyes = finders
    .map((f) => {
      const x = (f.col + QUIET) * mod
      const y = (f.row + QUIET) * mod
      return `
    <rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${(mod * 7).toFixed(2)}" height="${(mod * 7).toFixed(2)}"
          rx="${(mod * 1.6).toFixed(2)}" fill="${v.eye}"/>
    <rect x="${(x + mod).toFixed(2)}" y="${(y + mod).toFixed(2)}" width="${(mod * 5).toFixed(2)}" height="${(mod * 5).toFixed(2)}"
          rx="${(mod * 1.05).toFixed(2)}" fill="${v.bg}"/>
    <rect x="${(x + mod * 2).toFixed(2)}" y="${(y + mod * 2).toFixed(2)}" width="${(mod * 3).toFixed(2)}" height="${(mod * 3).toFixed(2)}"
          rx="${(mod * 0.6).toFixed(2)}" fill="${v.eye}"/>`
    })
    .join('')

  const svg = `
<svg width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${SIZE}" height="${SIZE}" fill="${v.bg}"/>
  ${dots.join('\n  ')}
  ${eyes}
  <circle cx="${centre}" cy="${centre}" r="${plateR.toFixed(2)}" fill="${v.plate}"/>
</svg>`

  const logoPx = Math.round(plateR * 1.55)
  const logo = await sharp(`${publicDir}logo.png`)
    .resize({ width: logoPx, height: logoPx, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer()

  const out = `${publicDir}qr-otiumate-${v.name}.png`
  await sharp(Buffer.from(svg))
    .composite([{ input: logo, top: Math.round(centre - logoPx / 2), left: Math.round(centre - logoPx / 2) }])
    .png({ compressionLevel: 9 })
    .toFile(out)

  const { size } = await stat(out)
  console.log(
    `qr-otiumate-${v.name}.png — ${SIZE}x${SIZE}, ${Math.round(size / 1024)} KB, ` +
      `${count}x${count} modules, ${cleared} cleared for the logo`,
  )
}

console.log(`encoded: ${URL_TARGET}`)
