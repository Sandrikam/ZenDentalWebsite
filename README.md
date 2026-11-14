# Zen Dental Website

Next.js App Router starter with TypeScript, prepared for Vercel.

## Development

```sh
npm install
npm run dev
```

Open http://localhost:3000. Edit `src/app/page.tsx` to start building.

```sh
npm run typecheck
npm run build
```

## Vercel

Import `Sandrikam/ZenDentalWebsite`, select Next.js, and use the repository root directory. Vercel uses `npm run build` and detects the output automatically.

To link this local directory to the project:

```sh
vercel link
```

The Next.js application lives in `src/app`; put static assets in `public/`.
