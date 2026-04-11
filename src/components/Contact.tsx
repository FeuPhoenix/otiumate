import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Twitter, Instagram, CheckCircle2, Send } from 'lucide-react'
import { useInView } from '../hooks/useInView'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

const CONTACT_EMAIL = 'otiumate@gmail.com'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xreonqnd'

const SOCIALS = [
  { label: 'GitHub',    href: 'https://github.com/FeuPhoenix',                              icon: Github    },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/company/otiumate',                  icon: Linkedin  },
  { label: 'Twitter',   href: 'https://twitter.com/otiumate',                               icon: Twitter   },
  { label: 'Instagram', href: 'https://www.instagram.com/otiumate/',                        icon: Instagram },
]

export default function Contact() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1 })
  const [formState, setFormState] = useState<FormState>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Partial<typeof form>>({})

  const validate = () => {
    const errs: Partial<typeof form> = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email'
    if (!form.message.trim()) errs.message = 'Message is required'
    return errs
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setFormState('submitting')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      })
      if (res.ok) {
        setFormState('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        setFormState('error')
      }
    } catch {
      setFormState('error')
    }
  }

  const inputClass = (field: keyof typeof form) =>
    `w-full bg-brand-bg border rounded-xl px-4 py-3 text-white text-sm placeholder:text-brand-muted/50 outline-none transition-colors duration-200 ${
      errors[field]
        ? 'border-red-500/60 focus:border-red-500'
        : 'border-brand-border focus:border-brand-primary'
    }`

  const fadeUp = {
    hidden:  { opacity: 0, y: 24 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] } }),
  }

  return (
    <div className="py-32 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-radial-blue pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — headline */}
          <div>
            <motion.p className="section-label mb-6" custom={0} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
              07 / Contact
            </motion.p>
            <motion.h2
              className="display-font font-bold leading-[1.05] mb-6"
              style={{ fontSize: 'var(--text-section)' }}
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              Got an idea?{' '}
              <span className="text-gradient">Let's build it.</span>
            </motion.h2>
            <motion.p className="text-brand-muted leading-relaxed mb-10 max-w-md" custom={2} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
              Whether you have a project in mind, want to join the team, or just want to say hello — we're always up for a conversation.
            </motion.p>

            {/* Email */}
            <motion.a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 text-brand-accent hover:text-white transition-colors font-mono text-sm mb-10"
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              {CONTACT_EMAIL}
            </motion.a>

            {/* Social row */}
            <motion.div className="flex items-center gap-3" custom={4} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
              {SOCIALS.map(s => {
                const Icon = s.icon
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center text-brand-muted hover:border-brand-primary hover:text-brand-primary transition-colors"
                  >
                    <Icon size={16} />
                  </a>
                )
              })}
            </motion.div>

            {/* Availability badge */}
            <motion.div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5" custom={5} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 text-xs font-mono">Open to collaborations</span>
            </motion.div>
          </div>

          {/* Right — form */}
          <motion.div
            className="glass-card rounded-2xl p-8"
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <AnimatePresence mode="wait">
              {formState === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center py-12 gap-4"
                >
                  <CheckCircle2 size={48} className="text-emerald-400" />
                  <h3 className="display-font text-2xl font-semibold text-white">Message sent!</h3>
                  <p className="text-brand-muted text-sm">We'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                  noValidate
                >
                  <div>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className={inputClass('name')}
                      autoComplete="name"
                    />
                    <AnimatePresence>
                      {errors.name && (
                        <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                          className="text-red-400 text-xs mt-1.5">
                          {errors.name}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className={inputClass('email')}
                      autoComplete="email"
                    />
                    <AnimatePresence>
                      {errors.email && (
                        <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                          className="text-red-400 text-xs mt-1.5">
                          {errors.email}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <textarea
                      placeholder="Tell us about your idea..."
                      rows={5}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      className={`${inputClass('message')} resize-none`}
                    />
                    <AnimatePresence>
                      {errors.message && (
                        <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                          className="text-red-400 text-xs mt-1.5">
                          {errors.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {formState === 'error' && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-400 text-sm text-center py-2"
                    >
                      Something went wrong. Please try again or email us directly.
                    </motion.p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={formState === 'submitting'}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-primary text-white font-medium text-sm shadow-glow-sm hover:bg-blue-500 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {formState === 'submitting' ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={15} />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
