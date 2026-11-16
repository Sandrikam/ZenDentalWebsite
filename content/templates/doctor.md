# Doctor profile brief

Status: draft.

- Full name in Georgian, English and Russian
- Slug under team/
- Specialty and current clinical role
- Original portrait and descriptive alt text
- Verified education and qualifications
- Relevant experience (avoid calculating unverified years)
- Treatments actually provided
- Languages spoken by this clinician
- Professional memberships if confirmed
- Short personal introduction approved by the doctor
- Links to the clinician's published treatment pages
- Approver name and approved translations

Doctor profiles live in `src/content/doctors.ts` and render at `/[locale]/team/<slug>`. Portraits are 4:5 crops in `public/images/team/`. Each entry starts with `placeholder: true` (generic role and bio, noindex, no sitemap entry, no Person schema); replace the role and bio with approved text and set `placeholder: false` to index it. Do not infer clinicians, credentials or languages from website translations or reviews.
