/**
 * Normalize a team headshot to the site's standard framing.
 *
 * Team photos arrive from different photographers at different crops. The
 * slideshow renders them all with `object-cover object-top` in one panel, so a
 * tightly-cropped headshot renders as a giant face while a looser one sits
 * comfortably. This pads the tight ones out to the house framing instead of
 * scaling the subject, which is what keeps faces the same size across slides.
 *
 *   node scripts/frame-team-photo.mjs <source> <public/team-<id>.webp>
 *
 * The padding is an ambient fill: the same photo blown up to cover the canvas
 * and blurred past recognition, so its colour and the studio gradient match at
 * every seam, with none of the vertical streaking an edge copy leaves. The
 * photo is feathered into that fill rather than pasted onto it, and the bottom
 * fades into the page background so the subject falls off into shadow instead
 * of ending on a hard line.
 */
import sharp from 'sharp'
import { basename } from 'node:path'

/** House framing, measured from the existing team photos. */
const HOUSE = {
  aspect: 1400 / 1738,   // width / height of the established headshots
  headWidth: 0.33,       // subject head width as a fraction of frame width
  headTop: 0.094,        // top of the head as a fraction of frame height
  outputWidth: 1400,     // matches scripts/optimize-images.mjs
  quality: 80,
}

/** Page background (brand-bg), used to fade out the bottom extension. */
const PAGE_BG = { r: 9, g: 9, b: 9 }

/**
 * Locate the subject in a studio headshot: the first row that is meaningfully
 * brighter than the backdrop, and the widest such row (the skull).
 */
async function findSubject(image) {
  const { width, height } = await image.metadata()
  const { data } = await image.clone().greyscale().raw().toBuffer({ resolveWithObject: true })
  const at = (x, y) => data[y * width + x]

  const corners = []
  for (const [cx, cy] of [[0, 0], [width - 40, 0], [0, height - 40], [width - 40, height - 40]])
    for (let y = cy; y < cy + 40; y++) for (let x = cx; x < cx + 40; x++) corners.push(at(x, y))
  corners.sort((a, b) => a - b)
  const backdrop = corners[corners.length >> 1]

  const threshold = backdrop + 45
  const rowHits = y => {
    let hits = 0
    for (let x = 0; x < width; x++) if (at(x, y) > threshold) hits++
    return hits
  }

  let headTop = 0
  for (let y = 0; y < height; y++) {
    if (rowHits(y) > width * 0.02) { headTop = y; break }
  }

  let headWidth = 0
  for (let y = headTop; y < height * 0.5; y++) headWidth = Math.max(headWidth, rowHits(y))

  return { width, height, headTop, headWidth }
}

/**
 * Alpha mask that holds full opacity through the middle and ramps to zero over
 * `edge` pixels on each side, so the photo dissolves into the ambient fill
 * instead of ending on a visible rectangle.
 */
function featherMask(width, height, edge) {
  const data = Buffer.alloc(width * height * 4)
  const ramp = d => {
    const t = Math.min(1, Math.max(0, d / edge))
    return t * t * (3 - 2 * t) // smoothstep
  }
  for (let y = 0; y < height; y++) {
    const vertical = Math.min(ramp(y), ramp(height - 1 - y))
    for (let x = 0; x < width; x++) {
      const alpha = Math.min(vertical, ramp(x), ramp(width - 1 - x))
      const i = (y * width + x) * 4
      data[i] = data[i + 1] = data[i + 2] = 255
      data[i + 3] = Math.round(alpha * 255)
    }
  }
  return { input: data, raw: { width, height, channels: 4 }, blend: 'dest-in' }
}

/**
 * Vertical gradient from transparent to the page background, as a raw RGBA
 * buffer. Built by hand rather than from SVG so the pixel dimensions are exact.
 */
function bottomFade(width, height, fadeStart) {
  const data = Buffer.alloc(width * height * 4)
  const span = Math.max(1, height - fadeStart)
  for (let y = 0; y < height; y++) {
    const t = Math.min(1, Math.max(0, (y - fadeStart) / span))
    const alpha = Math.round(t * t * 235) // ease in, so the fade starts gently
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4
      data[i] = PAGE_BG.r
      data[i + 1] = PAGE_BG.g
      data[i + 2] = PAGE_BG.b
      data[i + 3] = alpha
    }
  }
  return { input: data, raw: { width, height, channels: 4 }, top: 0, left: 0 }
}

async function frame(src, out) {
  const source = sharp(src)
  const subject = await findSubject(source)

  // Widen the canvas until the head occupies the house fraction of it.
  const canvasWidth = Math.round(subject.headWidth / HOUSE.headWidth)
  const canvasHeight = Math.round(canvasWidth / HOUSE.aspect)

  if (canvasWidth < subject.width || canvasHeight < subject.height) {
    throw new Error(
      `${basename(src)} is already looser than the house framing ` +
      `(needs ${canvasWidth}x${canvasHeight}, source is ${subject.width}x${subject.height}). ` +
      `Crop it in instead of padding it out.`,
    )
  }

  const left = Math.round((canvasWidth - subject.width) / 2)
  const top = Math.max(0, Math.round(canvasHeight * HOUSE.headTop) - subject.headTop)
  const bottom = canvasHeight - subject.height - top

  const fill = await source
    .clone()
    .resize(canvasWidth, canvasHeight, { fit: 'cover', position: 'top' })
    .blur(100)
    .toBuffer()

  const feathered = await source
    .clone()
    .ensureAlpha()
    .composite([featherMask(subject.width, subject.height, Math.round(left * 0.55))])
    .png()
    .toBuffer()

  // sharp resizes before it composites, so the canvas is assembled at full
  // size in one pass and downscaled in a second.
  const framed = await sharp(fill)
    .composite([
      { input: feathered, left, top },
      bottomFade(canvasWidth, canvasHeight, subject.height + top - 60),
    ])
    .toBuffer()

  await sharp(framed)
    .resize({ width: HOUSE.outputWidth, withoutEnlargement: true })
    .webp({ quality: HOUSE.quality, effort: 6 })
    .toFile(out)

  const headPct = (subject.headWidth / canvasWidth * 100).toFixed(1)
  console.log(`${basename(src)} -> ${basename(out)}`)
  console.log(`  source   ${subject.width}x${subject.height}, head ${subject.headWidth}px (${(subject.headWidth / subject.width * 100).toFixed(1)}% of frame)`)
  console.log(`  canvas   ${canvasWidth}x${canvasHeight}  pad L/R ${left}  top ${top}  bottom ${bottom}`)
  console.log(`  framed   head is now ${headPct}% of frame (house target ${(HOUSE.headWidth * 100).toFixed(0)}%)`)
}

const [src, out] = process.argv.slice(2)
if (!src || !out) {
  console.error('usage: node scripts/frame-team-photo.mjs <source> <public/team-<id>.webp>')
  process.exit(1)
}
await frame(src, out)
