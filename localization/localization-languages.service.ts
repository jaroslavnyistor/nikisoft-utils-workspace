import { Inject, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NsCredentialsStorageService } from '../authentication/ns-credentials-storage.service';
import { NsDate } from '../dates/ns-date';
import { nsStringFormat } from '../helpers/strings/ns-helpers-strings';
import { DI_NS_DEFAULT_LANGUAGE } from './localization-languages.di-tokens';
import { buildLocalizationLanguages, LocalizationLanguage, LocalizationLanguageItem } from './localization.language';
import { LocalizedTextIdNikisoft } from './localized-text-id.nikisoft';
import { LocalizedTextService } from './localized-text.service';

@Injectable({
   providedIn: 'root'
})
export class LocalizationLanguagesService {
   private readonly _storageService: NsCredentialsStorageService;
   private readonly _localizedTextService: LocalizedTextService;
   private readonly _defaultLanguage: LocalizationLanguage;
   private _languageItems: LocalizationLanguageItem[];
   private _definition: any;
   private _selectedLanguageItem: LocalizationLanguageItem;

   get currentLanguageCode(): string {
      return this._selectedLanguageItem.language;
   }

   get languageItems(): LocalizationLanguageItem[] {
      return this._languageItems;
   }

   get selectedLanguageItem(): LocalizationLanguageItem {
      return this._selectedLanguageItem;
   }

   set selectedLanguageItem(value: LocalizationLanguageItem) {
      if (this._selectedLanguageItem.id === value.id) {
         return;
      }

      this._selectedLanguageItem = value;

      this.saveSelectedLanguage(value.language);
      window.location.reload();
   }

   constructor(
      storageService: NsCredentialsStorageService,
      localizedTextService: LocalizedTextService,
      @Inject(DI_NS_DEFAULT_LANGUAGE) defaultLanguage: LocalizationLanguage = null
   ) {
      this._storageService = storageService;
      this._localizedTextService = localizedTextService;
      this._defaultLanguage = defaultLanguage || LocalizationLanguage.EN;
   }

   load() {
      let language = this._storageService.language as LocalizationLanguage;

      if (!language) {
         language = this._defaultLanguage;

         this._storageService.setLanguage(language);
      }

      return this._localizedTextService.download(language)
         .pipe(
            tap(value => this.initialize(value, language))
         )
         .toPromise();
   }

   private initialize(definition: any, localizationLanguage: LocalizationLanguage) {
      this._definition = definition;

      this.selectLanguageItem(localizationLanguage);

      const language = LocalizationLanguagesService.resolveLanguage();
      NsDate.initialize(language);
   }

   static resolveLanguage(): string {
      let language;
      if (window.navigator.languages) {
         language = window.navigator.languages[0];
      } else {
         language = window.navigator.language;
      }

      return language;
   }

   private saveSelectedLanguage(language: LocalizationLanguage) {
      this._storageService.setLanguage(language);
   }

   private selectLanguageItem(language: LocalizationLanguage) {
      if (this._languageItems == null) {
         this._languageItems = buildLocalizationLanguages(this);
      }

      this._selectedLanguageItem = this._languageItems.find(e => e.language === language);
   }

   translate(prop: any, args?: any): string {
      let result = this._definition[prop];

      if (result === undefined) {
         const error = `---Property ${prop} is not defined!---`;
         console.error(error);
         return error;
      }

      if (args != null) {
         result = nsStringFormat(result, args);
      }

      return result;
   }

   getCancelText(): string {
      return this.translate(LocalizedTextIdNikisoft.Cancel);
   }

   getSaveText(): string {
      return this.translate(LocalizedTextIdNikisoft.Save);
   }

   getValidationEmailIncorrectFormat(): string {
      return this.translate(LocalizedTextIdNikisoft.Validation_EmailIncorrectFormat);
   }

   getValidationMaxLengthExceed(value: number): string {
      return this.translate(LocalizedTextIdNikisoft.Validation_MaxLength, value);
   }

   getValidationIsLessThanMinLength(value: number): string {
      return this.translate(LocalizedTextIdNikisoft.Validation_MinLength, value);
   }

   getValidationMaxValueExceed(value: number): string {
      return this.translate(LocalizedTextIdNikisoft.Validation_MaxValue, value);
   }

   getValidationIsLessThanMinValue(value: number): string {
      return this.translate(LocalizedTextIdNikisoft.Validation_MinValue, value);
   }

   getValidationRequired(): string {
      return this.translate(LocalizedTextIdNikisoft.Validation_Required);
   }

   getNotAuthorized(): string {
      return this.translate(LocalizedTextIdNikisoft.NotAuthorized);
   }

   getRequestedServiceNotFound(): string {
      return this.translate(LocalizedTextIdNikisoft.RequestedServiceNotFound);
   }

   getServerFailed(): string {
      return this.translate(LocalizedTextIdNikisoft.ServerFailed);
   }

   getUnableToConnectToServer(): string {
      return this.translate(LocalizedTextIdNikisoft.UnableToConnectToServer);
   }

   getUnknownError(): string {
      return this.translate(LocalizedTextIdNikisoft.UnknownError);
   }

   getDeleteTitle(): string {
      return this.translate(LocalizedTextIdNikisoft.DeleteTitle);
   }

   getDeleteMessage(): string {
      return this.translate(LocalizedTextIdNikisoft.DeleteMessage);
   }

   getOrderAsc(): string {
      return this.translate(LocalizedTextIdNikisoft.OrderAsc);
   }

   getOrderDesc(): string {
      return this.translate(LocalizedTextIdNikisoft.OrderDesc);
   }

   selectLanguage(language: LocalizationLanguageItem) {
      this.selectedLanguageItem = language;
   }

   getLanguageCheckIconStyle(language: LocalizationLanguageItem) {
      return {
         visibility: this.isSelected(language) ? 'visible' : 'hidden'
      };
   }

   isSelected(language: LocalizationLanguageItem) {
      return language.id === this.selectedLanguageItem.id;
   }
}
