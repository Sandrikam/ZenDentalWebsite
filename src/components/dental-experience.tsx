"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Dictionary, Locale } from "@/lib/content";
import { SmileField } from "./smile-field";
import { clinic } from "@/lib/clinic";
import { googleReviews, googleReviewSnapshot } from "@/lib/reviews";

const { instagram, facebook, telephone: phone, googleMaps: directions, mapEmbed } = clinic;
const languages = [
  { locale: "ka", label: "ქართული", short: "KA" },
  { locale: "en", label: "English", short: "EN" },
  { locale: "ru", label: "Русский", short: "RU" },
] as const;

function Arrow({ down = false }: { down?: boolean }) {
  return <svg className={down ? "arrow-icon arrow-down" : "arrow-icon"} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function Lines({ text }: { text: string }) {
  return <>{text.split("\n").map((line, index) => <span className="heading-line" key={index}>{line}</span>)}</>;
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
  const [inputMethod, setInputMethod] = useState<"pointer" | "keyboard">("pointer");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeApproach, setActiveApproach] = useState(0);
  const [navCompact, setNavCompact] = useState(false);
  const [navHidden, setNavHidden] = useState(false);

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

  useEffect(() => {
    let previous = window.scrollY;
    let lastDirectionPosition = previous;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setNavCompact(y > 48);
      if (Math.abs(y - lastDirectionPosition) > 8 || y < 100) {
        const headerFocused = document.activeElement?.closest(".site-header");
        setNavHidden(!menuOpen && !headerFocused && y > previous && y > 220);
        lastDirectionPosition = y;
      }
      previous = y;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", onScroll); };
  }, [menuOpen]);

  useEffect(() => {
    let cancelled = false;
    let dispose: (() => void) | undefined;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled || !root.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const scope = root.current!;
        const query = gsap.utils.selector(scope);
        gsap.from(query(".hero-line-inner"), { yPercent: 110, opacity: 0, duration: 1.2, stagger: 0.14, ease: "power3.out" });
        gsap.from(query(".hero-intro, .hero-cta"), { y: 22, opacity: 0, duration: 0.9, delay: 0.45, stagger: 0.13, ease: "power2.out" });
        gsap.fromTo(query(".hero-photo"), { scale: 1.1, yPercent: -2 }, {
          scale: 1, yPercent: 7, ease: "none",
          scrollTrigger: { trigger: query(".hero"), start: "top top", end: "bottom top", scrub: 0.7 },
        });
        gsap.to(query(".hero-copy"), {
          y: -65, opacity: 0, ease: "none",
          scrollTrigger: { trigger: query(".hero"), start: "top top", end: "60% top", scrub: 0.5 },
        });
        gsap.to(query(".hero-scene"), {
          clipPath: "inset(0% 2.6% 0% 2.6% round 0px 0px 48px 48px)", ease: "none",
          scrollTrigger: { trigger: query(".hero"), start: "top top", end: "65% top", scrub: 0.5 },
        });
        gsap.to(query(".hero-photo img"), {
          filter: "blur(5px)", ease: "none",
          scrollTrigger: { trigger: query(".hero"), start: "15% top", end: "80% top", scrub: 0.5 },
        });
        query(".care-card").forEach((element: Element, index: number) => {
          gsap.from(element, { y: 55, duration: 1.1, delay: index * 0.09, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 92%", once: true } });
        });
        query("[data-reveal]").forEach((element: Element) => {
          gsap.from(element, { y: 32, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 90%", once: true } });
        });
        gsap.fromTo(query(".statement-word"), { color: "#75646d" }, {
          color: "#302b2c", stagger: 0.16, ease: "none",
          scrollTrigger: { trigger: query(".statement-text"), start: "top 78%", end: "bottom 42%", scrub: 0.5 },
        });
        gsap.to(query(".footer-wordmark"), { yPercent: -9, ease: "none", scrollTrigger: { trigger: query(".site-footer"), start: "top bottom", end: "bottom bottom", scrub: 0.8 } });
      }, root);
      // Font loading changes the height of the Georgian and Cyrillic headings.
      document.fonts.ready.then(() => { if (!cancelled) ScrollTrigger.refresh(); });
      dispose = () => media.revert();
    }).catch(() => {
      // Progressive enhancement: the complete static page remains usable.
    });
    return () => { cancelled = true; dispose?.(); };
  }, [locale]);

  return <div className="dental-experience" ref={root} data-locale={locale} data-input-method={inputMethod}
    onKeyDownCapture={() => setInputMethod("keyboard")} onPointerDownCapture={() => setInputMethod("pointer")}>
    <a className="skip-link" href="#main-content">{c.nav.skip}</a>
    <header className={`site-header ${navCompact ? "is-compact" : ""} ${navHidden && !menuOpen ? "is-hidden" : ""}`} onFocusCapture={() => setNavHidden(false)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setMenuOpen(false); }}>
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
          <p className="eyebrow hero-intro">{c.hero.eyebrow}</p>
          <h1 id="hero-title">{c.hero.lines.map((line, index) => <span className="hero-line" key={index}><span className="hero-line-inner">{line}</span></span>)}</h1>
          <p className="hero-description hero-intro">{c.hero.description}</p>
          <a className="button hero-cta" href="#care">{c.hero.cta}<Arrow /></a>
        </div>
        <div className="hero-values">{c.values.map((value) => <p key={value}>{value}</p>)}</div>
        <div className="hero-bottom page-gutter"><a href="#care" className="scroll-link"><span className="scroll-dot" />{c.hero.scroll}<Arrow down /></a><span className="location-label">{c.hero.location}</span></div>
      </section>

      <section className="care-intro section-space page-gutter" id="care">
        <p className="eyebrow" data-reveal>{c.care.eyebrow}</p>
        <h2 data-reveal><Lines text={c.care.title} /></h2>
        <p className="section-description" data-reveal>{c.care.description}</p>
      </section>

      <section className="care-gallery page-gutter" aria-label={c.nav.care}>
        {c.care.items.map((item, index) => <article className="care-card" key={item.label}>
          <div className={`story-art story-art-${index}`}>
            {index === 0 ? <Image src="/images/zen-hero.png" alt="" fill sizes="(max-width: 700px) 90vw, 33vw" /> : index === 1 ? <SmileField still={inputMethod === "keyboard"} /> : <div className="smile-ribbons" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>}
            <p className="card-label"><span>0{index + 1}</span>{item.label}</p>
          </div>
          <div className="care-card-copy"><h3>{item.title}</h3><p>{item.text}</p><a className="text-link" href={instagram} target="_blank" rel="noreferrer">{item.link}<Arrow /></a></div>
        </article>)}
      </section>

      <section className="statement section-space page-gutter">
        <p className="eyebrow" data-reveal>{c.statement.eyebrow}</p>
        <h2 className="statement-text" aria-label={c.statement.text}><span aria-hidden="true">{c.statement.text.split(/\s+/).map((word, index) => <span className="statement-word" key={index}>{word}{" "}</span>)}</span></h2>
        <a className="button button-outline" href={instagram} target="_blank" rel="noreferrer" data-reveal>{c.statement.cta}<Arrow /></a>
      </section>

      <section className="approach section-space page-gutter" id="approach">
        <div className="section-heading"><p className="eyebrow" data-reveal>{c.approach.eyebrow}</p><h2 data-reveal><Lines text={c.approach.title} /></h2></div>
        <div className="approach-layout">
          <div className="approach-visual"><SmileField phase={activeApproach} still={inputMethod === "keyboard"} /><div className="visual-corners" aria-hidden="true"><i /><i /><i /><i /></div><span className="visual-caption">ZEN DENTAL / TBILISI</span></div>
          <div className="approach-copy">
            <div className="approach-tabs" role="tablist" aria-label={c.approach.stepLabel}>
              {c.approach.steps.map((step, index) => <button id={`approach-tab-${index}`} role="tab" aria-selected={activeApproach === index} aria-controls={`approach-panel-${index}`} tabIndex={activeApproach === index ? 0 : -1} key={step.label} onClick={() => setActiveApproach(index)} onKeyDown={(event) => {
                if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
                event.preventDefault();
                const total = c.approach.steps.length;
                const next = event.key === "Home" ? 0 : event.key === "End" ? total - 1 : (index + (event.key === "ArrowRight" ? 1 : total - 1)) % total;
                setActiveApproach(next); document.getElementById(`approach-tab-${next}`)?.focus();
              }}><span>0{index + 1}</span>{step.label}</button>)}
            </div>
            {c.approach.steps.map((step, index) => <div role="tabpanel" id={`approach-panel-${index}`} tabIndex={0} aria-labelledby={`approach-tab-${index}`} hidden={activeApproach !== index} className="approach-panel" key={step.label}><span className="panel-index" aria-hidden="true">0{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p><a className="text-link" href={instagram} target="_blank" rel="noreferrer">{c.nav.book}<Arrow /></a></div>)}
          </div>
        </div>
      </section>

      <section className="visit section-space page-gutter" id="visit">
        <div className="visit-copy"><p className="eyebrow" data-reveal>{c.visit.eyebrow}</p><h2 data-reveal><Lines text={c.visit.title} /></h2><p className="section-description" data-reveal>{c.visit.description}</p><address>{c.visit.address}<br />{c.visit.city}</address><div className="opening-hours"><h3>{c.visit.hoursTitle}</h3><dl><div><dt>{c.visit.weekdays}</dt><dd>{clinic.hours.opens}–{clinic.hours.closes}</dd></div><div><dt>{c.visit.sunday}</dt><dd>{c.visit.closed}</dd></div></dl></div><div className="visit-links"><a className="button" href={directions} target="_blank" rel="noreferrer">{c.visit.directions}<Arrow /></a><a className="phone-link" href={`tel:${phone}`}><span>{c.visit.call}</span>{clinic.phoneDisplay}</a></div></div>
        <div className="map-frame"><iframe src={mapEmbed} title={c.visit.mapTitle} width="600" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" /></div>
      </section>

      <section className="reviews section-space page-gutter" id="reviews" aria-labelledby="reviews-title">
        <div className="reviews-heading"><div><p className="eyebrow">{c.reviews.eyebrow}</p><h2 id="reviews-title"><Lines text={c.reviews.title} /></h2><p className="section-description">{c.reviews.description}</p></div>
          <div className="reviews-summary"><p className="review-score" aria-label={c.reviews.rating.replace("{rating}", String(googleReviewSnapshot.rating))}>{googleReviewSnapshot.rating}<span aria-hidden="true"> / 5</span></p><p>{c.reviews.count.replace("{count}", String(googleReviewSnapshot.count))}</p><p className="review-checked">{c.reviews.checked} <time dateTime={googleReviewSnapshot.checkedOn}>{new Intl.DateTimeFormat(locale === "ka" ? "ka-GE" : locale === "ru" ? "ru-RU" : "en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${googleReviewSnapshot.checkedOn}T00:00:00Z`))}</time></p><a className="text-link" href={clinic.googleMaps} target="_blank" rel="noreferrer">{c.reviews.all}<Arrow /></a></div>
        </div>
        <div className="review-grid">{googleReviews.map((review) => <figure className="review-card" key={review.url}>
          <div className="review-card-top"><span className="review-stars" role="img" aria-label={c.reviews.rating.replace("{rating}", String(review.rating))}>★★★★★</span><span>Google</span></div>
          <blockquote><p>“{review.quote[locale]}”</p></blockquote><figcaption><strong>{review.author}</strong><span>{locale === "en" ? c.reviews.excerpt : c.reviews.translated}</span></figcaption>
          <a className="text-link" href={review.url} target="_blank" rel="noreferrer" aria-label={`${c.reviews.read}, ${review.author}`}>{c.reviews.read}<Arrow /></a>
        </figure>)}</div>
      </section>

      <section className="faq section-space page-gutter"><div><p className="eyebrow" data-reveal>{c.faq.eyebrow}</p><h2 data-reveal><Lines text={c.faq.title} /></h2></div><div className="faq-list">{c.faq.items.map((item) => <details key={item.question}><summary><span className="faq-question">{item.question}</span><span className="faq-icon" aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div></section>

      <section className="closing section-space page-gutter"><div className="closing-orbit" aria-hidden="true"><i /><i /><i /></div><p className="eyebrow" data-reveal>{c.closing.eyebrow}</p><h2 data-reveal><Lines text={c.closing.title} /></h2><a className="button button-light" href={instagram} target="_blank" rel="noreferrer" data-reveal>{c.closing.cta}<Arrow /></a></section>
    </main>

    <footer className="site-footer page-gutter">{!!pages.length && <nav className="content-links" aria-label={c.footer.information}>{pages.map((page) => <Link className="text-link" key={page.href} href={page.href}>{page.title}<Arrow /></Link>)}</nav>}<div className="footer-top"><p><Lines text={c.footer.tagline} /></p><LanguageLinks locale={locale} label={c.footer.language} /><a className="text-link" href="#top">{c.footer.back}<span className="up-arrow"><Arrow /></span></a></div><div className="footer-wordmark" aria-hidden="true">zen dental<span>.</span></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {c.footer.rights}</span><a href={instagram} target="_blank" rel="noreferrer">{c.footer.instagram}<Arrow /></a><a href={facebook} target="_blank" rel="noreferrer">Facebook<Arrow /></a><a href={`tel:${phone}`}>{c.footer.call}<Arrow /></a><span>{c.visit.city}</span></div></footer>
  </div>;
}
