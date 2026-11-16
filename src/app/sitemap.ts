import type { MetadataRoute } from "next";
import { locales } from "@/lib/content";
import { siteOrigin } from "@/lib/seo";
import { publishedPages } from "@/content/pages";
import { doctors, teamIsIndexable } from "@/content/doctors";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = {
    ...Object.fromEntries(locales.map((locale) => [locale, `${siteOrigin}/${locale}`])),
    "x-default": `${siteOrigin}/ka`,
  };
  return [...locales.map((locale) => ({
    url: `${siteOrigin}/${locale}`,
    alternates: { languages },
  })), ...locales.flatMap((locale) => publishedPages(locale).map((page) => ({
    url: `${siteOrigin}/${locale}/${page.path}`,
    alternates: { languages: Object.fromEntries(locales.filter((lang) => publishedPages(lang).some((entry) => entry.path === page.path)).map((lang) => [lang, `${siteOrigin}/${lang}/${page.path}`])) },
  }))), ...teamPaths().flatMap((path) => locales.map((locale) => ({
    url: `${siteOrigin}/${locale}${path}`,
    alternates: { languages: { ...Object.fromEntries(locales.map((lang) => [lang, `${siteOrigin}/${lang}${path}`])), "x-default": `${siteOrigin}/ka${path}` } },
  })))];
}

// Placeholder doctor profiles stay out of the sitemap until the clinic approves them.
function teamPaths() {
  if (!teamIsIndexable) return [];
  return ["/team", ...doctors.filter((doctor) => !doctor.placeholder).map((doctor) => `/team/${doctor.slug}`)];
}
