import { LocalizedTextIdLanguages } from './localized-text-id.languages';

/**
 * Builds object where property name is value of enum as string and property value is actual text in English
 */
export function buildLocalizedTextEnLanguages() {
  return {
    [LocalizedTextIdLanguages.Languages]: 'Languages',
    [LocalizedTextIdLanguages.LanguageEn]: 'English',
    [LocalizedTextIdLanguages.LanguageSk]: 'Slovak',
    [LocalizedTextIdLanguages.LanguageSwitchTitle]: 'Language',
    [LocalizedTextIdLanguages.LanguageSwitchSubtitle]: 'Language is about to be switched...',
  };
}
