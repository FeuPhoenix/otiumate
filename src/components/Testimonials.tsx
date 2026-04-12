import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

export default function Testimonials() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 })

  return (
    <div className="py-28 relative overflow-hidden bg-brand-bg" ref={ref}>
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

        <motion.div
          className="inline-flex flex-col items-center gap-5"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="w-12 h-px bg-brand-primary" />
          <span className="font-mono text-xs tracking-[0.22em] text-brand-primary uppercase">Coming Soon</span>
          <p className="text-brand-muted text-base max-w-sm leading-relaxed">
            We're just getting started. Testimonials from our first clients are on the way.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
