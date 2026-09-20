# Canoe

One-page site for Canoe — the new internet. Private by construction, AI native by default.

Design notes: a white technical grid, geometric typography, black type, and yellow
accents frame the supplied image of Claude Monet's *Impression, Sunrise* (1872).
The last section leaves open space for a future team presentation.

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
