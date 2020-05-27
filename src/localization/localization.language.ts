import { LocalizationLanguagesService } from './localization-languages.service';
import { LocalizedTextIdLanguages } from './localized-text-id.languages';

export enum LocalizationLanguage {
  EN = 'en',
  SK = 'sk',
}

export interface LocalizationLanguageItem {
  id: number;
  language: LocalizationLanguage;
  text: string;
  textShortcut: string;
}

export function buildLocalizationLanguages(langService: LocalizationLanguagesService): LocalizationLanguageItem[] {
  return [
    {
      id: 1,
      language: LocalizationLanguage.EN,
      text: langService.translate(LocalizedTextIdLanguages.LanguageEn),
      textShortcut: 'EN',
    },
    {
      id: 2,
      language: LocalizationLanguage.SK,
      text: langService.translate(LocalizedTextIdLanguages.LanguageSk),
      textShortcut: 'SK',
    },
  ];
}
