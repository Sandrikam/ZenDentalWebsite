import type { Locale } from "@/lib/content";

type Localized = Record<Locale, string>;

export type ClinicPhoto = {
  src: string;
  width: number;
  height: number;
  /** Grid placement on desktop: "wide" spans two columns, "tall" spans two rows. */
  layout?: "wide" | "tall" | "feature";
  label: Localized;
  alt: Localized;
};

// Photos supplied by the clinic (content/125 ZenDental). Originals stay out of git.
export const clinicPhotos: ClinicPhoto[] = [
  {
    src: "/images/clinic/reception.jpg", width: 1600, height: 1057, layout: "feature",
    label: { ka: "მიმღები", en: "Reception", ru: "Ресепшн" },
    alt: { ka: "Zen Dental-ის მიმღები, ადმინისტრატორი პაციენტს ესაუბრება", en: "Zen Dental reception desk with the administrator greeting a patient", ru: "Ресепшн Zen Dental: администратор встречает пациента" },
  },
  {
    src: "/images/clinic/treatment-room.jpg", width: 1600, height: 1057,
    label: { ka: "სამკურნალო კაბინეტი", en: "Treatment room", ru: "Лечебный кабинет" },
    alt: { ka: "ნათელი სამკურნალო კაბინეტი სტომატოლოგიური სავარძლით", en: "Bright treatment room with a dental chair", ru: "Светлый лечебный кабинет со стоматологическим креслом" },
  },
  {
    src: "/images/clinic/building.jpg", width: 792, height: 1200, layout: "tall",
    label: { ka: "მერაბ კოსტავას ქუჩა 63", en: "63 Merab Kostava Street", ru: "Ул. Мераба Костава, 63" },
    alt: { ka: "კლინიკის შენობა მერაბ კოსტავას ქუჩაზე", en: "The clinic building on Merab Kostava Street", ru: "Здание клиники на улице Мераба Костава" },
  },
  {
    src: "/images/clinic/waiting-area.jpg", width: 1600, height: 1057,
    label: { ka: "მოსაცდელი", en: "Waiting area", ru: "Зона ожидания" },
    alt: { ka: "მოსაცდელი სივრცე სავარძლებით და წყლის აპარატით", en: "Waiting area with chairs and a water cooler", ru: "Зона ожидания с креслами и кулером" },
  },
  {
    src: "/images/clinic/treatment-rooms.jpg", width: 1600, height: 1057, layout: "wide",
    label: { ka: "სამკურნალო კაბინეტები", en: "Treatment rooms", ru: "Лечебные кабинеты" },
    alt: { ka: "ორი სამკურნალო კაბინეტი სტომატოლოგიური სავარძლებით", en: "Two treatment rooms with dental chairs", ru: "Два лечебных кабинета со стоматологическими креслами" },
  },
  {
    src: "/images/clinic/sterilization.jpg", width: 1600, height: 1200,
    label: { ka: "სტერილიზაცია", en: "Sterilization", ru: "Стерилизация" },
    alt: { ka: "ავტოკლავი და ინსტრუმენტების შესაფუთი აპარატი სტერილიზაციის ოთახში", en: "Autoclave and instrument packaging machine in the sterilization room", ru: "Автоклав и аппарат для упаковки инструментов в стерилизационной" },
  },
  {
    src: "/images/clinic/treatment-room-2.jpg", width: 1600, height: 1057,
    label: { ka: "სამკურნალო კაბინეტი", en: "Treatment room", ru: "Лечебный кабинет" },
    alt: { ka: "სამკურნალო კაბინეტი წითელი სტომატოლოგიური სავარძლით", en: "Treatment room with a red dental chair", ru: "Лечебный кабинет с красным стоматологическим креслом" },
  },
];
