import Link from "next/link";
import type { Locale } from "@/lib/content";
import { LanguageMenu } from "./language-menu";

/** Header for pages outside the homepage. `path` is the route without the locale, e.g. "/team". */
export function SubpageHeader({ locale, path, links, languageLabel }: {
  locale: Locale;
  path: string;
  links: { href: string; label: string }[];
  languageLabel: string;
}) {
  return <header className="content-header page-gutter">
    <Link className="wordmark" href={`/${locale}`}>zen dental<span className="brand-dot" /></Link>
    <div className="content-header-actions">
      {links.map((link) => <Link className="text-link" key={link.href} href={link.href}>{link.label}</Link>)}
      <LanguageMenu locale={locale} label={languageLabel} path={path} />
    </div>
  </header>;
}

export function Arrow() {
  return <svg className="arrow-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
