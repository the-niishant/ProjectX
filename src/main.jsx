import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createRafLoop, MOTION, prefersReducedMotion } from './motion'
import './styles.css'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    number: '01',
    title: 'Neural Canvas',
    category: 'AI product / Experience',
    year: '2026',
    description: 'A visual workspace for turning model output into confident human decisions.',
    image: 'https://picsum.photos/seed/morrow-house/1400/1050',
    featured: true,
  },
  {
    number: '02',
    title: 'Signal / 01',
    category: 'Data product / Motion',
    year: '2025',
    description: 'An observability layer that makes complex systems feel calm, clear and alive.',
    image: 'https://picsum.photos/seed/field-notes/1400/1050',
  },
  {
    number: '03',
    title: 'Orbit OS',
    category: 'Design system / Frontend',
    year: '2025',
    description: 'A modular interface language for teams shipping intelligent products at speed.',
    image: 'https://picsum.photos/seed/aster-studio/1400/1050',
  },
]

const services = [
  ['01', 'Frontend engineering', 'Interfaces that stay fast, precise and easy to evolve.'],
  ['02', 'AI + ML products', 'Human-centred surfaces for intelligent systems and model workflows.'],
  ['03', 'Creative technology', 'Ideas translated into tactile digital experiences.'],
  ['04', 'Interaction design', 'Motion with a job to do: guide, reveal and connect.'],
  ['05', 'Data experiences', 'Clear visual stories from complex information.'],
  ['06', 'Design systems', 'A visual language that holds together at every scale.'],
]

const stack = ['React', 'Python', 'TypeScript', 'TensorFlow', 'GSAP', 'Three.js', 'WebGL', 'CSS']

const capabilitySignals = [
  ['01', 'Model thinking', 'Turning complex AI behaviour into calm, legible flows.'],
  ['02', 'Data fluency', 'Making patterns visible without flattening the nuance.'],
  ['03', 'Human interfaces', 'Designing feedback that earns trust at every step.'],
]

const journey = [
  ['2022', 'Started building interfaces'],
  ['2023', 'Focused on frontend systems'],
  ['2024', 'Interactive and motion projects'],
  ['2025', 'Creative development'],
  ['2026', 'Building ambitious digital experiences'],
]

const storyFrames = [
  ['Overview', 'https://picsum.photos/seed/morrow-overview/1600/1200'],
  ['Challenge', 'https://picsum.photos/seed/morrow-challenge/1600/1200'],
  ['Approach', 'https://picsum.photos/seed/morrow-approach/1600/1200'],
  ['Result', 'https://picsum.photos/seed/morrow-result/1600/1200'],
]

function useReveal(scope) {
  useEffect(() => {
    const reduce = prefersReducedMotion()
    if (reduce || !scope.current) return undefined
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-reveal]').forEach((element) => {
        gsap.fromTo(element, { y: 34, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: MOTION.duration.reveal,
          ease: MOTION.ease.reveal,
          scrollTrigger: { trigger: element, start: 'top 86%', once: true },
        })
      })
    }, scope)
    return () => ctx.revert()
  }, [scope])
}

