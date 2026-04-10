import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, ArrowUpRight } from 'lucide-react'
import type { Project } from '../data/projects'

const STATUS_STYLES: Record<string, string> = {
  'Live':        'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'In Progress': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Concept':     'bg-amber-500/10 text-amber-400 border-amber-500/20',
}

interface Props {
  project: Project | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: Props) {
  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  // Lock scroll
  useEffect(() => {
    if (project) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [project])

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[100] bg-black/75"
            style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            className="fixed inset-x-4 bottom-0 md:inset-x-auto md:left-1/2 md:top-1/2 md:w-full md:max-w-2xl z-[101] bg-brand-surface border border-brand-border rounded-t-3xl md:rounded-2xl overflow-hidden"
            style={{ '--tw-translate-x': '-50%', '--tw-translate-y': '-50%' } as React.CSSProperties}
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Image */}
            {project.image && (
              <div className="relative aspect-[16/8] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to bottom, transparent 50%, #111111 100%)' }}
                />
              </div>
            )}

            {/* Content */}
            <div className="p-6 md:p-8">
              {/* Header row */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="display-font text-2xl font-bold text-white">{project.title}</h2>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${STATUS_STYLES[project.status]}`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-brand-muted text-xs font-mono">{project.category}</p>
                </div>
                <button
                  onClick={onClose}
                  className="flex-shrink-0 w-9 h-9 rounded-full border border-brand-border flex items-center justify-center text-brand-muted hover:border-brand-primary hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>

              <p className="text-brand-muted leading-relaxed mb-6">{project.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 rounded-lg bg-brand-bg border border-brand-border text-brand-muted text-xs font-mono">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                {project.link && project.link !== '#' && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 bg-brand-primary text-white text-sm font-medium rounded-xl hover:bg-blue-500 transition-colors"
                  >
                    Visit Project <ExternalLink size={14} />
                  </a>
                )}
                <button
                  onClick={onClose}
                  className="flex items-center gap-2 px-5 py-2.5 border border-brand-border text-brand-muted text-sm rounded-xl hover:border-brand-primary hover:text-white transition-colors"
                >
                  Close <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
