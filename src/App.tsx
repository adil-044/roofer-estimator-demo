import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ============ MOBILE DETECTION HOOK ============ */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    checkMobile()
    window.addEventListener('resize', checkMobile, { passive: true })
    mediaQuery.addEventListener('change', (e) => setPrefersReducedMotion(e.matches))

    return () => {
      window.removeEventListener('resize', checkMobile)
      mediaQuery.removeEventListener('change', (e) => setPrefersReducedMotion(e.matches))
    }
  }, [])

  return { isMobile, prefersReducedMotion, shouldAnimate: !isMobile && !prefersReducedMotion }
}

/* ============ IMAGE ASSETS (Responsive Unsplash) ============ */
const IMAGES = {
  hero: {
    bg: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=1920&q=80',
    bgMobile: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=800&q=80',
  },
  problem: {
    cold: { desktop: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80', mobile: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&q=80' },
    backlog: { desktop: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80', mobile: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80' },
    money: { desktop: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&q=80', mobile: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80' },
    photos: { desktop: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80', mobile: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&q=80' },
  },
  process: {
    upload: { desktop: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80', mobile: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&q=80' },
    analysis: { desktop: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', mobile: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80' },
    quote: { desktop: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80', mobile: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80' },
    notify: { desktop: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80', mobile: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&q=80' },
  },
  proof: {
    storm: { desktop: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80', mobile: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=400&q=80' },
    commercial: { desktop: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80', mobile: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80' },
    repair: { desktop: 'https://images.unsplash.com/photo-1600607687640-4e2a09cf159d?w=800&q=80', mobile: 'https://images.unsplash.com/photo-1600607687640-4e2a09cf159d?w=400&q=80' },
  },
  trust: [
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80',
  ],
}

/* ============ RESPONSIVE IMAGE COMPONENT ============ */
function ResponsiveImage({ src, alt = '', className = '', priority = false }: {
  src: { desktop: string; mobile: string } | string
  alt?: string
  className?: string
  priority?: boolean
}) {
  const { isMobile } = useIsMobile()
  const imageSrc = typeof src === 'string' ? src : isMobile ? src.mobile : src.desktop

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 25vw"
    />
  )
}

