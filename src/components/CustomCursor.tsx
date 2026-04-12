import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)
  const isTouchDevice = useRef(
    typeof window !== 'undefined' &&
    ('ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      !window.matchMedia('(pointer: fine)').matches)
  )

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Dot follows cursor exactly
  const dotX = useSpring(mouseX, { stiffness: 1000, damping: 50, mass: 0.1 })
  const dotY = useSpring(mouseY, { stiffness: 1000, damping: 50, mass: 0.1 })

  // Ring follows with slight lag
  const ringX = useSpring(mouseX, { stiffness: 180, damping: 22, mass: 0.3 })
  const ringY = useSpring(mouseY, { stiffness: 180, damping: 22, mass: 0.3 })

  // Spotlight trails far behind
  const spotX = useSpring(mouseX, { stiffness: 60, damping: 18, mass: 1 })
  const spotY = useSpring(mouseY, { stiffness: 60, damping: 18, mass: 1 })

  useEffect(() => {
    if (isTouchDevice.current) return

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!visible) setVisible(true)
    }
    const onLeave  = () => setVisible(false)
    const onEnter  = () => setVisible(true)
    const onDown   = () => setClicking(true)
    const onUp     = () => setClicking(false)

    const onPointerOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      if (el.closest('a, button, [role="button"], input, textarea, select, label')) {
        setHovering(true)
      }
    }
    const onPointerOut = () => setHovering(false)

    document.addEventListener('mousemove',  onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mousedown',  onDown)
    document.addEventListener('mouseup',    onUp)
    document.addEventListener('mouseover',  onPointerOver)
    document.addEventListener('mouseout',   onPointerOut)

    return () => {
      document.removeEventListener('mousemove',  onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mousedown',  onDown)
      document.removeEventListener('mouseup',    onUp)
      document.removeEventListener('mouseover',  onPointerOver)
      document.removeEventListener('mouseout',   onPointerOut)
    }
  }, [mouseX, mouseY, visible])

  // Hide native cursor only after first real mouse movement (not on headless/SSR)
  useEffect(() => {
    if (isTouchDevice.current) return
    const onFirstMove = () => {
      document.documentElement.style.cursor = 'none'
    }
    document.addEventListener('mousemove', onFirstMove, { once: true })
    return () => {
      document.removeEventListener('mousemove', onFirstMove)
      document.documentElement.style.cursor = ''
    }
  }, [])

  if (isTouchDevice.current) return null

  return (
    <>
      {/* Spotlight trailer */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ x: spotX, y: spotY, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ opacity: { duration: 0.4 } }}
      >
        <div style={{
          width: 380,
          height: 380,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.10) 0%, rgba(37,99,235,0.04) 40%, transparent 70%)',
        }} />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999]"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: clicking ? 0.75 : hovering ? 1.8 : 1,
        }}
        transition={{ opacity: { duration: 0.15 }, scale: { duration: 0.2 } }}
      >
        <div
          className="rounded-full border transition-colors duration-200"
          style={{
            width: 36,
            height: 36,
            borderColor: hovering ? 'rgba(37, 99, 235, 0.8)' : 'rgba(255,255,255,0.35)',
          }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999]"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: clicking ? 0.5 : 1,
        }}
        transition={{ opacity: { duration: 0.1 }, scale: { duration: 0.1 } }}
      >
        <div
          className="rounded-full transition-colors duration-150"
          style={{
            width: 6,
            height: 6,
            backgroundColor: hovering ? '#2563EB' : '#FFFFFF',
          }}
        />
      </motion.div>
    </>
  )
}
