import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  alpha: number
}

interface ParticleConfig {
  count: number
  maxVelocity: number
  connectionDist: number
  mouseRadius: number
  particleRadius: number
  targetFps: number
}

function debounce<T extends (...args: unknown[]) => void>(fn: T, ms: number): T {
  let timer: ReturnType<typeof setTimeout>
  return ((...args: unknown[]) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), ms)
  }) as T
}

export function useParticles(canvasRef: React.RefObject<HTMLCanvasElement>): void {
  const animRef = useRef<number>(0)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const particlesRef = useRef<Particle[]>([])
  const lastTimeRef = useRef(0)
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isMobile = window.innerWidth < 768 || 'ontouchstart' in window

    const config: ParticleConfig = isMobile
      ? { count: 45, maxVelocity: 0.4, connectionDist: 100, mouseRadius: 80, particleRadius: 1.5, targetFps: 30 }
      : { count: 100, maxVelocity: 0.8, connectionDist: 140, mouseRadius: 120, particleRadius: 2, targetFps: 60 }

    const frameBudget = 1000 / config.targetFps

    // ── Canvas size setup ───────────────────────────────────────
    function initCanvas() {
      if (!canvas) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight

      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx!.scale(dpr, dpr)

      sizeRef.current = { w, h, dpr }
    }

    // ── Particle init ───────────────────────────────────────────
    function initParticles() {
      const { w, h } = sizeRef.current
      particlesRef.current = Array.from({ length: config.count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * config.maxVelocity * 2,
        vy: (Math.random() - 0.5) * config.maxVelocity * 2,
        radius: config.particleRadius * (0.5 + Math.random() * 0.5),
        alpha: 0.3 + Math.random() * 0.5,
      }))
    }

    // ── Update ──────────────────────────────────────────────────
    function update() {
      const { w, h } = sizeRef.current
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      for (const p of particlesRef.current) {
        const dx = p.x - mx
        const dy = p.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < config.mouseRadius && dist > 0) {
          const force = (config.mouseRadius - dist) / config.mouseRadius
          p.vx += (dx / dist) * force * 0.9
          p.vy += (dy / dist) * force * 0.9
        }

        // Dampen
        p.vx *= 0.97
        p.vy *= 0.97

        // Speed cap
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > config.maxVelocity) {
          p.vx = (p.vx / speed) * config.maxVelocity
          p.vy = (p.vy / speed) * config.maxVelocity
        }

        p.x += p.vx
        p.y += p.vy

        // Wrap edges
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0
      }
    }

    // ── Draw ────────────────────────────────────────────────────
    function draw() {
      if (!ctx) return
      const { w, h } = sizeRef.current
      const pts = particlesRef.current

      ctx.clearRect(0, 0, w, h)

      // Connection lines
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < config.connectionDist) {
            const alpha = (1 - dist / config.connectionDist) * 0.35
            ctx.strokeStyle = `rgba(96, 165, 250, ${alpha})`
            ctx.lineWidth = 0.8
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.stroke()
          }
        }
      }

      // Particles
      for (const p of pts) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(59, 130, 246, ${p.alpha})`
        ctx.fill()
      }
    }

    // ── RAF loop ────────────────────────────────────────────────
    function loop(timestamp: number) {
      animRef.current = requestAnimationFrame(loop)

      const delta = timestamp - lastTimeRef.current
      if (delta < frameBudget) return
      lastTimeRef.current = timestamp - (delta % frameBudget)

      update()
      draw()
    }

    // ── Mouse / touch events ────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onMouseLeave = () => { mouseRef.current = { x: -9999, y: -9999 } }

    const onTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect()
      const t = e.touches[0]
      mouseRef.current = { x: t.clientX - rect.left, y: t.clientY - rect.top }
    }
    const onTouchEnd = () => { mouseRef.current = { x: -9999, y: -9999 } }

    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)
    canvas.addEventListener('touchmove', onTouchMove, { passive: true })
    canvas.addEventListener('touchend', onTouchEnd)

    // ── Visibility API — pause when tab hidden ──────────────────
    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animRef.current)
      } else {
        lastTimeRef.current = 0
        animRef.current = requestAnimationFrame(loop)
      }
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    // ── IntersectionObserver — pause when off-screen ────────────
    const ioObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          lastTimeRef.current = 0
          animRef.current = requestAnimationFrame(loop)
        } else {
          cancelAnimationFrame(animRef.current)
        }
      },
      { threshold: 0 }
    )
    ioObserver.observe(canvas)

    // ── Resize — debounced ──────────────────────────────────────
    const onResize = debounce(() => {
      cancelAnimationFrame(animRef.current)
      initCanvas()
      initParticles()
      lastTimeRef.current = 0
      animRef.current = requestAnimationFrame(loop)
    }, 200)
    window.addEventListener('resize', onResize)

    // ── Boot ────────────────────────────────────────────────────
    initCanvas()
    initParticles()
    animRef.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(animRef.current)
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
      canvas.removeEventListener('touchmove', onTouchMove)
      canvas.removeEventListener('touchend', onTouchEnd)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      window.removeEventListener('resize', onResize)
      ioObserver.disconnect()
    }
  }, [canvasRef])
}
