# Zen Dental Website

Next.js App Router website with TypeScript, deployed on Vercel.

Vercel project: https://vercel.com/shieldwise/zendental

Production branch: `main`.

The visual direction uses a predominantly white canvas, blush accents, large editorial typography, and original conceptual artwork. See [design notes](docs/design.md) for references, the provisional palette, and the generated asset prompt. The official clinic logo and final clinic content are pending.

## Development

```sh
npm install
npm run dev
```

Open http://localhost:3000. Edit `src/app/page.tsx` to start building.

Contact destinations and page content are in `src/app/page.tsx`; design tokens and responsive styles are in `src/app/globals.css`. The text wordmark can be replaced when the official logo is supplied.

```sh
npm run typecheck
npm run build
```

## Vercel

Import `Sandrikam/ZenDentalWebsite`, select Next.js, and use the repository root directory. Vercel uses `npm run build` and detects the output automatically.

To link this local directory to the project:

```sh
vercel link --yes --project zendental --scope shieldwise
```

The Next.js application lives in `src/app`; put static assets in `public/`.
