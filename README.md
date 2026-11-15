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

Verified contact destinations, hours and map are in `src/lib/clinic.ts`; page copy is in `src/lib/content.ts` and `src/lib/locales/`; design tokens and responsive styles are in `src/app/globals.css`. The text wordmark can be replaced when the official logo is supplied.

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

Motion uses a 400ms CSS hero copy entrance and native scroll-linked hero image zoom, parallax, framing and soft blur. The fixed navbar gains a translucent frosted background after scrolling. Reduced-motion preference disables the image effects. The Google Maps iframe was refreshed from the same clinic profile after Google rejected the original embed parameter.

After building, run `npm run check:site` to validate the rendered locale HTML, SEO alternates, map, and contact links. Optionally pass a running server URL: `npm run check:site -- http://localhost:3000`.

## Content and review maintenance

Two manually selected Google review excerpts live in `src/lib/reviews.ts`. Their original links, authors and ratings are preserved. Georgian/Russian excerpts are labeled translations. The aggregate rating is a dated snapshot, not a live feed, and is deliberately omitted from business review schema. Recheck the snapshot before updating it.

Future service, doctor, prices and patient-information pages use `src/content/pages.ts`. Collection briefs are in `content/templates/`. Set a page to `published` only after clinic approval and complete translations. Only approved, nonempty translations get static routes, footer links, canonical/language metadata and sitemap entries. Drafts stay unavailable. There are currently no published detail pages. Booking process changes remain deferred.

Verification: `npm test` checks the content publication gate. `npm run build`, `npm run typecheck` and `npm run check:site` check the production build and locale HTML. See `docs/accessibility-mobile-review.md` for browser QA coverage and limitations.

## Future booking system

The proposed booking architecture and clinic decisions are documented in [the booking plan](docs/booking-plan.md): approximately seven doctors using existing Google accounts, two public chairs, a head-doctor-only third chair, administrator approval, and SMS reminders with optional email. This is a discussion draft for future implementation.

## Current design pass

The applied Unslop pass and subsequent copy reduction are documented in [the implementation notes](docs/unslop-implementation.md). Consultation is free with no commitment to treatment, as confirmed by the user. Contact actions use the current phone and Instagram channels; the future booking application remains a separate plan.
