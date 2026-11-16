import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { doctors, findDoctor } from "@/content/doctors";
import { isLocale, locales } from "@/lib/content";
import { getDictionary } from "@/lib/dictionaries";
import { siteOrigin } from "@/lib/seo";
import { DoctorCard } from "@/components/doctor-card";
import { SubpageHeader } from "@/components/subpage-header";
import { TeamCta } from "@/components/team-cta";

type Params = { locale: string; slug: string };
export const dynamicParams = false;

export function generateStaticParams() {
  return doctors.map((doctor) => ({ slug: doctor.slug }));
}

function resolve(params: Params) {
  if (!isLocale(params.locale)) notFound();
  const doctor = findDoctor(params.slug);
  if (!doctor) notFound();
  return { locale: params.locale, doctor };
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, doctor } = resolve(await params);
  const title = `${doctor.name[locale]}, ${doctor.role[locale]} | Zen Dental`;
  const description = doctor.bio[locale];
  const path = `/team/${doctor.slug}`;
  return {
    metadataBase: new URL(siteOrigin),
    title, description,
    robots: { index: !doctor.placeholder, follow: true },
    alternates: {
      canonical: `/${locale}${path}`,
      languages: { ...Object.fromEntries(locales.map((lang) => [lang, `/${lang}${path}`])), "x-default": `/ka${path}` },
    },
    openGraph: { title, description, url: `/${locale}${path}`, siteName: "Zen Dental", type: "profile", images: [{ url: doctor.image.src, width: doctor.image.width, height: doctor.image.height }] },
  };
}

export default async function DoctorPage({ params }: { params: Promise<Params> }) {
  const { locale, doctor } = resolve(await params);
  const c = await getDictionary(locale);
  const name = doctor.name[locale];
  const others = doctors.filter((entry) => entry.slug !== doctor.slug);
  // Person markup only for approved profiles, so placeholder text never reaches search results.
  const schema = !doctor.placeholder && {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteOrigin}/team/${doctor.slug}#person`,
    name: doctor.name.en,
    alternateName: [doctor.name.ka, doctor.name.ru],
    jobTitle: doctor.role[locale],
    description: doctor.bio[locale],
    image: `${siteOrigin}${doctor.image.src}`,
    url: `${siteOrigin}/${locale}/team/${doctor.slug}`,
    worksFor: { "@id": `${siteOrigin}/#clinic` },
  };
  return <div className="content-page" data-locale={locale}>
    {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />}
    <a className="skip-link" href="#main-content">{c.nav.skip}</a>
    <SubpageHeader locale={locale} path={`/team/${doctor.slug}`} languageLabel={c.nav.language} links={[{ href: `/${locale}/team`, label: c.team.back }]} />
    <main id="main-content" tabIndex={-1} className="team-page page-gutter">
      <article className="doctor-profile">
        <div className="doctor-profile-photo">
          <Image src={doctor.image.src} alt={c.team.portraitAlt.replace("{name}", name)} width={doctor.image.width} height={doctor.image.height} sizes="(max-width: 700px) 100vw, 45vw" priority />
        </div>
        <div className="doctor-profile-copy">
          <p className="eyebrow">{doctor.role[locale]}</p>
          <h1>{name}</h1>
          <p className="content-intro">{doctor.bio[locale]}</p>
        </div>
      </article>
      <TeamCta c={c} />
      <section className="doctor-others" aria-labelledby="other-doctors">
        <h2 id="other-doctors">{c.team.others}</h2>
        <div className="doctor-grid">{others.map((entry) => <DoctorCard key={entry.slug} doctor={entry} locale={locale} alt={c.team.portraitAlt} />)}</div>
      </section>
    </main>
  </div>;
}
