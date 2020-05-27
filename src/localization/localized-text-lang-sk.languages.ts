import { LocalizedTextIdLanguages } from './localized-text-id.languages';

export function buildLocalizedTextSkLanguages() {
  return {
    [LocalizedTextIdLanguages.Languages]: 'Jazyky',
    [LocalizedTextIdLanguages.LanguageEn]: 'Angličtina',
    [LocalizedTextIdLanguages.LanguageSk]: 'Slovenčina',
    [LocalizedTextIdLanguages.LanguageSwitchTitle]: 'Jazyk',
    [LocalizedTextIdLanguages.LanguageSwitchSubtitle]: 'Jazyk sa zmení o chvíľu...',
  };
}
