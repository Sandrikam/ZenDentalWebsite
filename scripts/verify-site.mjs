import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";

const base = process.argv[2];
const cases = [
  { locale: "ka", title: "სტომატოლოგიური კლინიკა თბილისში", hero: "სტომატოლოგია", map: "Zen Dental-ის მდებარეობა Google Maps-ზე" },
  { locale: "en", title: "Dental clinic in Tbilisi", hero: "Kostava Street", map: "Zen Dental location on Google Maps" },
  { locale: "ru", title: "Стоматологическая клиника в Тбилиси", hero: "Стоматология", map: "Zen Dental на Google Картах" },
];

if (base) {
  const root = await fetch(base, { redirect: "manual" });
  assert.equal(root.status, 307, "Root should redirect to the Georgian locale");
  assert.equal(new URL(root.headers.get("location"), base).pathname, "/ka");
} else {
  const routes = JSON.parse(await readFile(".next/routes-manifest.json", "utf8"));
  assert.ok(routes.redirects.some((route) => route.source === "/" && route.destination === "/ka" && route.statusCode === 307));
}

for (const { locale, title, hero, map } of cases) {
  let html;
  if (base) {
    const response = await fetch(`${base}/${locale}`);
    assert.equal(response.status, 200, `${locale} route`);
    html = await response.text();
  } else {
    html = await readFile(`.next/server/app/${locale}.html`, "utf8");
  }
  assert.ok(html.includes(`<html lang="${locale}"`), `${locale} document language`);
  assert.ok(html.includes(title), `${locale} translated metadata`);
  assert.ok(html.includes(hero), `${locale} translated heading`);
  assert.ok(html.includes(`rel="canonical" href="https://www.zendental.ge/${locale}"`), `${locale} canonical`);
  for (const language of ["ka", "en", "ru"]) {
    assert.ok(html.includes(`hrefLang="${language}"`) || html.includes(`hrefLang="${language.toLowerCase()}"`) || html.includes(`hreflang="${language}"`), `${locale} language link to ${language}`);
  }
  assert.ok(html.includes('src="https://www.google.com/maps/embed?pb='), `${locale} real map iframe`);
  assert.ok(html.includes("0x40440d40af7b7bd7%3A0x39841e9ce2094c29"), `${locale} exact supplied map location`);
  assert.ok(html.includes(`title="${map}"`), `${locale} localized map label`);
  assert.ok(html.includes('referrerPolicy="strict-origin-when-cross-origin"') || html.includes('referrerpolicy="strict-origin-when-cross-origin"'), `${locale} map referrer policy`);
  assert.ok(html.includes('href="tel:+995555702737"'), `${locale} phone link`);
  assert.ok(html.includes('name="robots" content="index, follow"'), `${locale} indexable metadata`);
  assert.ok(html.includes('property="og:image" content="https://www.zendental.ge/images/zen-hero-wide.png"'), `${locale} social image`);
  assert.ok(html.includes('name="twitter:card" content="summary_large_image"'), `${locale} large social card`);
  const jsonLd = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
  const entities = jsonLd.flatMap((document) => document["@graph"] ?? []);
  const clinic = entities.find((entity) => entity["@type"] === "Dentist");
  assert.equal(clinic?.telephone, "+995555702737", `${locale} structured contact`);
  assert.equal(clinic?.address.streetAddress, "63 Merab Kostava Street");
  assert.ok(!clinic?.aggregateRating, `${locale} no self-serving business review markup`);
  assert.equal(clinic?.geo.latitude, 41.7141394, `${locale} verified Google place pin`);
  assert.equal(clinic?.geo.longitude, 44.7826574);
  assert.equal(clinic?.openingHoursSpecification[0].opens, "10:00");
  assert.equal(clinic?.openingHoursSpecification[0].closes, "19:00");
  assert.equal(clinic?.openingHoursSpecification[0].dayOfWeek.length, 6);
  assert.ok(html.includes('id="reviews"'), `${locale} reviews section`);
  for (const source of ["WRbCrQXrzrxwxjAT8", "RtJH2HMRC3JYqkNh6"]) assert.ok(html.includes(`href="https://maps.app.goo.gl/${source}"`), `${locale} direct review source`);
  assert.ok(html.includes('dateTime="2026-11-15"') || html.includes('datetime="2026-11-15"'), `${locale} dated rating snapshot`);
  assert.ok(html.includes('tabindex="-1"') || html.includes('tabIndex="-1"'), `${locale} keyboard focus targets`);
  for (let index = 0; index < 3; index++) {
    assert.ok(html.includes(`id="approach-panel-${index}"`));
    assert.ok(html.includes(`aria-controls="approach-panel-${index}"`));
  }
  assert.equal(entities.find((entity) => entity["@type"] === "WebPage")?.url, `https://www.zendental.ge/${locale}`);
  const footer = html.match(/<footer[\s\S]*?<\/footer>/)?.[0] ?? "";
  assert.ok(footer.includes('href="https://www.instagram.com/zendental.ge/"'), `${locale} footer Instagram`);
  assert.ok(footer.includes('href="https://www.facebook.com/zendentaltbilisi"'), `${locale} footer Facebook`);
  assert.ok(clinic.sameAs.includes("https://www.facebook.com/zendentaltbilisi"), `${locale} structured social profile`);
  assert.ok(html.includes('class="button hero-cta" href="#visit"'), `${locale} consultation links to clinic contact details`);
  const header = html.match(/<header[\s\S]*?<\/header>/)?.[0] ?? "";
  assert.ok(!header.includes("Book a visit") && !header.includes("ვიზიტის დაჯავშნა") && !header.includes("Записаться на приём"), `${locale} contact labels do not promise online booking`);
  const consultation = { ka: "უფასო კონსულტაცია", en: "Free consultation", ru: "Бесплатная консультация" }[locale];
  assert.ok(html.includes(consultation), `${locale} confirmed free-consultation offer`);
  assert.ok(!html.includes(String.fromCharCode(0x2014)), `${locale} no em dashes`);
  assert.ok(!html.includes("Unterminated string"), `${locale} syntax error absent`);
  console.log(`PASS /${locale}: language, translations, SEO, map, contact links`);
}

if (base) {
  const invalid = await fetch(`${base}/de`);
  assert.equal(invalid.status, 404, "Unsupported locale should return 404");
  const image = await fetch(`${base}/images/zen-hero.png`, { method: "HEAD" });
  assert.equal(image.status, 200, "Hero image should be available");
} else {
  const prerender = JSON.parse(await readFile(".next/prerender-manifest.json", "utf8"));
  assert.equal(prerender.dynamicRoutes["/[locale]"].fallback, false, "Unsupported locales have no dynamic fallback");
  assert.equal(prerender.dynamicRoutes["/[locale]/[...path]"].fallback, false, "Unpublished content has no public fallback");
  for (const asset of ["zen-hero.png", "zen-hero-wide.png"]) {
    assert.ok((await stat(`public/images/${asset}`)).size > 0);
  }
  const robots = await readFile(".next/server/app/robots.txt.body", "utf8");
  assert.ok(robots.includes("Sitemap: https://www.zendental.ge/sitemap.xml"));
  const sitemap = await readFile(".next/server/app/sitemap.xml.body", "utf8");
  assert.equal((sitemap.match(/<loc>/g) ?? []).length, 3, "Only published locale URLs in sitemap");
  for (const { locale } of cases) {
    assert.ok(sitemap.includes(`<loc>https://www.zendental.ge/${locale}</loc>`));
    assert.ok(sitemap.includes(`hreflang="${locale}"`));
  }
}
console.log("PASS root redirect, unsupported locale, and image availability");
