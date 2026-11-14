import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/lib/content";
import { getDictionary } from "@/lib/dictionaries";
import { DentalExperience } from "@/components/dental-experience";
import { siteOrigin, socialImage, structuredData } from "@/lib/seo";

export const dynamicParams = false;

export async function generateMetadata({ params }: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const content = await getDictionary(locale);
  return {
    title: content.meta.title,
    description: content.meta.description,
    metadataBase: new URL(siteOrigin),
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ...Object.fromEntries(locales.map((lang) => [lang, `/${lang}`])),
        "x-default": "/ka",
      },
    },
    openGraph: {
      title: content.meta.title,
      description: content.meta.description,
      url: `/${locale}`,
      locale: { ka: "ka_GE", en: "en_US", ru: "ru_RU" }[locale],
      type: "website",
      siteName: "Zen Dental",
      alternateLocale: locales.filter((lang) => lang !== locale).map((lang) => ({ ka: "ka_GE", en: "en_US", ru: "ru_RU" })[lang]),
      images: [{ url: socialImage, width: 1915, height: 821, alt: content.hero.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: content.meta.title,
      description: content.meta.description,
      images: [{ url: socialImage, alt: content.hero.imageAlt }],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = await getDictionary(locale);
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(locale, content)).replace(/</g, "\\u003c") }} />
    <DentalExperience locale={locale} content={content} />
  </>;
}
