# Canoe

One-page site for Canoe — the new internet. Private by construction, AI native by default.

Design notes: a mostly white editorial layout presents the supplied image of Claude
Monet's *Impression, Sunrise* (1872). Mist blue, pale sea green, and the muted
orange sun inform the page's restrained accents.

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
