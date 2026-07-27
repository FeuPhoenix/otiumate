/**
 * Thin wrapper over the GA4 tag loaded in index.html.
 *
 * Every call is a no-op when gtag is missing — ad blockers, local dev, and the
 * prerender pass all hit that path, so callers never need to guard.
 */

type GtagParams = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: GtagParams) => void
  }
}

export function trackEvent(name: string, params: GtagParams = {}): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', name, params)
}

/** Primary calls-to-action — hero buttons, nav contact button. */
export const trackCta = (label: string, location: string) =>
  trackEvent('cta_click', { cta_label: label, cta_location: location })

/** A project card was opened in the modal. */
export const trackProjectOpen = (title: string, status: string) =>
  trackEvent('project_open', { project_title: title, project_status: status })

/** Contact form outcomes — the closest thing this site has to a conversion. */
export const trackContactSubmit = (outcome: 'success' | 'error' | 'invalid') =>
  trackEvent('contact_submit', { outcome })

/** Showreel engagement. */
export const trackReelPlay = () => trackEvent('reel_play')

/** Outbound clicks to socials, team profiles, and live project links. */
export const trackOutbound = (label: string, url: string) =>
  trackEvent('outbound_click', { link_label: label, link_url: url })
