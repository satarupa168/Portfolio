import { useRef } from 'react';
import { useScrollBehavior, useSilkCanvas } from './hooks/usePortfolio';
import './portfolio.css';

export default function App() {
  const silkCanvasRef = useRef<HTMLCanvasElement>(null);
  useScrollBehavior();
  useSilkCanvas(silkCanvasRef);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="scroll-progress" aria-hidden="true"></div>

      <header className="site-header" data-header>
        <nav className="nav-shell" aria-label="Primary navigation">
          <a className="brand" href="#home" aria-label="Satarupa Bhowmik home">S.B</a>
          <button
            className="nav-toggle"
            type="button"
            aria-label="Toggle menu"
            aria-expanded="false"
            data-menu-button
          >
            <span></span>
            <span></span>
          </button>
          <div className="nav-links" data-menu>
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#education">Education</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>
      </header>

      {/* ── HERO ── */}
      <section className="hero" id="home" aria-labelledby="hero-title">
        {/* Silk background canvas */}
        <canvas ref={silkCanvasRef} className="silk-bg" aria-hidden="true" />
        {/* Original grid overlay */}
        <div className="hero-grid" aria-hidden="true"></div>

        <div className="hero-content">
          <p className="eyebrow reveal-on-load">Portfolio</p>
          <h1 id="hero-title" className="hero-title" aria-label="Satarupa Bhowmik">
            <span className="hero-name" data-hero-name>Satarupa Bhowmik</span>
          </h1>
          <p className="hero-tagline reveal-on-load">
            B.Tech CSE Student | AIML Enthusiast | Full-Stack Developer
          </p>
          <div className="hero-actions reveal-on-load">
            <a className="button button-primary" href="#projects">Explore Work</a>
            <a className="button button-secondary" href="#contact">Contact Me</a>
          </div>
        </div>
        <a className="scroll-indicator" href="#about" aria-label="Scroll to about section">
          <span></span>
          Explore
        </a>
      </section>

      <main id="main">
        {/* ── ABOUT ── */}
        <section className="section about-section" id="about">
          <div className="section-inner about-layout">
            <div className="section-copy" data-reveal>
              <p className="section-kicker">About</p>
              <h2>Building practical systems with clean thinking.</h2>
              <p>
                I am a B.Tech Computer Science student with a strong interest in
                artificial intelligence, machine learning, full-stack development,
                and solving real problems through technology.
              </p>
              <p>
                My work combines DSA fundamentals, software development practice,
                and a curiosity for products that can improve everyday decisions,
                workflows, and user experiences.
              </p>
            </div>

            <div className="profile-visual" data-reveal>
              <img
                src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1000&q=80"
                alt="Developer workspace with code on a laptop"
                loading="lazy"
                decoding="async"
              />
              <div className="profile-metrics" aria-label="Profile highlights">
                <div>
                  <strong>DSA</strong>
                  <span>Core foundation</span>
                </div>
                <div>
                  <strong>AIML</strong>
                  <span>Applied learning</span>
                </div>
                <div>
                  <strong>Full Stack</strong>
                  <span>Product mindset</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section className="section skills-section" id="skills">
          <div className="section-inner">
            <div className="section-heading" data-reveal>
              <p className="section-kicker">Skills</p>
              <h2>Technical range with problem-solving depth.</h2>
            </div>

            <div className="skills-layout">
              <div className="skill-column" data-stagger>
                <h3>Technical Skills</h3>
                <article className="skill-card" data-reveal style={{ '--level': '88%' } as React.CSSProperties}>
                  <div><span>Python</span><strong>88%</strong></div>
                  <div className="skill-meter"><span></span></div>
                </article>
                <article className="skill-card" data-reveal style={{ '--level': '84%' } as React.CSSProperties}>
                  <div><span>C++</span><strong>84%</strong></div>
                  <div className="skill-meter"><span></span></div>
                </article>
                <article className="skill-card" data-reveal style={{ '--level': '78%' } as React.CSSProperties}>
                  <div><span>Java</span><strong>78%</strong></div>
                  <div className="skill-meter"><span></span></div>
                </article>
                <article className="skill-card" data-reveal style={{ '--level': '80%' } as React.CSSProperties}>
                  <div><span>SQL</span><strong>80%</strong></div>
                  <div className="skill-meter"><span></span></div>
                </article>
              </div>

              <div className="skill-column" data-stagger>
                <h3>Professional Skills</h3>
                <div className="tag-grid">
                  <span data-reveal>Communication</span>
                  <span data-reveal>Problem Solving</span>
                  <span data-reveal>Teamwork</span>
                  <span data-reveal>Innovation</span>
                  <span data-reveal>Decision Making</span>
                </div>
              </div>

              <div className="skill-column" data-stagger>
                <h3>Domain Knowledge</h3>
                <div className="domain-list">
                  <article data-reveal><span>01</span><p>Data Analytics</p></article>
                  <article data-reveal><span>02</span><p>Machine Learning</p></article>
                  <article data-reveal><span>03</span><p>Software Development</p></article>
                  <article data-reveal><span>04</span><p>Algorithms &amp; Data Structures</p></article>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section className="section projects-section" id="projects">
          <div className="section-inner">
            <div className="section-heading split-heading" data-reveal>
              <div>
                <p className="section-kicker">Projects</p>
                <h2>Focused builds with real-world intent.</h2>
              </div>
              <p>
                Practical systems shaped around location intelligence, operations,
                role-based workflows, and clear user journeys.
              </p>
            </div>

            <div className="project-grid">
              <article className="project-card" data-reveal data-tilt>
                <div className="project-image">
                  <img
                    src="https://images.unsplash.com/photo-1494522855154-9297ac14b55f?auto=format&fit=crop&w=1000&q=80"
                    alt="City traffic seen from above"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="project-body">
                  <p className="project-label">Project 01</p>
                  <h3>Smart Traffic Management System</h3>
                  <p>
                    Location-based parking system with real-time data fetching and
                    a dynamic UI for smoother traffic and parking decisions.
                  </p>
                  <div className="badge-row" aria-label="Technology stack">
                    <span>Python</span>
                    <span>Flask</span>
                    <span>Google Maps API</span>
                  </div>
                  <a href="#contact" className="project-link">View Details</a>
                </div>
              </article>

              <article className="project-card" data-reveal data-tilt>
                <div className="project-image">
                  <img
                    src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80"
                    alt="Restaurant counter with food service activity"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="project-body">
                  <p className="project-label">Project 02</p>
                  <h3>Altplate - Food Court Management System</h3>
                  <p>
                    Role-based system for food selection, approvals, and tracking
                    across a more organized food court workflow.
                  </p>
                  <div className="badge-row" aria-label="Technology stack">
                    <span>Full Stack</span>
                    <span>Web Development</span>
                    <span>Role Based</span>
                  </div>
                  <a href="#contact" className="project-link">View Details</a>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ── EDUCATION ── */}
        <section className="section education-section" id="education">
          <div className="section-inner education-layout">
            <div className="section-copy" data-reveal>
              <p className="section-kicker">Education</p>
              <h2>Computer science foundation with consistent growth.</h2>
            </div>

            <article className="timeline-card" data-reveal>
              <div className="timeline-dot" aria-hidden="true"></div>
              <p className="timeline-duration">2022 - 2026</p>
              <h3>B.Tech in Computer Science and Engineering</h3>
              <p>Your University</p>
              <div className="sgpa-pill">
                <span>SGPA</span>
                <strong>8.04</strong>
              </div>
            </article>
          </div>
        </section>

        {/* ── CERTIFICATIONS ── */}
        <section className="section certifications-section" id="certifications">
          <div className="section-inner">
            <div className="section-heading" data-reveal>
              <p className="section-kicker">Certifications</p>
              <h2>Verified learning across programming, security, and cloud.</h2>
            </div>

            <div className="cert-grid" data-stagger>
              <article className="cert-card" data-reveal>
                <span>HR</span>
                <h3>HackerRank</h3>
                <p>5-Star in C</p>
              </article>
              <article className="cert-card" data-reveal>
                <span>C</span>
                <h3>C for Beginners</h3>
                <p>Programming fundamentals</p>
              </article>
              <article className="cert-card" data-reveal>
                <span>OS</span>
                <h3>Offensive Security Introduction</h3>
                <p>Security basics</p>
              </article>
              <article className="cert-card" data-reveal>
                <span>AWS</span>
                <h3>AWS Data Engineering</h3>
                <p>Cloud data workflows</p>
              </article>
              <article className="cert-card" data-reveal>
                <span>AWS</span>
                <h3>AWS Machine Learning</h3>
                <p>Cloud ML foundations</p>
              </article>
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section className="section contact-section" id="contact">
          <div className="section-inner contact-layout">
            <div className="contact-copy" data-reveal>
              <p className="section-kicker">Contact</p>
              <h2>Let's build something useful.</h2>
              <p>
                Open to internships, collaborative projects, and opportunities
                involving AI, software development, and data-driven products.
              </p>

              <div className="contact-list" aria-label="Contact details">
                <a href="tel:+919863710718">
                  <span>Phone</span>
                  +91 9863710718
                </a>
                <a href="mailto:satarupabhowmik0511@gmail.com">
                  <span>Email</span>
                  satarupabhowmik0511@gmail.com
                </a>
                <div>
                  <span>Location</span>
                  India
                </div>
              </div>

              <div className="social-row" aria-label="Social links">
                <a href="https://github.com/your-username" target="_blank" rel="noreferrer" aria-label="GitHub profile">GH</a>
                <a href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noreferrer" aria-label="LinkedIn profile">in</a>
              </div>
            </div>

            <form
              className="contact-form"
              action="mailto:satarupabhowmik0511@gmail.com"
              method="post"
              encType="text/plain"
              data-reveal
            >
              <label>
                Name
                <input type="text" name="name" autoComplete="name" required />
              </label>
              <label>
                Email
                <input type="email" name="email" autoComplete="email" required />
              </label>
              <label>
                Message
                <textarea name="message" rows={5} required></textarea>
              </label>
              <button className="button button-primary" type="submit">Send Message</button>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>© <span data-year></span> Satarupa Bhowmik. Crafted for thoughtful engineering.</p>
        <a href="#home">Back to top</a>
      </footer>
    </>
  );
}
