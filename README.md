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

Open http://localhost:3000. Edit `src/components/dental-experience.tsx` to start building.

Contact destinations and page content are in `src/components/dental-experience.tsx`; design tokens and responsive styles are in `src/app/globals.css`. The text wordmark can be replaced when the official logo is supplied.

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

## Languages and motion

The site serves `/ka`, `/en`, and `/ru`, with `/` redirecting to Georgian. Route metadata is generated in `src/app/[locale]/page.tsx`. Edit English content in `src/lib/content.ts` and translated dictionaries in `src/lib/locales/`. The shared component is `src/components/dental-experience.tsx`.

Motion uses GSAP ScrollTrigger with reduced-motion support and native scrolling. The Google Maps iframe is the exact embed supplied by the clinic.

After building, run `npm run check:site` to validate the rendered locale HTML, SEO alternates, map, and contact links. Optionally pass a running server URL: `npm run check:site -- http://localhost:3000`.