function App() {
  const root = useRef(null)
  const heroMedia = useRef(null)
  const horizontal = useRef(null)
  const track = useRef(null)
  const storySection = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeService, setActiveService] = useState(0)

  useReveal(root)

  useEffect(() => {
    const reduce = prefersReducedMotion()
    const lenis = new Lenis({ autoRaf: false, duration: 1.15, smoothWheel: !reduce, syncTouch: false })
    const stopRaf = createRafLoop((time) => {
      lenis.raf(time)
    })
    lenis.on('scroll', ScrollTrigger.update)
    const refresh = () => ScrollTrigger.refresh()
    const onVisibilityChange = () => {
      if (document.hidden) lenis.stop()
      else {
        lenis.start()
        refresh()
      }
    }
    const resizeObserver = new ResizeObserver(refresh)
    resizeObserver.observe(document.body)
    document.addEventListener('visibilitychange', onVisibilityChange)
    window.addEventListener('load', refresh, { once: true })

    if (!reduce) {
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          onUpdate: (self) => document.documentElement.style.setProperty('--page-progress', self.progress),
        })
        gsap.fromTo('.hero-line', { yPercent: 110 }, { yPercent: 0, stagger: 0.08, duration: MOTION.duration.entrance, delay: 0.15, ease: MOTION.ease.cinematic })
        gsap.fromTo('.hero-kicker, .hero-copy, .hero-actions', { opacity: 0, y: 18 }, { opacity: 1, y: 0, stagger: 0.1, duration: MOTION.duration.reveal, delay: 0.45, ease: MOTION.ease.reveal })
        gsap.fromTo(heroMedia.current, { scale: 1.12 }, { scale: 1, duration: MOTION.duration.cinematic, delay: 0.1, ease: MOTION.ease.reveal })
        gsap.fromTo('.hero-profile-card, .hero-float-card, .hero-data-stream, .hero-coordinate', { opacity: 0 }, {
          opacity: 1,
          stagger: 0.08,
          duration: MOTION.duration.reveal,
          delay: 0.55,
          ease: MOTION.ease.cinematic,
        })
        gsap.to(heroMedia.current, {
          yPercent: 10,
          scale: 1.05,
          ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
        })
      }, root)
      return () => {
        ctx.revert()
        resizeObserver.disconnect()
        document.removeEventListener('visibilitychange', onVisibilityChange)
        window.removeEventListener('load', refresh)
        lenis.destroy()
        stopRaf()
      }
    }
    return () => {
      resizeObserver.disconnect()
      document.removeEventListener('visibilitychange', onVisibilityChange)
      window.removeEventListener('load', refresh)
      lenis.destroy()
      stopRaf()
    }
  }, [heroMedia])

  useEffect(() => {
    const reduce = prefersReducedMotion()
    if (reduce || !storySection.current) return undefined
    const ctx = gsap.context(() => {
      const steps = gsap.utils.toArray('.story-step')
      const frames = gsap.utils.toArray('.story-image-frame')
      const indexes = gsap.utils.toArray('.story-index-item')
      gsap.set(steps.slice(1), { autoAlpha: 0, x: 40 })
      gsap.set(frames.slice(1), { autoAlpha: 0, scale: 1.06 })
      gsap.set(indexes.slice(1), { opacity: 0.35 })
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: storySection.current,
          start: 'top top',
          end: '+=2600',
          pin: true,
          scrub: MOTION.scrub.standard,
        },
      })
      steps.slice(1).forEach((step, index) => {
        timeline
          .to(steps[index], { autoAlpha: 0, x: -40, duration: 0.45 })
          .to(step, { autoAlpha: 1, x: 0, duration: 0.55 }, '<')
          .to(frames[index], { autoAlpha: 0, scale: 0.98, duration: 0.45 }, '<')
          .to(frames[index + 1], { autoAlpha: 1, scale: 1, duration: 0.55 }, '<')
          .to(indexes[index], { opacity: 0.35, duration: 0.35 }, '<')
          .to(indexes[index + 1], { opacity: 1, duration: 0.55 }, '<')
          .to('.story-progress-fill', { scaleX: (index + 1) / (steps.length - 1), duration: 0.55 }, '<')
      })
    }, storySection)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const reduce = prefersReducedMotion()
    const desktop = window.matchMedia('(min-width: 801px)').matches
    if (reduce || !desktop || !horizontal.current || !track.current) return undefined
    const ctx = gsap.context(() => {
      const distance = () => Math.max(0, track.current.scrollWidth - window.innerWidth)
      gsap.to(track.current, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: horizontal.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: MOTION.scrub.standard,
          invalidateOnRefresh: true,
          onUpdate: (self) => horizontal.current?.style.setProperty('--horizontal-progress', self.progress),
        },
      })
      gsap.utils.toArray('.horizontal-card img').forEach((image, index) => {
        gsap.to(image, {
          xPercent: index % 2 === 0 ? -5 : 5,
          ease: 'none',
          scrollTrigger: {
            trigger: horizontal.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: MOTION.scrub.standard,
          },
        })
      })
    }, horizontal)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const reduce = prefersReducedMotion()
    const finePointer = window.matchMedia('(pointer: fine)').matches
    if (reduce || !finePointer) return undefined

    const cursor = document.querySelector('.cursor-dot')
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3.out' })
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3.out' })
    const onPointer = (event) => {
      xTo(event.clientX)
      yTo(event.clientY)
    }
    const magneticTargets = [...document.querySelectorAll('.button, .text-link, .contact-link')]
    const cleanups = magneticTargets.map((target) => {
      const xToTarget = gsap.quickTo(target, 'x', { duration: 0.45, ease: 'power3.out' })
      const yToTarget = gsap.quickTo(target, 'y', { duration: 0.45, ease: 'power3.out' })
      const onMove = (event) => {
        const bounds = target.getBoundingClientRect()
        xToTarget((event.clientX - bounds.left - bounds.width / 2) * 0.12)
        yToTarget((event.clientY - bounds.top - bounds.height / 2) * 0.12)
      }
      const reset = () => {
        xToTarget(0)
        yToTarget(0)
      }
      target.addEventListener('pointermove', onMove)
      target.addEventListener('pointerleave', reset)
      return () => {
        target.removeEventListener('pointermove', onMove)
        target.removeEventListener('pointerleave', reset)
      }
    })
    window.addEventListener('pointermove', onPointer)
    return () => {
      window.removeEventListener('pointermove', onPointer)
      cleanups.forEach((cleanup) => cleanup())
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  useEffect(() => {
    const reduce = prefersReducedMotion()
    const finePointer = window.matchMedia('(pointer: fine)').matches
    if (reduce || !finePointer) return undefined
    const cards = [...document.querySelectorAll('.project-image-wrap')]
    const cleanups = cards.map((card) => {
      const onMove = (event) => {
        const bounds = card.getBoundingClientRect()
        const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2
        const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2
        card.style.setProperty('--card-rotate-x', `${y * -3}deg`)
        card.style.setProperty('--card-rotate-y', `${x * 3}deg`)
        card.style.setProperty('--card-glow-x', `${(x + 1) * 50}%`)
        card.style.setProperty('--card-glow-y', `${(y + 1) * 50}%`)
      }
      const reset = () => {
        card.style.setProperty('--card-rotate-x', '0deg')
        card.style.setProperty('--card-rotate-y', '0deg')
        card.style.setProperty('--card-glow-x', '50%')
        card.style.setProperty('--card-glow-y', '50%')
      }
      card.addEventListener('pointermove', onMove)
      card.addEventListener('pointerleave', reset)
      return () => {
        card.removeEventListener('pointermove', onMove)
        card.removeEventListener('pointerleave', reset)
      }
    })
    return () => cleanups.forEach((cleanup) => cleanup())
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div ref={root} className="site-shell">
      <a className="skip-link" href="#top">Skip to content</a>
      <div className="page-progress" aria-hidden="true" />
      <div className="cursor-dot" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <header className={`site-header ${menuOpen ? 'menu-open' : ''}`}>
        <a className="wordmark" href="#top" onClick={closeMenu}>PX<span>.</span></a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#capabilities">Capabilities</a>
          <a href="#about">About</a>
        </nav>
        <a className="header-contact" href="#contact">Start a conversation <span>↗</span></a>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span />
        </button>
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" aria-hidden={!menuOpen}>
          <a href="#work" tabIndex={menuOpen ? 0 : -1} onClick={closeMenu}>Work</a>
          <a href="#capabilities" tabIndex={menuOpen ? 0 : -1} onClick={closeMenu}>Capabilities</a>
          <a href="#about" tabIndex={menuOpen ? 0 : -1} onClick={closeMenu}>About</a>
          <a href="#contact" tabIndex={menuOpen ? 0 : -1} onClick={closeMenu}>Start a conversation</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div ref={heroMedia} className="hero-media" role="img" aria-label="Abstract light passing across a dark architectural surface" />
          <div className="hero-scrim" />
          <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
          <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
          <aside className="hero-profile-card" aria-label="Portfolio profile">
            <span className="profile-card-label">B.Tech / AIML / 2026</span>
            <strong>NI.</strong>
            <span className="profile-card-role">AI + ML engineer<br />creative technologist</span>
            <span className="profile-card-mark">PX<span>.</span></span>
          </aside>
          <div className="hero-float-card hero-float-card-signal" aria-hidden="true">
            <span>MODEL STATUS</span><strong>98.4%</strong><b>↑ live confidence</b>
          </div>
          <div className="hero-float-card hero-float-card-stack" aria-hidden="true">
            <span className="float-dot" /><span>BUILDING WITH</span><strong>AI / ML</strong>
          </div>
          <div className="hero-data-stream" aria-hidden="true">
            <span>LATENT SPACE / 01</span><i /><span>HUMAN SIGNAL / 02</span><i /><span>MODEL LOOP / 03</span>
          </div>
          <div className="hero-coordinate" aria-hidden="true">28.6139° N<br />77.2090° E</div>
          <div className="hero-content">
            <p className="hero-kicker">B.Tech AI + ML engineer / Creative developer</p>
            <h1 id="hero-title">
              <span className="hero-line-wrap"><span className="hero-line">Intelligence</span></span>
              <span className="hero-line-wrap"><span className="hero-line hero-italic">with a human pulse.</span></span>
            </h1>
            <p className="hero-copy">I design and engineer expressive AI products where complex systems become clear, useful and impossible to ignore.</p>
            <div className="hero-actions">
              <a className="button button-solid" href="#work">View selected work <span>↗</span></a>
              <a className="text-link" href="#about">More about me <span>↗</span></a>
            </div>
          </div>
          <div className="hero-foot"><span>Based anywhere, working everywhere</span><span className="scroll-mark">Scroll <b>↓</b></span></div>
        </section>

        <section className="manifesto section-pad" data-reveal>
          <p className="section-kicker">A considered approach</p>
          <h2>I make space for ideas to become <em>felt.</em></h2>
          <p className="manifesto-copy">The best digital experiences have a point of view. They are clear enough to use, and surprising enough to remember.</p>
        </section>

        <section id="work" className="work section-pad">
          <div className="section-heading" data-reveal>
            <p className="section-kicker">Selected work</p>
            <h2>Built for the long look.</h2>
          </div>
          <div className="project-list">
            {projects.map((project, index) => (
              <article className={`project project-${index + 1}`} key={project.title} data-reveal>
                <div className="project-image-wrap">
                  <img src={project.image} alt={`${project.title} project artwork`} loading={index === 0 ? 'eager' : 'lazy'} />
                  <span className="project-scanline" aria-hidden="true" />
                  <span className="project-status" aria-hidden="true">SYSTEM / {project.number} <i>LIVE</i></span>
                  <a className="image-link" href="#contact" aria-label={`Discuss ${project.title}`}>View <span>↗</span></a>
                </div>
                <div className="project-info">
                  <div className="project-number">{project.number}</div>
                  <div className="project-copy">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-meta"><span>{project.category}</span><span>{project.year}</span></div>
                  </div>
                  <a className="project-arrow" href="#contact" aria-label={`View ${project.title}`}>↗</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section ref={storySection} className="featured-story" aria-label="Neural Canvas case study">
          <div className="story-visual" data-reveal>
            {storyFrames.map(([label, image], index) => <img className="story-image-frame" key={label} src={image} alt={`${label} view of the Neural Canvas project`} loading={index === 0 ? 'eager' : 'lazy'} />)}
            <span className="story-visual-label">Neural Canvas / Case study</span>
          </div>
          <div className="story-content">
            <p className="section-kicker">A closer look / Neural Canvas</p>
            <div className="story-steps">
              <article className="story-step"><span>Overview</span><h2>Designing for the moment before the click.</h2><p>For Neural Canvas, the brief was simple: make model output feel like a space worth entering.</p></article>
              <article className="story-step"><span>Challenge</span><h2>Make restraint feel alive.</h2><p>We shaped a slower interface around the materiality of the collection, without hiding the path to purchase.</p></article>
              <article className="story-step"><span>Approach</span><h2>Every detail earns its place.</h2><p>Editorial type, quiet transitions and a flexible system gave the studio room to keep telling its story.</p></article>
              <article className="story-step"><span>Result</span><h2>A model workspace that feels human.</h2><p>The final experience makes exploration feel tactile, calm and unmistakably useful.</p></article>
            </div>
            <div className="story-index" aria-label="Case study progress">
              {storyFrames.map(([label]) => <span className="story-index-item" key={label}>{label}</span>)}
            </div>
            <div className="story-progress" aria-hidden="true"><span className="story-progress-fill" /></div>
          </div>
        </section>

        <section ref={horizontal} className="horizontal-work" aria-label="More project work">
          <div ref={track} className="horizontal-track">
            <div className="horizontal-intro"><p className="section-kicker">The work</p><h2>Small gestures.<br /><em>Real weight.</em></h2></div>
            {projects.map((project, index) => (
              <figure className={`horizontal-card card-${index + 1}`} key={`horizontal-${project.title}`}>
                <img src={project.image} alt={`${project.title} detail`} loading="lazy" />
                <figcaption><span>{project.title}</span><span>{project.category}</span><b>0{index + 1}</b></figcaption>
              </figure>
            ))}
          </div>
          <div className="horizontal-progress" aria-hidden="true"><span /></div>
        </section>

        <section id="capabilities" className="capabilities section-pad">
          <div className="capabilities-heading" data-reveal><p className="section-kicker">Capabilities</p><h2>Useful range.<br /><em>Clear focus.</em></h2></div>
          <div className="capabilities-body">
            <div className="service-list">
            {services.map(([number, title, description], index) => (
              <button className={`service-row ${activeService === index ? 'is-active' : ''}`} key={title} type="button" aria-pressed={activeService === index} onMouseEnter={() => setActiveService(index)} onFocus={() => setActiveService(index)} onClick={() => setActiveService(index)}>
                <span className="service-number">{number}</span><span className="service-title">{title}</span><span className="service-description">{description}</span><span className="service-symbol">↗</span>
              </button>
            ))}
            </div>
            <div className="capability-signal" aria-live="polite">
              <span className="signal-ring signal-ring-one" aria-hidden="true" />
              <span className="signal-ring signal-ring-two" aria-hidden="true" />
              <span className="signal-core" aria-hidden="true" />
              <div className="signal-copy"><span>{capabilitySignals[activeService % capabilitySignals.length][0]} / Signal</span><strong>{capabilitySignals[activeService % capabilitySignals.length][1]}</strong><p>{capabilitySignals[activeService % capabilitySignals.length][2]}</p></div>
              <span className="signal-readout" aria-hidden="true">00 01 01 10 11 00</span>
            </div>
          </div>
        </section>

        <section className="lab section-pad">
          <div className="lab-heading" data-reveal><p className="section-kicker">The lab</p><h2>Unfinished things<br />with <em>good bones.</em></h2></div>
          <div className="lab-grid">
            <article className="lab-feature lab-feature-primary"><div className="lab-art lab-art-cyan"><span className="lab-art-grid" aria-hidden="true" /><span className="lab-art-orbit" aria-hidden="true" /><span className="lab-art-readout" aria-hidden="true">LATENCY<br /><b>12ms</b></span></div><div><span>01 / Motion study</span><h3>Soft systems</h3></div></article>
            <article className="lab-feature lab-offset"><div className="lab-art lab-art-orange"><span className="lab-art-core" aria-hidden="true" /><span className="lab-art-line" aria-hidden="true" /></div><div><span>02 / Interface study</span><h3>Objects in orbit</h3></div></article>
            <article className="lab-note"><span>Open experiments</span><strong>03</strong><p>Notes on motion, space and the web.</p><a className="text-link" href="#contact">See the lab <span>↗</span></a></article>
          </div>
        </section>

        <section className="stack-section section-pad">
          <div data-reveal><p className="section-kicker">Working stack</p><h2>Tools are only useful<br />when the idea is <em>clear.</em></h2></div>
          <div className="stack-list" role="list">
            {stack.map((item, index) => <span role="listitem" key={item}><b>0{index + 1}</b>{item}</span>)}
          </div>
        </section>

        <section id="about" className="about section-pad">
          <div className="about-image" data-reveal><img src="https://picsum.photos/seed/portrait-studio/1000/1300" alt="Portrait in a dark studio setting" loading="lazy" /><span className="about-image-caption">Creative developer / AI + ML</span></div>
          <div className="about-copy" data-reveal><p className="section-kicker">About / The practice</p><h2>Making machine intelligence feel <em>human.</em></h2><p>I am a B.Tech AI + ML engineer and creative developer working at the edge of product thinking, interface design and motion.</p><div className="about-facts"><span><b>Focus</b> AI + ML products</span><span><b>Speciality</b> Human-centred interfaces</span><span><b>Stack</b> React / Python / GSAP</span><span><b>Available</b> Select collaborations</span></div><div className="about-status"><span className="float-dot" /> OPEN TO THE RIGHT PROBLEM <b>●</b></div></div>
        </section>

        <section className="timeline section-pad">
          <div className="timeline-heading" data-reveal><p className="section-kicker">The journey</p><h2>A practice still<br />in <em>motion.</em></h2></div>
          <div className="timeline-list">
            <span className="timeline-spine" aria-hidden="true" />
            {journey.map(([year, description], index) => <div className="timeline-row" key={year} data-reveal><span className="timeline-dot" aria-hidden="true" /><span className="timeline-year">{year}</span><p>{description}</p><small>0{index + 1}</small></div>)}
          </div>
        </section>

        <section className="testimonial section-pad" data-reveal><span className="quote-mark">“</span><blockquote>Thoughtful from the first sketch to the final frame. The work feels alive without ever getting in the way.</blockquote><p>Alex Morgan<br /><span>Product lead, Neural Canvas</span></p></section>

        <section id="contact" className="contact section-pad">
          <p className="section-kicker">Have a good one?</p>
          <h2>Let’s make<br /><em>something memorable.</em></h2>
          <a className="contact-link" href="mailto:hello@portfoliox.studio">hello@portfoliox.studio <span>↗</span></a>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-top"><a className="wordmark" href="#top">PX<span>.</span></a><span>Available for select projects</span><span className="footer-socials"><a href="https://github.com/the-niishant/ProjectX" target="_blank" rel="noreferrer">GitHub ↗</a><a href="mailto:hello@portfoliox.studio">Email ↗</a></span></div>
        <div className="footer-name">PORTFOLIOX</div>
        <div className="footer-bottom"><span>© 2026 PortfolioX</span><span>Built with curiosity</span><a href="#top">Back to top ↑</a></div>
      </footer>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
