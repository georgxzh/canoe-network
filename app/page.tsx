import Image from 'next/image';

export default function Home() {
  return (
    <>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Canoe, back to top">
          <span className="wordmark-symbol" aria-hidden="true">C<span>✳</span></span>
          <span>Canoe</span>
        </a>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <figure className="painting">
            <Image
              src="/impression-sunrise.jpg"
              alt="Claude Monet's Impression, Sunrise: boats on a misty blue harbour beneath a coral sun."
              width={1000}
              height={777}
              priority
              sizes="(max-width: 700px) 200vw, (max-width: 1100px) 95vw, 1300px"
            />
          </figure>
          <div className="hero-heading">
            <h1 id="hero-title">Canoe<span aria-hidden="true">.</span></h1>
            <p>The new internet.</p>
          </div>
          <a className="scroll-cue" href="#manifesto" aria-label="Scroll to Canoe's principles">↓</a>
        </section>

        <section className="manifesto" id="manifesto" aria-label="Canoe principles">
          <div className="manifesto-art" aria-hidden="true" />
          <h2>Your data never leaves <span>your hands.</span></h2>
          <h2>Built for intelligence,<br /><span>not for ads.</span></h2>
        </section>

        <section className="team-section" id="team" aria-labelledby="team-title">
          <h2 id="team-title">Team<span aria-hidden="true">.</span></h2>
          <div className="team-space" aria-hidden="true" />
        </section>
      </main>

      <footer className="site-footer">
        <span>CANOE<span className="footer-dot">.</span></span>
      </footer>
    </>
  );
}
