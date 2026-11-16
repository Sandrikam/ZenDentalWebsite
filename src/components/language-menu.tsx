"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import type { Locale } from "@/lib/content";

const languages = [
  { locale: "ka", label: "ქართული", short: "KA" },
  { locale: "en", label: "English", short: "EN" },
  { locale: "ru", label: "Русский", short: "RU" },
] as const;

/**
 * Navbar language dropdown. `path` is the current route without the locale
 * (e.g. "/team"); `keepHash` carries the homepage section anchor across languages.
 */
export function LanguageMenu({ locale, label, path = "", keepHash = false }: {
  locale: Locale;
  label: string;
  path?: string;
  keepHash?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [hash, setHash] = useState("");
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const listId = useId();
  const current = languages.find((language) => language.locale === locale)!;

  useEffect(() => {
    if (!keepHash) return;
    const update = () => setHash(window.location.hash);
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, [keepHash]);

  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      trigger.current?.focus();
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  return <div className="language-menu" ref={root} onBlur={(event) => {
    if (!root.current?.contains(event.relatedTarget)) setOpen(false);
  }}>
    <button ref={trigger} type="button" className="language-trigger" aria-expanded={open} aria-controls={listId}
      onClick={() => setOpen(!open)}>
      <span className="sr-only">{label}: </span>
      <span lang={locale}>{current.short}<span className="sr-only">, {current.label}</span></span>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M3 4.5 6 7.5l3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </button>
    <ul id={listId} className={`language-list${open ? " is-open" : ""}`}>
      {languages.map((language) => <li key={language.locale}>
        <Link href={`/${language.locale}${path}${hash}`} hrefLang={language.locale} lang={language.locale}
          aria-current={language.locale === locale ? "page" : undefined} onClick={() => setOpen(false)}>
          {language.label}<span className="language-code" aria-hidden="true">{language.short}</span>
        </Link>
      </li>)}
    </ul>
  </div>;
}
