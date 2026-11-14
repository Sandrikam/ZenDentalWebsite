import type { MetadataRoute } from "next";
import { locales } from "@/lib/content";
import { siteOrigin } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = {
    ...Object.fromEntries(locales.map((locale) => [locale, `${siteOrigin}/${locale}`])),
    "x-default": `${siteOrigin}/ka`,
  };
  return locales.map((locale) => ({
    url: `${siteOrigin}/${locale}`,
    alternates: { languages },
  }));
}
