import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Github, Linkedin, Twitter } from 'lucide-react'
import { team } from '../data/team'

export default function TeamSlideshow() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [isPaused, setIsPaused] = useState(false)
  const touchStart = useRef<number | null>(null)

  const goTo = useCallback((index: number, dir: 1 | -1) => {
    setDirection(dir)
    setCurrent(index)
  }, [])

  const next = useCallback(() => {
    goTo((current + 1) % team.length, 1)
  }, [current, goTo])

  const prev = useCallback(() => {
    goTo((current - 1 + team.length) % team.length, -1)
  }, [current, goTo])

  // Auto-advance
  useEffect(() => {
    if (isPaused) return
    const id = setInterval(next, 6000)
    return () => clearInterval(id)
  }, [next, isPaused])

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return
    const delta = touchStart.current - e.changedTouches[0].clientX
    if (Math.abs(delta) > 50) delta > 0 ? next() : prev()
    touchStart.current = null
  }

  const member = team[current]

  const slideVariants = {
    enter:  (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
    exit:   (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0, transition: { duration: 0.3 } }),
  }

  const bioStagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  }

  const bioItem = {
    hidden:  { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <div
      className="relative bg-brand-surface overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Section label */}
      <div className="absolute top-10 left-6 md:left-12 z-20">
        <p className="section-label">05 / The Team</p>
      </div>

      {/* Slide counter */}
      <div className="absolute top-10 right-6 md:right-12 z-20">
        <p className="section-label text-xs tabular-nums">
          {String(current + 1).padStart(2, '0')} — {String(team.length).padStart(2, '0')}
        </p>
      </div>

      <div className="min-h-[90vh] flex flex-col lg:grid lg:grid-cols-2">
        {/* Left — Photo */}
        <div className="relative h-64 lg:h-auto overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={member.id + '-photo'}
              className="absolute inset-0"
              custom={direction}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {member.photo ? (
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-brand-bg to-blue-950" />
              )}
              {/* Brand overlay */}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.25) 0%, rgba(9,9,9,0.4) 100%)' }}
                aria-hidden="true"
              />
              {/* Mobile gradient to text area */}
              <div
                className="absolute inset-x-0 bottom-0 h-24 lg:hidden"
                style={{ background: 'linear-gradient(to bottom, transparent, #111111)' }}
                aria-hidden="true"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right — Bio */}
        <div className="flex flex-col justify-center px-8 py-14 lg:px-16 lg:py-20">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={member.id + '-bio'}
              className="max-w-lg"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <motion.div variants={bioStagger} initial="hidden" animate="visible">
                <motion.h2 variants={bioItem} className="display-font text-4xl lg:text-5xl font-bold text-white mb-2">
                  {member.name}
                </motion.h2>
                <motion.p variants={bioItem} className="font-mono text-brand-primary text-sm mb-6 tracking-wide">
                  {member.role}
                </motion.p>
                <motion.p variants={bioItem} className="text-brand-muted leading-relaxed mb-8 text-base">
                  {member.bio}
                </motion.p>

                {/* Detail chips */}
                <motion.div variants={bioItem} className="flex flex-wrap gap-2 mb-8">
                  {member.details.map(d => (
                    <span key={d} className="px-3 py-1 rounded-full bg-brand-bg border border-brand-border text-brand-muted text-xs font-mono">
                      {d}
                    </span>
                  ))}
                </motion.div>

                {/* Social links */}
                <motion.div variants={bioItem} className="flex items-center gap-3">
                  {member.socials?.linkedin && (
                    <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                      className="w-9 h-9 rounded-full border border-brand-border flex items-center justify-center text-brand-muted hover:border-brand-primary hover:text-brand-primary transition-colors">
                      <Linkedin size={15} />
                    </a>
                  )}
                  {member.socials?.github && (
                    <a href={member.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                      className="w-9 h-9 rounded-full border border-brand-border flex items-center justify-center text-brand-muted hover:border-brand-primary hover:text-brand-primary transition-colors">
                      <Github size={15} />
                    </a>
                  )}
                  {member.socials?.twitter && (
                    <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" aria-label="X / Twitter"
                      className="w-9 h-9 rounded-full border border-brand-border flex items-center justify-center text-brand-muted hover:border-brand-primary hover:text-brand-primary transition-colors">
                      <Twitter size={15} />
                    </a>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation controls */}
          <div className="flex items-center gap-4 mt-12">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center text-brand-muted hover:border-brand-primary hover:text-white transition-colors"
              aria-label="Previous team member"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {team.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i, i > current ? 1 : -1)}
                  aria-label={`Go to team member ${i + 1}`}
                  className="transition-all duration-300"
                >
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      i === current
                        ? 'w-6 h-1.5 bg-brand-primary'
                        : 'w-1.5 h-1.5 bg-brand-border hover:bg-brand-muted'
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center text-brand-muted hover:border-brand-primary hover:text-white transition-colors"
              aria-label="Next team member"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
