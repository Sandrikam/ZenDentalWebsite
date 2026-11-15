export const en = {
  "meta": {
    "title": "Zen Dental | Dental clinic in Tbilisi",
    "description": "Free consultation at Zen Dental, 63 Merab Kostava Street, Tbilisi. No commitment to treatment. Open Monday to Saturday, 10:00–19:00. Call or message the clinic."
  },
  "nav": {
    "care": "Our care",
    "approach": "Your visit",
    "visit": "Find us",
    "book": "Message us",
    "menu": "Menu",
    "close": "Close",
    "label": "Main navigation",
    "language": "Choose language",
    "home": "Zen Dental home",
    "skip": "Skip to content"
  },
  "hero": {
    "eyebrow": "Zen Dental · Tbilisi",
    "lines": [
      "Dental care on",
      "Kostava Street"
    ],
    "description": "Free consultation. No commitment to treatment.",
    "cta": "Free consultation",
    "imageAlt": "An ivory smile sculpture in a sunlit space with pale pink accents"
  },
  "values": [
    "63 Merab Kostava Street",
    "Mon–Sat, 10:00–19:00"
  ],
  "care": {
    "title": "Our care",
    "contact": "Contact the clinic",
    "items": [
      {
        "title": "Check-ups and cleaning",
        "text": "Regular visits and day-to-day care for your teeth."
      },
      {
        "title": "Tooth repair",
        "text": "Pain, damage or previous treatment? Tell us what needs attention."
      },
      {
        "title": "Your smile",
        "text": "Discuss the changes you have in mind."
      }
    ]
  },
  "approach": {
    "title": "Your first visit",
    "steps": [
      {
        "label": "Talk",
        "title": "Tell us what is bothering you",
        "text": "Bring your questions and any previous treatment details."
      },
      {
        "label": "Understand",
        "title": "Talk through your options",
        "text": "Ask the dentist to explain the findings and possible next steps."
      },
      {
        "label": "Decide",
        "title": "Agree on the next step",
        "text": "Discuss timing and treatment costs before making a decision."
      }
    ],
    "stepLabel": "Topics for your visit"
  },
  "visit": {
    "title": "Find us",
    "hoursTitle": "Opening hours",
    "weekdays": "Monday–Saturday",
    "sunday": "Sunday",
    "closed": "Closed",
    "address": "63 Merab Kostava Street",
    "city": "Tbilisi, Georgia",
    "directions": "Get directions",
    "call": "Call us",
    "mapTitle": "Zen Dental location on Google Maps"
  },
  "reviews": {
    "eyebrow": "Google",
    "title": "Selected patient reviews",
    "rating": "{rating} out of 5",
    "count": "{count} Google reviews",
    "checked": "Checked",
    "all": "Read all reviews on Google",
    "read": "Read original review",
    "excerpt": "Excerpt · original in English",
    "translated": "Translated excerpt · original in English"
  },
  "faq": {
    "eyebrow": "Practical questions",
    "title": "Before your visit",
    "items": [
      {
        "question": "Is the consultation free?",
        "answer": "Yes. Free, with no commitment to treatment."
      },
      {
        "question": "How do I arrange a visit?",
        "answer": "Call +995 555 70 27 37 or message us on Instagram."
      },
      {
        "question": "Where is the clinic?",
        "answer": "63 Merab Kostava Street, Tbilisi. See the map above for directions."
      },
      {
        "question": "Not sure which treatment you need?",
        "answer": "Start with a consultation and discuss your questions with the dentist."
      }
    ]
  },
  "closing": {
    "title": "Free consultation",
    "cta": "Message on Instagram",
    "description": "No commitment to treatment"
  },
  "footer": {
    "information": "Patient information",
    "tagline": "63 Merab Kostava Street\nTbilisi, Georgia",
    "instagram": "Instagram",
    "call": "Call us",
    "back": "Back to top",
    "language": "Language",
    "rights": "Zen Dental"
  }
};

export type Dictionary = typeof en;
export const locales = ["ka", "en", "ru"] as const;
export type Locale = (typeof locales)[number];
export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}
