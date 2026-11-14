import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";

const base = process.argv[2];
const cases = [
  { locale: "ka", title: "სტომატოლოგიური ზრუნვა თბილისში", hero: "თქვენი ღიმილი.", map: "Zen Dental-ის მდებარეობა Google Maps-ზე" },
  { locale: "en", title: "Thoughtful dental care in Tbilisi", hero: "Your smile.", map: "Zen Dental location on Google Maps" },
  { locale: "ru", title: "внимательная стоматология в Тбилиси", hero: "Ваша улыбка.", map: "Zen Dental на Google Картах" },
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
  for (const asset of ["zen-hero.png", "zen-hero-wide.png"]) {
    assert.ok((await stat(`public/images/${asset}`)).size > 0);
  }
}
console.log("PASS root redirect, unsupported locale, and image availability");
