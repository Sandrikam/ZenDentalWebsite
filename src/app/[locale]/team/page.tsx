import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { doctors, teamIsIndexable } from "@/content/doctors";
import { isLocale, locales } from "@/lib/content";
import { getDictionary } from "@/lib/dictionaries";
import { siteOrigin } from "@/lib/seo";
import { DoctorCard } from "@/components/doctor-card";
import { SubpageHeader } from "@/components/subpage-header";
import { TeamCta } from "@/components/team-cta";

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { team } = await getDictionary(locale);
  const image = doctors[0].image.src;
  return {
    metadataBase: new URL(siteOrigin),
    title: team.metaTitle,
    description: team.metaDescription,
    robots: { index: teamIsIndexable, follow: true },
    alternates: {
      canonical: `/${locale}/team`,
      languages: { ...Object.fromEntries(locales.map((lang) => [lang, `/${lang}/team`])), "x-default": "/ka/team" },
    },
    openGraph: { title: team.metaTitle, description: team.metaDescription, url: `/${locale}/team`, siteName: "Zen Dental", type: "website", images: [image] },
  };
}

export default async function TeamPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = await getDictionary(locale);
  return <div className="content-page" data-locale={locale}>
    <a className="skip-link" href="#main-content">{c.nav.skip}</a>
    <SubpageHeader locale={locale} path="/team" languageLabel={c.nav.language} links={[{ href: `/${locale}`, label: c.team.home }]} />
    <main id="main-content" tabIndex={-1} className="team-page page-gutter">
      <div className="team-page-heading">
        <p className="eyebrow">{c.team.eyebrow}</p>
        <h1>{c.team.title}</h1>
        <p className="content-intro">{c.team.intro}</p>
      </div>
      <div className="doctor-grid">
        {doctors.map((doctor, index) => <DoctorCard key={doctor.slug} doctor={doctor} locale={locale} alt={c.team.portraitAlt} headingLevel="h2" priority={index < 4} />)}
      </div>
      <TeamCta c={c} />
    </main>
  </div>;
}
