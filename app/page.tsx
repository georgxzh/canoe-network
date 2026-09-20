import Image from 'next/image';

const EMAIL = 'hello@canoe.network';

export default function Home() {
  return (
    <>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Canoe, back to top">
          <span className="wordmark-symbol" aria-hidden="true">C<span>✳</span></span>
          <span>Canoe</span>
        </a>
        <nav className="site-nav" aria-label="Main navigation">
          <a href="#privacy">Privacy</a>
          <a href="#intelligence">Intelligence</a>
          <a href="#team">Team</a>
        </nav>
        <a className="header-contact" href={`mailto:${EMAIL}`}>
          Get in touch <span aria-hidden="true">↗</span>
        </a>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-kicker">
            <span className="yellow-block" aria-hidden="true" />
            <span>THE NEW INTERNET.</span>
            <span className="hero-kicker-index">00 / 04</span>
          </div>

          <div className="hero-heading">
            <h1 id="hero-title">Canoe<span aria-hidden="true">.</span></h1>
            <p>The new internet.</p>
          </div>

          <figure className="painting">
            <div className="painting-image">
              <Image
                src="/impression-sunrise.jpg"
                alt="Claude Monet's Impression, Sunrise: boats on a misty blue harbour beneath a coral sun."
                width={1000}
                height={777}
                priority
                sizes="(max-width: 700px) 180vw, (max-width: 1100px) 80vw, 980px"
              />
            </div>
          </figure>
          <p className="painting-credit">FIG. 01 / CLAUDE MONET · IMPRESSION, SUNRISE · 1872</p>
          <a className="scroll-cue" href="#privacy" aria-label="Scroll to privacy">↓</a>
        </section>

        <section className="statement-section" id="privacy" aria-labelledby="privacy-title">
          <div className="statement-meta">01 / PRIVACY</div>
          <h2 id="privacy-title">Your data never leaves <span>your hands.</span></h2>
          <span className="statement-marker" aria-hidden="true">↗</span>
        </section>

        <section className="statement-section statement-section-dark" id="intelligence" aria-labelledby="intelligence-title">
          <div className="statement-meta">02 / INTELLIGENCE</div>
          <h2 id="intelligence-title">Built for intelligence, <span>not for ads.</span></h2>
          <span className="statement-marker" aria-hidden="true">↗</span>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="statement-meta">03 / CONTACT</div>
          <div className="contact-content">
            <h2 id="contact-title">VCs don’t need more.<br /><span>They need less.</span></h2>
            <a className="contact-link" href={`mailto:${EMAIL}`}>
              Get in touch <span aria-hidden="true">↗</span>
            </a>
          </div>
          <span className="contact-orbit" aria-hidden="true" />
        </section>

        <section className="team-section" id="team" aria-labelledby="team-title">
          <div className="statement-meta">04 / TEAM</div>
          <div className="team-content">
            <h2 id="team-title">Team<span aria-hidden="true">.</span></h2>
            <div className="team-space" aria-hidden="true" />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>CANOE<span className="footer-dot">.</span></span>
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </footer>
    </>
  );
}
