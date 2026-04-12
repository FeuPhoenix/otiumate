import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'
import { useInView } from '../hooks/useInView'

export default function Reel() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.3 })
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) { v.play(); setPlaying(true) }
    else          { v.pause(); setPlaying(false) }
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  return (
    <div className="py-24 relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Label */}
        <motion.p
          className="section-label mb-6"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          Our Story
        </motion.p>

        <motion.h2
          className="display-font font-bold text-white mb-10"
          style={{ fontSize: 'var(--text-section)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          See what we're{' '}
          <span className="text-gradient">building.</span>
        </motion.h2>

        {/* Video container */}
        <motion.div
          className="relative rounded-2xl overflow-hidden bg-black cursor-pointer group mx-auto"
          style={{ aspectRatio: '9/16', maxWidth: '400px' }}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          onClick={togglePlay}
        >
          <video
            ref={videoRef}
            src="/reel.mp4"
            className="w-full h-full object-cover"
            muted
            playsInline
            preload="metadata"
            onEnded={() => setPlaying(false)}
          />

          {/* Overlay gradient */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none transition-opacity duration-300"
            style={{ opacity: playing ? 0 : 1 }}
          />

          {/* Play / pause button */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
              playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
            }`}
          >
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-lg">
              {playing
                ? <Pause size={24} className="text-white" />
                : <Play  size={24} className="text-white translate-x-0.5" />
              }
            </div>
          </div>

          {/* Mute toggle */}
          <button
            onClick={toggleMute}
            className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            aria-label={muted ? 'Unmute' : 'Mute'}
          >
            {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>

          {/* Brand label */}
          {!playing && (
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <span className="font-mono text-xs text-white/60 tracking-widest uppercase">Otiumate Reel 2026</span>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
