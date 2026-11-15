import type { Locale } from "@/lib/content";

export type PageTranslation = {
  title: string;
  description: string;
  intro: string;
  sections: { heading: string; paragraphs: string[] }[];
  image?: { src: string; alt: string; width: number; height: number };
  prices?: { treatment: string; price: string; includes: string }[];
};

export type ClinicPage = {
  kind: "service" | "doctor" | "prices" | "patient-info";
  path: `services/${string}` | `team/${string}` | "prices" | "patients";
  status: "draft" | "published";
  approvedBy: string;
  translations: Partial<Record<Locale, PageTranslation>>;
};

// Add the clinic's approved content here using content/templates as briefs.
// Empty by design: no made-up doctors, services or indexed placeholder pages.
export const clinicPages: ClinicPage[] = [];

export function publishedPages(locale: Locale) {
  return clinicPages.filter((page) => {
    const text = page.translations[locale];
    return page.status === "published" && page.approvedBy.trim() &&
      text?.title.trim() && text.description.trim() && text.intro.trim() &&
      text.sections.length > 0 && text.sections.every((section) => section.heading.trim() && section.paragraphs.length > 0 && section.paragraphs.every((paragraph) => paragraph.trim()));
  });
}
