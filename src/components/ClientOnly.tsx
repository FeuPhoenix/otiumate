import { useEffect, useState, type ReactNode } from 'react'

/**
 * Renders children only after the first client render.
 *
 * The site is prerendered to static HTML at build time, so anything that
 * depends on the browser (pointer type, canvas, timers) has to stay out of the
 * server output *and* out of the first client render — otherwise React finds a
 * mismatch during hydration and throws the markup away.
 */
export default function ClientOnly({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted ? <>{children}</> : null
}
