import { en } from "./en";
import { es } from "./es";
import type { TranslationKeys } from "./en";

export const languages = {
  en: "English",
  es: "Español",
} as const;

export type Lang = keyof typeof languages;

const translations: Record<Lang, TranslationKeys> = {
  en,
  es,
};

/**
 * Detecta el idioma desde la URL usando BASE_URL de Astro
 */
export function getLang(url: URL, base: string): Lang {
  const path = url.pathname.replace(base, "");
  if (path.startsWith("es/") || path === "es") return "es";
  return "en";
}

/**
 * Retorna el objeto de traducciones para el idioma dado
 */
export function useTranslations(lang: Lang): TranslationKeys {
  return translations[lang];
}

/**
 * Retorna la ruta alternativa al idioma opuesto
 * Útil para el hreflang y el language switcher
 */
export function getAlternatePath(url: URL, base: string): string {
  const path = url.pathname.replace(base, "");
  const cleanBase = base.endsWith("/") ? base : base + "/";

  if (path.startsWith("es/") || path === "es") {
    // Estamos en ES → ruta alterna es EN (raíz)
    const enPath = path.replace(/^es\/?/, "");
    return cleanBase + enPath;
  } else {
    // Estamos en EN → ruta alterna es ES
    return cleanBase + "es/" + path;
  }
}