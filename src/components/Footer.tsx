import { Github, Linkedin, Twitter, Instagram } from 'lucide-react'

const NAV_LINKS = [
  { label: 'About',   href: '#about'   },
  { label: 'Work',    href: '#work'    },
  { label: 'Team',    href: '#team'    },
  { label: 'Stack',   href: '#stack'   },
  { label: 'Contact', href: '#contact' },
]

const SOCIAL_LINKS = [
  { label: 'GitHub',    href: 'https://github.com/FeuPhoenix',                              icon: Github    },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/company/otiumate',                  icon: Linkedin  },
  { label: 'Twitter',   href: 'https://twitter.com/otiumate',                               icon: Twitter   },
  { label: 'Instagram', href: 'https://www.instagram.com/otiumate/',                        icon: Instagram },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-brand-border bg-brand-bg">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 mb-12">
          {/* Logo + tagline */}
          <div>
            <a href="#hero" className="inline-flex items-center gap-2.5 mb-3" aria-label="Otiumate home">
              <img
                src="/logo.png"
                alt="Otiumate"
                className="w-8 h-8 object-contain"
                onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
              <span className="display-font text-xl font-semibold">
                <span className="text-white">Otiu</span>
                <span className="text-brand-primary">mate</span>
              </span>
            </a>
            <p className="text-brand-muted text-sm leading-relaxed max-w-xs">
              Building the future, one idea at a time.
            </p>
          </div>

          {/* Quick nav */}
          <div>
            <p className="section-label mb-5">Navigate</p>
            <ul className="space-y-3">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-brand-muted text-sm hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="section-label mb-5">Connect</p>
            <div className="flex flex-wrap gap-2">
              {SOCIAL_LINKS.map(s => {
                const Icon = s.icon
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 rounded-full border border-brand-border flex items-center justify-center text-brand-muted hover:border-brand-primary hover:text-brand-primary transition-colors"
                  >
                    <Icon size={15} />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-brand-border">
          <p className="text-brand-muted text-xs font-mono">
            © {year} Otiumate. All rights reserved.
          </p>
          <p className="text-brand-muted text-xs font-mono">
            Built with React & Vite ✦
          </p>
        </div>
      </div>
    </footer>
  )
}
