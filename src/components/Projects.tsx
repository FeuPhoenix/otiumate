import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useInView } from '../hooks/useInView'
import { projects, type ProjectCategory, type Project } from '../data/projects'
import ProjectModal from './ProjectModal'

type Filter = 'All' | ProjectCategory

const FILTERS: Filter[] = ['All', 'Web', 'Mobile', 'Research']

const STATUS_STYLES: Record<string, string> = {
  'Live':        'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'In Progress': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Concept':     'bg-amber-500/10 text-amber-400 border-amber-500/20',
}

const cardVariants = {
  hidden:  { opacity: 0, y: 24, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] },
  }),
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<Filter>('All')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.05 })

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter)

  return (
    <div className="py-16 pb-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="section-label mb-3">04 / Projects</p>
            <h2
              className="display-font font-bold text-white"
              style={{ fontSize: 'var(--text-section)' }}
            >
              Our Work.
            </h2>
          </motion.div>

          {/* Filter tabs */}
          <motion.div
            className="flex items-center gap-1 no-scrollbar overflow-x-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {FILTERS.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className="relative px-4 py-2 text-sm rounded-full transition-colors duration-200 whitespace-nowrap"
                style={{
                  color: activeFilter === filter ? '#fff' : '#6B7280',
                }}
              >
                {activeFilter === filter && (
                  <motion.span
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-brand-primary rounded-full"
                    style={{ zIndex: -1 }}
                    transition={{ type: 'spring', bounce: 0.25, duration: 0.4 }}
                  />
                )}
                {filter}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.article
                key={project.id}
                layout
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="group bg-brand-surface border border-brand-border rounded-2xl overflow-hidden hover:border-brand-primary/30 transition-colors duration-300"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="w-full h-full"
                      style={{ background: 'linear-gradient(135deg, #111 0%, #1a2a4a 100%)' }}
                    />
                  )}
                  {/* Overlay on hover — opens modal */}
                  <div
                    className="absolute inset-0 bg-brand-bg/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <span className="flex items-center gap-2 px-4 py-2 bg-white text-brand-bg text-sm font-medium rounded-full">
                      View Details <ArrowUpRight size={14} />
                    </span>
                  </div>
                  {/* Status badge */}
                  <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium border ${STATUS_STYLES[project.status]}`}>
                    {project.status}
                  </span>
                </div>

                {/* Content */}
                <div
                  className="p-6 cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="display-font font-semibold text-white text-lg">{project.title}</h3>
                    <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full border border-brand-border text-brand-muted group-hover:border-brand-primary group-hover:text-brand-primary transition-colors">
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                  <p className="text-brand-muted text-sm mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded text-xs bg-brand-bg text-brand-muted border border-brand-border font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  )
}
