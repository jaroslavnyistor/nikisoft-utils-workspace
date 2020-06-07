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
