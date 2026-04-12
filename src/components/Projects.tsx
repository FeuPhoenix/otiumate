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
                style={{ color: activeFilter === filter ? '#fff' : '#6B7280' }}
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
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  )
}

// ── Separate card component so hover state is isolated per card ──
function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project
  index: number
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] } }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative bg-brand-surface border border-brand-border rounded-2xl overflow-hidden cursor-pointer"
      style={{ borderColor: hovered ? 'rgba(37,99,235,0.4)' : undefined }}
      transition={{ borderColor: { duration: 0.2 } }}
    >
      {/* Image / Preview */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {project.image ? (
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.05 : 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full"
            style={{ background: 'linear-gradient(135deg, #111 0%, #1a2a4a 100%)' }}
          />
        )}

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(9,9,9,0.55)' }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.span
            className="flex items-center gap-2 px-4 py-2 bg-white text-brand-bg text-sm font-medium rounded-full"
            animate={{ scale: hovered ? 1 : 0.85, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            View Details <ArrowUpRight size={14} />
          </motion.span>
        </motion.div>

        {/* Status badge */}
        <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium border ${STATUS_STYLES[project.status]}`}>
          {project.status}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="display-font font-semibold text-white text-lg">{project.title}</h3>
          <motion.span
            className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full border text-brand-muted"
            animate={{
              borderColor: hovered ? '#2563EB' : '#1E1E1E',
              color: hovered ? '#2563EB' : '#6B7280',
            }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUpRight size={14} />
          </motion.span>
        </div>
        <p className="text-brand-muted text-sm mb-4 leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded text-xs bg-brand-bg text-brand-muted border border-brand-border font-mono"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  )
}
