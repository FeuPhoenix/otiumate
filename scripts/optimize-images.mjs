/**
 * Image optimization pass for public/ assets.
 *
 * Team photos come off a phone/camera at ~1856x2304 PNG (7-8 MB each). Nothing
 * on the site displays them above ~1400px, so we downscale and re-encode to
 * WebP. Run this after dropping new photos into public/.
 *
 *   npm run optimize:images
 *
 * Source files are left in place; delete them once you've checked the output.
 */
import sharp from 'sharp'
import { readdir, stat, unlink } from 'node:fs/promises'
import { join, extname, basename } from 'node:path'

const PUBLIC_DIR = new URL('../public/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')

// maxWidth is the widest the asset is ever rendered, x1.5 for retina headroom.
const TARGETS = [
  { match: /^team-.*\.(png|jpe?g)$/i, format: 'webp', maxWidth: 1400, quality: 80 },
  { match: /^sortak\.(png|jpe?g)$/i,  format: 'webp', maxWidth: 1400, quality: 80 },
  { match: /^cat-mascot\.(png|jpe?g)$/i, format: 'webp', maxWidth: 1024, quality: 80 },
  // logo stays PNG — it doubles as the favicon and apple-touch-icon, and is
  // referenced as the Organization logo in JSON-LD.
  { match: /^logo\.png$/i, format: 'png', maxWidth: 256 },
]

const kb = bytes => Math.round(bytes / 1024)

const files = await readdir(PUBLIC_DIR)
let before = 0
let after = 0

for (const file of files) {
  const target = TARGETS.find(t => t.match.test(file))
  if (!target) continue

  const src = join(PUBLIC_DIR, file)
  const out = join(PUBLIC_DIR, `${basename(file, extname(file))}.${target.format}`)

  const srcSize = (await stat(src)).size
  const pipeline = sharp(src).resize({ width: target.maxWidth, withoutEnlargement: true })

  if (target.format === 'webp') {
    await pipeline.webp({ quality: target.quality, effort: 6 }).toFile(out)
  } else {
    await pipeline.png({ compressionLevel: 9, effort: 10 }).toBuffer()
      .then(buf => sharp(buf).toFile(out))
  }

  const outSize = (await stat(out)).size
  before += srcSize
  after += outSize

  const saved = Math.round((1 - outSize / srcSize) * 100)
  console.log(`${file.padEnd(22)} ${String(kb(srcSize)).padStart(5)} KB -> ${String(kb(outSize)).padStart(5)} KB  (-${saved}%)`)

  if (src !== out) await unlink(src)
}

console.log(`\ntotal: ${kb(before)} KB -> ${kb(after)} KB (-${Math.round((1 - after / before) * 100)}%)`)
