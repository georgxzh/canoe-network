import Image from 'next/image';

const EMAIL = 'hello@canoe.network';

export default function Home() {
  return (
    <>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Canoe, back to top">
          CANOE<span className="wordmark-dot" aria-hidden="true" />
        </a>
        <a className="header-contact" href={`mailto:${EMAIL}`}>
          Get in touch <span aria-hidden="true">↗</span>
        </a>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-heading">
            <h1 id="hero-title">Canoe</h1>
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
                sizes="(max-width: 700px) 90vw, (max-width: 1100px) 74vw, 820px"
              />
            </div>
            <figcaption>
              <span>Claude Monet</span>
              <span>Impression, Sunrise · 1872</span>
            </figcaption>
          </figure>
          <div className="hero-endmark" aria-hidden="true">01 / 03</div>
        </section>

        <section className="statement-section" id="privacy" aria-labelledby="privacy-title">
          <div className="statement-meta" aria-hidden="true">01 /</div>
          <h2 id="privacy-title">Your data never leaves <span>your hands.</span></h2>
        </section>

        <section className="statement-section statement-section-mist" id="intelligence" aria-labelledby="intelligence-title">
          <div className="statement-meta" aria-hidden="true">02 /</div>
          <h2 id="intelligence-title">Built for intelligence, <span>not for ads.</span></h2>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="statement-meta" aria-hidden="true">03 /</div>
          <div className="contact-content">
            <h2 id="contact-title">VCs don’t need more.<br /><span>They need less.</span></h2>
            <a className="contact-link" href={`mailto:${EMAIL}`}>
              Get in touch <span aria-hidden="true">↗</span>
            </a>
          </div>
          <span className="contact-sun" aria-hidden="true" />
        </section>
      </main>

      <footer className="site-footer">
        <span>CANOE</span>
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </footer>
    </>
  );
}
