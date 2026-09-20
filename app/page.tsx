import Reveal from './components/Reveal';
import Sunrise from './components/Sunrise';

const EMAIL = 'hello@canoe.network';

/** A hairline that fades out at both ends. */
function Rule() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto h-px w-full max-w-5xl bg-gradient-to-r from-transparent via-teal/25 to-transparent"
    />
  );
}

export default function Home() {
  return (
    <>
      <header className="fixed top-0 left-0 z-20 p-6 sm:p-8">
        <span className="text-sm font-medium tracking-[0.28em] text-light/90 uppercase">Canoe</span>
      </header>

      <main>
        {/* 1 — the dawn */}
        <section className="relative flex min-h-[100svh] flex-col items-center overflow-hidden px-6">
          <Sunrise />

          <div className="relative z-10 flex flex-1 flex-col items-center pt-[19svh] text-center">
            {/* The svh term keeps the type off the sun on short landscape screens. */}
            <h1
              className="rise text-[clamp(3.75rem,min(21vw,23svh),12.5rem)] leading-[0.88] font-medium tracking-[-0.055em] text-light"
              style={{ animationDelay: '120ms' }}
            >
              Canoe
            </h1>
            <p
              className="rise mt-6 text-[clamp(1.125rem,min(3.4vw,4svh),2rem)] font-light tracking-[-0.01em] text-mist sm:mt-8"
              style={{ animationDelay: '560ms' }}
            >
              The new internet.
            </p>
          </div>

          {/* Kept to the lower-left, clear of the sun and its reflection. */}
          <div
            className="rise relative z-10 flex w-full items-end justify-start pb-10"
            style={{ animationDelay: '1400ms' }}
          >
            <span
              aria-hidden="true"
              className="breathe ml-0 h-14 w-px bg-gradient-to-b from-transparent via-mist/40 to-mist/60 sm:ml-2"
            />
          </div>
        </section>

        <Rule />

        {/* 2 — privacy */}
        <section id="privacy" className="flex min-h-[78svh] items-center justify-center px-6 py-24">
          <Reveal>
            {/* inline-block keeps the phrase whole, so the line breaks where it should. */}
            <p className="mx-auto max-w-4xl text-center text-[clamp(2rem,6.6vw,4.75rem)] leading-[1.05] font-light tracking-[-0.04em] text-light">
              Your data never leaves <span className="inline-block">your hands.</span>
            </p>
          </Reveal>
        </section>

        <Rule />

        {/* 3 — AI native */}
        <section id="ai" className="flex min-h-[78svh] items-center justify-center px-6 py-24">
          <Reveal>
            <p className="mx-auto max-w-4xl text-center text-[clamp(2rem,6.6vw,4.75rem)] leading-[1.05] font-light tracking-[-0.04em] text-light">
              Built for intelligence, <span className="inline-block">not for ads.</span>
            </p>
          </Reveal>
        </section>

        <Rule />

        {/* 4 — the ask */}
        <section id="contact" className="flex min-h-[88svh] flex-col items-center justify-center px-6 py-24">
          <Reveal>
            <p className="mx-auto max-w-3xl text-center text-[clamp(1.75rem,5.4vw,3.75rem)] leading-[1.1] font-light tracking-[-0.035em] text-balance text-light">
              VCs don&rsquo;t need more.
              <br />
              <span className="text-mist">They need less.</span>
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-16 flex justify-center sm:mt-20">
              <a
                href={`mailto:${EMAIL}`}
                className="group relative inline-flex items-center gap-3 rounded-full border border-sun/40 px-8 py-4 text-base tracking-[-0.01em] text-sun transition-colors duration-500 hover:border-sun hover:bg-sun hover:text-night focus-visible:ring-2 focus-visible:ring-sun focus-visible:ring-offset-2 focus-visible:ring-offset-night focus-visible:outline-none sm:text-lg"
              >
                {/* A radial falloff rather than a blurred fill: no banding on dark. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-16 -z-10 bg-[radial-gradient(closest-side,rgba(255,107,53,0.28),rgba(255,107,53,0.10)_45%,rgba(255,107,53,0)_72%)] opacity-70 transition-opacity duration-500 group-hover:opacity-100"
                />
                Get in touch
                <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">
                  &rarr;
                </span>
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="flex flex-col items-center gap-2 px-6 pb-12 text-center">
        <p className="text-xs tracking-[0.2em] text-mist/45 uppercase">Canoe</p>
        <a
          href={`mailto:${EMAIL}`}
          className="text-xs tracking-[0.06em] text-mist/45 transition-colors hover:text-mist"
        >
          {EMAIL}
        </a>
      </footer>
    </>
  );
}
