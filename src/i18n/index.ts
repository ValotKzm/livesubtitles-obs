import { en, type Dictionary } from './en';
import { fr } from './fr';

export const locales = ['en', 'fr'] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = { en: 'English', fr: 'Français' };

const dictionaries: Record<Locale, Dictionary> = { en, fr };

export function getDictionary(locale: Locale): Dictionary {
	return dictionaries[locale];
}

export { links } from './links';
export type { Dictionary };
