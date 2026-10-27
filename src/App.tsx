function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Problem />
      <HowItWorks />
      <Proof />
      <Offer />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  )
}

export default App

/* ============ COMPONENTS ============ */

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-bg)]/95 backdrop-blur-sm border-b border-[var(--color-border)]">
      <div className="container-custom flex items-center justify-between h-16 md:h-20">
        <div className="flex items-center gap-2">
          <span className="font-display text-xl md:text-2xl tracking-tight">Uptisement</span>
          <span className="hidden md:inline-flex h-6 w-px bg-[var(--color-border)]" />
          <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-amber)] font-medium">AI Estimator</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <a href="#problem" className="text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors text-sm">Problem</a>
          <a href="#how-it-works" className="text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors text-sm">How It Works</a>
          <a href="#proof" className="text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors text-sm">Proof</a>
          <a href="#offer" className="text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors text-sm">Pricing</a>
        </div>
        <a href="https://calendly.com/uptisement/30min" target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">
          Book 10-min Demo
        </a>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="section pt-28 md:pt-36 pb-20 relative overflow-hidden">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[var(--color-amber)] text-xs uppercase tracking-[0.2em] font-medium mb-6">Photo-to-Quote for Roofing Companies</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight text-balance mb-6">
            Written Roof Ballpark
            <br />
            <span className="text-[var(--color-amber)]">Same Day Photos Exist</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-10 text-balance leading-relaxed">
            Your crew, sales, or drone photos → repair / recoat / replace ballpark in minutes.
            First written price usually wins. Don't let leads go cold waiting on the office.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a href="https://calendly.com/uptisement/30min" target="_blank" rel="noopener noreferrer" className="btn-primary w-full sm:w-auto">
              Book 10-min Demo
            </a>
            <a href="#how-it-works" className="btn-secondary w-full sm:w-auto">
              See How It Works
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--color-text-tertiary)]">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[var(--color-amber)]">$500</span> setup
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[var(--color-steel)]">$50</span>/estimate
            </div>
            <div className="flex items-center gap-2">
              or <span className="font-mono text-[var(--color-steel)]">5–10%</span> of jobs closed
            </div>
            <div className="flex items-center gap-2 badge-amber">
              30-day bottleneck refund
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-[var(--color-steel)]/5 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-[var(--color-amber)]/3 rounded-full blur-3xl" />
      </div>
    </section>
  )
}

