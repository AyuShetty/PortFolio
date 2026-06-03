/* ============================================
   IMPLEMENTATION GUIDE: Component Examples
   Tech Section vs. Creative Section
   ============================================ */

// ============================================
// EXAMPLE 1: TECH SECTION WRAPPER
// ============================================

/**
 * Use this for: Projects, Experience, Skills, Technical content
 * Characteristics: Dark background, structured grid, sharp accents
 */

export function TechSectionExample() {
  return (
    <section className="section-tech">
      <div className="portfolio-layout">
        <div className="content-section" data-visible="true">
          
          {/* HEADER */}
          <h2 className="section-title text-tech-primary">Featured Projects</h2>
          <p className="section-intro text-tech-secondary">
            Shipped products across governance analytics, AI education, and community platforms.
          </p>

          {/* GRID OF TECH CARDS */}
          <div className="project-grid">
            
            {/* TECH CARD 1 */}
            <div className="card-tech">
              <div className="flex justify-between items-baseline mb-3">
                <h3 className="text-tech-primary font-bold uppercase text-lg">Governance Platform</h3>
                <span className="text-xs text-tech-muted">2024</span>
              </div>
              
              <p className="text-tech-secondary mb-3">
                Real-time voting analytics and proposal tracking for Ethereum DAO governance.
              </p>
              
              {/* TECH TAGS */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 text-xs font-mono bg-olive-dark bg-opacity-40 border border-tech-subtle rounded-full text-tech-secondary">
                  Web3
                </span>
                <span className="px-3 py-1 text-xs font-mono bg-olive-dark bg-opacity-40 border border-tech-subtle rounded-full text-tech-secondary">
                  React
                </span>
                <span className="px-3 py-1 text-xs font-mono bg-olive-dark bg-opacity-40 border border-tech-subtle rounded-full text-tech-secondary">
                  API
                </span>
              </div>
              
              {/* LINKS */}
              <div className="flex gap-4">
                <a href="#" className="text-tech-secondary hover:text-neon-yellow transition-colors text-sm font-semibold uppercase">
                  View Live →
                </a>
                <a href="#" className="text-tech-secondary hover:text-neon-yellow transition-colors text-sm font-semibold uppercase">
                  GitHub →
                </a>
              </div>
            </div>
            
            {/* TECH CARD 2 */}
            <div className="card-tech">
              <div className="flex justify-between items-baseline mb-3">
                <h3 className="text-tech-primary font-bold uppercase text-lg">AI Learning Suite</h3>
                <span className="text-xs text-tech-muted">2023</span>
              </div>
              
              <p className="text-tech-secondary mb-3">
                Adaptive learning platform with ML-driven personalization for technical education.
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 text-xs font-mono bg-olive-dark bg-opacity-40 border border-tech-subtle rounded-full text-tech-secondary">
                  ML/AI
                </span>
                <span className="px-3 py-1 text-xs font-mono bg-olive-dark bg-opacity-40 border border-tech-subtle rounded-full text-tech-secondary">
                  Python
                </span>
                <span className="px-3 py-1 text-xs font-mono bg-olive-dark bg-opacity-40 border border-tech-subtle rounded-full text-tech-secondary">
                  TypeScript
                </span>
              </div>
              
              <div className="flex gap-4">
                <a href="#" className="text-tech-secondary hover:text-neon-yellow transition-colors text-sm font-semibold uppercase">
                  Case Study →
                </a>
                <a href="#" className="text-tech-secondary hover:text-neon-yellow transition-colors text-sm font-semibold uppercase">
                  GitHub →
                </a>
              </div>
            </div>
            
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-4 justify-center mt-8">
            <button className="btn-primary">
              View All Projects
            </button>
            <button className="btn-secondary">
              View Repository
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

// ============================================
// EXAMPLE 2: CREATIVE SECTION WRAPPER
// ============================================

/**
 * Use this for: About, Highlights, Awards, Lifestyle content
 * Characteristics: Light background, editorial feel, elegant spacing
 */

export function CreativeSectionExample() {
  return (
    <section className="section-creative">
      <div className="portfolio-layout">
        <div className="content-section" data-visible="true">
          
          {/* HEADER */}
          <h2 className="section-title text-creative-primary">Highlights & Recognition</h2>
          <p className="section-intro text-creative-secondary">
            Awards, speaking engagements, and published work across Web3, AI, and product engineering.
          </p>

          {/* GRID OF CREATIVE CARDS */}
          <div className="highlight-grid">
            
            {/* CREATIVE CARD 1 */}
            <div className="card-creative">
              <div className="mb-4 pb-4 border-b border-creative-subtle">
                <h3 className="text-creative-primary font-bold text-xl mb-1">Best Product Innovation</h3>
                <p className="text-xs text-creative-muted">2024 | Web3 Summit</p>
              </div>
              
              <p className="text-creative-secondary leading-relaxed mb-4">
                Recognized for groundbreaking work in governance tooling and community infrastructure.
              </p>
              
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-xs bg-cream-slate bg-opacity-20 border border-creative-subtle rounded-full text-creative-secondary">
                  Engineering
                </span>
                <span className="px-3 py-1 text-xs bg-cream-slate bg-opacity-20 border border-creative-subtle rounded-full text-creative-secondary">
                  Leadership
                </span>
              </div>
            </div>
            
            {/* CREATIVE CARD 2 */}
            <div className="card-creative">
              <div className="mb-4 pb-4 border-b border-creative-subtle">
                <h3 className="text-creative-primary font-bold text-xl mb-1">Featured Speaker</h3>
                <p className="text-xs text-creative-muted">2024 | Consensus</p>
              </div>
              
              <p className="text-creative-secondary leading-relaxed mb-4">
                Presented "Scaling AI Governance" to 1000+ attendees in Austin.
              </p>
              
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-xs bg-cream-slate bg-opacity-20 border border-creative-subtle rounded-full text-creative-secondary">
                  Speaking
                </span>
                <span className="px-3 py-1 text-xs bg-cream-slate bg-opacity-20 border border-creative-subtle rounded-full text-creative-secondary">
                  AI/Governance
                </span>
              </div>
            </div>
            
            {/* CREATIVE CARD 3 */}
            <div className="card-creative">
              <div className="mb-4 pb-4 border-b border-creative-subtle">
                <h3 className="text-creative-primary font-bold text-xl mb-1">Top Creator</h3>
                <p className="text-xs text-creative-muted">2023–2024 | Twitter X</p>
              </div>
              
              <p className="text-creative-secondary leading-relaxed mb-4">
                20K+ followers, 5M+ impressions. Insights on product, AI, and Web3 adoption.
              </p>
              
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-xs bg-cream-slate bg-opacity-20 border border-creative-subtle rounded-full text-creative-secondary">
                  Content
                </span>
                <span className="px-3 py-1 text-xs bg-cream-slate bg-opacity-20 border border-creative-subtle rounded-full text-creative-secondary">
                  Thought Leadership
                </span>
              </div>
            </div>
            
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-4 justify-center mt-8">
            <button className="btn-primary">
              View Full Profile
            </button>
            <button className="btn-tertiary">
              Download Press Kit
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

// ============================================
// EXAMPLE 3: TRANSITION ZONE (Mixed Dual-Mode)
// ============================================

/**
 * For sections that blend tech + creative, or hero sections
 * Use strategically to avoid visual whiplash
 */

export function HeroSectionExample() {
  return (
    <section className="section-tech">
      <div className="hero">
        {/* DARK HERO WITH TECH VIBE */}
        <div className="hero-content">
          <div className="hero-copy">
            <h1 className="hero-title text-tech-primary">
              Ayush Shetty
            </h1>
            <p className="hero-subtitle text-tech-secondary">
              Product engineer focused on Web3, AI, and Ethereum governance tooling.
            </p>
            
            {/* HERO ACTIONS – Mix primary + accent sparingly */}
            <div className="flex gap-4 justify-center mt-8">
              <button className="btn-primary">
                Explore Projects
              </button>
              <button className="btn-secondary">
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// EXAMPLE 4: FORM INPUT DUAL-MODE
// ============================================

/**
 * Contact forms adapt to section context
 */

export function ContactFormExample() {
  return (
    <section className="section-tech">
      <div className="portfolio-layout">
        <div className="content-section">
          <h2 className="section-title text-tech-primary">Get In Touch</h2>
          <p className="section-intro text-tech-secondary">
            Let's build something amazing together.
          </p>
          
          <form className="max-w-md mx-auto space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="form-input-tech"
              />
              <input
                type="email"
                placeholder="Email"
                className="form-input-tech"
              />
            </div>
            
            <textarea
              placeholder="Tell me about your project..."
              className="form-input-tech w-full"
              rows={5}
            />
            
            <div className="flex justify-center">
              <button type="submit" className="btn-primary">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

// ============================================
// EXAMPLE 5: CREATIVE FORM (Light Background)
// ============================================

export function CreativeFormExample() {
  return (
    <section className="section-creative">
      <div className="portfolio-layout">
        <div className="content-section">
          <h2 className="section-title text-creative-primary">Newsletter</h2>
          <p className="section-intro text-creative-secondary">
            Subscribe for insights on product engineering, AI, and Web3.
          </p>
          
          <form className="max-w-md mx-auto space-y-4">
            <input
              type="email"
              placeholder="your@email.com"
              className="form-input-creative w-full"
            />
            
            <div className="flex justify-center">
              <button type="submit" className="btn-primary">
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

// ============================================
// EXAMPLE 6: NEON ACCENT – PROPER USE (RARE!)
// ============================================

/**
 * Use neon ONLY for:
 * 1. Active navigation states
 * 2. Hover states on micro-interactions
 * 3. Critical alerts/success states
 * 4. Loading indicators
 * 
 * DO NOT use for:
 * - Generic card backgrounds
 * - Paragraph text
 * - Border outlines on passive elements
 */

export function NeonAccentProperUse() {
  return (
    <section className="section-tech">
      <div className="portfolio-layout">
        
        {/* EXAMPLE 1: Active Nav Link (Neon on Hover) */}
        <nav className="primary-nav">
          <a href="/" data-active="true" className="text-neon-yellow border-neon-yellow">
            Home
          </a>
          <a href="/projects" className="text-tech-secondary border-tech-subtle hover:text-neon-yellow hover:border-neon-yellow">
            Projects
          </a>
        </nav>

        {/* EXAMPLE 2: Success Message (Neon Accent) */}
        <div className="text-center py-4 px-6 bg-olive-dark bg-opacity-30 border border-tech-active rounded-lg">
          <p className="text-tech-secondary">
            Form submitted successfully! 
            <span className="text-neon-yellow font-bold ml-2">✓</span>
          </p>
        </div>

        {/* EXAMPLE 3: Loading Indicator (Subtle Neon) */}
        <div className="inline-flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-neon-yellow animate-pulse"></div>
          <span className="text-tech-secondary text-sm">Loading...</span>
        </div>

        {/* EXAMPLE 4: Card Hover Accent (Top Corner) */}
        <div className="card-tech relative group">
          <div className="absolute top-0 left-0 w-0 group-hover:w-12 h-1 bg-neon-yellow transition-all duration-200"></div>
          <h3 className="text-tech-primary mb-2">Hover to reveal accent</h3>
          <p className="text-tech-secondary">Notice the neon line appears only on hover.</p>
        </div>

      </div>
    </section>
  );
}

// ============================================
// BUTTON USAGE REFERENCE
// ============================================

/**
 * .btn-primary  → Use everywhere, especially in hero
 * .btn-secondary → Tech sections, secondary actions
 * .btn-tertiary → Creative sections, soft calls
 * .btn-accent → Ultra-rare, hero only, 0–1 per page
 */

export function ButtonUsageGuide() {
  return (
    <div className="space-y-8">
      
      {/* PRIMARY BUTTONS (Use Freely) */}
      <div>
        <p className="text-tech-primary mb-4 font-bold uppercase">Primary Buttons (Everywhere)</p>
        <div className="flex gap-4">
          <button className="btn-primary">Explore</button>
          <button className="btn-primary">Learn More</button>
          <button className="btn-primary">Get Started</button>
        </div>
      </div>

      {/* SECONDARY BUTTONS (Tech Sections) */}
      <div>
        <p className="text-tech-primary mb-4 font-bold uppercase">Secondary Buttons (Tech Sections)</p>
        <div className="flex gap-4">
          <button className="btn-secondary">View Code</button>
          <button className="btn-secondary">GitHub</button>
        </div>
      </div>

      {/* TERTIARY BUTTONS (Creative Sections) */}
      <div>
        <p className="text-tech-primary mb-4 font-bold uppercase">Tertiary Buttons (Creative Sections)</p>
        <div className="flex gap-4 section-creative">
          <button className="btn-tertiary">Download</button>
          <button className="btn-tertiary">Subscribe</button>
        </div>
      </div>

      {/* ACCENT BUTTONS (RARE!) */}
      <div>
        <p className="text-tech-primary mb-4 font-bold uppercase">Accent Buttons (Hero/Alert Only – Max 1 per page)</p>
        <button className="btn-accent">Launch App</button>
        <p className="text-xs text-tech-muted mt-2">⚠️ Use sparingly!</p>
      </div>

    </div>
  );
}

// ============================================
// QUICK MIGRATION CHECKLIST
// ============================================

/*
CHECKLIST: Migrating from Old to New Color System

[ ] Replace `.action-button` with `.btn-primary`
[ ] Replace `.card` with `.card-tech` or `.card-creative` 
[ ] Wrap sections in `<section className="section-tech">` or `<section className="section-creative">`
[ ] Remove all neon text-shadows and glow effects
[ ] Replace generic "neon border" with `border-tech-subtle` or `border-creative-subtle`
[ ] Update all form inputs to `.form-input-tech` or `.form-input-creative`
[ ] Audit all text colors: use `.text-tech-primary`, `.text-tech-secondary`, etc.
[ ] Check neon usage: should see <3 instances of `#D2FF00` per scroll
[ ] Test focus states: inputs should show `.focus:ring-neon-yellow`
[ ] Verify contrast ratio on all text (aim for 11:1+ WCAG AAA)
[ ] Deploy and gather feedback from design partner

*/
