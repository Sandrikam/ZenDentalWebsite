import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { publishedPages } from "@/content/pages";
import { isLocale, locales } from "@/lib/content";
import { siteOrigin, socialImage } from "@/lib/seo";

type Params = { locale: string; path: string[] };
export const dynamicParams = false;

export function generateStaticParams({ params }: { params: { locale: string } }) {
  return isLocale(params.locale) ? publishedPages(params.locale).map((page) => ({ path: page.path.split("/") })) : [];
}

function resolvePage(params: Params) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const page = publishedPages(locale).find((page) => page.path === params.path.join("/"));
  if (!page) notFound();
  return { page, locale, text: page.translations[locale]! };
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { page, locale, text } = resolvePage(await params);
  const languages = Object.fromEntries(locales.filter((lang) => publishedPages(lang).some((entry) => entry.path === page.path)).map((lang) => [lang, `${siteOrigin}/${lang}/${page.path}`]));
  return {
    metadataBase: new URL(siteOrigin),
    title: `${text.title} | Zen Dental`, description: text.description,
    alternates: { canonical: `/${locale}/${page.path}`, languages },
    openGraph: { title: text.title, description: text.description, url: `/${locale}/${page.path}`, siteName: "Zen Dental", type: "website", images: [socialImage] },
    twitter: { card: "summary_large_image", title: text.title, description: text.description, images: [socialImage] },
  };
}

export default async function ContentPage({ params }: { params: Promise<Params> }) {
  const { locale, text } = resolvePage(await params);
  const labels = {
    en: { home: "Home", skip: "Skip to content", treatment: "Treatment", price: "Price", includes: "Includes" },
    ka: { home: "მთავარი", skip: "შინაარსზე გადასვლა", treatment: "მომსახურება", price: "ფასი", includes: "ფასში შედის" },
    ru: { home: "Главная", skip: "Перейти к содержанию", treatment: "Услуга", price: "Цена", includes: "Включено" },
  }[locale];
  return <div className="content-page" data-locale={locale}>
    <a className="skip-link" href="#main-content">{labels.skip}</a>
    <header className="content-header page-gutter"><Link className="wordmark" href={`/${locale}`}>zen dental<span className="brand-dot" /></Link><Link className="text-link" href={`/${locale}`}>{labels.home}</Link></header>
    <main id="main-content" tabIndex={-1} className="content-article page-gutter">
      <h1>{text.title}</h1><p className="content-intro">{text.intro}</p>
      {text.image && <Image src={text.image.src} alt={text.image.alt} width={text.image.width} height={text.image.height} sizes="(max-width: 700px) 90vw, 800px" className="content-image" />}
      {text.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}
      {!!text.prices?.length && <div className="price-table-wrap"><table><caption>{text.title}</caption><thead><tr><th scope="col">{labels.treatment}</th><th scope="col">{labels.price}</th><th scope="col">{labels.includes}</th></tr></thead><tbody>{text.prices.map((row) => <tr key={row.treatment}><th scope="row">{row.treatment}</th><td>{row.price}</td><td>{row.includes}</td></tr>)}</tbody></table></div>}
    </main>
  </div>;
}
