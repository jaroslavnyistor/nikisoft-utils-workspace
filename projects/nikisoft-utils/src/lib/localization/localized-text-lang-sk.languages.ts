import { LocalizedTextIdLanguages } from './localized-text-id.languages';

/**
 * Builds object where property name is value of enum as string and property value is actual text in Slovak
 */
export function buildLocalizedTextSkLanguages() {
  return {
    [LocalizedTextIdLanguages.Languages]: 'Jazyky',
    [LocalizedTextIdLanguages.LanguageEn]: 'Angličtina',
    [LocalizedTextIdLanguages.LanguageSk]: 'Slovenčina',
    [LocalizedTextIdLanguages.LanguageSwitchTitle]: 'Jazyk',
    [LocalizedTextIdLanguages.LanguageSwitchSubtitle]: 'Jazyk sa zmení o chvíľu...',
  };
}
