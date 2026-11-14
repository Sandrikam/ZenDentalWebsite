import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/lib/content";
import { getDictionary } from "@/lib/dictionaries";
import { DentalExperience } from "@/components/dental-experience";

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
    metadataBase: new URL("https://www.zendental.ge"),
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
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <DentalExperience locale={locale} content={await getDictionary(locale)} />;
}