/* ============ NAVBAR WITH MOBILE MENU ============ */
function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { isMobile } = useIsMobile()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--color-bg)]/95 backdrop-blur-md border-b border-[var(--color-border)] shadow-[0_1px_0_var(--color-border)]'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom flex items-center justify-between h-16 md:h-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-steel)] to-[var(--color-amber)] flex items-center justify-center">
            <svg className="w-5 h-5 text-[var(--color-bg)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <div className="hidden sm:block">
            <p className="font-display text-xl md:text-2xl tracking-tight">Uptisement</p>
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-amber)] font-medium">AI Estimator</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink href="#problem">Problem</NavLink>
          <NavLink href="#how-it-works">Process</NavLink>
          <NavLink href="#proof">Proof</NavLink>
          <NavLink href="#offer">Pricing</NavLink>
        </div>

        {/* Desktop CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <a href="#offer" className="btn-ghost">See Pricing</a>
          <a href="https://calendly.com/uptisement/30min" target="_blank" rel="noopener noreferrer" className="btn-primary">
            <span>Book Demo</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text)]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobile && menuOpen && (
        <div id="mobile-menu" className="md:hidden fixed inset-0 z-40 bg-[var(--color-bg)]/98 backdrop-blur-md flex flex-col items-center justify-center gap-8 animate-fade-in">
          <NavLink href="#problem" className="text-xl" onClick={() => setMenuOpen(false)}>Problem</NavLink>
          <NavLink href="#how-it-works" className="text-xl" onClick={() => setMenuOpen(false)}>Process</NavLink>
          <NavLink href="#proof" className="text-xl" onClick={() => setMenuOpen(false)}>Proof</NavLink>
          <NavLink href="#offer" className="text-xl" onClick={() => setMenuOpen(false)}>Pricing</NavLink>
          <a href="https://calendly.com/uptisement/30min" target="_blank" rel="noopener noreferrer" className="btn-primary w-full max-w-xs text-center" onClick={() => setMenuOpen(false)}>
            Book Demo
          </a>
        </div>
      )}
    </nav>
  )
}

function NavLink({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      {...props}
      className="relative text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors text-sm font-medium after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-[var(--color-amber)] after:transition-all hover:after:w-full"
    >
      {children}
    </a>
  )
}

/* ============ HERO WITH RESPONSIVE GSAP ============ */
function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const metricsRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const { shouldAnimate, isMobile } = useIsMobile()

  useEffect(() => {
    if (!shouldAnimate) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: isMobile ? false : 1, // Disable scrub on mobile
          onUpdate: isMobile ? undefined : (self) => {
            const progress = self.progress
            if (bgRef.current) {
              gsap.set(bgRef.current, { transform: `translateY(${progress * 100}px) scale(${1 + progress * 0.1})` })
            }
            if (overlayRef.current) {
              gsap.set(overlayRef.current, { opacity: 0.15 + progress * 0.35 })
            }
          },
        },
      })

      tl.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        0
      )
        .fromTo(
          subtitleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
          0.15
        )
        .fromTo(
          ctaRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          0.3
        )
        .fromTo(
          metricsRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          0.45
        )

      // Parallax on scroll (desktop only)
      if (!isMobile) {
        gsap.to(bgRef.current, {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    }, heroRef)

    return () => ctx.revert()
  }, [shouldAnimate, isMobile])

  // Simple entrance animation for mobile
  useEffect(() => {
    if (shouldAnimate) return

    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' })
      gsap.fromTo(subtitleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 })
      gsap.fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.2 })
      gsap.fromTo(metricsRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.3 })
    }, heroRef)

    return () => ctx.revert()
  }, [shouldAnimate])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'var(--color-bg)' }}
    >
      {/* Background Layers */}
      <div
        ref={bgRef}
        className="absolute inset-0 -z-20"
        style={{
          backgroundImage: `url(${isMobile ? IMAGES.hero.bgMobile : IMAGES.hero.bg})`,
          backgroundSize: 'cover',
          backgroundPosition: isMobile ? 'center 30%' : 'center',
          backgroundAttachment: isMobile ? 'scroll' : 'fixed',
        }}
        aria-hidden="true"
      />
      <div
        ref={overlayRef}
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[var(--color-bg)] via-[var(--color-bg)]/90 to-[var(--color-bg)]"
        aria-hidden="true"
      />

      {/* Floating Ambient Shapes (desktop only) */}
      {!isMobile && (
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 left-1/10 w-[30rem] h-[30rem] bg-[var(--color-steel)]/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/10 w-[25rem] h-[25rem] bg-[var(--color-amber)]/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] bg-[var(--color-steel)]/3 rounded-full blur-3xl" />
        </div>
      )}

      <div className="container-custom relative z-10 py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-surface-elevated)]/50 border border-[var(--color-border)] backdrop-blur-sm mb-6 md:mb-8">
            <span className="w-2 h-2 rounded-full bg-[var(--color-amber)] animate-pulse" />
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-[var(--color-amber)]">Photo-to-Quote for Roofing Companies</span>
          </div>

          {/* Headline - Responsive sizing */}
          <h1 ref={titleRef} className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight text-balance leading-[1.08] mb-6 md:mb-8">
            Written Roof Ballpark
            <br />
            <span className="relative inline-block">
              Same Day Photos Exist
              <span className="absolute bottom-0 left-0 right-0 h-1.5 bg-[var(--color-amber)]/30 -z-10" />
            </span>
          </h1>

          {/* Subheadline */}
          <p ref={subtitleRef} className="text-base sm:text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed text-balance">
            Your crew, sales, or drone photos → repair / recoat / replace ballpark in minutes.
            First written price usually wins. Don&apos;t let leads go cold waiting on the office.
          </p>

          {/* CTA Group - Full width on mobile */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-12 md:mb-16">
            <a
              href="https://calendly.com/uptisement/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary group w-full sm:w-auto relative overflow-hidden py-4 md:py-3.5 px-6 md:px-8 text-base"
            >
              <span className="relative z-10 flex items-center gap-2">Book 10-min Demo</span>
              <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
              <span className="absolute inset-0 bg-[var(--color-amber-hover)] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 -z-10" />
            </a>
            <a href="#how-it-works" className="btn-secondary w-full sm:w-auto group relative overflow-hidden py-4 md:py-3.5 px-6 md:px-8 text-base">
              <span className="relative z-10">See How It Works</span>
              <span className="absolute inset-0 bg-[var(--color-surface)] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 -z-10" />
            </a>
          </div>

          {/* Metrics Bar - Stacked on mobile */}
          <div ref={metricsRef} className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 md:gap-6 md:gap-8 text-sm">
            <MetricItem value="$500" label="Setup" color="amber" />
            <MetricDivider />
            <MetricItem value="$50" label="/ Estimate" color="steel" />
            <MetricDivider />
            <MetricItem value="5–10%" label="of Jobs Closed" color="steel" />
            <MetricDivider />
            <MetricItem value="30-Day" label="Bottleneck Refund" color="amber" badge />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--color-text-tertiary)] animate-bounce-subtle md:hidden">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
        <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
      </div>
    </section>
  )
}

function MetricItem({ value, label, color, badge }: { value: string; label: string; color: 'steel' | 'amber'; badge?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className={`font-mono text-xl md:text-2xl lg:text-3xl font-bold text-[var(--color-${color})]`}>{value}</span>
      <span className="text-[var(--color-text-tertiary)] uppercase tracking-[0.1em] text-xs">{label}</span>
      {badge && <span className="badge-amber text-xs mt-1">Guaranteed</span>}
    </div>
  )
}

function MetricDivider() {
  return <div className="w-px h-6 md:h-8 bg-gradient-to-b from-transparent via-[var(--color-border)] to-transparent hidden sm:block" />
}

