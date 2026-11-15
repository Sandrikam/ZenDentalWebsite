import type { Locale } from "./content";

// Manually curated public excerpts, not a live API feed. Never use these as
// aggregateRating markup for the clinic's own business.
export const googleReviewSnapshot = { rating: 4.4, count: 113, checkedOn: "2026-11-15" };

export const googleReviews: {
  author: string;
  rating: number;
  url: string;
  quote: Record<Locale, string>;
}[] = [
  {
    author: "Gela Lomidze",
    rating: 5,
    url: "https://maps.app.goo.gl/WRbCrQXrzrxwxjAT8",
    quote: {
      en: "Professional service, modern equipment and attentive staff.",
      ka: "პროფესიონალური მომსახურება, თანამედროვე აპარატურა და ყურადღებიანი პერსონალი.",
      ru: "Профессиональное обслуживание, современное оборудование и внимательный персонал.",
    },
  },
  {
    author: "Lisa K",
    rating: 5,
    url: "https://maps.app.goo.gl/RtJH2HMRC3JYqkNh6",
    quote: {
      en: "it was super fast, easy and no pain at all",
      ka: "ყველაფერი ძალიან სწრაფად, მარტივად და სრულიად უმტკივნეულოდ ჩატარდა",
      ru: "всё прошло очень быстро, легко и совсем без боли",
    },
  },
];
