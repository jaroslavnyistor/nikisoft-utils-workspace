import { LocalizedTextIdLanguages } from './localized-text-id.languages';

export function buildLocalizedTextEnLanguages() {
   return {
      [LocalizedTextIdLanguages.Languages]: 'Languages',
      [LocalizedTextIdLanguages.LanguageEn]: 'English',
      [LocalizedTextIdLanguages.LanguageSk]: 'Slovak',
      [LocalizedTextIdLanguages.LanguageSwitchTitle]: 'Language',
      [LocalizedTextIdLanguages.LanguageSwitchSubtitle]: 'Language is about to be switched...',
   };
}
