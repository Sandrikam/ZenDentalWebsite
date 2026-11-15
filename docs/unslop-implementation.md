# Zen Dental Unslop implementation

Applied after the user approved the audit. Method: Unslop by Damir Sokolovsky (@heydamir), CC BY 4.0. Credit: https://heydamir.design/unslop

The user then clarified two things: consultation is free with no commitment to treatment, and the first copy revision was too wordy. The final version emphasizes that verified offer and uses substantially shorter visible copy.

## Direction

- Product: a dental clinic on Kostava Street in Tbilisi.
- Character: reassuring, candid, attentive.
- World: daylight, white ceramic, and the actual clinic's people/spaces when supplied.
- Moment: the existing original smile sculpture in the hero, with genuine Google reviews as supporting evidence.
- Signature: one smile arch, rather than repeated sculptural, point-cloud and ribbon variations.

## Applied passes

| Pass | Before | Applied result |
| --- | --- | --- |
| Spacing | Large conceptual panels and repeated reassurance sections | Consistent 96px desktop/64px mobile section rhythm; text panels replace tall decorative care imagery |
| Color | Many scattered tints and successive overrides | Shared paper, surface, blush, ink, muted and rose tokens; quiet white header surface |
| Icons | Numbered nonsequential cards, scanner frames, orbit rings and repeated arrow decoration | Removed noninformational decoration; numbers remain on actual visit steps; one line-arrow style |
| Copy | Generic promises repeated across hero, statement and visit sections | Location-specific hero, brief care descriptions and visit steps; explicit free consultation/no commitment offer in all locales |
| Type | Uppercase tracked labels, short headings with periods | Sentence case, restrained weights, consistent serif/sans hierarchy and shorter headings |
| Layout | Large artwork repeated in several sections | One conceptual hero visual, compact care panels, focused visit tabs and practical contact information |
| Details | Separate header backplates and differing control styles | One shared header surface, consistent controls and preserved 44px minimum targets |
| Visuals | Sculpture, point cloud, ribbons and duplicated point-cloud display | Existing hero artwork retained; no fabricated clinic photography or new generated assets |
| Motion | GSAP scroll parallax, image blur, content movement and footer drift | One 400ms CSS hero entrance and short interaction feedback; removed GSAP and the unused canvas component |

The redundant statement section was merged into the concise consultation/FAQ messaging after the user's request for less text. Other remaining sections retain their order. Treatment descriptions are broad; no new specific procedures, doctors, prices or equipment claims have been invented. The future booking application has not been implemented. Current consultation actions lead to clinic contact details, Instagram and phone.

## Verification

- Production build and TypeScript pass.
- Locale HTML checks cover translated metadata/headings, the consultation offer, honest contact labels, correct consultation anchor, reciprocal language links, schema, map, source-linked reviews, sitemap and unpublished-page restrictions.
- The existing content-publication gate tests remain in place.
- Safari exact-width iframe checks on the final shortened copy: English, Georgian and Russian at 320px, plus Russian at 768px and 812×375 landscape. No horizontal document overflow or undersized language/menu controls were reported.
- axe-core WCAG A/AA tags through WCAG 2.2 reported zero violations for those final browser checks. The Google iframe's internal document was excluded from traversal.
- Keyboard menu opening, Escape focus return and arrow-key tab activation were checked in Safari.
- Three screenshots were taken during this implementation pass: initial desktop composition, compact Georgian care content, and the final English hero with the consultation offer.
- Temporary public QA files were removed before the final build. axe-core was installed with no saved dependency or lockfile update.

These checks are not a certification of complete WCAG conformance or physical-device testing. Reduced-motion behavior was reviewed in CSS; OS preferences were not changed.

## Next content update

Replace the temporary text wordmark when the official logo arrives. Add actual clinician/clinic photographs and approved service details through the existing content workflow. Maintain the concise copy direction instead of filling newly available space with generic reassurance.
