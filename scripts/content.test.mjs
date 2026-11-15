import assert from "node:assert/strict";
import { test } from "node:test";
import { clinicPages, publishedPages } from "../src/content/pages.ts";

test("content is published only after approval and a complete locale", () => {
  const translation = { title: "Fixture title", description: "Fixture description", intro: "Fixture introduction", sections: [{ heading: "Details", paragraphs: ["Approved fixture content."] }] };
  const fixture = { kind: "service", path: "services/test-only", status: "draft", approvedBy: "", translations: { en: translation } };
  const original = [...clinicPages];
  try {
    clinicPages.splice(0, clinicPages.length, fixture);
    assert.deepEqual(publishedPages("en"), [], "drafts have no route");
    fixture.status = "published";
    assert.deepEqual(publishedPages("en"), [], "an approver is required");
    fixture.approvedBy = "Clinic reviewer";
    assert.equal(publishedPages("en").length, 1);
    assert.deepEqual(publishedPages("ka"), [], "missing translations are not fabricated");
    fixture.translations.en = { ...translation, sections: [] };
    assert.deepEqual(publishedPages("en"), [], "empty placeholders stay unpublished");
    fixture.translations.en = { ...translation, sections: [{ heading: "Details", paragraphs: [" "] }] };
    assert.deepEqual(publishedPages("en"), [], "blank content stays unpublished");
  } finally {
    clinicPages.splice(0, clinicPages.length, ...original);
  }
});
