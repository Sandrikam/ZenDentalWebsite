import type { Locale } from "@/lib/content";

type Localized = Record<Locale, string>;

export type Doctor = {
  slug: string;
  image: { src: string; width: number; height: number };
  name: Localized;
  role: Localized;
  bio: Localized;
  /**
   * True while the profile only has a name and photo. Placeholder profiles are
   * visible on the site but kept out of search (noindex, no sitemap, no Person
   * schema). Set to false once the clinic approves the real role and bio.
   */
  placeholder: boolean;
};

const genericRole: Localized = { ka: "სტომატოლოგი", en: "Dentist", ru: "Стоматолог" };

function genericBio(name: Localized): Localized {
  return {
    ka: `${name.ka} Zen Dental-ის გუნდის წევრია. ექიმის სრული პროფილი მალე დაემატება.`,
    en: `${name.en} is part of the Zen Dental team. A full profile will be added soon.`,
    ru: `${name.ru} работает в команде Zen Dental. Полный профиль врача скоро появится.`,
  };
}

function doctor(slug: string, name: Localized, image: Doctor["image"], role: Localized = genericRole): Doctor {
  return { slug, image, name, role, bio: genericBio(name), placeholder: true };
}

// Confirmed by the clinic owner, 16 Nov 2026.
const headDoctorRole: Localized = { ka: "მთავარი ექიმი", en: "Head Doctor", ru: "Главный врач" };

const portrait = (slug: string, width = 1200, height = 1500) => ({ src: `/images/team/${slug}.jpg`, width, height });

// Names and photos supplied by the clinic. Roles and bios are generic until the
// clinic sends approved details (see content/templates/doctor.md).
export const doctors: Doctor[] = [
  doctor("iren-zentek", { ka: "ირენ ზენტეკ", en: "Iren Zentek", ru: "Ирен Зентек" }, portrait("iren-zentek"), headDoctorRole),
  doctor("eka-machavariani", { ka: "ეკა მაჭავარიანი", en: "Eka Machavariani", ru: "Эка Мачавариани" }, portrait("eka-machavariani")),
  doctor("tamar-archvadze", { ka: "თამარ არჩვაძე", en: "Tamar Archvadze", ru: "Тамар Арчвадзе" }, portrait("tamar-archvadze", 1199)),
  doctor("ilona-tsatsua", { ka: "ილონა ცაცუა", en: "Ilona Tsatsua", ru: "Илона Цацуа" }, portrait("ilona-tsatsua", 1199)),
  doctor("ilia-abelashvili", { ka: "ილია აბელაშვილი", en: "Ilia Abelashvili", ru: "Илья Абелашвили" }, portrait("ilia-abelashvili", 1199)),
  doctor("ani-abesadze", { ka: "ანი აბესაძე", en: "Ani Abesadze", ru: "Ани Абесадзе" }, portrait("ani-abesadze", 872, 1090)),
  doctor("levan-kobachishvili", { ka: "ლევან კობაჩიშვილი", en: "Levan Kobachishvili", ru: "Леван Кобачишвили" }, portrait("levan-kobachishvili", 482, 602)),
];

export const teamIsIndexable = doctors.some((entry) => !entry.placeholder);

export function findDoctor(slug: string) {
  return doctors.find((entry) => entry.slug === slug);
}
