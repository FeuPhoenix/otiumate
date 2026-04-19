import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function EgyptTime() {
  const [time, setTime] = useState('')
  const [awake, setAwake] = useState(false)

  useEffect(() => {
    const update = () => {
      const t = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Africa/Cairo',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
      setTime(t)
      const h = parseInt(t.split(':')[0])
      setAwake(h >= 9 && h < 23)
    }
    update()
    const id = setInterval(update, 30000)
    return () => clearInterval(id)
  }, [])

  if (!time) return null

  return (
    <div className="flex items-center gap-2 font-mono text-xs text-brand-muted border border-brand-border rounded-full px-3 py-1.5">
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${awake ? 'bg-emerald-400 animate-pulse' : 'bg-red-400/70'}`} />
      <span>Cairo {time}</span>
      <span className={awake ? 'text-emerald-400' : 'text-red-400/70'}>
        {awake ? '· online' : '· offline'}
      </span>
    </div>
  )
}

interface NavbarProps {
  activeSection: string
}

const navLinks = [
  { label: 'About',   href: '#about'   },
  { label: 'Work',    href: '#work'    },
  { label: 'Team',    href: '#team'    },
  { label: 'Stack',   href: '#stack'   },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ activeSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isActive = (href: string) => activeSection === href.slice(1)

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2.5" aria-label="Otiumate home">
            <img
              src="/logo.png"
              alt="Otiumate"
              className="w-9 h-9 object-contain"
              onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
            <span className="display-font text-xl font-semibold tracking-tight">
              <span className="text-white">Otiu</span>
              <span className="text-brand-primary">mate</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors duration-200 ${
                  link.label === 'Contact'
                    ? 'px-4 py-2 rounded-full bg-brand-primary text-white hover:bg-blue-500'
                    : isActive(link.href)
                    ? 'text-brand-primary'
                    : 'text-brand-muted hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
            <EgyptTime />
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 relative z-50"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <motion.span
              className="block w-6 h-px bg-white origin-center"
              animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-6 h-px bg-white origin-center"
              animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-40 bg-brand-bg flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 + 0.1 }}
                className={
                  link.label === 'Contact'
                    ? 'display-font px-8 py-3 rounded-full bg-brand-primary text-white text-3xl font-semibold hover:bg-blue-500 transition-colors mt-2'
                    : 'display-font text-3xl font-semibold text-white hover:text-brand-accent transition-colors'
                }
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <EgyptTime />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
