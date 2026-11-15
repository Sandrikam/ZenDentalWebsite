# Accessibility, mobile and content review

The implementation follows the locally available `emil-design-eng` (Emil Kowalski) and `karpathy-guidelines` skills. Scope: accessibility, mobile polish, authentic Google review excerpts and future content structure. Booking changes are deferred.

| Before | After | Why |
| --- | --- | --- |
| Language links shrank to 29–34px | Minimum 44×44px targets | Easier touch and keyboard use |
| Floating navigation could crowd translated text | Disclosure menu below 1200px; compact mobile header | Keep controls readable and separated |
| Keyboard tab selection animated and replaced one shared panel | Immediate updates, individual labeled panels, Home/End/arrow navigation | Predictable focus and screen-reader relationships |
| Mobile menu Escape worked only within navigation | Escape anywhere, focus return, outside/blur dismissal, keyboard opening moves focus to first link | Consistent disclosure behavior |
| Scroll reveal started with pale statement text | Darker starting text with measured contrast above 4.5:1 on its surface | Keep words readable throughout motion |
| Point-cloud artwork looped indefinitely | Settles within four seconds; static for reduced motion and keyboard input | Avoid endless decorative movement |
| Georgian headings forced grid width at 320px | Shrinkable grid columns and adjusted Georgian heading sizes | Prevent horizontal overflow and awkward wrapping |
| Google rejected the previous map pb parameter | Fresh embed copied from the same Google place | Restore the actual map |
| Reviews were available only on Google | Two selected, attributed excerpts with direct original-review links | Genuine feedback with traceable sources |
| Future pages had no implementation | Typed content registry, common page renderer, templates and publication gate | Add approved content without exposing drafts |

## Browser checks

Ran a temporary, same-origin iframe harness in Safari to measure exact viewport sizes and run axe-core against the rendered locale document. All temporary public QA files were removed before the final build. axe-core was installed locally with `--no-save --package-lock=false`, not added as a production dependency.

- Georgian, English and Russian at 320px: no document horizontal overflow and zero reported violations for the axe WCAG A/AA tags through WCAG 2.2.
- Georgian at 375px before the final type-size adjustments: no horizontal overflow and zero reported violations.
- Russian at 375px, 768px and 812×375 landscape: no horizontal overflow and zero reported violations.
- Enlarged Safari text/page zoom exposed the Georgian grid issue; corrected the grid sizing and verified at 320px afterward.
- Desktop Georgian appearance reviewed in Safari.
- Keyboard Right Arrow activates the next approach tab and moves visible focus to it.
- Mobile menu Enter opens and focuses the first navigation link; Escape closes and returns focus to the toggle.
- Fresh Google map visibly renders, with its original Google map controls and a link identifying clinic CID 4144471216243690537.
- Localized review excerpts, rating snapshot date, source links and opening hours appear in the accessibility tree.

Limitations: automated checks do not establish complete WCAG conformance. Third-party Google iframe internals were excluded from axe traversal. These were browser viewport tests, not physical iPhone/Android tests. OS-level reduced-motion preference was not changed; the existing media-query behavior and static render path were reviewed in code. Some controls below the fold were checked through the accessibility tree rather than full-screen screenshots.

## Content publication

`src/content/pages.ts` is intentionally empty until approved information arrives. Briefs for treatments, doctors, prices and patient information are under `content/templates/`. A published page needs a named clinic approver, title, description, introduction and nonempty headed content in the requested locale. Drafts and incomplete translations have no generated route, footer link or sitemap entry. The approval gate has a test covering draft status, missing approval, missing translation and empty content.

## Sources and maintenance

Review excerpts and rating were verified directly from the user-supplied Google Business Profile. Individual review URLs are in `src/lib/reviews.ts`; rating/count are a dated snapshot and are not live. Translations are labeled, and no self-serving aggregate rating is added to Dentist JSON-LD.

- [WAI tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)
- [Google review snippet guidance](https://developers.google.com/search/docs/appearance/structured-data/review-snippet)

Recheck Google hours and ratings when they change. Publish clinical pages only after the clinic confirms services, clinicians, prices and clinical wording. Instagram remains the user-confirmed `zendental.ge` account.
