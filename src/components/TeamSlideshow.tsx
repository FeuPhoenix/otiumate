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

  const next = useCallback(() => goTo((current + 1) % team.length, 1),  [current, goTo])
  const prev = useCallback(() => goTo((current - 1 + team.length) % team.length, -1), [current, goTo])

  useEffect(() => {
    if (isPaused) return
    const id = setInterval(next, 6000)
    return () => clearInterval(id)
  }, [next, isPaused])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft')  prev()
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

  const photoVariants = {
    enter:  { opacity: 0 },
    center: { opacity: 1, transition: { duration: 0.6 } },
    exit:   { opacity: 0, transition: { duration: 0.4 } },
  }

  const bioVariants = {
    enter:  (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
    exit:   (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0, transition: { duration: 0.3 } }),
  }

  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } }
  const item    = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } } }

  /* ── Navigation controls — shared by both layouts ── */
  const Controls = () => (
    <div className="flex items-center gap-4">
      <button onClick={prev} aria-label="Previous team member"
        className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-brand-primary hover:text-white transition-colors">
        <ChevronLeft size={16} />
      </button>
      <div className="flex items-center gap-2">
        {team.map((_, i) => (
          <button key={i} onClick={() => goTo(i, i > current ? 1 : -1)} aria-label={`Go to ${team[i].name}`}>
            <span className={`block rounded-full transition-all duration-300 ${
              i === current ? 'w-5 h-1.5 bg-brand-primary' : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
            }`} />
          </button>
        ))}
      </div>
      <button onClick={next} aria-label="Next team member"
        className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-brand-primary hover:text-white transition-colors">
        <ChevronRight size={16} />
      </button>
    </div>
  )

  return (
    <div
      className="relative bg-brand-surface overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ═══════════════════════════════════════════════
          MOBILE LAYOUT — full-height photo + bio overlay
          ═══════════════════════════════════════════════ */}
      <div className="relative lg:hidden" style={{ height: '100dvh', minHeight: 600 }}>
        {/* Full-bleed photo */}
        <AnimatePresence mode="wait">
          <motion.div
            key={member.id + '-mob-photo'}
            className="absolute inset-0"
            variants={photoVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {member.photo ? (
              <img
                src={member.photo}
                alt={member.name}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-brand-bg to-blue-950" />
            )}
            {/* Strong gradient — photo at top, bio readable at bottom */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to bottom, rgba(9,9,9,0.1) 0%, rgba(9,9,9,0.15) 40%, rgba(9,9,9,0.75) 65%, rgba(9,9,9,0.97) 100%)',
              }}
              aria-hidden="true"
            />
            {/* Subtle blue rim */}
            <div
              className="absolute inset-0"
              style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(37,99,235,0.2) 0%, transparent 70%)' }}
              aria-hidden="true"
            />
          </motion.div>
        </AnimatePresence>

        {/* Section label + counter — top */}
        <div className="absolute top-10 left-6 right-6 flex justify-between z-10">
          <p className="section-label">05 / The Team</p>
          <p className="section-label tabular-nums">
            {String(current + 1).padStart(2, '0')} — {String(team.length).padStart(2, '0')}
          </p>
        </div>

        {/* Bio overlay — bottom */}
        <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-10 pt-8">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={member.id + '-mob-bio'}
              custom={direction}
              variants={bioVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <motion.div variants={stagger} initial="hidden" animate="visible">
                <motion.h2 variants={item} className="display-font text-4xl font-bold text-white mb-1">
                  {member.name}
                </motion.h2>
                <motion.p variants={item} className="font-mono text-brand-primary text-sm mb-4 tracking-wide">
                  {member.role}
                </motion.p>
                <motion.p variants={item} className="text-white/70 text-sm leading-relaxed mb-5 line-clamp-3">
                  {member.bio}
                </motion.p>

                <motion.div variants={item} className="flex items-center justify-between">
                  <Controls />
                  {/* Socials */}
                  <div className="flex gap-2">
                    {member.socials?.linkedin && (
                      <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                        className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-brand-primary hover:text-brand-primary transition-colors">
                        <Linkedin size={13} />
                      </a>
                    )}
                    {member.socials?.github && (
                      <a href={member.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                        className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-brand-primary hover:text-brand-primary transition-colors">
                        <Github size={13} />
                      </a>
                    )}
                    {member.socials?.twitter && (
                      <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" aria-label="X / Twitter"
                        className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-brand-primary hover:text-brand-primary transition-colors">
                        <Twitter size={13} />
                      </a>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          DESKTOP LAYOUT — side by side
          ═══════════════════════════════════════════════ */}
      <div className="hidden lg:grid lg:grid-cols-2 min-h-[90vh]">
        {/* Left — Photo */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={member.id + '-desk-photo'}
              className="absolute inset-0"
              variants={photoVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {member.photo ? (
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-brand-bg to-blue-950" />
              )}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.2) 0%, rgba(9,9,9,0.35) 100%)' }}
                aria-hidden="true"
              />
            </motion.div>
          </AnimatePresence>

          {/* Section label */}
          <div className="absolute top-10 left-12 z-10">
            <p className="section-label">05 / The Team</p>
          </div>
        </div>

        {/* Right — Bio */}
        <div className="flex flex-col justify-center px-16 py-20 relative">
          {/* Slide counter */}
          <div className="absolute top-10 right-12">
            <p className="section-label tabular-nums">
              {String(current + 1).padStart(2, '0')} — {String(team.length).padStart(2, '0')}
            </p>
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={member.id + '-desk-bio'}
              className="max-w-lg"
              custom={direction}
              variants={bioVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <motion.div variants={stagger} initial="hidden" animate="visible">
                <motion.h2 variants={item} className="display-font text-5xl font-bold text-white mb-2">
                  {member.name}
                </motion.h2>
                <motion.p variants={item} className="font-mono text-brand-primary text-sm mb-6 tracking-wide">
                  {member.role}
                </motion.p>
                <motion.p variants={item} className="text-brand-muted leading-relaxed mb-8 text-base">
                  {member.bio}
                </motion.p>

                <motion.div variants={item} className="flex flex-wrap gap-2 mb-8">
                  {member.details.map(d => (
                    <span key={d} className="px-3 py-1 rounded-full bg-brand-bg border border-brand-border text-brand-muted text-xs font-mono">
                      {d}
                    </span>
                  ))}
                </motion.div>

                <motion.div variants={item} className="flex items-center gap-3">
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

          <div className="mt-12">
            <Controls />
          </div>
        </div>
      </div>
    </div>
  )
}
