import type { Dictionary, Locale } from "./content";
import { clinic } from "./clinic";

export const siteOrigin = "https://www.zendental.ge";
export const socialImage = "/images/zen-hero-wide.png";

// Use verified clinic facts. Review excerpts stay out of business rating markup.
export function structuredData(locale: Locale, content: Dictionary) {
  const url = `${siteOrigin}/${locale}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Dentist",
        "@id": `${siteOrigin}/#clinic`,
        name: clinic.name,
        url: `${siteOrigin}/`,
        telephone: clinic.telephone,
        address: {
          "@type": "PostalAddress",
          ...clinic.address,
        },
        geo: { "@type": "GeoCoordinates", ...clinic.geo },
        hasMap: clinic.googleMaps,
        openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: clinic.hours.days, opens: clinic.hours.opens, closes: clinic.hours.closes }],
        sameAs: [clinic.instagram, clinic.facebook, clinic.googleMaps],
      },
      {
        "@type": "WebSite",
        "@id": `${siteOrigin}/#website`,
        name: "Zen Dental",
        url: `${siteOrigin}/`,
        inLanguage: ["ka", "en", "ru"],
        publisher: { "@id": `${siteOrigin}/#clinic` },
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: content.meta.title,
        description: content.meta.description,
        inLanguage: locale,
        isPartOf: { "@id": `${siteOrigin}/#website` },
        about: { "@id": `${siteOrigin}/#clinic` },
      },
    ],
  };
}
