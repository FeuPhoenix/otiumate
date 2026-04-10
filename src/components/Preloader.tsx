import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'loading' | 'revealing'>('loading')

  useEffect(() => {
    // Simulate loading progress
    const steps = [20, 45, 70, 90, 100]
    const delays = [150, 300, 250, 350, 400]
    let i = 0

    const tick = () => {
      if (i >= steps.length) {
        setPhase('revealing')
        setTimeout(onComplete, 900)
        return
      }
      setProgress(steps[i])
      i++
      setTimeout(tick, delays[i - 1] ?? 300)
    }

    const id = setTimeout(tick, 200)
    return () => clearTimeout(id)
  }, [onComplete])

  const NAME = 'Otiumate'

  return (
    <AnimatePresence>
      {phase === 'loading' && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] bg-brand-bg flex flex-col items-center justify-center"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Logo / wordmark */}
          <motion.div
            className="mb-16 flex items-center gap-1"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <img
              src="/logo.png"
              alt="Otiumate"
              className="w-14 h-14 object-contain"
              onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
          </motion.div>

          {/* Brand name with stagger */}
          <motion.div
            className="flex items-center overflow-hidden mb-12"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.3 } } }}
          >
            {NAME.split('').map((char, i) => (
              <motion.span
                key={i}
                className="display-font text-3xl font-semibold text-gradient"
                variants={{
                  hidden:  { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>

          {/* Progress bar */}
          <div className="w-48 h-px bg-brand-border relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-brand-primary"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>

          {/* Progress number */}
          <motion.p
            className="section-label mt-4 tabular-nums"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {progress}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
