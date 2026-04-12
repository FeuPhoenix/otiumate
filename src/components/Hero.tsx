import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useParticles } from '../hooks/useParticles'

const NAME = 'Otiumate'
const TAGLINE_LINE1 = 'Where friction'
const TAGLINE_LINE2 = 'becomes opportunity.'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [scrolled, setScrolled] = useState(false)

  useParticles(canvasRef)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
  }

  const charVariants = {
    hidden:  { opacity: 0, y: 60, rotateX: -45 },
    visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  }

  const fadeUpVariants = {
    hidden:  { opacity: 0, y: 24 },
    visible: (delay: number) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
    }),
  }

  return (
    <div className="relative h-[100dvh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Canvas layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      />

      {/* Vignette overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, #090909 100%)',
          zIndex: 1,
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, #090909)',
          zIndex: 1,
        }}
        aria-hidden="true"
      />
      {/* Subtle blue radial at top */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% -5%, rgba(37,99,235,0.18) 0%, transparent 70%)',
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Section label */}
        <motion.p
          className="section-label mb-8 inline-flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <span className="w-4 h-px bg-brand-primary inline-block" />
          The next face of AI in Egypt
          <span className="w-4 h-px bg-brand-primary inline-block" />
        </motion.p>

        {/* Name — character-by-character */}
        <motion.h1
          className="display-font font-bold leading-none mb-6 select-none"
          style={{ fontSize: 'var(--text-hero)', perspective: '800px' }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          aria-label={NAME}
        >
          {NAME.split('').map((char, i) => (
            <motion.span
              key={i}
              variants={charVariants}
              className="inline-block text-gradient"
              style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Tagline */}
        <div className="overflow-hidden mb-10">
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl text-brand-muted font-light leading-relaxed"
            custom={0.8}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            {TAGLINE_LINE1}{' '}
            <span className="text-white font-medium">{TAGLINE_LINE2}</span>
          </motion.p>
        </div>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          custom={1.1}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.a
            href="#work"
            className="px-8 py-3.5 rounded-full bg-brand-primary text-white font-medium text-base shadow-glow-blue hover:shadow-glow-sm transition-shadow duration-300"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            See Our Work
          </motion.a>
          <motion.a
            href="#team"
            className="px-8 py-3.5 rounded-full border border-brand-border text-brand-muted hover:border-brand-primary hover:text-white font-medium text-base transition-colors duration-200"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Meet the Team
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <AnimatePresence>
        {!scrolled && (
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 2, duration: 0.5 }}
          >
            <span className="section-label text-[10px]">scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown size={20} className="text-brand-muted" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
