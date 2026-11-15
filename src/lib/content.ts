export const en = {
  meta: {
    title: "Zen Dental — Thoughtful dental care in Tbilisi",
    description: "A calmer approach to your smile. Meet Zen Dental at 63 Merab Kostava Street, Tbilisi, and get in touch to plan your visit.",
  },
  nav: { care: "Our care", approach: "Our approach", visit: "Find us", book: "Book a visit", menu: "Menu", close: "Close", label: "Main navigation", language: "Choose language", home: "Zen Dental home", skip: "Skip to content" },
  hero: {
    eyebrow: "DENTAL CARE, WITH A LITTLE MORE ZEN",
    lines: ["Your smile.", "In good hands."],
    description: "Thoughtful dentistry. A little more listening. A space to feel at ease.",
    cta: "Discover our approach", scroll: "Scroll to discover", location: "TBILISI, GEORGIA",
    imageAlt: "An ivory smile sculpture in a sunlit space with pale pink accents",
  },
  values: ["Time to listen", "Clarity at every step", "Care shaped around you"],
  care: {
    eyebrow: "THE WHOLE PICTURE",
    title: "A little care.\nA lasting difference.",
    description: "From your everyday routine to the questions you’ve been meaning to ask. Let’s find the right place to begin.",
    items: [
      { label: "PREVENTION", title: "Look after your smile.", text: "Make space for regular check-ups, professional cleaning, and the everyday habits that support your oral health.", link: "Ask about everyday care" },
      { label: "RESTORATION", title: "Feel like yourself.", text: "When a tooth needs attention, start with a conversation about your options and a clear plan for what comes next.", link: "Ask about restorative care" },
      { label: "SMILE CARE", title: "Find your confidence.", text: "Tell us what you’d like to change. We’ll talk through possibilities for your smile, at a pace that feels right for you.", link: "Talk about your smile" },
    ],
  },
  reviews: {
    eyebrow: "IN THEIR WORDS", title: "A little reassurance.\nFrom real patients.",
    description: "Selected excerpts from public Google reviews. Read the originals and more patient experiences on Google.",
    rating: "{rating} out of 5", count: "{count} Google reviews", checked: "Checked", all: "Read all reviews on Google", read: "Read original review", excerpt: "Excerpt · original in English", translated: "Translated excerpt · original in English",
  },
  statement: {
    eyebrow: "A MORE HUMAN APPROACH",
    text: "Good care starts with being heard. Your questions, your comfort, your smile. We make room for all of it.",
    cta: "Let’s start a conversation",
  },
  approach: {
    eyebrow: "THE ZEN APPROACH", title: "More understanding.\nA little more ease.",
    steps: [
      { label: "Listen", title: "First, we listen.", text: "What brought you here? What matters to you? Every visit starts with a conversation, and time for your questions." },
      { label: "Understand", title: "Then, we make it clear.", text: "We explain what we see and talk through the options in straightforward language, so you can make an informed choice." },
      { label: "Care", title: "A plan, made together.", text: "We agree on the next steps together. One step at a time, with your comfort and everyday life in mind." },
    ],
    next: "Next step", previous: "Previous step", stepLabel: "Care steps",
  },
  visit: {
    eyebrow: "COME SAY HELLO", title: "Your next visit\nstarts here.",
    description: "Find us on Merab Kostava Street in Tbilisi. Send a message or give us a call, and we’ll help you plan a visit.",
    hoursTitle: "Opening hours", weekdays: "Monday–Saturday", sunday: "Sunday", closed: "Closed",
    address: "63 Merab Kostava Street", city: "Tbilisi, Georgia", directions: "Get directions", call: "Call us", mapTitle: "Zen Dental location on Google Maps",
  },
  faq: {
    eyebrow: "BEFORE YOUR VISIT", title: "A few things\nyou might wonder.",
    items: [
      { question: "How can I book a visit?", answer: "Send us a message on Instagram or call +995 555 70 27 37. We’ll help you find a time that works." },
      { question: "Where can I find you?", answer: "We’re at 63 Merab Kostava Street, Tbilisi. Use the map above or open directions to plan your route." },
      { question: "What if I’m not sure what care I need?", answer: "That’s a good place to start a conversation. Tell us what’s on your mind, and we can help you work out a first step." },
    ],
  },
  closing: { eyebrow: "A LITTLE MORE ZEN", title: "Make room\nfor your smile.", cta: "Book a visit" },
  footer: { information: "Patient information", tagline: "Thoughtful dental care.\nTbilisi, Georgia.", instagram: "Instagram", call: "Call us", back: "Back to top", language: "Language", rights: "Zen Dental" },
};

export type Dictionary = typeof en;
export const locales = ["ka", "en", "ru"] as const;
export type Locale = (typeof locales)[number];
export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}
