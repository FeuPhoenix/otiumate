import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const MISSION = 'We don\'t just give you a tool. We give your business a new field of play.'

const STORY = [
  'Businesses today see what AI can do — but building the right product takes technical depth most teams don\'t have. That gap is where we live.',
  'Otiumate is an AI automation and products studio. We study your industry, spot what AI can unlock — whether that\'s eliminating a bottleneck or opening a market you haven\'t touched yet — and build the product that gets you there.',
  'So you can focus on the business side of business.',
]

const STATS = [
  { label: 'Products Shipped' },
  { label: 'Beta Users'       },
  { label: 'Hours Saved'      },
]

function CountUp({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!active) return
    const start = performance.now()
    const duration = 1600

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // ease out quart
      const eased = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(eased * target))
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [active, target])

  return (
    <span>
      {count}{suffix}
    </span>
  )
}

export default function About() {
  const [containerRef, inView] = useInView<HTMLDivElement>({ threshold: 0.1 })
  const [statsRef, statsInView] = useInView<HTMLDivElement>({ threshold: 0.3 })

  const fadeLeft = {
    hidden:  { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  }

  const fadeUp = {
    hidden:  { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
    }),
  }

  return (
    <div className="relative py-32 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-bg via-transparent to-brand-bg pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-6" ref={containerRef}>
        {/* Section label */}
        <motion.p
          className="section-label mb-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          02 / About
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — mission + story */}
          <div>
            <motion.h2
              className="display-font text-gradient leading-[1.1] mb-10"
              style={{ fontSize: 'var(--text-section)' }}
              variants={fadeLeft}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              {MISSION}
            </motion.h2>

            <div className="space-y-5">
              {STORY.map((para, i) => (
                <motion.p
                  key={i}
                  className="text-brand-muted leading-relaxed text-base"
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                >
                  {para}
                </motion.p>
              ))}
            </div>
          </div>

          {/* Right — stats */}
          <div ref={statsRef} className="lg:pt-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-px bg-brand-border rounded-2xl overflow-hidden">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="bg-brand-surface p-8 lg:p-10"
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate={statsInView ? 'visible' : 'hidden'}
                >
                  <p className="display-font text-5xl lg:text-6xl font-bold text-brand-primary mb-2">
                    —
                  </p>
                  <p className="section-label">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