function Problem() {
  const pains = [
    { icon: "⏳", title: "Leads Go Cold", desc: "Customer sends photos Friday. Your estimator writes the number Thursday. By then, they've already signed with whoever replied first." },
    { icon: "📋", title: "Office Backlog", desc: "Estimators climb roofs all day. Quotes sit in a queue. Owner becomes the bottleneck. Revenue stalls on the desk." },
    { icon: "💸", title: "Lost Jobs = Lost Money", desc: "Commercial roof replacement = $15k–$150k. One slow quote per month = $180k–$1.8M/year left on the table." },
    { icon: "📱", title: "Photos Already Exist", desc: "Customer, GC, adjuster, drone — someone already has the shots. You're not waiting for photos. You're waiting for typing." },
  ]
  return (
    <section id="problem" className="section bg-[var(--color-surface)]">
      <div className="container-custom">
        <header className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-[var(--color-steel)] text-xs uppercase tracking-[0.2em] font-medium mb-4">The Bottleneck</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-tight text-balance mb-4">
            Speed to Quote <span className="text-[var(--color-amber)]">Is the Close Rate</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg">
            You're not paying to skip the site visit. You're paying so the written number leaves the same day the photos exist — not Thursday.
          </p>
        </header>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pains.map((pain, i) => (
            <article key={i} className="card group">
              <div className="text-4xl mb-4">{pain.icon}</div>
              <h3 className="font-display text-xl mb-2 group-hover:text-[var(--color-amber)] transition-colors">{pain.title}</h3>
              <p className="text-[var(--color-text-secondary)]">{pain.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    { num: "01", title: "Photos In", desc: "Crew, sales, drone, customer, GC, or adjuster upload 1–3 photos. Wide field, seams/edges, damage close-up." },
    { num: "02", title: "Vision Analysis", desc: "OpenRouter free-model chain reads roof type, slope, damage, ponding, flashing, membrane condition." },
    { num: "03", title: "Instant Ballpark", desc: "Repair $3–8 • Recoat $4–12 • Replace $8–20 /sqft. Written estimate generated in minutes, not days." },
    { num: "04", title: "Prospect Notified", desc: "Email + owner CC with ballpark, next steps, and booking link. You only drive for jobs that look real." },
  ]
  return (
    <section id="how-it-works" className="section">
      <div className="container-custom">
        <header className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-[var(--color-steel)] text-xs uppercase tracking-[0.2em] font-medium mb-4">Process</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-tight text-balance mb-4">
            Photos → Ballpark → Booked
            <br />
            <span className="text-[var(--color-amber)]">In Minutes</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg">
            Done for you. No CRM replacement. No new software for your team to learn.
          </p>
        </header>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <article key={i} className="card relative">
              <div className="absolute -top-3 left-6 font-mono text-3xl font-bold text-[var(--color-amber)]/30">{step.num}</div>
              <div className="pt-8">
                <h3 className="font-display text-xl mb-3">{step.title}</h3>
                <p className="text-[var(--color-text-secondary)]">{step.desc}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-16 text-center">
          <p className="text-[var(--color-text-tertiary)] mb-4">Works with your existing flow</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-[var(--color-text-tertiary)]">
            <span className="badge-steel">JobNimbus</span>
            <span className="badge-steel">AccuLynx</span>
            <span className="badge-steel">RoofSnap</span>
            <span className="badge-steel">CompanyCam</span>
            <span className="badge-steel">Email/Photos</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function Proof() {
  const scenarios = [
    { label: "Storm Lead", photos: "Customer texts 3 pcs hail damage", before: "3 days to quote", after: "18 minutes", outcome: "Signed same week" },
    { label: "Commercial GC", photos: "GC emails roof plan + photos", before: "5 days (estimator busy)", after: "42 minutes", outcome: "Beat 2 competitors to number" },
    { label: "Repair Triage", photos: "Sales rep shoots leak on site", before: "Back at office tomorrow", after: "Before leaving site", outcome: "Crew dispatched same day" },
  ]
  return (
    <section id="proof" className="section bg-[var(--color-surface)]">
      <div className="container-custom">
        <header className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-[var(--color-steel)] text-xs uppercase tracking-[0.2em] font-medium mb-4">Proof</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-tight text-balance mb-4">
            Real Scenarios.
            <br />
            <span className="text-[var(--color-amber)]">Real Time Saved.</span>
          </h2>
        </header>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {scenarios.map((s, i) => (
            <article key={i} className="card-elevated">
              <span className="badge-steel mb-4">{s.label}</span>
              <p className="text-[var(--color-text-secondary)] text-sm mb-4">Photos: {s.photos}</p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-[var(--color-bg)] p-4 rounded-[var(--radius-base)] border border-[var(--color-border)]">
                  <p className="text-[var(--color-text-tertiary)] text-xs uppercase tracking-wide mb-1">Before</p>
                  <p className="font-mono text-lg text-[var(--color-danger)]">{s.before}</p>
                </div>
                <div className="bg-[var(--color-bg)] p-4 rounded-[var(--radius-base)] border border-[var(--color-border)]">
                  <p className="text-[var(--color-text-tertiary)] text-xs uppercase tracking-wide mb-1">After</p>
                  <p className="font-mono text-lg text-[var(--color-success)]">{s.after}</p>
                </div>
              </div>
              <div className="pt-4 border-t border-[var(--color-border)]">
                <p className="text-[var(--color-success)] font-medium">→ {s.outcome}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-12 text-center">
          <a href="https://calendly.com/uptisement/30min" target="_blank" rel="noopener noreferrer" className="btn-primary">
            See Live Demo on Roofs Like Yours
          </a>
        </div>
      </div>
    </section>
  )
}

function Offer() {
  const tiers = [
    {
      name: "Performance",
      price: "$500 setup",
      per: "+ $50/estimate",
      alt: "or 5–10% of jobs closed",
      features: [
        "Full photo-to-quote setup",
        "Repair / Recoat / Replace bands",
        "Email + owner CC on every estimate",
        "Booking link in every delivery",
        "30-day bottleneck refund guarantee",
      ],
      cta: "Start Performance",
      popular: false,
    },
    {
      name: "Retainer",
      price: "$1,500–3,000",
      per: "build + $300–500/mo",
      alt: "Early proof pricing",
      features: [
        "Everything in Performance",
        "Priority processing queue",
        "Custom price bands per material",
        "Monthly ROI report",
        "Direct Slack/email support",
      ],
      cta: "Start Retainer",
      popular: true,
    },
    {
      name: "Full",
      price: "$3,000–5,000",
      per: "build + $500–1k/mo",
      alt: "Case study pricing",
      features: [
        "Everything in Retainer",
        "White-label client portal",
        "API access for CRM sync",
        "Dedicated success manager",
        "Quarterly business review",
      ],
      cta: "Contact for Full",
      popular: false,
    },
  ]
  return (
    <section id="offer" className="section">
      <div className="container-custom">
        <header className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-[var(--color-steel)] text-xs uppercase tracking-[0.2em] font-medium mb-4">Pricing</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-tight text-balance mb-4">
            Pay When It Works.
            <br />
            <span className="text-[var(--color-amber)]">Refund If It Doesn't.</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg">
            Max 2 pricing mechanisms in one pitch. Raise price after 1–3 case studies.
          </p>
        </header>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((tier, i) => (
            <article key={i} className={`card relative ${tier.popular ? 'border-[var(--color-amber)] shadow-[0_0_0_1px_var(--color-amber)]' : ''}`}>
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 badge-amber text-xs">Most Chosen</div>
              )}
              <header className="mb-6">
                <h3 className="font-display text-xl mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-mono text-3xl font-bold">{tier.price}</span>
                  <span className="text-[var(--color-text-secondary)]">{tier.per}</span>
                </div>
                <p className="text-[var(--color-text-tertiary)] text-sm">{tier.alt}</p>
              </header>
              <ul className="space-y-3 mb-8">
                {tier.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3 text-[var(--color-text-secondary)]">
                    <svg className="w-5 h-5 text-[var(--color-success)] flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="https://calendly.com/uptisement/30min" target="_blank" rel="noopener noreferrer" className={tier.popular ? 'btn-primary' : 'btn-secondary'} style={{width: '100%'}}>
                {tier.cta}
              </a>
            </article>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-[var(--color-text-tertiary)] max-w-2xl mx-auto">
            <strong className="text-[var(--color-text)]">Rule:</strong> Their customer LTV ≥ $15k or skip. Roof replacement clears this.
          </p>
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const faqs = [
    { q: "Do customers have to climb the roof?", a: "Never. Your crew, sales already on site, drone, or ground/damage shots only. The tool just turns those photos into a written ballpark same day." },
    { q: "If we still go on site, what's the point?", a: "You're not paying to skip the site. You're paying so the written number leaves the same day photos exist — not Thursday. First price usually wins." },
    { q: "Does this replace our CRM (JobNimbus, AccuLynx)?", a: "No. We sit in front of it: photos → written ballpark faster. Your CRM stays the system of record." },
    { q: "What if it doesn't work for us?", a: "Use it 30 days. If it doesn't replace the estimating bottleneck, the $500 setup is refunded. You only pay for estimates that go out or jobs that close." },
    { q: "How accurate are the price bands?", a: "Repair $3–8, Recoat $4–12, Replace $8–20 /sqft. These are ballparks to start the conversation. Your estimator refines on site visit." },
    { q: "What photos do we need?", a: "Wide field (full roof), seams/edges close-up, damage/ponding close-up. 1–3 photos. Drone or ground shots both work." },
  ]
  return (
    <section className="section bg-[var(--color-surface)]">
      <div className="container-custom">
        <header className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-[var(--color-steel)] text-xs uppercase tracking-[0.2em] font-medium mb-4">Questions</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-tight text-balance mb-4">
            Honest Answers.
            <br />
            <span className="text-[var(--color-amber)]">No Fluff.</span>
          </h2>
        </header>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="card group">
              <summary className="flex items-center justify-between cursor-pointer list-none font-display text-lg">
                {faq.q}
                <svg className="w-5 h-5 text-[var(--color-text-tertiary)] group-open:rotate-180 transition-transform" viewBox="0 0 20 20" fill="currentColor"><path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01-.02-1.06z" /></svg>
              </summary>
              <div className="pt-4 border-t border-[var(--color-border)] text-[var(--color-text-secondary)]">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="section relative overflow-hidden">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-[var(--color-amber)]/5 rounded-full blur-3xl" />
      </div>
      <div className="container-custom text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-[var(--color-amber)] text-xs uppercase tracking-[0.2em] font-medium mb-4">Ready to Stop Guessing?</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-tight text-balance mb-6">
            Ten Minutes.
            <br />
            <span className="text-[var(--color-amber)]">See It Work on Your Roofs.</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg mb-10">
            No pitch. Just a Loom walkthrough on commercial roofs like yours. If it's not useful, we part ways.
          </p>
          <a href="https://calendly.com/uptisement/30min" target="_blank" rel="noopener noreferrer" className="btn-primary text-lg px-8 py-4">
            Book 10-min Demo
          </a>
          <p className="mt-6 text-[var(--color-text-tertiary)] text-sm">
            Or reply YES to the DM this came from — I'll send the Loom + link today.
          </p>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="container-custom py-12 md:py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <p className="font-display text-xl tracking-tight mb-4">Uptisement</p>
            <p className="text-[var(--color-text-secondary)] max-w-sm mb-6">
              AI consulting · AI automation · Web makeover for local SMBs & small agencies.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-[var(--color-text-tertiary)]">
              <a href="https://uptisement.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-amber)] transition-colors">uptisement.com</a>
              <a href="mailto:sales@uptisement.com" className="hover:text-[var(--color-amber)] transition-colors">sales@uptisement.com</a>
              <span>(786) 982-0283</span>
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-4">Product</h4>
            <ul className="space-y-2 text-[var(--color-text-secondary)] text-sm">
              <li><a href="#offer" className="hover:text-[var(--color-amber)] transition-colors">AI Estimator</a></li>
              <li><a href="#how-it-works" className="hover:text-[var(--color-amber)] transition-colors">How It Works</a></li>
              <li><a href="#proof" className="hover:text-[var(--color-amber)] transition-colors">Proof</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-2 text-[var(--color-text-secondary)] text-sm">
              <li><a href="https://calendly.com/uptisement/30min" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-amber)] transition-colors">Book a Call</a></li>
              <li><a href="https://github.com/adil-044" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-amber)] transition-colors">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[var(--color-text-tertiary)] text-sm">
            —
            <br />
            Adil · Uptisement — websites for Ottawa trades
            <br />
            uptisement.com · sales@uptisement.com · (786) 982-0283
            <br />
            This page is about website work relevant to your published trade contact.
            <br />
            Reply UNSUBSCRIBE to opt out.
          </p>
          <div className="flex items-center gap-6 text-[var(--color-text-tertiary)] text-sm">
            <a href="https://github.com/adil-044" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-amber)] transition-colors">GitHub</a>
            <a href="https://uptisement.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-amber)] transition-colors">Website</a>
          </div>
        </div>
      </div>
    </footer>
  )
}