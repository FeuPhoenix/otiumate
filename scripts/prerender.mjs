/**
 * Injects statically rendered markup into dist/index.html.
 *
 * Runs after both Vite builds (client + SSR) as part of `npm run build`.
 * Without it the deployed HTML is a ~3.5 KB shell with an empty #root, which
 * leaves every crawler and link-preview scraper dependent on executing our JS.
 */
import { readFile, writeFile, stat } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const root = new URL('../', import.meta.url)
const templatePath = fileURLToPath(new URL('dist/index.html', root))
const serverEntry = new URL('dist-ssr/entry-server.js', root)

const ROOT_DIV = '<div id="root"></div>'

const template = await readFile(templatePath, 'utf8')

if (!template.includes(ROOT_DIV)) {
  throw new Error(
    `prerender: could not find ${ROOT_DIV} in dist/index.html — did the mount point change?`,
  )
}

const { render } = await import(serverEntry.href)
const appHtml = render()

if (!appHtml || appHtml.length < 1000) {
  throw new Error(`prerender: suspiciously small render output (${appHtml.length} chars) — refusing to write`)
}

await writeFile(
  templatePath,
  template.replace(ROOT_DIV, `<div id="root">${appHtml}</div>`),
  'utf8',
)

const { size } = await stat(templatePath)
console.log(`prerendered dist/index.html — ${Math.round(size / 1024)} KB (${appHtml.length} chars of markup)`)
