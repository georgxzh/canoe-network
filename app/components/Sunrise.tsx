'use client';

import { useEffect, useRef } from 'react';

type Mote = { x: number; y: number; r: number; vx: number; vy: number; a: number };
type Layer = { c: HTMLCanvasElement; cx: CanvasRenderingContext2D };

/** Stable pseudo-random so the composition survives a resize unchanged. */
function seeded(i: number) {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Impression, Sunrise, read through a screen: an orange orb lifting over a hazy
 * horizon, its reflection broken into short strokes on a faintly gridded sea.
 *
 * Everything that does not change between frames — the sky, the mist on the
 * horizon, the water and its grid, the vignette, the glows — is painted once
 * into offscreen layers and then blitted. Evaluating those gradients on every
 * frame cost ~150ms on a throttled phone; compositing them costs almost
 * nothing, which is what keeps this graphic off the main thread's back.
 */
export default function Sunrise() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let horizon = 0;
    let sunX = 0;
    let sunR = 0;
    let haloSize = 0;
    let discSize = 0;

    let sky: Layer | null = null;
    let bloom: Layer | null = null;
    let water: Layer | null = null;
    let vignette: Layer | null = null;
    let halo: Layer | null = null;
    let disc: Layer | null = null;

    let motes: Mote[] = [];
    let raf = 0;
    let visible = true;
    let last = 0;
    const born = performance.now();

    const layer = (lw: number, lh: number, opaque = false): Layer => {
      const c = document.createElement('canvas');
      c.width = Math.max(1, Math.round(lw * dpr));
      c.height = Math.max(1, Math.round(lh * dpr));
      const cx = c.getContext('2d', { alpha: !opaque })!;
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { c, cx };
    };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      // 1.5 is plenty for a scene made of soft gradients, and costs far fewer
      // pixels per frame than a full 2x.
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = Math.max(1, Math.round(rect.width));
      h = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      horizon = h * 0.68;
      // Right of centre, as Monet placed it — which also keeps the reflection
      // clear of the scroll cue in the lower-left.
      sunX = w * (w < 700 ? 0.54 : 0.575);
      sunR = Math.max(14, Math.min(w, h) * 0.052);
      haloSize = sunR * 16;
      discSize = sunR * 2.4;

      const depth = h - horizon;

      // ---- sky ----
      sky = layer(w, h, true);
      const g = sky.cx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, '#070e17');
      g.addColorStop(0.36, '#0b1622');
      g.addColorStop(0.6, '#152532');
      g.addColorStop(0.68, '#1d2f3b');
      g.addColorStop(0.72, '#132029');
      g.addColorStop(1, '#080f18');
      sky.cx.fillStyle = g;
      sky.cx.fillRect(0, 0, w, h);

      // ---- warm bloom sitting on the horizon, the way haze holds light ----
      bloom = layer(w, h);
      const b = bloom.cx.createRadialGradient(sunX, horizon, 0, sunX, horizon, Math.max(w * 0.62, h * 0.5));
      b.addColorStop(0, 'rgba(255,138,74,0.2)');
      b.addColorStop(0.32, 'rgba(214,132,110,0.09)');
      b.addColorStop(1, 'rgba(120,150,170,0)');
      bloom.cx.fillStyle = b;
      bloom.cx.fillRect(0, 0, w, h);

      // ---- halo, in its own small square so the blit stays cheap ----
      halo = layer(haloSize, haloSize);
      const hc = haloSize / 2;
      const ha = halo.cx.createRadialGradient(hc, hc, sunR * 0.5, hc, hc, sunR * 7.5);
      ha.addColorStop(0, 'rgba(255,107,53,0.4)');
      ha.addColorStop(0.18, 'rgba(255,120,64,0.16)');
      ha.addColorStop(1, 'rgba(255,120,64,0)');
      halo.cx.fillStyle = ha;
      halo.cx.fillRect(0, 0, haloSize, haloSize);

      // ---- the disc: flat and vivid, not a shaded sphere ----
      disc = layer(discSize, discSize);
      const dc = discSize / 2;
      const d = disc.cx.createRadialGradient(dc, dc, 0, dc, dc, sunR);
      d.addColorStop(0, 'rgba(255,124,70,1)');
      d.addColorStop(0.55, 'rgba(255,110,56,1)');
      d.addColorStop(0.93, 'rgba(251,97,44,1)');
      d.addColorStop(1, 'rgba(248,92,40,0.78)');
      disc.cx.fillStyle = d;
      disc.cx.beginPath();
      disc.cx.arc(dc, dc, sunR, 0, Math.PI * 2);
      disc.cx.fill();

      // ---- mist over the horizon, then the water and its grid ----
      water = layer(w, h);
      const wc = water.cx;

      const band = wc.createLinearGradient(0, horizon - h * 0.14, 0, horizon + h * 0.04);
      band.addColorStop(0, 'rgba(24,40,54,0)');
      band.addColorStop(0.6, 'rgba(26,43,57,0.34)');
      band.addColorStop(1, 'rgba(19,32,43,0.62)');
      wc.fillStyle = band;
      wc.fillRect(0, horizon - h * 0.14, w, h * 0.18);

      wc.save();
      wc.beginPath();
      wc.rect(0, horizon, w, depth);
      wc.clip();

      const wash = wc.createLinearGradient(0, horizon, 0, h);
      wash.addColorStop(0, 'rgba(94,140,134,0.09)');
      wash.addColorStop(0.45, 'rgba(94,140,134,0.045)');
      wash.addColorStop(1, 'rgba(94,140,134,0)');
      wc.fillStyle = wash;
      wc.fillRect(0, horizon, w, depth);

      wc.lineWidth = 1;
      for (let i = 1; i < 26; i++) {
        const p = i / 26;
        const y = horizon + depth * p * p;
        if (y > h) break;
        wc.strokeStyle = `rgba(110,152,146,${0.05 * Math.sin(p * Math.PI) + 0.012})`;
        wc.beginPath();
        wc.moveTo(0, y);
        wc.lineTo(w, y);
        wc.stroke();
      }
      for (let i = -9; i <= 9; i++) {
        if (i === 0) continue;
        wc.strokeStyle = `rgba(110,152,146,${Math.max(0, 0.055 - Math.abs(i) * 0.005)})`;
        wc.beginPath();
        wc.moveTo(sunX + i * (w * 0.035), horizon);
        wc.lineTo(sunX + i * (w * 0.34), h);
        wc.stroke();
      }
      wc.restore();

      // ---- vignette, to hold the eye at the centre ----
      vignette = layer(w, h);
      const v = vignette.cx.createRadialGradient(
        sunX,
        h * 0.55,
        Math.min(w, h) * 0.26,
        sunX,
        h * 0.55,
        Math.max(w, h) * 0.78,
      );
      v.addColorStop(0, 'rgba(8,15,24,0)');
      v.addColorStop(1, 'rgba(8,15,24,0.72)');
      vignette.cx.fillStyle = v;
      vignette.cx.fillRect(0, 0, w, h);

      const count = w < 700 ? 22 : 40;
      motes = Array.from({ length: count }, (_, i) => ({
        x: seeded(i) * w,
        y: seeded(i + 90) * h * 0.66,
        r: 0.5 + seeded(i + 180) * 1.1,
        vx: (seeded(i + 270) - 0.5) * 0.09,
        vy: -0.045 - seeded(i + 360) * 0.06,
        a: 0.1 + seeded(i + 450) * 0.22,
      }));
    };

    const draw = (now: number) => {
      if (!sky || !bloom || !water || !vignette || !halo || !disc) return;

      const t = (now - born) / 1000;
      const depth = h - horizon;

      // The sun lifts out of the water once, then holds.
      const lift = reduced ? 1 : easeOut(Math.min(t / 2.4, 1));
      const sunY = horizon + sunR * 1.5 - lift * (sunR * 1.5 + h * 0.1);
      const glow = 0.25 + lift * 0.75;
      const shimmer = reduced ? 0 : t;

      ctx.globalAlpha = 1;
      ctx.drawImage(sky.c, 0, 0, w, h);

      ctx.globalAlpha = glow;
      ctx.drawImage(bloom.c, 0, 0, w, h);
      ctx.drawImage(halo.c, sunX - haloSize / 2, sunY - haloSize / 2, haloSize, haloSize);

      const pulse = reduced ? 1 : 1 + Math.sin(t * 0.7) * 0.015;
      const ds = discSize * pulse;
      ctx.drawImage(disc.c, sunX - ds / 2, sunY - ds / 2, ds, ds);

      ctx.globalAlpha = 1;
      ctx.drawImage(water.c, 0, 0, w, h);

      ctx.save();
      ctx.beginPath();
      ctx.rect(0, horizon, w, depth);
      ctx.clip();

      // The reflection: short broken strokes, straight out of the painting.
      const rows = Math.ceil(depth / 9);
      ctx.lineCap = 'round';
      for (let i = 0; i < rows; i++) {
        const p = i / rows;
        const y = horizon + 3 + i * 9 + Math.sin(shimmer * 0.9 + i * 0.5) * 1.2;
        if (y > h) break;
        const spread = sunR * (0.75 + p * 2.9);
        const strokes = i % 3 === 0 ? 2 : 1;
        for (let s = 0; s < strokes; s++) {
          const seed = seeded(i * 7 + s * 31);
          const wobble = Math.sin(shimmer * (0.8 + seed * 0.7) + i * 0.8 + s * 2.1);
          const cx = sunX + wobble * spread * 0.55 + (seed - 0.5) * spread * 0.45;
          const len = sunR * (0.22 + seed * 0.75) * (1 + p * 1.1);
          const alpha = (0.55 - p * 0.42) * glow * (0.55 + 0.45 * Math.abs(wobble));
          if (alpha <= 0.012) continue;
          ctx.strokeStyle = `rgba(255,${104 + Math.round(seed * 40)},${48 + Math.round(seed * 30)},${alpha})`;
          ctx.lineWidth = 2.3 + p * 2.8;
          ctx.beginPath();
          ctx.moveTo(cx - len / 2, y);
          ctx.lineTo(cx + len / 2, y);
          ctx.stroke();
        }
      }

      // ---- the canoe ----
      // A slow sine, not a wrapping counter: the drift never jumps.
      const hull = Math.max(30, Math.min(w * 0.075, 92));
      const bx = w * 0.3 + (reduced ? 0 : Math.sin(t * 0.045 - Math.PI / 2) * w * 0.15);
      const by = horizon + depth * 0.5 + (reduced ? 0 : Math.sin(t * 0.55) * 2.2);
      const boatAlpha = Math.min(1, Math.max(0, lift * 1.2 - 0.2));

      ctx.globalAlpha = boatAlpha * 0.24;
      ctx.fillStyle = '#0a141c';
      ctx.beginPath();
      ctx.ellipse(bx, by + hull * 0.2, hull * 0.5, hull * 0.07, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalAlpha = boatAlpha;
      ctx.fillStyle = '#060d14';
      ctx.beginPath();
      ctx.moveTo(bx - hull / 2, by);
      ctx.quadraticCurveTo(bx, by + hull * 0.2, bx + hull / 2, by);
      ctx.quadraticCurveTo(bx, by + hull * 0.05, bx - hull / 2, by);
      ctx.fill();

      // paddler
      ctx.beginPath();
      ctx.ellipse(bx + hull * 0.04, by - hull * 0.14, hull * 0.055, hull * 0.15, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.lineWidth = Math.max(1, hull * 0.028);
      ctx.strokeStyle = '#060d14';
      ctx.beginPath();
      ctx.moveTo(bx - hull * 0.1, by - hull * 0.2);
      ctx.lineTo(bx + hull * 0.22, by + hull * 0.06);
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.restore();

      // ---- motes in the air ----
      for (const m of motes) {
        if (!reduced) {
          m.x += m.vx;
          m.y += m.vy;
          if (m.y < -4) {
            m.y = horizon;
            m.x = seeded(m.x + t) * w;
          }
          if (m.x < -4) m.x = w + 4;
          if (m.x > w + 4) m.x = -4;
        }
        const near = 1 - Math.min(1, Math.hypot(m.x - sunX, m.y - sunY) / (w * 0.45));
        ctx.fillStyle = `rgba(${180 + Math.round(near * 75)},${200 + Math.round(near * 30)},${215 - Math.round(near * 70)},${m.a * glow})`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.drawImage(vignette.c, 0, 0, w, h);
    };

    // ~30fps is ample for motion this slow, and halves the per-second cost.
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < 31) return;
      last = now;
      draw(now);
    };

    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const play = () => {
      if (!raf && visible && !document.hidden) raf = requestAnimationFrame(loop);
    };

    build();

    if (reduced) {
      draw(born + 4000); // one frame, at rest
    } else {
      draw(born); // paint immediately, then animate
      play();
    }

    const onResize = () => {
      build();
      draw(reduced ? born + 4000 : performance.now());
    };

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
        if (reduced) return;
        if (visible) play();
        else stop();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const onVisibility = () => {
      if (reduced) return;
      if (document.hidden) stop();
      else play();
    };

    window.addEventListener('resize', onResize, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
