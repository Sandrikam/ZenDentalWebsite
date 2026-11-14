# Zen Dental visual direction

## References and decisions

- Design reference: [Neko Health](https://www.nekohealth.com/gb/en). Borrow the spacious editorial rhythm, centered serif headings with clean sans-serif body typography, image-led storytelling, restrained navigation, and quiet transitions. No Neko brand assets or copy are used.
- Brand reference requested: [@zendental.ge](https://www.instagram.com/zendental.ge/). Direct fetch was blocked and no reliable indexed profile was available. Colors are provisional based on the user's explicit request for white with pink accents, not sampled from Instagram.
- Text wordmark is temporary; replace it when the official logo arrives.
- Keep English copy editable until clinic content is supplied. Do not add unverified doctors, reviews, prices, certifications, or outcome statistics.

## Palette

White dominates. Pale blush #f7eef0 for selected surfaces, muted rose #9a5269 for accents, deep rose #783c52 for emphasis, and warm charcoal #282424 for text. Final tokens are in src/app/globals.css.

## Contact evidence

The original repository lists 63 Merab Kostava Street, Tbilisi. The phone +995 555 70 27 37 is also listed in the [GPI provider document](https://mgapi.mygpi.ge/api/document/wording/1090). User-provided Instagram remains the social and contact destination. Confirm all details with the clinic before replacing draft content with final content.

## Original hero artwork

- Built-in ImageGen tool used.
- Saved asset: public/images/zen-hero.png
- This is abstract conceptual artwork, not a photograph of the clinic or its equipment.
- Final generation prompt:

> Use case: stylized-concept. Asset type: premium dental brand website hero artwork, portrait-ish 4:5 composition. Primary request: an exquisitely minimal architectural still life for Zen Dental, a contemporary dental clinic with mostly white branding and soft blush pink accents. Subject: one monumental smooth ivory ceramic ribbon, curved in an elegant U-shaped smile/dental arch, balanced upright on a low circular chalk-white plinth, with one smaller softly rounded pale blush stone form nearby. Architectural white cyclorama, subtly rose tinted wall on right, enormous arched window light creates clean afternoon shadows across white floor. Very restrained Scandinavian art direction, tactile matte porcelain, sculptural medical design aesthetic, museum quality design photography/photoreal 3D, serene, sophisticated, lots of clean negative space, detailed surface and beautiful indirect lighting. Colors: warm white, ivory, extremely pale blush #f8edf0, dusty pink #c5889b. No lettering, no typography, no logos, no human subjects, no realistic teeth or gums, no dental instruments, no gradients as flat backgrounds, no collage. The sculpture must feel abstract, optimistic and elegant, never like a tooth mascot. Full bleed composition suitable for cropping on mobile.

## Updating later

Replace the text wordmark with the supplied logo, adjust CSS color tokens to its official palette, add real clinic photography, and replace provisional marketing copy with approved content.


## Locale and motion revision

The current Neko site was inspected in Chrome during this revision. Its centered serif hero, transparent navigation, softly rectangular buttons, image blur and rounded framing on scroll, image-led cards, right-aligned text reveal, and rounded image-and-tabs panel informed the revised composition. Those patterns are adapted to a mostly white site with blush accents; no Neko imagery or copy is used.

- Routes: /ka (default), /en, /ru. Each route renders its own document language, translated content and metadata, canonical URL, and language alternates.
- Dictionary source: src/lib/content.ts; translations: src/lib/locales/ka.ts and ru.ts. Embedded newlines in titles must be escaped as \\n, never literal line breaks inside quoted TypeScript strings.
- Language navigation preserves the current section hash. Native language names appear in accessible labels and tooltips.
- GSAP ScrollTrigger controls the hero image's scale, blur and inset/rounded framing, heading entrance, card reveals, and word-by-word text emphasis. Normal browser scrolling remains intact.
- The logo, contact CTA and language controls remain available when the middle navigation retracts during downward scrolling. Keyboard focus restores navigation. Mobile menu supports Escape.
- Reduced motion disables scroll animation and renders point-cloud artwork as a still image. Animation contexts and observers are cleaned up on locale change/unmount; offscreen canvases stop rendering.
- The location panel contains the user's exact Google Maps iframe, with lazy loading, fullscreen support, translated title and strict-origin-when-cross-origin referrer policy.
- Automated checks: npm run build, npm run typecheck, npm run check:site. The site checker inspects generated HTML without networking by default, or accepts a running server URL as its argument.

### Wide hero artwork

Built-in ImageGen output saved at public/images/zen-hero-wide.png. This is conceptual artwork, not a photograph of the clinic. Final prompt:

> Use case: stylized-concept. Asset type: full-bleed ultra-wide 21:9 website hero background for Zen Dental. Create an original premium architectural art photograph, NOT a screenshot or web design. An airy near-white gallery with blush pink plaster walls and large soft arched window light. In the FAR LEFT quarter is a single large matte ivory U-shaped ribbon sculpture that subtly evokes a smile, on a pale white plinth, partially cropped off the left edge. The centre and right two thirds must be exceptionally quiet near-white negative space with soft pink afternoon light, suitable for centred dark serif headline overlay. Floor and distant walls are seamless with very gentle depth, large sweeping architectural curves in the background, refined photographic lighting, naturally tactile porcelain and stone. Ivory, white, the palest blush, restrained dusty rose. No lettering, no logos, no people, no dental instruments, no chairs, no text, no watermark. Landscape composition, photoreal 3D art photography, sophisticated calm mood. Keep the sculpture concentrated at far left and no dominant objects or hard shadows in the central area.
