# SEO and information architecture reference

Reviewed 15 November 2026 against the competitor HTML supplied in the conversation and the current Zen Dental source. These observations describe implementation and content coverage, not measured rankings, traffic, backlinks or Core Web Vitals.

## What the references contribute

| Reference | Useful pattern | Application to Zen Dental |
| --- | --- | --- |
| Grand Street Dental | Dedicated cosmetic and restorative treatment pages; real doctor, press, review and before/after content; canonical, social metadata and structured data | Create useful pages around actual treatments and clinicians. Build trust with attributable evidence and original photography. |
| Richter's | Local treatment intent, multilingual routes, doctor profiles, prices, patient information and local business markup | Make each confirmed treatment discoverable through navigation and internal links, with independently useful translated content. |
| Blits | Extensive Georgian service taxonomy, doctor pages, articles and clinic contact details | Prioritize Georgian service content and clinical expertise. Use ordinary crawlable links. |
| Dentor | Treatment explanations, candid prices and inclusions, clinicians, related services, patient guides and translated page relationships | Explain treatment choices, what a quoted price includes, and how to arrange a consultation. Keep facts consistent between languages. |

## Current baseline and completed changes

Zen Dental currently has three prerendered homepage routes: `/ka`, `/en` and `/ru`. The root redirects to Georgian. Each has localized metadata, an HTML language attribute, self-canonical URL and reciprocal language alternatives, including a Georgian x-default.

Added index/follow and Google preview directives, Open Graph images and alternate locales, Twitter large-image cards, a sitemap containing the three canonical pages and their language alternatives, and robots.txt pointing to that sitemap. A connected JSON-LD graph identifies the Dentist, WebSite and each localized WebPage using the established address, phone and Instagram account.

The social image is original conceptual artwork, not a clinic photograph. It is not represented as an image of the business in Dentist markup. No hours, doctors, rating, coordinates, prices, clinical qualifications or supported treatment lists have been invented. Three website languages do not establish the languages spoken by clinicians.

## Highest-priority content gaps

1. **Confirmed treatment pages.** A generic three-card care section cannot answer procedure-specific searches. Start with the actual services that matter most commercially and clinically. Each page should explain the treatment, suitability, alternatives, process, price or quotation approach, clinician and relevant questions. Obtain clinical review before publication.
2. **Team and doctor profiles.** Names, roles, qualifications, registration details where applicable, experience and original portraits. Link clinicians to the treatments they provide. Publish only verified credentials.
3. **Contact and patient information.** Confirm opening hours, appointment process, access and arrival details, payment options and contact channels. The current Instagram link is a contact route, not an instant booking system.
4. **Prices.** Confirm a maintained price list and explain per-tooth/per-jaw pricing, inclusions and additional costs where relevant. Synchronize Georgian, English and Russian versions.
5. **Original evidence.** Real clinic photography, attributable reviews linked to their source, and consented treatment cases. Do not reuse competitor reviews, press logos, patients or outcome claims.
6. **Patient guides.** Answer real questions arising from the clinic's work, with a named clinical reviewer and honest update dates. Link guides to the relevant treatment and clinician pages.

## Proposed navigation and routes

Use the same hierarchy under each locale prefix, while keeping translated slugs optional until a consistent mapping exists:

| Navigation | Routes | Publication dependency |
| --- | --- | --- |
| Care | `/{locale}/services`, `/{locale}/services/{treatment}` | Confirmed services and clinically reviewed descriptions |
| Our team | `/{locale}/team`, `/{locale}/team/{doctor}` | Verified clinician details and portraits |
| Prices | `/{locale}/prices` | Approved prices and inclusions |
| Patient information | `/{locale}/patients` | Confirmed visit and payment policies |
| Guides | `/{locale}/guides/{article}` | Original reviewed articles |
| Contact | `/{locale}/contact` | Confirmed hours and appointment process |

Keep the present homepage concise and connect it to those pages as they become substantive. Do not publish indexed placeholder pages or generate near-identical neighborhood pages. Add breadcrumbs and suitable page-specific schema when real child pages exist. Add only published canonical URLs to the sitemap.

## Patterns to avoid copying

- Competitors' analytics IDs, pixels, booking accounts, review scores, clinical claims or business details.
- Duplicate business entities with conflicting phones, hours or URL hosts. Some supplied reference markup has inconsistent data, including language-specific prices; these are maintenance risks to avoid, not facts about Zen Dental.
- Keyword stuffing, unsupported "best dentist" claims and meta-keyword tags.
- Schema for features the site does not have, such as site search or instant booking.
- Invented modification dates, copied reviews and expectations of guaranteed stars or FAQ results.
- Disabling pinch zoom or importing a reference site's legacy scripts and plugins.

## Local discovery and measurement

Keep Zen Dental's Google Business Profile accurate and consistent with the website; maintain its category, address, phone, hours, original images and authentic reviews. Google's documented local factors include relevance, distance and prominence, so competitor HTML cannot establish why Richter's ranks in a particular search or prove that schema alone explains its visibility.

Connect the clinic's own Search Console property, submit `/sitemap.xml`, inspect the three locale URLs and monitor indexing and treatment-query performance. Analytics and Search Console verification require the clinic's own account details; no competitor tracking configuration has been installed. Validate published markup in Google's Rich Results Test and monitor actual mobile performance before making performance claims.

Primary guidance:
- [Google: improve local ranking](https://support.google.com/business/answer/7091)
- [Google: local business structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business)
