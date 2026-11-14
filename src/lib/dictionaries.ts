import { en, type Dictionary, type Locale } from "./content";

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  if (locale === "ka") return (await import("./locales/ka")).ka;
  if (locale === "ru") return (await import("./locales/ru")).ru;
  return en;
}
