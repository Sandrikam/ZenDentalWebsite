import type { Dictionary } from "@/lib/content";
import { clinic } from "@/lib/clinic";
import { Arrow } from "./subpage-header";

export function TeamCta({ c }: { c: Dictionary }) {
  return <section className="closing team-cta">
    <h2>{c.team.ctaTitle}</h2>
    <p className="closing-description">{c.team.ctaText}</p>
    <div className="closing-actions">
      <a className="button button-light" href={clinic.instagram} target="_blank" rel="noreferrer">{c.closing.cta}<Arrow /></a>
      <a className="text-link" href={`tel:${clinic.telephone}`}>{c.visit.call}: {clinic.phoneDisplay}</a>
    </div>
  </section>;
}
