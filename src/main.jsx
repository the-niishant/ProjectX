import React, { useEffect, useRef, useState, useCallback } from 'react'
import { createRoot } from 'react-dom/client'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createRafLoop, MOTION, prefersReducedMotion } from './motion'
import './styles.css'

gsap.registerPlugin(ScrollTrigger)

/* ============================================
   PRODUCT DATA
   ============================================ */

const sarees = [
  {
    id: 'kanchipuram',
    name: 'Kanchipuram Silk Saree',
    desc: 'Pure mulberry silk with handwoven zari detailing, woven over 120 hours by master artisans of Kanchipuram.',
    price: 18500,
    mrp: 22000,
    fabric: 'Silk',
    occasion: ['Wedding', 'Festive'],
    colours: ['burgundy', 'gold', 'emerald'],
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&q=80',
    badge: 'Bestseller',
  },
  {
    id: 'banarasi',
    name: 'Banarasi Silk Saree',
    desc: 'Rich Banarasi silk with intricate buti work and a traditional border, perfect for celebratory evenings.',
    price: 15800,
    mrp: 19000,
    fabric: 'Silk',
    occasion: ['Wedding', 'Evening'],
    colours: ['burgundy', 'navy', 'rose'],
    image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&q=80',
    badge: 'New',
  },
  {
    id: 'chanderi',
    name: 'Chanderi Silk Cotton',
    desc: 'Feather-light Chanderi with delicate coin motifs and a golden border — effortless daytime luxury.',
    price: 7200,
    mrp: 9000,
    fabric: 'Chanderi',
    occasion: ['Everyday', 'Festive'],
    colours: ['ivory', 'rose', 'navy'],
    image: 'https://images.unsplash.com/photo-1606902965551-dce093cda6e7?w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80',
    badge: null,
  },
  {
    id: 'organza',
    name: 'Organza Pearl Saree',
    desc: 'Sheer organza with hand-embroidered pearl work and sequin borders — ethereal and contemporary.',
    price: 12400,
    mrp: 15000,
    fabric: 'Organza',
    occasion: ['Evening', 'Gifting'],
    colours: ['ivory', 'rose', 'gold'],
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&q=80',
    badge: 'New',
  },
  {
    id: 'handloom',
    name: 'Handloom Cotton Saree',
    desc: 'Breathable handloom cotton with temple border weaving — everyday elegance rooted in tradition.',
    price: 3800,
    mrp: 4500,
    fabric: 'Cotton',
    occasion: ['Everyday'],
    colours: ['navy', 'emerald', 'ivory'],
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1606902965551-dce093cda6e7?w=800&q=80',
    badge: null,
  },
]

const newArrivals = [
  ...sarees.slice(0, 4),
  {
    id: 'tussar',
    name: 'Tussar Silk Saree',
    desc: 'Natural tussar texture with hand-painted Madhubani motifs.',
    price: 9800,
    mrp: 12000,
    fabric: 'Silk',
    occasion: ['Everyday', 'Festive'],
    colours: ['ivory', 'gold'],
    image: 'https://images.unsplash.com/photo-1606902965551-dce093cda6e7?w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800&q=80',
    badge: 'New',
  },
  {
    id: 'georgette',
    name: 'Georgette Floral Saree',
    desc: 'Flowing georgette with digital floral prints and scalloped edges.',
    price: 5600,
    mrp: 7000,
    fabric: 'Georgette',
    occasion: ['Everyday', 'Evening'],
    colours: ['rose', 'navy'],
    image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80',
    badge: 'New',
  },
  {
    id: 'linen',
    name: 'Linen Heritage Saree',
    desc: 'Crisp linen with woven checks and contrast pallu.',
    price: 4200,
    mrp: 5200,
    fabric: 'Cotton',
    occasion: ['Everyday'],
    colours: ['ivory', 'emerald'],
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&q=80',
    badge: null,
  },
]

