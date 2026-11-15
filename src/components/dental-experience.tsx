"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Dictionary, Locale } from "@/lib/content";
import { clinic } from "@/lib/clinic";
import { googleReviews, googleReviewSnapshot } from "@/lib/reviews";

const { instagram, facebook, telephone: phone, googleMaps: directions, mapEmbed } = clinic;
const languages = [
  { locale: "ka", label: "ქართული", short: "KA" },
  { locale: "en", label: "English", short: "EN" },
  { locale: "ru", label: "Русский", short: "RU" },
] as const;

function Arrow() {
  return <svg className="arrow-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function Lines({ text }: { text: string }) {
  return <>{text.split("\n").map((line, index) => <span className="heading-line" key={index}>{index > 0 ? " " : ""}{line}</span>)}</>;
}

function LanguageLinks({ locale, label }: { locale: Locale; label: string }) {
  const [hash, setHash] = useState("");
  const router = useRouter();
  useEffect(() => {
    const update = () => setHash(window.location.hash);
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, [locale]);
  return <nav className="language-links" aria-label={label}>{languages.map((language) => <Link
    href={`/${language.locale}${hash}`} key={language.locale} hrefLang={language.locale} lang={language.locale}
    aria-current={language.locale === locale ? "page" : undefined} title={language.label}
    onClick={(event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      router.push(`/${language.locale}${window.location.hash}`);
    }}
  >{language.short}<span className="sr-only">, {language.label}</span></Link>)}</nav>;
}

export function DentalExperience({ locale, content: c, pages = [] }: { locale: Locale; content: Dictionary; pages?: { href: string; title: string }[] }) {
  const root = useRef<HTMLDivElement>(null);
  const [navScrolled, setNavScrolled] = useState(false);
  const [inputMethod, setInputMethod] = useState<"pointer" | "keyboard">("pointer");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeApproach, setActiveApproach] = useState(0);

  useEffect(() => {
    const update = () => setNavScrolled(window.scrollY > 48);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const scope = root.current!;
    const hero = scope.querySelector<HTMLElement>(".hero")!;
    const scene = scope.querySelector<HTMLElement>(".hero-scene")!;
    const photo = scope.querySelector<HTMLElement>(".hero-photo")!;
    const image = photo.querySelector("img")!;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let progress = 0;
    let target = 0;
    let lastTime = 0;
    const draw = (time: number) => {
      const elapsed = lastTime ? Math.min(time - lastTime, 64) : 16;
      lastTime = time;
      progress += (target - progress) * (1 - Math.exp(-elapsed / 120));
      if (Math.abs(target - progress) < 0.0001) progress = target;
      photo.style.transform = `translateY(${-2 + progress * 9}%) scale(${1.1 - progress * 0.1})`;
      const framing = Math.min(progress / 0.65, 1);
      scene.style.clipPath = `inset(0% ${framing * 2.6}% 0% ${framing * 2.6}% round 0px 0px ${framing * 48}px ${framing * 48}px)`;
      image.style.filter = `blur(${Math.max(0, Math.min((progress - 0.15) / 0.65, 1)) * 5}px)`;
      frame = progress === target ? 0 : requestAnimationFrame(draw);
    };
    const update = () => {
      if (motion.matches) return;
      const rect = hero.getBoundingClientRect();
      target = Math.max(0, Math.min(-rect.top / rect.height, 1));
      if (!frame) { lastTime = 0; frame = requestAnimationFrame(draw); }
    };
    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      progress = 0;
      photo.style.removeProperty("transform");
      scene.style.removeProperty("clip-path");
      image.style.removeProperty("filter");
      update();
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    motion.addEventListener("change", reset);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      motion.removeEventListener("change", reset);
      cancelAnimationFrame(frame);
      photo.style.removeProperty("transform");
      scene.style.removeProperty("clip-path");
      image.style.removeProperty("filter");
    };
  }, [locale]);

  useEffect(() => {
    if (menuOpen && inputMethod === "keyboard") document.querySelector<HTMLAnchorElement>("#main-navigation a")?.focus();
  }, [menuOpen]);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (!(event.target as Element).closest(".site-header")) setMenuOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1200px)");
    const closeOnDesktop = () => { if (desktop.matches) setMenuOpen(false); };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [menuOpen]);

  return <div className="dental-experience" ref={root} data-locale={locale} data-input-method={inputMethod}
    onKeyDownCapture={() => setInputMethod("keyboard")} onPointerDownCapture={() => setInputMethod("pointer")}>
    <a className="skip-link" href="#main-content">{c.nav.skip}</a>
    <header className={`site-header${navScrolled ? " is-scrolled" : ""}${menuOpen ? " menu-is-open" : ""}`} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setMenuOpen(false); }}>
      <Link className="wordmark" href={`/${locale}`} aria-label={c.nav.home}>zen dental<span className="brand-dot" /></Link>
      <nav id="main-navigation" className={`main-navigation ${menuOpen ? "is-open" : ""}`} aria-label={c.nav.label} onKeyDown={(event) => {
        if (event.key === "Escape") { setMenuOpen(false); document.getElementById("menu-toggle")?.focus(); }
      }}>
        <a href="#care" onClick={() => setMenuOpen(false)}>{c.nav.care}</a>
        <a href="#approach" onClick={() => setMenuOpen(false)}>{c.nav.approach}</a>
        <a href="#visit" onClick={() => setMenuOpen(false)}>{c.nav.visit}</a>
      </nav>
      <div className="header-actions">
        <LanguageLinks locale={locale} label={c.nav.language} />
        <a className="button button-small header-book" href={instagram} target="_blank" rel="noreferrer">{c.nav.book}<Arrow /></a>
        <button id="menu-toggle" className="menu-toggle" aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="sr-only">{menuOpen ? c.nav.close : c.nav.menu}</span><span className={menuOpen ? "menu-lines is-open" : "menu-lines"} aria-hidden="true"><i /><i /></span>
        </button>
      </div>
    </header>

    <main id="main-content" tabIndex={-1}>
      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-scene"><div className="hero-photo"><Image src="/images/zen-hero-wide.png" alt={c.hero.imageAlt} fill priority sizes="100vw" /></div><div className="hero-wash" /></div>
        <div className="hero-copy page-gutter">
          <p className="eyebrow">{c.hero.eyebrow}</p>
          <h1 id="hero-title">{c.hero.lines.map((line, index) => <span className="hero-line" key={index}><span className="hero-line-inner">{index > 0 ? " " : ""}{line}</span></span>)}</h1>
          <p className="hero-description">{c.hero.description}</p>
          <div className="hero-actions"><a className="button hero-cta" href="#visit">{c.hero.cta}<Arrow /></a></div>
        </div>
        <div className="hero-values">{c.values.map((value) => <p key={value}>{value}</p>)}</div>

      </section>

      <section className="care-intro section-space page-gutter" id="care">

        <h2><Lines text={c.care.title} /></h2>

      </section>

      <section className="care-gallery page-gutter" aria-label={c.nav.care}>
        {c.care.items.map((item) => <article className="care-card" key={item.title}>
          <h3>{item.title}</h3><p className="care-description">{item.text}</p>
        </article>)}
        <div className="care-contact"><a className="text-link" href="#visit">{c.care.contact}<Arrow /></a></div>
      </section>

      <section className="approach section-space page-gutter" id="approach">
        <div className="section-heading"><h2><Lines text={c.approach.title} /></h2></div>
        <div className="approach-layout">

          <div className="approach-copy">
            <div className="approach-tabs" role="tablist" aria-label={c.approach.stepLabel}>
              {c.approach.steps.map((step, index) => <button id={`approach-tab-${index}`} role="tab" aria-selected={activeApproach === index} aria-controls={`approach-panel-${index}`} tabIndex={activeApproach === index ? 0 : -1} key={step.label} onClick={() => setActiveApproach(index)} onKeyDown={(event) => {
                if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
                event.preventDefault();
                const total = c.approach.steps.length;
                const next = event.key === "Home" ? 0 : event.key === "End" ? total - 1 : (index + (event.key === "ArrowRight" ? 1 : total - 1)) % total;
                setActiveApproach(next); document.getElementById(`approach-tab-${next}`)?.focus();
              }}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{step.label}</button>)}
            </div>
            {c.approach.steps.map((step, index) => <div role="tabpanel" id={`approach-panel-${index}`} tabIndex={0} aria-labelledby={`approach-tab-${index}`} hidden={activeApproach !== index} className="approach-panel" key={step.label}><h3>{step.title}</h3><p>{step.text}</p><a className="text-link" href={instagram} target="_blank" rel="noreferrer">{c.nav.book}<Arrow /></a></div>)}
          </div>
        </div>
      </section>

      <section className="visit section-space page-gutter" id="visit">
        <div className="visit-copy"><h2><Lines text={c.visit.title} /></h2><address>{c.visit.address}<br />{c.visit.city}</address><div className="opening-hours"><h3>{c.visit.hoursTitle}</h3><dl><div><dt>{c.visit.weekdays}</dt><dd>{clinic.hours.opens}–{clinic.hours.closes}</dd></div><div><dt>{c.visit.sunday}</dt><dd>{c.visit.closed}</dd></div></dl></div><div className="visit-links"><a className="button" href={directions} target="_blank" rel="noreferrer">{c.visit.directions}<Arrow /></a><a className="phone-link" href={`tel:${phone}`}><span>{c.visit.call}</span>{clinic.phoneDisplay}</a></div></div>
        <div className="map-frame"><iframe src={mapEmbed} title={c.visit.mapTitle} width="600" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" /></div>
      </section>

      <section className="reviews section-space page-gutter" id="reviews" aria-labelledby="reviews-title">
        <div className="reviews-heading"><div><p className="eyebrow">{c.reviews.eyebrow}</p><h2 id="reviews-title"><Lines text={c.reviews.title} /></h2></div>
          <div className="reviews-summary"><p className="review-score" aria-label={c.reviews.rating.replace("{rating}", String(googleReviewSnapshot.rating))}>{googleReviewSnapshot.rating}<span aria-hidden="true"> / 5</span></p><p>{c.reviews.count.replace("{count}", String(googleReviewSnapshot.count))}</p><p className="review-checked">{c.reviews.checked} <time dateTime={googleReviewSnapshot.checkedOn}>{new Intl.DateTimeFormat(locale === "ka" ? "ka-GE" : locale === "ru" ? "ru-RU" : "en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${googleReviewSnapshot.checkedOn}T00:00:00Z`))}</time></p><a className="text-link" href={clinic.googleMaps} target="_blank" rel="noreferrer">{c.reviews.all}<Arrow /></a></div>
        </div>
        <div className="review-grid">{googleReviews.map((review) => <figure className="review-card" key={review.url}>
          <div className="review-card-top"><span className="review-stars" role="img" aria-label={c.reviews.rating.replace("{rating}", String(review.rating))}>★★★★★</span><span>Google</span></div>
          <blockquote><p>“{review.quote[locale]}”</p></blockquote><figcaption><strong>{review.author}</strong><span>{locale === "en" ? c.reviews.excerpt : c.reviews.translated}</span></figcaption>
          <a className="text-link" href={review.url} target="_blank" rel="noreferrer" aria-label={`${c.reviews.read}, ${review.author}`}>{c.reviews.read}<Arrow /></a>
        </figure>)}</div>
      </section>

      <section className="faq section-space page-gutter"><div><p className="eyebrow">{c.faq.eyebrow}</p><h2><Lines text={c.faq.title} /></h2></div><div className="faq-list">{c.faq.items.map((item) => <details key={item.question}><summary><span className="faq-question">{item.question}</span><span className="faq-icon" aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div></section>

      <section className="closing section-space page-gutter"><h2><Lines text={c.closing.title} /></h2><p className="closing-description">{c.closing.description}</p><div className="closing-actions"><a className="button button-light" href={instagram} target="_blank" rel="noreferrer">{c.closing.cta}<Arrow /></a><a className="text-link" href={`tel:${phone}`}>{c.visit.call}: {clinic.phoneDisplay}</a></div></section>
    </main>

    <footer className="site-footer page-gutter">{!!pages.length && <nav className="content-links" aria-label={c.footer.information}>{pages.map((page) => <Link className="text-link" key={page.href} href={page.href}>{page.title}<Arrow /></Link>)}</nav>}<div className="footer-top"><p><Lines text={c.footer.tagline} /></p><LanguageLinks locale={locale} label={c.footer.language} /><a className="text-link" href="#top">{c.footer.back}<span className="up-arrow"><Arrow /></span></a></div><div className="footer-wordmark" aria-hidden="true">zen dental<span>.</span></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {c.footer.rights}</span><a href={instagram} target="_blank" rel="noreferrer">{c.footer.instagram}</a><a href={facebook} target="_blank" rel="noreferrer">Facebook</a><a href={`tel:${phone}`}>{c.footer.call}</a><span>{c.visit.city}</span></div></footer>
  </div>;
}
