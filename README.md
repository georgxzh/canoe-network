# Canoe

One-page site for Canoe — the new internet. Private by construction, AI native by default.

Design notes: the palette and the signature graphic are lifted from Claude Monet's
*Impression, Sunrise* (1872) — misty blue-grey and muted teal, with the vivid orange
sun as the only accent. The hero canvas draws that sunrise as a rising orb over a
faintly gridded sea, its reflection broken into short strokes.

## Stack

- Next.js (App Router), static export (`output: 'export'`)
- Tailwind CSS v4
- No runtime dependencies beyond React; the hero graphic is hand-drawn on a `<canvas>`

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Static output lands in `out/`. Deployed on Vercel; pushes to `main` ship to production.