const occasions = [
  { title: 'Wedding & Bridal', sub: 'Celebration weaves', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80', large: true },
  { title: 'Festive', sub: 'Joyful adornment', image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800&q=80' },
  { title: 'Evening', sub: 'Understated glamour', image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&q=80' },
  { title: 'Everyday Luxury', sub: 'Quiet refinement', image: 'https://images.unsplash.com/photo-1606902965551-dce093cda6e7?w=800&q=80' },
  { title: 'Gifting', sub: 'Tokens of love', image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&q=80' },
]

const fabrics = [
  { name: 'Silk', desc: 'Luxurious drape with natural sheen. Woven from the finest mulberry threads for a regal touch.', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80', count: 48 },
  { name: 'Organza', desc: 'Sheer, weightless, and ethereal. Organza catches light like morning dew on a spider\'s web.', image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&q=80', count: 32 },
  { name: 'Chanderi', desc: 'Feather-light with a subtle gloss. Chanderi breathes with you through warm afternoons.', image: 'https://images.unsplash.com/photo-1606902965551-dce093cda6e7?w=800&q=80', count: 27 },
  { name: 'Cotton', desc: 'Handloom cotton — breathable, honest, timeless. The fabric of everyday poetry.', image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&q=80', count: 35 },
  { name: 'Georgette', desc: 'Flowing and forgiving, georgette moves like water. Perfect for contemporary drapes.', image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800&q=80', count: 22 },
  { name: 'Banarasi', desc: 'Royal Banarasi silk with zari brocade. A weave that carries centuries in its folds.', image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800&q=80', count: 19 },
]

const lookbookImages = [
  { src: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80', look: '01', name: 'Crimson Drape' },
  { src: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800&q=80', look: '02', name: 'Ivory Whisper' },
  { src: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&q=80', look: '03', name: 'Golden Hour' },
  { src: 'https://images.unsplash.com/photo-1606902965551-dce093cda6e7?w=800&q=80', look: '04', name: 'Monsoon Bloom' },
  { src: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&q=80', look: '05', name: 'Terracotta Dream' },
]

const testimonials = [
  {
    text: 'The Kanchipuram I ordered is beyond beautiful. The zari work is exquisite and the drape is perfect. I felt like royalty at my sister\'s wedding.',
    name: 'Priya Sharma',
    role: 'Bengaluru',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    rating: 5,
  },
  {
    text: 'Finally a saree brand that understands quality. The fabric is handwoven, you can feel the craft. My third purchase and I keep coming back.',
    name: 'Ananya Reddy',
    role: 'Hyderabad',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    rating: 5,
  },
  {
    text: 'Gifted the organza saree to my mother and she treasures it. The packaging itself felt like opening a beautiful story. Highly recommended.',
    name: 'Meera Iyer',
    role: 'Chennai',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80',
    rating: 5,
  },
]

const instagramImages = [
  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=70',
  'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&q=70',
  'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&q=70',
  'https://images.unsplash.com/photo-1606902965551-dce093cda6e7?w=400&q=70',
  'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&q=70',
  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=70',
  'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&q=70',
  'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&q=70',
]

/* ============================================
   UTILITY HOOKS
   ============================================ */

function useReveal(scope) {
  useEffect(() => {
    const reduce = prefersReducedMotion()
    if (reduce || !scope.current) return undefined
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-reveal]', scope.current).forEach((element) => {
        gsap.fromTo(element, { y: 36, opacity: 0 }, {
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

/* ============================================
   ICONS
   ============================================ */

const IconSearch = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>
)

const IconHeart = ({ filled }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)

const IconUser = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
)

const IconBag = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
)

const IconArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
)

const IconArrowLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
  </svg>
)

const IconX = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

/* ============================================
   PRODUCT CARD
   ============================================ */

function ProductCard({ product, onAdd, onWishlist, wished }) {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    cardRef.current.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${y * -8}deg) translateY(-8px)`
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateY(0)'
  }

  return (
    <article
      ref={cardRef}
      className="product-card"
      data-reveal
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.15s ease-out' }}
    >
      <div className="product-card-image">
        <img className="primary-img" src={product.image} alt={product.name} loading="lazy" />
        {product.hoverImage && (
          <img className="hover-img" src={product.hoverImage} alt={`${product.name} alternate view`} loading="lazy" />
        )}
        {product.badge && (
          <span className={`product-badge ${product.badge === 'New' ? 'badge-new' : 'badge-sale'}`}>
            {product.badge}
          </span>
        )}
        <button
          className={`card-wishlist ${wished ? 'active' : ''}`}
          onClick={(e) => { e.stopPropagation(); onWishlist(product.id) }}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <IconHeart filled={wished} />
        </button>
        <button className="card-cta" onClick={() => onAdd(product)}>
          Add to Bag
        </button>
      </div>
      <h3 className="product-card-name">{product.name}</h3>
      <p className="product-card-price">
        ₹{product.price.toLocaleString('en-IN')}
        {product.mrp && <span className="mrp">₹{product.mrp.toLocaleString('en-IN')}</span>}
      </p>
    </article>
  )
}

/* ============================================
   MAIN APP
   ============================================ */

function App() {
  const root = useRef(null)
  const heroRef = useRef(null)
  const heroMediaRef = useRef(null)
  const headerRef = useRef(null)
  const showcaseRef = useRef(null)
  const lookbookRef = useRef(null)
  const lookbookTrackRef = useRef(null)
  const railRef = useRef(null)
  const marqueeRef = useRef(null)
  const craftRef = useRef(null)

  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSaree, setActiveSaree] = useState(0)
  const [activeFabric, setActiveFabric] = useState(0)
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [wishlist, setWishlist] = useState([])

  useReveal(root)

  /* Lenis + ScrollTrigger setup */
  useEffect(() => {
    const reduce = prefersReducedMotion()
    const lenis = new Lenis({ autoRaf: false, duration: 1.15, smoothWheel: !reduce, syncTouch: false })
    const stopRaf = createRafLoop((time) => { lenis.raf(time) })
    lenis.on('scroll', ScrollTrigger.update)

    const refresh = () => ScrollTrigger.refresh()
    const onVisibilityChange = () => {
      if (document.hidden) lenis.stop()
      else { lenis.start(); refresh() }
    }
    const resizeObserver = new ResizeObserver(refresh)
    resizeObserver.observe(document.body)
    document.addEventListener('visibilitychange', onVisibilityChange)
    window.addEventListener('load', refresh, { once: true })

    return () => {
      resizeObserver.disconnect()
      document.removeEventListener('visibilitychange', onVisibilityChange)
      window.removeEventListener('load', refresh)
      lenis.destroy()
      stopRaf()
    }
  }, [])

  /* Header scroll state */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (headerRef.current) {
        headerRef.current.classList.toggle('scrolled', y > 40)
        headerRef.current.classList.toggle('on-dark', y < window.innerHeight * 0.8)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Hero entrance + scroll animation */
  useEffect(() => {
    const reduce = prefersReducedMotion()
    if (reduce || !heroRef.current || !heroMediaRef.current) return undefined

    /* Page progress — outside heroRef scope so it survives context revert */
    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => document.documentElement.style.setProperty('--page-progress', self.progress),
    })

    const ctx = gsap.context(() => {
      /* Entrance */
      gsap.to('.hero-line', {
        yPercent: 0,
        stagger: 0.09,
        duration: MOTION.duration.entrance,
        delay: 0.2,
        ease: MOTION.ease.cinematic,
      })
      gsap.to('.hero-sub, .hero-actions', {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: MOTION.duration.reveal,
        delay: 0.55,
        ease: MOTION.ease.reveal,
      })
      gsap.to('.hero-overline', {
        opacity: 1,
        y: 0,
        duration: MOTION.duration.reveal,
        delay: 0.4,
        ease: MOTION.ease.reveal,
      })

      /* Scroll: scale into rounded frame */
      gsap.to(heroMediaRef.current, {
        scale: 0.92,
        borderRadius: 32,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      /* Headline parallax */
      gsap.to('.hero-content', {
        y: -120,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  /* Featured Saree Showcase — pinned product swap */
  useEffect(() => {
    const reduce = prefersReducedMotion()
    if (reduce || !showcaseRef.current) return undefined

    const ctx = gsap.context(() => {
      const images = gsap.utils.toArray('.showcase-visual img', showcaseRef.current)
      const name = showcaseRef.current.querySelector('.showcase-name')
      const desc = showcaseRef.current.querySelector('.showcase-desc')
      const price = showcaseRef.current.querySelector('.showcase-price')
      const counter = showcaseRef.current.querySelector('.showcase-counter span')
      const segments = gsap.utils.toArray('.progress-segment', showcaseRef.current)

      gsap.set(images, { opacity: 0, scale: 1.06, filter: 'blur(8px)' })
      gsap.set(images[0], { opacity: 1, scale: 1, filter: 'blur(0px)' })

      const steps = images.length
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: showcaseRef.current,
          start: 'top top',
          end: `+=${(steps - 1) * 1200}`,
          pin: true,
          scrub: MOTION.scrub.standard,
        },
      })

      for (let i = 1; i < steps; i++) {
        tl.to(images[i - 1], { opacity: 0, scale: 0.96, x: -60, filter: 'blur(8px)', duration: 0.45, ease: 'power2.inOut' })
          .fromTo(images[i], { opacity: 0, scale: 1.06, x: 60, filter: 'blur(8px)' }, { opacity: 1, scale: 1, x: 0, filter: 'blur(0px)', duration: 0.55, ease: 'power2.out' }, '<')
          .to([name, desc, price], { opacity: 0, y: 16, duration: 0.2, ease: 'power2.in' }, '<')
          .call(() => {
            setActiveSaree(i)
            if (counter) counter.textContent = String(i + 1).padStart(2, '0')
            segments.forEach((seg, idx) => {
              seg.classList.toggle('done', idx < i)
              seg.classList.toggle('active', idx === i)
            })
          })
          .fromTo([name, desc, price], { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', stagger: 0.06 }, '<')
      }

      if (segments[0]) segments[0].classList.add('active')
    }, showcaseRef)

    return () => ctx.revert()
  }, [])

  /* Craft section — pinned with Ken Burns */
  useEffect(() => {
    const reduce = prefersReducedMotion()
    if (reduce || !craftRef.current) return undefined

    const ctx = gsap.context(() => {
      gsap.to('.craft-visual img', {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: craftRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: MOTION.scrub.standard,
        },
      })

      /* Staggered text reveal */
      gsap.fromTo('.craft-title, .craft-copy, .craft-metrics > div', {
        opacity: 0,
        y: 30,
      }, {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: MOTION.duration.reveal,
        ease: MOTION.ease.reveal,
        scrollTrigger: { trigger: craftRef.current, start: 'top 55%' },
      })
    }, craftRef)

    return () => ctx.revert()
  }, [])

  /* Lookbook — horizontal scroll (responsive to resize) */
  useEffect(() => {
    const reduce = prefersReducedMotion()
    if (reduce || !lookbookRef.current || !lookbookTrackRef.current) return undefined

    let ctx = null

    const setup = () => {
      const desktop = window.matchMedia('(min-width: 801px)').matches
      if (!desktop) {
        if (ctx) { ctx.revert(); ctx = null }
        return
      }

      ctx = gsap.context(() => {
        const track = lookbookTrackRef.current
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth)

        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: lookbookRef.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: MOTION.scrub.standard,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              document.documentElement.style.setProperty('--horizontal-progress', self.progress)
            },
          },
        })

        /* Per-image parallax */
        gsap.utils.toArray('.lookbook-item img', lookbookRef.current).forEach((img, index) => {
          gsap.to(img, {
            xPercent: index % 2 === 0 ? -4 : 4,
            ease: 'none',
            scrollTrigger: {
              trigger: lookbookRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: MOTION.scrub.standard,
            },
          })
        })
      }, lookbookRef)
    }

    setup()

    let resizeTimer
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(setup, 150)
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      clearTimeout(resizeTimer)
      if (ctx) ctx.revert()
    }
  }, [])

  /* Instagram marquee — velocity responsive */
  useEffect(() => {
    const reduce = prefersReducedMotion()
    if (reduce || !marqueeRef.current) return undefined

    let lastScroll = 0
    let velocity = 0

    const onScroll = () => {
      const current = window.scrollY
      velocity = Math.abs(current - lastScroll) * 0.3
      lastScroll = current
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        x: () => -marqueeRef.current.scrollWidth / 2,
        ease: 'none',
        duration: 30,
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => {
            const parsed = parseFloat(x)
            return parsed % (marqueeRef.current.scrollWidth / 2)
          }),
        },
      })
    }, marqueeRef)

    return () => {
      window.removeEventListener('scroll', onScroll)
      ctx.revert()
    }
  }, [])

  /* Testimonials — offset cards animation */
  useEffect(() => {
    const reduce = prefersReducedMotion()
    if (reduce) return undefined
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.testimonial-card').forEach((card) => {
        gsap.fromTo(card, { opacity: 0, y: 40 }, {
          opacity: 1,
          y: 0,
          duration: MOTION.duration.reveal,
          ease: MOTION.ease.reveal,
          scrollTrigger: { trigger: card, start: 'top 88%', once: true },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  /* Magnetic buttons effect (responsive to pointer type change) */
  useEffect(() => {
    const reduce = prefersReducedMotion()
    if (reduce) return undefined

    const finePointerQuery = window.matchMedia('(pointer: fine)')
    let cleanups = []

    const setup = () => {
      // Cleanup existing listeners
      cleanups.forEach((cleanup) => cleanup())
      cleanups = []

      if (!finePointerQuery.matches) return

      const magneticTargets = document.querySelectorAll('.btn, .rail-btn, .header-icon')
      cleanups = Array.from(magneticTargets).map((target) => {
        const xTo = gsap.quickTo(target, 'x', { duration: 0.4, ease: 'power3.out' })
        const yTo = gsap.quickTo(target, 'y', { duration: 0.4, ease: 'power3.out' })

        const onMove = (e) => {
          const bounds = target.getBoundingClientRect()
          xTo((e.clientX - bounds.left - bounds.width / 2) * 0.15)
          yTo((e.clientY - bounds.top - bounds.height / 2) * 0.15)
        }
        const reset = () => {
          xTo(0)
          yTo(0)
        }

        target.addEventListener('pointermove', onMove)
        target.addEventListener('pointerleave', reset)

        return () => {
          target.removeEventListener('pointermove', onMove)
          target.removeEventListener('pointerleave', reset)
        }
      })
    }

    setup()

    const onPointerChange = () => setup()
    finePointerQuery.addEventListener('change', onPointerChange)

    return () => {
      finePointerQuery.removeEventListener('change', onPointerChange)
      cleanups.forEach((cleanup) => cleanup())
    }
  }, [])

  /* Smooth carousel for bestsellers rail */
  useEffect(() => {
    const reduce = prefersReducedMotion()
    if (reduce || !railRef.current) return undefined

    const rail = railRef.current
    let isDown = false
    let startX = 0
    let scrollLeft = 0

    const onMouseDown = (e) => {
      isDown = true
      startX = e.pageX - rail.offsetLeft
      scrollLeft = rail.scrollLeft
      rail.style.cursor = 'grabbing'
    }

    const onMouseLeave = () => {
      isDown = false
      rail.style.cursor = 'grab'
    }

    const onMouseUp = () => {
      isDown = false
      rail.style.cursor = 'grab'
    }

    const onMouseMove = (e) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - rail.offsetLeft
      const walk = (x - startX) * 1.5
      rail.scrollLeft = scrollLeft - walk
    }

    rail.addEventListener('mousedown', onMouseDown)
    rail.addEventListener('mouseleave', onMouseLeave)
    rail.addEventListener('mouseup', onMouseUp)
    rail.addEventListener('mousemove', onMouseMove)

    return () => {
      rail.removeEventListener('mousedown', onMouseDown)
      rail.removeEventListener('mouseleave', onMouseLeave)
      rail.removeEventListener('mouseup', onMouseUp)
      rail.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  /* Animated counters for craft section */
  useEffect(() => {
    const reduce = prefersReducedMotion()
    if (reduce) return undefined

    const counters = document.querySelectorAll('.metric-value')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target
          const target = parseInt(el.dataset.count, 10)
          const duration = 2000
          const start = performance.now()

          const animate = (now) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            const current = Math.floor(eased * target)
            el.innerHTML = `${current}<span>+</span>`
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
          observer.unobserve(el)
        }
      })
    }, { threshold: 0.5 })

    counters.forEach((counter) => observer.observe(counter))
    return () => observer.disconnect()
  }, [])

  /* Parallax on bento cards (responsive to pointer type change) */
  useEffect(() => {
    const reduce = prefersReducedMotion()
    if (reduce) return undefined

    const finePointerQuery = window.matchMedia('(pointer: fine)')
    let cleanups = []

    const setup = () => {
      cleanups.forEach((cleanup) => cleanup())
      cleanups = []

      if (!finePointerQuery.matches) return

      const cards = document.querySelectorAll('.bento-card')
      cleanups = Array.from(cards).map((card) => {
        const img = card.querySelector('img')
        if (!img) return () => {}

        const onMove = (e) => {
          const bounds = card.getBoundingClientRect()
          const x = (e.clientX - bounds.left) / bounds.width - 0.5
          const y = (e.clientY - bounds.top) / bounds.height - 0.5
          img.style.transform = `scale(1.08) translate(${x * 10}px, ${y * 10}px)`
        }
        const reset = () => {
          img.style.transform = ''
        }

        card.addEventListener('pointermove', onMove)
        card.addEventListener('pointerleave', reset)

        return () => {
          card.removeEventListener('pointermove', onMove)
          card.removeEventListener('pointerleave', reset)
        }
      })
    }

    setup()

    const onPointerChange = () => setup()
    finePointerQuery.addEventListener('change', onPointerChange)

    return () => {
      finePointerQuery.removeEventListener('change', onPointerChange)
      cleanups.forEach((cleanup) => cleanup())
    }
  }, [])

  /* ============================================
     CART & WISHLIST LOGIC
     ============================================ */

  const addToCart = useCallback((product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      }
      return [...prev, { ...product, qty: 1 }]
    })
    setCartOpen(true)
  }, [])

  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const updateQty = useCallback((id, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    )
  }, [])

  const toggleWishlist = useCallback((id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }, [])

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const cartCount = cart.reduce((s, i) => s + i.qty, 0)

  const scrollToRail = useCallback((direction) => {
    if (railRef.current) {
      railRef.current.scrollBy({ left: direction * 300, behavior: 'smooth' })
    }
  }, [])

  /* ============================================
     RENDER
     ============================================ */

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <div ref={root} className="site-shell" id="top">
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="page-progress" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      {/* ===== NAVBAR ===== */}
      <header ref={headerRef} className="site-header">
        <a className="wordmark" href="#top">Aurelia</a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#showcase">New In</a>
          <a href="#showcase">Sarees</a>
          <a href="#occasions">Collections</a>
          <a href="#occasions">Occasions</a>
          <a href="#craft">Craft</a>
          <a href="#lookbook">About</a>
        </nav>
        <div className="header-actions">
          <button className="header-icon" aria-label="Search"><IconSearch /></button>
          <button className="header-icon" aria-label="Account"><IconUser /></button>
          <button className="header-icon cart-btn" aria-label="Cart" onClick={() => setCartOpen(true)}>
            <IconBag />
            {cart.length > 0 && <span className="cart-count">{cartCount}</span>}
          </button>
        </div>
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span /><span />
        </button>
        <nav className={`mobile-nav ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
          <a href="#showcase" onClick={closeMenu}>New In</a>
          <a href="#showcase" onClick={closeMenu}>Sarees</a>
          <a href="#occasions" onClick={closeMenu}>Collections</a>
          <a href="#occasions" onClick={closeMenu}>Occasions</a>
          <a href="#craft" onClick={closeMenu}>Craft</a>
          <a href="#lookbook" onClick={closeMenu}>About</a>
        </nav>
      </header>

      <main id="main">
        {/* ===== HERO ===== */}
        <section ref={heroRef} className="hero" aria-label="Hero">
          <div ref={heroMediaRef} className="hero-media-wrap">
            <div className="hero-media">
              <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1920&q=80" alt="Model draped in a handcrafted Kanchipuram silk saree" />
            </div>
          </div>
          <div className="hero-scrim" />
          <div className="hero-content">
            <span className="hero-overline">The New Edition</span>
            <h1 className="hero-title">
              <span className="hero-line-wrap"><span className="hero-line">Draped in</span></span>
              <span className="hero-line-wrap"><span className="hero-line">something <em>timeless.</em></span></span>
            </h1>
            <p className="hero-sub">
              Handcrafted sarees created for celebrations, rituals and unforgettable moments.
            </p>
            <div className="hero-actions">
              <a href="#showcase" className="btn btn-primary">Explore Collection <IconArrowRight /></a>
              <a href="#craft" className="btn btn-outline">Discover the Craft</a>
            </div>
          </div>
          <div className="hero-scroll-hint">
            <span>Scroll to Discover</span>
            <div className="scroll-line" />
          </div>
        </section>

        {/* ===== FEATURED SAREE SHOWCASE ===== */}
        <section ref={showcaseRef} id="showcase" className="showcase" aria-label="Featured sarees">
          <div className="showcase-inner">
            <div className="showcase-visual">
              {sarees.map((saree, i) => (
                <img
                  key={saree.id}
                  src={saree.image}
                  alt={saree.name}
                  className={i === activeSaree ? 'active' : ''}
                />
              ))}
            </div>
            <div className="showcase-info">
              <span className="showcase-counter">
                <span>{String(activeSaree + 1).padStart(2, '0')}</span> / {String(sarees.length).padStart(2, '0')}
              </span>
              <h2 className="showcase-name">{sarees[activeSaree].name}</h2>
              <p className="showcase-desc">{sarees[activeSaree].desc}</p>
              <p className="showcase-price">
                ₹{sarees[activeSaree].price.toLocaleString('en-IN')}
                <span className="mrp">₹{sarees[activeSaree].mrp.toLocaleString('en-IN')}</span>
                <span className="discount">
                  {Math.round((1 - sarees[activeSaree].price / sarees[activeSaree].mrp) * 100)}% OFF
                </span>
              </p>
              <div>
                <span className="colour-label">Available Colours</span>
                <div className="colour-swatches" style={{ marginTop: 10 }}>
                  {sarees[activeSaree].colours.map((c, i) => (
                    <button key={c} className={`swatch ${i === 0 ? 'active' : ''}`} data-colour={c} aria-label={`Colour ${c}`} />
                  ))}
                </div>
              </div>
              <div className="showcase-actions">
                <button className="btn btn-dark" onClick={() => addToCart(sarees[activeSaree])}>
                  Add to Bag
                </button>
                <button
                  className={`wishlist-btn ${wishlist.includes(sarees[activeSaree].id) ? 'active' : ''}`}
                  onClick={() => toggleWishlist(sarees[activeSaree].id)}
                  aria-label="Add to wishlist"
                >
                  <IconHeart filled={wishlist.includes(sarees[activeSaree].id)} />
                </button>
              </div>
              <div className="showcase-progress">
                {sarees.map((_, i) => (
                  <div key={i} className={`progress-segment ${i < activeSaree ? 'done' : ''} ${i === activeSaree ? 'active' : ''}`}>
                    <div className="fill" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== NEW ARRIVALS ===== */}
        <section className="arrivals section" aria-label="New arrivals">
          <span className="section-label">Just In</span>
          <h2 className="section-title">New <em>Arrivals</em></h2>
          <div className="arrivals-grid">
            {newArrivals.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={addToCart}
                onWishlist={toggleWishlist}
                wished={wishlist.includes(product.id)}
              />
            ))}
          </div>
        </section>

        {/* ===== OCCASIONS BENTO ===== */}
        <section id="occasions" className="occasions section" aria-label="Shop by occasion">
          <span className="section-label">Collections</span>
          <h2 className="section-title">Sarees for <em>Every Chapter</em></h2>
          <div className="bento-grid">
            {occasions.map((occ) => (
              <a key={occ.title} className={`bento-card ${occ.large ? 'bento-card-large' : ''}`}>
                <img src={occ.image} alt={occ.title} loading="lazy" />
                <div className="bento-overlay" />
                <div className="bento-content">
                  <h3 className="bento-title">{occ.title}</h3>
                  <span className="bento-sub">{occ.sub}</span>
                  <span className="bento-explore">Explore <IconArrowRight /></span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ===== CRAFT SECTION ===== */}
        <section ref={craftRef} id="craft" className="craft" aria-label="The art of the saree">
          <div className="craft-inner">
            <div className="craft-visual">
              <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&q=80" alt="Close-up of handwoven silk fabric with zari work" />
            </div>
            <div className="craft-content">
              <span className="section-label">The Craft</span>
              <h2 className="craft-title">Every thread <em>has a story.</em></h2>
              <p className="craft-copy">
                Each saree begins as raw silk, spun and dyed by hand. Master weavers then spend
                weeks at the loom, translating centuries of tradition into every inch of fabric.
                The result is not just a garment — it is a living piece of heritage.
              </p>
              <div className="craft-metrics">
                <div>
                  <div className="metric-value" data-count="120">0<span>+</span></div>
                  <div className="metric-label">Hours of Handwork</div>
                </div>
                <div>
                  <div className="metric-value" data-count="100">0<span>%</span></div>
                  <div className="metric-label">Selected Fabrics</div>
                </div>
                <div>
                  <div className="metric-value" data-count="40">0<span>+</span></div>
                  <div className="metric-label">Artisan Partners</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FABRIC EXPLORER ===== */}
        <section className="fabrics section" aria-label="Fabric explorer">
          <span className="section-label">Choose Your Texture</span>
          <h2 className="section-title" style={{ color: 'var(--bg)' }}>Find your <em>perfect weave</em></h2>
          <div className="fabrics-grid">
            <div className="fabric-display">
              <div className="fabric-image-wrap">
                {fabrics.map((fabric, i) => (
                  <img key={fabric.name} src={fabric.image} alt={`${fabric.name} fabric`} className={i === activeFabric ? 'active' : ''} loading="lazy" />
                ))}
              </div>
              <div className="fabric-info">
                <h3 className="fabric-name">{fabrics[activeFabric].name}</h3>
                <p className="fabric-desc">{fabrics[activeFabric].desc}</p>
                <p className="fabric-count">{fabrics[activeFabric].count} pieces available</p>
              </div>
            </div>
            <div className="fabric-tabs">
              {fabrics.map((fabric, i) => (
                <button
                  key={fabric.name}
                  className={`fabric-tab ${i === activeFabric ? 'active' : ''}`}
                  onClick={() => setActiveFabric(i)}
                >
                  {fabric.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ===== LOOKBOOK ===== */}
        <section ref={lookbookRef} id="lookbook" className="lookbook" aria-label="Lookbook">
          <div className="lookbook-header">
            <div>
              <span className="section-label">The Lookbook</span>
              <h2 className="section-title">Woven <em>stories</em></h2>
            </div>
          </div>
          <div ref={lookbookTrackRef} className="lookbook-track">
            {lookbookImages.map((item) => (
              <div className="lookbook-item" key={item.look}>
                <img src={item.src} alt={`Look ${item.look} — ${item.name}`} loading="lazy" />
                <div className="lookbook-caption">
                  <span className="lookbook-look">Look {item.look}</span>
                  <span className="lookbook-name">{item.name}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="lookbook-mobile">
            {lookbookImages.map((item) => (
              <div className="lookbook-item" key={item.look}>
                <img src={item.src} alt={`Look ${item.look} — ${item.name}`} loading="lazy" />
                <div className="lookbook-caption">
                  <span className="lookbook-look">Look {item.look}</span>
                  <span className="lookbook-name">{item.name}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="lookbook-progress" aria-hidden="true">
            <div className="fill" />
          </div>
        </section>

        {/* ===== BESTSELLERS RAIL ===== */}
        <section className="bestsellers" aria-label="Bestsellers">
          <div className="bestsellers-header">
            <div>
              <span className="section-label">Most Loved</span>
              <h2 className="section-title">Pieces they keep <em>coming back to.</em></h2>
            </div>
            <div className="rail-nav">
              <button className="rail-btn" onClick={() => scrollToRail(-1)} aria-label="Scroll left"><IconArrowLeft /></button>
              <button className="rail-btn" onClick={() => scrollToRail(1)} aria-label="Scroll right"><IconArrowRight /></button>
            </div>
          </div>
          <div ref={railRef} className="product-rail">
            {sarees.map((product) => (
              <div className="rail-card" key={product.id}>
                <ProductCard
                  product={product}
                  onAdd={addToCart}
                  onWishlist={toggleWishlist}
                  wished={wishlist.includes(product.id)}
                />
              </div>
            ))}
          </div>
        </section>

        {/* ===== TESTIMONIALS ===== */}
        <section className="testimonials section" aria-label="Testimonials">
          <span className="section-label">Worn. Loved. Remembered.</span>
          <h2 className="section-title" style={{ marginBottom: 0 }}>What our <em>clients say</em></h2>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={t.name} className={`testimonial-card ${i === 1 ? 'offset' : ''}`} data-reveal>
                <div className="testimonial-quote">&ldquo;</div>
                <div className="testimonial-stars">{'★'.repeat(t.rating)}</div>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">
                  <img className="testimonial-avatar" src={t.avatar} alt={t.name} loading="lazy" />
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== INSTAGRAM MARQUEE ===== */}
        <section className="instagram" aria-label="Instagram">
          <div className="instagram-marquee" ref={marqueeRef}>
            {[...instagramImages, ...instagramImages].map((src, i) => (
              <img key={i} src={src} alt={`Instagram post ${i + 1}`} loading="lazy" />
            ))}
          </div>
          <div className="instagram-overlay">
            <span className="instagram-handle">@aurelia.sarees</span>
            <a className="instagram-cta" href="#top">Follow Our Journey</a>
          </div>
        </section>

        {/* ===== NEWSLETTER ===== */}
        <section className="newsletter section" aria-label="Newsletter">
          <span className="section-label">The Inner Circle</span>
          <h2 className="section-title">Join the <em>inner circle.</em></h2>
          <p style={{ maxWidth: 420, margin: '16px auto 0', color: 'var(--muted)', fontSize: 15, fontWeight: 300, lineHeight: 1.7 }}>
            Be the first to know about new weaves, artisan stories and exclusive celebrations.
          </p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email address" aria-label="Email address" required />
            <button type="submit">Subscribe</button>
          </form>
        </section>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="footer-brand" aria-hidden="true">AURELIA</div>
        <div className="footer-panel">
          <div className="footer-panel-grid">
            <div className="footer-col footer-newsletter">
              <h3>Aurelia</h3>
              <p>Handcrafted Indian sarees, woven for the moments that matter.</p>
            </div>
            <div className="footer-col">
              <div className="footer-col-title">Shop</div>
              <a href="#showcase">New In</a>
              <a href="#showcase">Sarees</a>
              <a href="#occasions">Collections</a>
              <a href="#occasions">Occasions</a>
              <a href="#bestsellers">Bestsellers</a>
            </div>
            <div className="footer-col">
              <div className="footer-col-title">Help</div>
              <a href="#top">Size Guide</a>
              <a href="#top">Shipping & Returns</a>
              <a href="#top">Contact Us</a>
              <a href="#top">WhatsApp</a>
            </div>
            <div className="footer-col">
              <div className="footer-col-title">About</div>
              <a href="#craft">Our Craft</a>
              <a href="#craft">Artisans</a>
              <a href="#lookbook">Lookbook</a>
              <a href="#top">Instagram</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2026 Aurelia. All rights reserved.</span>
            <div className="payment-badges">
              <span className="payment-badge">VISA</span>
              <span className="payment-badge">MC</span>
              <span className="payment-badge">UPI</span>
              <span className="payment-badge">Net Banking</span>
            </div>
            <a href="#top">Back to top ↑</a>
          </div>
        </div>
      </footer>

      {/* ===== CART DRAWER ===== */}
      <div
        className={`cart-overlay ${cartOpen ? 'open' : ''}`}
        onClick={() => setCartOpen(false)}
        role="button"
        aria-label="Close cart"
        tabIndex={-1}
      />
      <aside className={`cart-drawer ${cartOpen ? 'open' : ''}`} aria-hidden={!cartOpen} aria-label="Shopping cart">
        <div className="cart-header">
          <h3>Your Bag ({cart.reduce((s, i) => s + i.qty, 0)})</h3>
          <button className="cart-close" onClick={() => setCartOpen(false)} aria-label="Close cart"><IconX /></button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <p className="cart-empty">Your bag is empty.<br />Explore our collection to find your perfect saree.</p>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-meta">{item.fabric}</div>
                  <div className="cart-item-price">₹{item.price.toLocaleString('en-IN')}</div>
                  <div className="cart-item-qty">
                    <button className="qty-btn" onClick={() => updateQty(item.id, -1)} aria-label="Decrease quantity">−</button>
                    <span>{item.qty}</span>
                    <button className="qty-btn" onClick={() => updateQty(item.id, 1)} aria-label="Increase quantity">+</button>
                    <button className="qty-btn" style={{ marginLeft: 'auto', border: 'none' }} onClick={() => removeFromCart(item.id)} aria-label="Remove item">
                      <IconX />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total</span>
              <span>₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
            <button className="cart-checkout">Proceed to Checkout</button>
          </div>
        )}
      </aside>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
