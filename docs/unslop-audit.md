# Zen Dental Unslop audit

Historical audit of the earlier design. The user approved implementation afterward; see [the implementation notes](unslop-implementation.md) for the current result and later request for less text.

Read-only audit of the production homepage and current source. No application code or content was changed. Method: Unslop by Damir Sokolovsky (@heydamir), CC BY 4.0. Skill source: /Users/obsidian/.claude/skills/unslop/SKILL.md. Credit: https://heydamir.design/unslop

## Verdict

Use polish mode. The white/blush palette, serif display typography and restrained controls already form a coherent direction. The remaining problems are concentrated in generic copy, repeated conceptual imagery, excess motion and large amounts of space allocated to low-information content. The clinic's identity needs more concrete evidence as approved materials arrive.

The live English hero and care-card area were inspected in Safari. Three screenshots were taken; the third was captured during anchor scrolling and still showed the care area, so the approach and lower-section findings below are code-backed, not a claim of fresh screenshots of every section. Dictionaries for all three locales, components, motion code and effective CSS overrides were reviewed. This pass did not rerun mobile or accessibility testing; the earlier accessibility/mobile report records that separate work.

## Direction to retain and sharpen

- Product: a dental clinic on Merab Kostava Street in Tbilisi, helping patients understand care and arrange a visit.
- Character: reassuring, candid, attentive.
- World: daylight, white ceramic and the actual clinic's people and spaces once photographed.
- Moments: one considered hero visual and genuine clinic/patient evidence, with permission where needed.
- Signature: one restrained smile-arch motif; avoid restating the same shape in every visual.

These are recommendations for discussion. Official logo and clinic photography are pending. Do not invent brand assets, clinical capabilities, doctors or outcomes to fill the gaps.

## Findings and proposed improvements

| Priority / pass | Before | Recommended after | Why |
| --- | --- | --- | --- |
| P1 Copy | Hero: Your smile. In good hands. Care: A little care. A lasting difference. Approach: More understanding. A little more ease. | Lead with dental care and the clinic's location; make each section answer a different patient question. Example direction: Dental care on Kostava Street. | The current headings could be transferred to many clinics, spas or wellness brands. |
| P1 Copy / hierarchy | Hero values, the statement and the Listen/Understand/Care panel repeat listening, comfort and clarity. | Keep the sections/order, but assign distinct jobs: overview, concrete patient promise, and what happens at a first visit. Replace abstractions with clinic-approved specifics. | More scrolling currently yields little new information. |
| P1 Visuals | An ivory U sculpture, point-cloud U, ribbon U and another point-cloud U appear across the hero, care cards and approach visual. | Keep one conceptual hero/signature. Use real clinic, team or relevant treatment photography when supplied. Until then, make care cards more concise and avoid enlarging decorative placeholders. | Repeated shapes provide atmosphere but little evidence about the practice. |
| P1 Navigation / copy | Discover our approach links to #care; Book a visit and treatment-card links open Instagram. | Match labels and destinations. Either point the approach action to #approach or rename it. Until the booking application exists, explicitly identify messaging/contact actions. Future treatment links should lead to approved treatment content. | Visitors should be able to predict what clicking will do. Booking workflow implementation remains deferred. |
| P2 Motion | Hero image shifts/scales and blurs to 5px; copy moves/fades; framing changes; care cards rise 55px; footer wordmark drifts on scroll. | Retain one short hero entrance, approximately 300-500ms and 6-12px movement. Keep quick interaction feedback. Remove parallax, blur and footer drift in a strict Unslop pass. | Several simultaneous effects draw attention to the presentation rather than the clinic. These effects were introduced for the Neko reference; reducing them is a deliberate design tradeoff. |
| P2 Spacing | Statement has 130px top/125px bottom padding; approach artwork has a 600px desktop minimum; care artwork reaches 540px. | Start with an 80-96px desktop/56-72px mobile section rhythm. Trial 320-360px care-art heights and a 400-440px approach image, then judge with actual content. | The amount of space and artwork currently outweighs the information. These are starting values, not mandatory sizes for future photographs. |
| P2 Mobile information density | Each of the three care images uses a tall 4:5 slot on small screens. | Use a shorter image ratio while imagery remains abstract, and keep the useful title/copy close to the visual. Judge final crops after the real photos arrive. | Three decorative portrait panels create a long route to practical information. This is a source-based observation, not a new mobile overflow finding. |
| P2 Type | Uppercase tracked labels throughout, including The whole picture, A more human approach and In their words. Many short headings end with periods. | Sentence-case labels at 12-14px with little/no tracking; concise headings without trailing periods. Keep the existing serif/sans relationship. | Less art-direction notation and a more natural reading voice. |
| P2 Layout | Three equally large care cards have different abstract art but similar broad messages. | Preserve the card grouping but give the copy a clear service hierarchy and use images that explain the category. Let the primary category lead only if the clinic confirms that priority. | Uniform visual weight makes the sections feel interchangeable. |
| P3 Color | Multiple near-rose text colors and lightly tinted surfaces are defined separately throughout the stylesheet. | Consolidate primary, secondary and muted text roles and one rose accent, preserving measured contrast. Keep color concentrated in the hero and deliberate highlights. | More consistent hierarchy and easier maintenance across all locales. No gradient-text/glow problem was found. |
| P3 Details / icons | 01/02/03 badges appear on nonsequential service cards; approach artwork has scanner corners and a technical caption; the closing section has decorative orbit rings. | Keep numbering where there is an actual sequence, such as visit steps. Remove frame/caption/ring details that do not communicate information. Keep arrows for navigation, not as obligatory decoration on every link. | These small details accumulate into a concept-presentation aesthetic. The point cloud is original artwork, not a demonstrated clinic scan. |
| P3 Components | Header wordmark, language group and action have separate backplates and different radii/heights. | Normalize shared control heights and radii, reduce competing backplates and retain 44px minimum touch targets. | Make the header read as one intentional system without sacrificing accessibility. |
| P3 Implementation | globals.css contains several successive overrides for the same hero, header, typography and mobile selectors. | Consolidate the final styles after the visual direction is agreed. | Reduces accidental differences when editing Georgian/Russian layouts. This is a maintenance finding rather than a visual defect by itself. |

## What is already working

- A consistent white, blush and charcoal direction with no emoji-as-icon clutter or gradient lettering.
- Calm headline placement over an original image with negative space.
- Simple line-arrow treatment, visible keyboard focus and touch-size improvements.
- Google reviews have attributable source links, labeled translations and a dated rating snapshot.
- Location, phone and hours are concrete, useful information.
- Existing reduced-motion and static-render paths should remain intact.

Do not apply the skill's smaller generic navigation sizes mechanically: retain the existing accessibility minimums. Do not add another decorative visual in place of each removed visual.

## Suggested order

1. Correct label/destination mismatches and rewrite generic headlines using verified facts.
2. Adjust typography, spacing, repeated decoration and motion within the existing brand direction.
3. Replace conceptual filler with approved clinic/team imagery and specific service copy when supplied.
4. Consolidate CSS, then recheck all locales, keyboard navigation, reduced motion and small-screen layouts.

The largest improvement will come from original clinic content combined with a quieter presentation, rather than a palette or font replacement. No implementation, publishing or booking-system changes are included in this audit.
