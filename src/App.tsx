import { useEffect, useRef, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import WhatWeDo from './components/WhatWeDo'
import Reel from './components/Reel'
import Projects from './components/Projects'
import TeamSlideshow from './components/TeamSlideshow'
// import Testimonials from './components/Testimonials'
import TechStack from './components/TechStack'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Preloader from './components/Preloader'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import BackToTop from './components/BackToTop'
import Grain from './components/Grain'
import ClientOnly from './components/ClientOnly'

const SECTIONS = ['hero', 'about', 'work', 'team', 'stack', 'contact'] as const
type SectionId = typeof SECTIONS[number]

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('hero')
  const sectionRefs = useRef<Map<SectionId, HTMLElement>>(new Map())

  const registerSection = (id: SectionId, el: HTMLElement | null) => {
    if (el) sectionRefs.current.set(id, el)
  }

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sectionRefs.current.forEach((el, id) => {
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0.3 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  return (
    /* reducedMotion="user" makes every Framer animation below respect the OS
       setting; the CSS-driven pieces are handled in index.css. */
    <MotionConfig reducedMotion="user">
      {/* Overlay, not a gate — the page beneath is always mounted so the
          prerendered HTML contains real content. */}
      <ClientOnly>
        <Preloader />
      </ClientOnly>

      <Grain />
      <ClientOnly>
        <CustomCursor />
      </ClientOnly>
      <ScrollProgress />

      <div className="bg-brand-bg text-brand-text min-h-screen">
        <Navbar activeSection={activeSection} />
        <main>
          <section id="hero" ref={el => registerSection('hero', el)}>
            <Hero />
          </section>
          <section id="about" ref={el => registerSection('about', el)}>
            <About />
          </section>
          <Reel />
          <section id="work" ref={el => registerSection('work', el)}>
            <WhatWeDo />
            <Projects />
          </section>
          <section id="team" ref={el => registerSection('team', el)}>
            <TeamSlideshow />
          </section>
          {/* <Testimonials /> */}
          <section id="stack" ref={el => registerSection('stack', el)}>
            <TechStack />
          </section>
          <section id="contact" ref={el => registerSection('contact', el)}>
            <Contact />
          </section>
        </main>
        <Footer />
      </div>

      <BackToTop />
    </MotionConfig>
  )
}
