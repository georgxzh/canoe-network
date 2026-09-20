# Canoe

One-page site for Canoe — the new internet. Private by construction, AI native by default.

Design notes: Claude Monet's *Impression, Sunrise* (1872) dissolves into the hero
and returns as a faint texture behind two short statements. Black and yellow
typography, generous space, and an open team section keep the page spare.

## Stack

- Next.js (App Router), static export (`output: 'export'`)
- Tailwind CSS v4
- No runtime dependencies beyond React; the painting is served as a local asset

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
