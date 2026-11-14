import type { Dictionary, Locale } from "./content";

export const siteOrigin = "https://www.zendental.ge";
export const socialImage = "/images/zen-hero-wide.png";

// Only established clinic details belong here. Add hours, doctors and prices
// once the clinic confirms them; map viewport coordinates are not a pin location.
export function structuredData(locale: Locale, content: Dictionary) {
  const url = `${siteOrigin}/${locale}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Dentist",
        "@id": `${siteOrigin}/#clinic`,
        name: "Zen Dental",
        url: `${siteOrigin}/`,
        telephone: "+995555702737",
        address: {
          "@type": "PostalAddress",
          streetAddress: "63 Merab Kostava Street",
          addressLocality: "Tbilisi",
          addressCountry: "GE",
        },
        sameAs: ["https://www.instagram.com/zendental.ge/", "https://www.facebook.com/zendentaltbilisi"],
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
