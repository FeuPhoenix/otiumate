import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useInView } from '../hooks/useInView'
import { testimonials } from '../data/testimonials'

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 })

  const next = useCallback(() => {
    setDirection(1)
    setCurrent(c => (c + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent(c => (c - 1 + testimonials.length) % testimonials.length)
  }, [])

  // Auto-advance
  useEffect(() => {
    const id = setInterval(next, 7000)
    return () => clearInterval(id)
  }, [next])

  const t = testimonials[current]

  const variants = {
    enter:  (dir: number) => ({ x: dir * 60, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
    exit:   (dir: number) => ({ x: dir * -60, opacity: 0, transition: { duration: 0.3 } }),
  }

  return (
    <div className="py-28 relative overflow-hidden bg-brand-bg" ref={ref}>
      {/* Background accent */}
      <div className="absolute inset-0 bg-radial-blue pointer-events-none" aria-hidden="true" />

      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.p
          className="section-label mb-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          What people say
        </motion.p>

        <motion.h2
          className="display-font font-bold mb-16"
          style={{ fontSize: 'var(--text-section)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Trusted by{' '}
          <span className="text-gradient-blue">builders.</span>
        </motion.h2>

        {/* Quote card */}
        <div className="relative min-h-[220px] flex items-center justify-center">
          {/* Large quote mark */}
          <span
            className="absolute -top-4 left-0 display-font text-[8rem] leading-none text-brand-primary/10 select-none pointer-events-none"
            aria-hidden="true"
          >
            "
          </span>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={t.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative"
            >
              <blockquote className="text-xl md:text-2xl text-white/90 leading-relaxed font-light mb-10 max-w-3xl mx-auto">
                "{t.quote}"
              </blockquote>

              <div className="flex items-center justify-center gap-4">
                {t.avatar && (
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-brand-primary/30"
                    loading="lazy"
                  />
                )}
                <div className="text-left">
                  <p className="text-white font-medium text-sm">{t.name}</p>
                  <p className="text-brand-muted text-xs font-mono">{t.role} @ {t.company}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={prev}
            className="w-9 h-9 rounded-full border border-brand-border flex items-center justify-center text-brand-muted hover:border-brand-primary hover:text-white transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                aria-label={`Testimonial ${i + 1}`}
              >
                <span className={`block rounded-full transition-all duration-300 ${
                  i === current ? 'w-6 h-1.5 bg-brand-primary' : 'w-1.5 h-1.5 bg-brand-border hover:bg-brand-muted'
                }`} />
              </button>
            ))}
          </div>

          <button
            onClick={next}
            className="w-9 h-9 rounded-full border border-brand-border flex items-center justify-center text-brand-muted hover:border-brand-primary hover:text-white transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
