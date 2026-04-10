import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { stack } from '../data/stack'

// Simple Icons CDN — https://simpleicons.org (MIT license)
// Icon slugs: lowercase, spaces removed, special chars removed
const ICON_SLUGS: Record<string, string> = {
  'React':        'react',
  'TypeScript':   'typescript',
  'Vite':         'vite',
  'Tailwind':     'tailwindcss',
  'Framer':       'framer',
  'React Native': 'react',
  'Python':       'python',
  'FastAPI':      'fastapi',
  'Node.js':      'nodedotjs',
  'PostgreSQL':   'postgresql',
  'Redis':        'redis',
  'Docker':       'docker',
  'AWS':          'amazonaws',
  'Vercel':       'vercel',
  'GitHub':       'github',
  'Figma':        'figma',
  'OpenAI':       'openai',
  'Supabase':     'supabase',
}

export default function TechStack() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1 })

  const mid = Math.ceil(stack.length / 2)
  const row1 = [...stack.slice(0, mid), ...stack.slice(0, mid)]
  const row2 = [...stack.slice(mid), ...stack.slice(mid)]

  return (
    <div className="py-24 relative overflow-hidden" ref={ref}>
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #090909, transparent)' }}
        aria-hidden="true"
      />
      <div className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #090909, transparent)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label mb-3">06 / Stack</p>
          <h2
            className="display-font font-bold text-white"
            style={{ fontSize: 'var(--text-section)' }}
          >
            Built with the{' '}
            <span className="text-gradient-blue">best tools.</span>
          </h2>
        </motion.div>
      </div>

      {/* Row 1 — forward */}
      <div className="group flex overflow-hidden mb-4">
        <div className="flex animate-marquee group-hover:[animation-play-state:paused] whitespace-nowrap">
          {row1.map((item, i) => (
            <TechPill key={i} item={item} />
          ))}
        </div>
      </div>

      {/* Row 2 — reverse */}
      <div className="group flex overflow-hidden">
        <div className="flex animate-marquee-rev group-hover:[animation-play-state:paused] whitespace-nowrap">
          {row2.map((item, i) => (
            <TechPill key={i} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

function TechPill({ item }: { item: typeof stack[number] }) {
  const slug = ICON_SLUGS[item.name]
  // Use hex color without # for the CDN URL
  const hexColor = item.color.replace('#', '')
  const iconUrl = slug ? `https://cdn.simpleicons.org/${slug}/${hexColor}` : null

  return (
    <div className="inline-flex items-center gap-2.5 mx-3 px-5 py-3 rounded-full border border-brand-border bg-brand-surface text-brand-muted text-sm font-mono transition-all duration-200 hover:border-brand-primary hover:text-white group/pill whitespace-nowrap">
      {iconUrl ? (
        <img
          src={iconUrl}
          alt={item.name}
          width={18}
          height={18}
          className="flex-shrink-0 opacity-60 group-hover/pill:opacity-100 transition-opacity duration-200"
          style={{ filter: 'brightness(1.2)' }}
          loading="lazy"
          onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
      ) : (
        <span
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ backgroundColor: item.color }}
          aria-hidden="true"
        />
      )}
      {item.name}
    </div>
  )
}