/* ============ PROBLEM SECTION - MOBILE OPTIMIZED ============ */
function Problem() {
  const sectionRef = useRef<HTMLElement>(null)
  const { shouldAnimate, isMobile } = useIsMobile()
  const pains = [
    { icon: '⏳', title: 'Leads Go Cold', desc: 'Customer sends photos Friday. Your estimator writes the number Thursday. By then, they\'ve already signed with whoever replied first.', image: IMAGES.problem.cold, stat: '73%', statLabel: 'of leads choose first responder' },
    { icon: '📋', title: 'Office Backlog', desc: 'Estimators climb roofs all day. Quotes sit in a queue. Owner becomes the bottleneck. Revenue stalls on the desk.', image: IMAGES.problem.backlog, stat: '3.2 days', statLabel: 'avg quote turnaround' },
    { icon: '💸', title: 'Lost Jobs = Lost Money', desc: 'Commercial roof replacement = $15k–$150k. One slow quote per month = $180k–$1.8M/year left on the table.', image: IMAGES.problem.money, stat: '$1.8M', statLabel: 'annual revenue at risk' },
    { icon: '📱', title: 'Photos Already Exist', desc: 'Customer, GC, adjuster, drone — someone already has the shots. You\'re not waiting for photos. You\'re waiting for typing.', image: IMAGES.problem.photos, stat: '89%', statLabel: 'of leads have photos ready' },
  ]

  useEffect(() => {
    if (!shouldAnimate) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.pain-card').forEach((card: any, i) => {
        gsap.fromTo(
          card,
          { y: isMobile ? 40 : 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
            delay: i * 0.08,
          }
        )

        const img = card.querySelector('.pain-image')
        if (img && !isMobile) {
          gsap.to(img, {
            yPercent: 15,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          })
        }
      })

      gsap.fromTo(
        '.problem-header > *',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: '.problem-header', start: 'top 85%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [shouldAnimate, isMobile])

  // Simple animation for mobile/no-animation
  useEffect(() => {
    if (shouldAnimate) return

    const ctx = gsap.context(() => {
      gsap.fromTo('.pain-card', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' })
      gsap.fromTo('.problem-header > *', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' })
    }, sectionRef)

    return () => ctx.revert()
  }, [shouldAnimate])

  return (
    <section ref={sectionRef} id="problem" className="section relative bg-[var(--color-surface)]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60rem] h-[60rem] bg-[var(--color-steel)]/3 rounded-full blur-3xl hidden lg:block" />
      </div>

      <div className="container-custom relative z-10 px-4 md:px-6">
        <header className="problem-header max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <p className="text-[var(--color-steel)] text-xs uppercase tracking-[0.2em] font-medium mb-3">The Bottleneck</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight text-balance mb-4">
            Speed to Quote <span className="text-[var(--color-amber)]">Is the Close Rate</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] text-base md:text-lg max-w-2xl mx-auto">
            You&apos;re not paying to skip the site visit. You&apos;re paying so the written number leaves the same day the photos exist — not Thursday.
          </p>
        </header>

        {/* Mobile: stacked cards | Desktop: 2-col then 4-col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {pains.map((pain, i) => (
            <article key={i} className="pain-card card relative overflow-hidden group">
              {/* Image Background - responsive aspect ratio */}
              <div className="absolute inset-0 -z-10 pain-image">
                <ResponsiveImage
                  src={pain.image}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={i < 2}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/90 via-[var(--color-bg)]/20 to-transparent" />
              </div>

              <div className="relative z-10 p-5 md:p-6 h-full flex flex-col min-h-[280px] sm:min-h-[320px]">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-bg)]/80 backdrop-blur-sm flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
                    {pain.icon}
                  </div>
                  <div className="text-right min-w-[80px]">
                    <p className="font-mono text-xl md:text-2xl font-bold text-[var(--color-amber)]">{pain.stat}</p>
                    <p className="text-[var(--color-text-tertiary)] text-xs uppercase tracking-wide leading-tight">{pain.statLabel}</p>
                  </div>
                </div>
                <h3 className="font-display text-lg md:text-xl mb-2 group-hover:text-[var(--color-amber)] transition-colors">{pain.title}</h3>
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed flex-1">{pain.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============ HOW IT WORKS - MOBILE FIRST BENTO ============ */
function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  const { shouldAnimate, isMobile } = useIsMobile()
  const steps = [
    { num: '01', title: 'Photos In', desc: 'Crew, sales, drone, customer, GC, or adjuster upload 1–3 photos. Wide field, seams/edges, damage close-up.', image: IMAGES.process.upload, icon: <UploadIcon /> },
    { num: '02', title: 'Vision Analysis', desc: 'OpenRouter free-model chain reads roof type, slope, damage, ponding, flashing, membrane condition.', image: IMAGES.process.analysis, icon: <AnalysisIcon /> },
    { num: '03', title: 'Instant Ballpark', desc: 'Repair $3–8 • Recoat $4–12 • Replace $8–20 /sqft. Written estimate generated in minutes, not days.', image: IMAGES.process.quote, icon: <QuoteIcon /> },
    { num: '04', title: 'Prospect Notified', desc: 'Email + owner CC with ballpark, next steps, and booking link. You only drive for jobs that look real.', image: IMAGES.process.notify, icon: <NotifyIcon /> },
  ]

  useEffect(() => {
    if (!shouldAnimate) return

    const ctx = gsap.context(() => {
      gsap.fromTo('.how-header > *', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.08, scrollTrigger: { trigger: '.how-header', start: 'top 85%' } })

      gsap.utils.toArray('.bento-card').forEach((card: any, i) => {
        gsap.fromTo(card, { y: isMobile ? 30 : 40, opacity: 0, scale: 0.98 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none reverse' }, delay: i * 0.06 })

        const img = card.querySelector('.bento-image img')
        if (img) {
          gsap.fromTo(img, { scale: 1.1, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: card, start: 'top 95%' } })
        }
      })

      if (!isMobile) {
        gsap.fromTo('.connector-line', { scaleY: 0, transformOrigin: 'top center' }, { scaleY: 1, duration: 0.8, ease: 'power2.out', stagger: 0.1, scrollTrigger: { trigger: '.bento-grid', start: 'top 75%' } })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [shouldAnimate, isMobile])

  useEffect(() => {
    if (shouldAnimate) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.bento-card', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: 'power2.out' })
    }, sectionRef)
    return () => ctx.revert()
  }, [shouldAnimate])

  return (
    <section ref={sectionRef} id="how-it-works" className="section relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 right-0 w-[50rem] h-[50rem] bg-[var(--color-amber)]/3 rounded-full blur-3xl hidden lg:block" />
      </div>

      <div className="container-custom relative z-10 px-4 md:px-6">
        <header className="how-header max-w-3xl mx-auto text-center mb-10 md:mb-14">
          <p className="text-[var(--color-steel)] text-xs uppercase tracking-[0.2em] font-medium mb-3">Process</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight text-balance mb-4">
            Photos → Ballpark → Booked
            <br />
            <span className="text-[var(--color-amber)]">In Minutes</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] text-base md:text-lg max-w-2xl mx-auto">
            Done for you. No CRM replacement. No new software for your team to learn.
          </p>
        </header>

        <div className="bento-grid relative">
          {/* Connector Lines - Desktop only */}
          {!isMobile && (
            <>
              <div className="hidden lg:block absolute left-[14%] top-20 bottom-20 w-px bg-gradient-to-b from-[var(--color-steel)]/30 via-[var(--color-amber)]/30 to-transparent connector-line" />
              <div className="hidden lg:block absolute left-[39%] top-20 bottom-20 w-px bg-gradient-to-b from-[var(--color-steel)]/30 via-[var(--color-amber)]/30 to-transparent connector-line" />
              <div className="hidden lg:block absolute left-[64%] top-20 bottom-20 w-px bg-gradient-to-b from-[var(--color-steel)]/30 via-[var(--color-amber)]/30 to-transparent connector-line" />
              <div className="hidden lg:block absolute left-[89%] top-20 bottom-20 w-px bg-gradient-to-b from-[var(--color-steel)]/30 via-[var(--color-amber)]/30 to-transparent connector-line" />
            </>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative z-10">
            {steps.map((step, i) => (
              <article key={i} className="bento-card card relative overflow-hidden group">
                <div className="absolute -top-3 left-4 font-mono text-3xl font-bold text-[var(--color-amber)]/20 group-hover:text-[var(--color-amber)]/40 transition-colors">
                  {step.num}
                </div>

                <div className="relative aspect-[4/3] mb-4 overflow-hidden rounded-[var(--radius-base)] bento-image">
                  <ResponsiveImage src={step.image} alt="" className="w-full h-full object-cover" priority={i < 2} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-steel-muted)] flex items-center justify-center text-[var(--color-steel)] mb-4 group-hover:bg-[var(--color-steel)] group-hover:text-[var(--color-bg)] transition-all duration-200">
                    {step.icon}
                  </div>
                  <h3 className="font-display text-lg md:text-xl mb-2">{step.title}</h3>
                  <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">{step.desc}</p>
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-steel)]/5 via-transparent to-[var(--color-amber)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-[var(--radius-lg)]" />
              </article>
            ))}
          </div>
        </div>

        <div className="mt-10 md:mt-14">
          <p className="text-[var(--color-text-tertiary)] text-center mb-6">Works with your existing flow</p>
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            {['JobNimbus', 'AccuLynx', 'RoofSnap', 'CompanyCam', 'Email/Photos', 'Google Drive', 'Dropbox'].map((tool) => (
              <span key={tool} className="badge-steel group hover:bg-[var(--color-steel)] hover:text-[var(--color-bg)] transition-all px-3 py-1.5 text-xs">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* Step Icons */
function UploadIcon() {
  return <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 0 1 2-2h.93a2 2 0 0 0 1.664-.89l.812-1.22A2 2 0 0 1 10.07 4h3.86a2 2 0 0 1 1.664.89l.812 1.22A2 2 0 0 0 18.07 7H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" /><circle cx="9" cy="13" r="1" /><circle cx="15" cy="13" r="1" /></svg>
}
function AnalysisIcon() {
  return <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" /></svg>
}
function QuoteIcon() {
  return <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12M17 4v16M7 8v12M3 4h18M9 4v4M15 4v4" /></svg>
}
function NotifyIcon() {
  return <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
}

/* ============ PROOF SECTION - MOBILE CARDS ============ */
function Proof() {
  const sectionRef = useRef<HTMLElement>(null)
  const { shouldAnimate, isMobile } = useIsMobile()
  const scenarios = [
    { label: 'Storm Lead', photos: 'Customer texts 3 pcs hail damage', before: '3 days to quote', after: '18 minutes', outcome: 'Signed same week', image: IMAGES.proof.storm, savings: '$47k' },
    { label: 'Commercial GC', photos: 'GC emails roof plan + photos', before: '5 days (estimator busy)', after: '42 minutes', outcome: 'Beat 2 competitors to number', image: IMAGES.proof.commercial, savings: '$120k' },
    { label: 'Repair Triage', photos: 'Sales rep shoots leak on site', before: 'Back at office tomorrow', after: 'Before leaving site', outcome: 'Crew dispatched same day', image: IMAGES.proof.repair, savings: '$12k' },
  ]

  useEffect(() => {
    if (!shouldAnimate) return

    const ctx = gsap.context(() => {
      gsap.fromTo('.proof-header > *', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.08, scrollTrigger: { trigger: '.proof-header', start: 'top 85%' } })

      gsap.utils.toArray('.proof-card').forEach((card: any, i) => {
        gsap.fromTo(card, { y: isMobile ? 30 : 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none reverse' }, delay: i * 0.08 })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [shouldAnimate, isMobile])

  useEffect(() => {
    if (shouldAnimate) return
    const ctx = gsap.context(() => { gsap.fromTo('.proof-card', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power2.out' }) }, sectionRef)
    return () => ctx.revert()
  }, [shouldAnimate])

  return (
    <section ref={sectionRef} id="proof" className="section relative bg-[var(--color-surface)]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60rem] h-[60rem] bg-[var(--color-amber)]/3 rounded-full blur-3xl hidden lg:block" />
      </div>

      <div className="container-custom relative z-10 px-4 md:px-6">
        <header className="proof-header max-w-3xl mx-auto text-center mb-10 md:mb-14">
          <p className="text-[var(--color-steel)] text-xs uppercase tracking-[0.2em] font-medium mb-3">Proof</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight text-balance mb-4">
            Real Scenarios.
            <br />
            <span className="text-[var(--color-amber)]">Real Time Saved.</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] text-base md:text-lg max-w-2xl mx-auto">
            Three roofing companies. Three different workflows. Same result: first written price wins.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          {scenarios.map((s, i) => (
            <article key={i} className="proof-card card relative overflow-hidden group">
              <div className="relative aspect-[16/10] mb-4 -mx-4 md:-mx-6 -mt-4 md:-mt-6 overflow-hidden">
                <ResponsiveImage src={s.image} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" priority={i === 0} />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <span className="badge-steel">{s.label}</span>
                  <div className="text-right">
                    <p className="font-mono text-lg md:text-xl font-bold text-[var(--color-amber)]">{s.savings}</p>
                    <p className="text-[var(--color-text-tertiary)] text-xs">Revenue Captured</p>
                  </div>
                </div>
              </div>

              <p className="text-[var(--color-text-secondary)] text-sm mb-4">Photos: {s.photos}</p>

              <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4">
                <div className="bg-[var(--color-bg)] p-3 md:p-4 rounded-[var(--radius-base)] border border-[var(--color-border)] group-hover:border-[var(--color-danger)]/50 transition-colors">
                  <p className="text-[var(--color-text-tertiary)] text-xs uppercase tracking-wide mb-1">Before</p>
                  <p className="font-mono text-base md:text-lg text-[var(--color-danger)]">{s.before}</p>
                </div>
                <div className="bg-[var(--color-bg)] p-3 md:p-4 rounded-[var(--radius-base)] border border-[var(--color-border)] group-hover:border-[var(--color-success)]/50 transition-colors">
                  <p className="text-[var(--color-text-tertiary)] text-xs uppercase tracking-wide mb-1">After</p>
                  <p className="font-mono text-base md:text-lg text-[var(--color-success)]">{s.after}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[var(--color-success)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="M5 12l5 5L20 7" /></svg>
                  <span className="text-[var(--color-success)] font-medium text-sm">{s.outcome}</span>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm text-[var(--color-amber)]">~{(parseInt(s.savings.replace(/[$,k]/g, '')) * (s.label === 'Commercial GC' ? 2.5 : 1)).toLocaleString()}k</p>
                  <p className="text-[var(--color-text-tertiary)] text-xs">Monthly Potential</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 md:mt-12 text-center">
          <a href="https://calendly.com/uptisement/30min" target="_blank" rel="noopener noreferrer" className="btn-primary group inline-flex items-center gap-2 px-6 md:px-8 py-3.5 md:py-4">
            <span className="relative z-10">See Live Demo on Roofs Like Yours</span>
            <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            <span className="absolute inset-0 bg-[var(--color-amber-hover)] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 -z-10" />
          </a>
        </div>
      </div>
    </section>
  )
}

/* ============ TRUST / TESTIMONIALS ============ */
function Trust() {
  const sectionRef = useRef<HTMLElement>(null)
  const { shouldAnimate, isMobile } = useIsMobile()
  const testimonials = [
    { quote: '"We closed a $180k commercial job because we sent the ballpark 4 hours after the GC emailed photos. The competitor sent theirs 2 days later."', author: 'Mike R.', role: 'Owner, Summit Roofing (TX)', revenue: '+$180k', period: 'First month' },
    { quote: '"The 30-day refund gave us zero risk. Our estimator was skeptical — now he won\'t go on a site without running photos through it first."', author: 'Sarah K.', role: 'Ops Manager, Apex Commercial (FL)', revenue: '+35%', period: 'Quote speed increase' },
    { quote: '"We don\'t do residential. But the same logic applies: first written number wins. This tool pays for itself on one commercial job."', author: 'Dave M.', role: 'President, Metropolitan Roofing (CO)', revenue: '2.1x', period: 'ROI Month 1' },
  ]

  useEffect(() => {
    if (!shouldAnimate) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.trust-header > *', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.08, scrollTrigger: { trigger: '.trust-header', start: 'top 85%' } })
      gsap.utils.toArray('.testimonial-card').forEach((card: any, i) => {
        gsap.fromTo(card, { y: isMobile ? 20 : 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none reverse' }, delay: i * 0.08 })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [shouldAnimate, isMobile])

  useEffect(() => { if (shouldAnimate) return; const ctx = gsap.context(() => { gsap.fromTo('.testimonial-card', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power2.out' }) }, sectionRef); return () => ctx.revert() }, [shouldAnimate])

  return (
    <section ref={sectionRef} className="section relative bg-[var(--color-bg)]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60rem] h-[60rem] bg-[var(--color-steel)]/3 rounded-full blur-3xl hidden lg:block" />
      </div>

      <div className="container-custom relative z-10 px-4 md:px-6">
        <header className="trust-header max-w-3xl mx-auto text-center mb-10 md:mb-14">
          <p className="text-[var(--color-steel)] text-xs uppercase tracking-[0.2em] font-medium mb-3">Trust</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight text-balance mb-4">
            Roofing Companies
            <br />
            <span className="text-[var(--color-amber)]">Don&apos;t Guess Anymore.</span>
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <article key={i} className="testimonial-card card relative overflow-hidden">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex -space-x-1">
                  {IMAGES.trust.slice(0, 3).map((src, j) => (
                    <img key={j} src={src} alt="" className="w-7 h-7 rounded-full border-2 border-[var(--color-bg)] object-cover" />
                  ))}
                </div>
                <span className="text-[var(--color-amber)] text-sm font-medium ml-2">{t.revenue}</span>
              </div>
              <blockquote className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-4 italic">{t.quote}</blockquote>
              <footer className="pt-3 border-t border-[var(--color-border)]">
                <p className="font-medium text-sm">{t.author}</p>
                <p className="text-[var(--color-text-tertiary)] text-xs">{t.role}</p>
                <p className="text-[var(--color-success)] text-xs font-medium mt-1">{t.period}</p>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============ OFFER / PRICING - MOBILE STACK ============ */
function Offer() {
  const sectionRef = useRef<HTMLElement>(null)
  const { shouldAnimate, isMobile } = useIsMobile()
  const [selectedTier, _setSelectedTier] = useState(1)

  const tiers = [
    { id: 0, name: 'Performance', price: '$500', period: 'setup', perEstimate: '+ $50/estimate', alt: 'or 5–10% of jobs closed', features: ['Full photo-to-quote setup', 'Repair / Recoat / Replace bands', 'Email + owner CC on every estimate', 'Booking link in every delivery', '30-day bottleneck refund guarantee'], cta: 'Start Performance', popular: false },
    { id: 1, name: 'Retainer', price: '$2,500', period: 'build', perEstimate: '+ $400/mo', alt: 'Early proof pricing', features: ['Everything in Performance', 'Priority processing queue', 'Custom price bands per material', 'Monthly ROI report', 'Direct Slack/email support'], cta: 'Start Retainer', popular: true },
    { id: 2, name: 'Full', price: '$4,000', period: 'build', perEstimate: '+ $750/mo', alt: 'Case study pricing', features: ['Everything in Retainer', 'White-label client portal', 'API access for CRM sync', 'Dedicated success manager', 'Quarterly business review'], cta: 'Contact for Full', popular: false },
  ]

  useEffect(() => {
    if (!shouldAnimate) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.offer-header > *', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.08, scrollTrigger: { trigger: '.offer-header', start: 'top 85%' } })
      gsap.utils.toArray('.tier-card').forEach((card: any, i) => {
        gsap.fromTo(card, { y: isMobile ? 30 : 40, opacity: 0, scale: 0.98 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none reverse' }, delay: i * 0.08 })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [shouldAnimate, isMobile])

  useEffect(() => { if (shouldAnimate) return; const ctx = gsap.context(() => { gsap.fromTo('.tier-card', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power2.out' }) }, sectionRef); return () => ctx.revert() }, [shouldAnimate])

  return (
    <section ref={sectionRef} id="offer" className="section relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-1/4 w-[40rem] h-[40rem] bg-[var(--color-steel)]/3 rounded-full blur-3xl hidden lg:block" />
      </div>

      <div className="container-custom relative z-10 px-4 md:px-6">
        <header className="offer-header max-w-3xl mx-auto text-center mb-10 md:mb-14">
          <p className="text-[var(--color-steel)] text-xs uppercase tracking-[0.2em] font-medium mb-3">Pricing</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight text-balance mb-4">
            Pay When It Works.
            <br />
            <span className="text-[var(--color-amber)]">Refund If It Doesn&apos;t.</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] text-base md:text-lg max-w-2xl mx-auto">
            Max 2 pricing mechanisms in one pitch. Raise price after 1–3 case studies.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          {tiers.map((tier) => (
            <article key={tier.id} className={`tier-card card relative overflow-hidden ${selectedTier === tier.id ? 'border-[var(--color-amber)] shadow-[0_0_0_1px_var(--color-amber),_0_20px_40px_rgba(232,168,56,0.15)]' : ''} ${tier.popular ? 'popular' : ''}`}>
              {tier.popular && <div className="absolute -top-2 left-1/2 -translate-x-1/2 badge-amber text-xs">Most Chosen</div>}

              <header className="p-4 md:p-6 pb-3 border-b border-[var(--color-border)]">
                <h3 className="font-display text-lg md:text-xl mb-3">{tier.name}</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-mono text-3xl md:text-4xl font-bold">{tier.price}</span>
                  <span className="text-[var(--color-text-secondary)]">{tier.period}</span>
                </div>
                <p className="text-[var(--color-text-tertiary)] text-sm mb-1">{tier.perEstimate}</p>
                <p className="text-[var(--color-text-tertiary)] text-sm">{tier.alt}</p>
              </header>

              <ul className="px-4 md:px-6 py-4 space-y-3">
                {tier.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2 text-[var(--color-text-secondary)] text-sm group">
                    <div className="w-5 h-5 rounded-lg bg-[var(--color-success)]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--color-success)] group-hover:text-[var(--color-bg)] transition-all duration-200"><svg className="w-3.5 h-3.5 text-[var(--color-success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path d="M20 6L9 17l-5-5" /></svg></div>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="px-4 md:px-6 pb-4 md:pb-6">
                <a href="https://calendly.com/uptisement/30min" target="_blank" rel="noopener noreferrer" className={`${selectedTier === tier.id ? 'btn-primary' : 'btn-secondary'} w-full group relative overflow-hidden py-3.5`}>
                  <span className="relative z-10">{tier.cta}</span>
                  {selectedTier === tier.id && <span className="absolute inset-0 bg-[var(--color-amber-hover)] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 -z-10" />}
                </a>
              </div>

              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-steel)]/5 via-transparent to-[var(--color-amber)]/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-[var(--radius-lg)]" />
            </article>
          ))}
        </div>

        <div className="mt-8 md:mt-12 text-center">
          <p className="text-[var(--color-text-tertiary)] max-w-2xl mx-auto text-sm"><strong className="text-[var(--color-text)]">Rule:</strong> Their customer LTV ≥ $15k or skip. Roof replacement clears this.</p>
        </div>
      </div>
    </section>
  )
}

/* ============ FAQ - MOBILE FRIENDLY ============ */
function FAQ() {
  const faqs = [
    { q: 'Do customers have to climb the roof?', a: 'Never. Your crew, sales already on site, drone, or ground/damage shots only. The tool just turns those photos into a written ballpark same day.' },
    { q: 'If we still go on site, what\'s the point?', a: 'You\'re not paying to skip the site. You\'re paying so the written number leaves the same day photos exist — not Thursday. First price usually wins.' },
    { q: 'Does this replace our CRM (JobNimbus, AccuLynx)?', a: 'No. We sit in front of it: photos → written ballpark faster. Your CRM stays the system of record.' },
    { q: 'What if it doesn\'t work for us?', a: 'Use it 30 days. If it doesn\'t replace the estimating bottleneck, the $500 setup is refunded. You only pay for estimates that go out or jobs that close.' },
    { q: 'How accurate are the price bands?', a: 'Repair $3–8, Recoat $4–12, Replace $8–20 /sqft. These are ballparks to start the conversation. Your estimator refines on site visit.' },
    { q: 'What photos do we need?', a: 'Wide field (full roof), seams/edges close-up, damage/ponding close-up. 1–3 photos. Drone or ground shots both work.' },
  ]

  return (
    <section className="section relative bg-[var(--color-surface)]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-1/4 w-[40rem] h-[40rem] bg-[var(--color-amber)]/3 rounded-full blur-3xl hidden lg:block" />
      </div>

      <div className="container-custom relative z-10 px-4 md:px-6">
        <header className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
          <p className="text-[var(--color-steel)] text-xs uppercase tracking-[0.2em] font-medium mb-3">Questions</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight text-balance mb-4">
            Honest Answers.
            <br />
            <span className="text-[var(--color-amber)]">No Fluff.</span>
          </h2>
        </header>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => <FAQItem key={i} faq={faq} />)}
        </div>
      </div>
    </section>
  )
}

function FAQItem({ faq }: { faq: { q: string; a: string } }) {
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const { shouldAnimate } = useIsMobile()

  useEffect(() => {
    if (!detailsRef.current || !contentRef.current) return
    const details = detailsRef.current
    const content = contentRef.current

    const handleToggle = () => {
      const open = details.open
      setIsOpen(open)
      if (!shouldAnimate) return

      if (open) {
        content.style.height = 'auto'
        const height = content.scrollHeight
        content.style.height = '0px'
        gsap.to(content, { height, duration: 0.35, ease: 'power2.out' })
      } else {
        gsap.to(content, { height: 0, duration: 0.25, ease: 'power2.in' })
      }
    }

    details.addEventListener('toggle', handleToggle)
    return () => details.removeEventListener('toggle', handleToggle)
  }, [shouldAnimate])

  return (
    <details ref={detailsRef} className="card group">
      <summary className="flex items-center justify-between cursor-pointer list-none font-display text-base md:text-lg p-4 md:p-6">
        {faq.q}
        <div className="flex items-center gap-2">
          <span className="text-[var(--color-text-tertiary)] text-xs uppercase tracking-wide hidden md:block">Click to expand</span>
          <svg className={`w-5 h-5 text-[var(--color-text-tertiary)] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor"><path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01-.02-1.06z" /></svg>
        </div>
      </summary>
      <div ref={contentRef} className="overflow-hidden">
        <div className="px-4 md:px-6 pb-4 md:pb-6 text-[var(--color-text-secondary)] text-sm border-t border-[var(--color-border)]">{faq.a}</div>
      </div>
    </details>
  )
}

/* ============ FINAL CTA ============ */
function FinalCTA() {
  const ctaRef = useRef<HTMLElement>(null)
  const { shouldAnimate } = useIsMobile()

  useEffect(() => {
    if (!shouldAnimate) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.cta-content > *', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.08, scrollTrigger: { trigger: ctaRef.current, start: 'top 85%' } })
    }, ctaRef)
    return () => ctx.revert()
  }, [shouldAnimate])

  useEffect(() => { if (shouldAnimate) return; const ctx = gsap.context(() => { gsap.fromTo('.cta-content > *', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power2.out' }) }, ctaRef); return () => ctx.revert() }, [shouldAnimate])

  return (
    <section ref={ctaRef} className="section relative overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80rem] h-[80rem] bg-gradient-to-r from-[var(--color-amber)]/5 via-transparent to-[var(--color-steel)]/5 rounded-full blur-3xl hidden lg:block" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%233D7A9E%22 fill-opacity=%220.03%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 36v-4H0v4H0v2h4v4h2v-4h4v-2H6zM6 6V0H0v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30 hidden lg:block" />
      </div>

      <div className="container-custom relative z-10 text-center px-4 md:px-6">
        <div className="cta-content max-w-3xl mx-auto py-8 md:py-12">
          <p className="text-[var(--color-amber)] text-xs uppercase tracking-[0.2em] font-medium mb-3">Ready to Stop Guessing?</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight text-balance mb-4">
            Ten Minutes.
            <br />
            <span className="text-[var(--color-amber)]">See It Work on Your Roofs.</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] text-base md:text-lg mb-8 max-w-2xl mx-auto">
            No pitch. Just a Loom walkthrough on commercial roofs like yours. If it&apos;s not useful, we part ways.
          </p>
          <a href="https://calendly.com/uptisement/30min" target="_blank" rel="noopener noreferrer" className="btn-primary group inline-flex items-center gap-2 px-6 md:px-8 py-4 text-base">
            <span className="relative z-10">Book 10-min Demo</span>
            <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            <span className="absolute inset-0 bg-[var(--color-amber-hover)] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 -z-10" />
          </a>
          <p className="mt-4 text-[var(--color-text-tertiary)] text-sm">Or reply YES to the DM this came from — I&apos;ll send the Loom + link today.</p>
        </div>
      </div>
    </section>
  )
}

/* ============ FOOTER ============ */
function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)] relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60rem] h-[60rem] bg-[var(--color-steel)]/3 rounded-full blur-3xl hidden lg:block" />
      </div>

      <div className="container-custom py-8 md:py-12 relative z-10 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-steel)] to-[var(--color-amber)] flex items-center justify-center"><svg className="w-6 h-6 text-[var(--color-bg)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg></div>
              <div><p className="font-display text-lg md:text-xl tracking-tight">Uptisement</p><p className="text-xs uppercase tracking-[0.18em] text-[var(--color-amber)] font-medium">AI Estimator</p></div>
            </div>
            <p className="text-[var(--color-text-secondary)] max-w-sm mb-6 leading-relaxed text-sm">AI consulting · AI automation · Web makeover for local SMBs & small agencies.</p>
            <div className="flex flex-wrap gap-3 md:gap-4 text-xs md:text-sm text-[var(--color-text-tertiary)]">
              <a href="https://uptisement.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-amber)] transition-colors flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>uptisement.com</a>
              <a href="mailto:sales@uptisement.com" className="hover:text-[var(--color-amber)] transition-colors flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>sales@uptisement.com</a>
              <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 2.257a1 1 0 00-.319.515l-1.45 4.35a1 1 0 01-.921.921l-4.35 1.45a1 1 0 01-.515.319l-2.257-2.257a1 1 0 00-1.21-.502l-4.493 1.498a1 1 0 01-.684-.948V7a2 2 0 012-2z" /></svg>(786) 982-0283</span>
            </div>
          </div>
          <div><h4 className="font-medium mb-3">Product</h4><ul className="space-y-2 text-[var(--color-text-secondary)] text-sm"><li><a href="#offer" className="hover:text-[var(--color-amber)] transition-colors flex items-center gap-2 group"><svg className="w-3.5 h-3.5 group-hover:text-[var(--color-amber)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="M9 5l7 7-7 7" /></svg>AI Estimator</a></li><li><a href="#how-it-works" className="hover:text-[var(--color-amber)] transition-colors flex items-center gap-2 group"><svg className="w-3.5 h-3.5 group-hover:text-[var(--color-amber)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="M9 5l7 7-7 7" /></svg>How It Works</a></li><li><a href="#proof" className="hover:text-[var(--color-amber)] transition-colors flex items-center gap-2 group"><svg className="w-3.5 h-3.5 group-hover:text-[var(--color-amber)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="M9 5l7 7-7 7" /></svg>Proof</a></li></ul></div>
          <div><h4 className="font-medium mb-3">Company</h4><ul className="space-y-2 text-[var(--color-text-secondary)] text-sm"><li><a href="https://calendly.com/uptisement/30min" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-amber)] transition-colors flex items-center gap-2 group"><svg className="w-3.5 h-3.5 group-hover:text-[var(--color-amber)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="M9 5l7 7-7 7" /></svg>Book a Call</a></li><li><a href="https://github.com/adil-044" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-amber)] transition-colors flex items-center gap-2 group"><svg className="w-3.5 h-3.5 group-hover:text-[var(--color-amber)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="M9 5l7 7-7 7" /></svg>GitHub</a></li></ul></div>
        </div>

        <div className="pt-6 border-t border-[var(--color-border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[var(--color-text-tertiary)] text-xs md:text-sm text-center md:text-left leading-relaxed"><p className="font-medium mb-1">—</p><p>Adil · Uptisement — websites for Ottawa trades</p><p>uptisement.com · sales@uptisement.com · (786) 982-0283</p><p>This page is about website work relevant to your published trade contact.</p><p>Reply UNSUBSCRIBE to opt out.</p></div>
          <div className="flex items-center gap-4 md:gap-6 text-[var(--color-text-tertiary)] text-sm"><a href="https://github.com/adil-044" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-amber)] transition-colors flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>GitHub</a><a href="https://uptisement.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-amber)] transition-colors flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>Website</a></div>
        </div>
      </div>
    </footer>
  )
}

/* ============ FLOATING MOBILE CTA ============ */
function MobileCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden z-40 bg-[var(--color-bg)] border-t border-[var(--color-border)] shadow-[0_-10px_30px_rgba(0,0,0,0.3)] animate-slide-up safe-area-bottom">
      <div className="container-custom py-3 px-4">
        <a href="https://calendly.com/uptisement/30min" target="_blank" rel="noopener noreferrer" className="btn-primary w-full justify-center py-3.5 text-base">Book 10-min Demo</a>
      </div>
    </div>
  )
}

/* ============ MAIN APP ============ */
function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Problem />
      <HowItWorks />
      <Proof />
      <Trust />
      <Offer />
      <FAQ />
      <FinalCTA />
      <Footer />
      <MobileCTA />
    </>
  )
}

export default App