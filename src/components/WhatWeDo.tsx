import { motion } from 'framer-motion'
import { Lightbulb, Code2, Smartphone, Palette, BrainCircuit, LineChart } from 'lucide-react'
import { useInView } from '../hooks/useInView'

// TODO: Replace with real capabilities
const capabilities = [
  {
    id: 'strategy',
    icon: Lightbulb,
    title: 'Product Strategy',
    description: 'We turn fuzzy ideas into sharp product visions. From market positioning to roadmap prioritization — we think before we build.',
    span: 2,
  },
  {
    id: 'web',
    icon: Code2,
    title: 'Web Development',
    description: 'Production-grade web apps built with modern stacks. Fast, accessible, and built to scale.',
    span: 1,
  },
  {
    id: 'mobile',
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'Cross-platform mobile experiences that feel native. Built with React Native and shipped to both stores.',
    span: 1,
  },
  {
    id: 'design',
    icon: Palette,
    title: 'UI / UX Design',
    description: 'Interface design with a motion-first philosophy. Every screen is crafted to feel alive and purposeful.',
    span: 1,
  },
  {
    id: 'ai',
    icon: BrainCircuit,
    title: 'AI Integration',
    description: 'We embed intelligence where it matters — not as a feature, but as infrastructure that removes friction.',
    span: 1,
  },
  {
    id: 'research',
    icon: LineChart,
    title: 'Research & Insights',
    description: 'Deep user research and data analysis that grounds every decision in what actually matters to real people.',
    span: 2,
  },
]

const cardVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function WhatWeDo() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1 })

  return (
    <div className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label mb-4">03 / What We Do</p>
          <h2
            className="display-font font-bold text-white"
            style={{ fontSize: 'var(--text-section)' }}
          >
            Built for the{' '}
            <span className="text-gradient-blue">ambitious.</span>
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-brand-border rounded-2xl overflow-hidden"
        >
          {capabilities.map((cap, i) => {
            const Icon = cap.icon
            const colSpan = cap.span === 2
              ? 'sm:col-span-2 lg:col-span-2'
              : 'sm:col-span-1 lg:col-span-1'

            return (
              <motion.div
                key={cap.id}
                className={`${colSpan} bg-brand-surface p-8 group cursor-default relative overflow-hidden`}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse 60% 60% at 30% 40%, rgba(37,99,235,0.12) 0%, transparent 70%)' }}
                  aria-hidden="true"
                />
                {/* Top accent line */}
                <div className="w-8 h-px bg-brand-primary mb-6 group-hover:w-16 transition-all duration-300" />

                <Icon
                  size={28}
                  className="text-brand-primary mb-5 group-hover:scale-110 transition-transform duration-300"
                  aria-hidden="true"
                />
                <h3 className="display-font font-semibold text-white text-lg mb-3">{cap.title}</h3>
                <p className="text-brand-muted text-sm leading-relaxed">{cap.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
