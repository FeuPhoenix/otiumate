import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'

/**
 * Build-time entry point. `scripts/prerender.mjs` calls this and injects the
 * result into dist/index.html so crawlers and social scrapers get real markup
 * instead of an empty <div id="root">.
 */
export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
