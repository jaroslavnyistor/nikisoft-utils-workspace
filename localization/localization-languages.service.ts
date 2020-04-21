import { APP_INITIALIZER, Inject, Injectable, InjectionToken, Provider } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NsCredentialsStorageService } from '../authentication/ns-credentials-storage.service';
import { nsStringFormat } from '../helpers/strings/ns-helpers-strings';
import { buildLocalizationLanguages, LocalizationLanguage, LocalizationLanguageItem } from './localization.language';
import { LocalizedTextIdNikisoft } from './localized-text-id.nikisoft';
import { LocalizedTextService } from './localized-text.service';

export const DI_NS_DEFAULT_LANGUAGE = new InjectionToken<LocalizationLanguage>('DI_NS_DEFAULT_LANGUAGE', {
   providedIn: 'root',
   factory: () => LocalizationLanguage.EN
});

export function setLocalizationLanguagesAppInitializer(): Provider {
   return {
      provide: APP_INITIALIZER,
      useFactory: localizationLanguagesServiceAppInitializer,
      deps: [LocalizationLanguagesService],
      multi: true
   };
}

export function localizationLanguagesServiceAppInitializer(service: LocalizationLanguagesService) {
   return () => service.load();
}

export function setDefaultLanguage(useValue: LocalizationLanguage): Provider {
   return {
      provide: DI_NS_DEFAULT_LANGUAGE, useValue
   };
}

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
         tap(value => {
            this._definition = value;

            this.selectLanguageItem(language);
         })
      )
      .toPromise();
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

   text(prop: any, args?: any): string {
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
      return this.text(LocalizedTextIdNikisoft.Cancel);
   }

   getSaveText(): string {
      return this.text(LocalizedTextIdNikisoft.Save);
   }

   getValidationEmailIncorrectFormat(): string {
      return this.text(LocalizedTextIdNikisoft.Validation_EmailIncorrectFormat);
   }

   getValidationMaxLengthExceed(value: number): string {
      return this.text(LocalizedTextIdNikisoft.Validation_MaxLength, value);
   }

   getValidationIsLessThanMinLength(value: number): string {
      return this.text(LocalizedTextIdNikisoft.Validation_MinLength, value);
   }

   getValidationMaxValueExceed(value: number): string {
      return this.text(LocalizedTextIdNikisoft.Validation_MaxValue, value);
   }

   getValidationIsLessThanMinValue(value: number): string {
      return this.text(LocalizedTextIdNikisoft.Validation_MinValue, value);
   }

   getValidationRequired(): string {
      return this.text(LocalizedTextIdNikisoft.Validation_Required);
   }

   getNotAuthorized(): string {
      return this.text(LocalizedTextIdNikisoft.NotAuthorized);
   }

   getRequestedServiceNotFound(): string {
      return this.text(LocalizedTextIdNikisoft.RequestedServiceNotFound);
   }

   getServerFailed(): string {
      return this.text(LocalizedTextIdNikisoft.ServerFailed);
   }

   getUnableToConnectToServer(): string {
      return this.text(LocalizedTextIdNikisoft.UnableToConnectToServer);
   }

   getUnknownError(): string {
      return this.text(LocalizedTextIdNikisoft.UnknownError);
   }

   getDeleteTitle(): string {
      return this.text(LocalizedTextIdNikisoft.DeleteTitle);
   }

   getDeleteMessage(): string {
      return this.text(LocalizedTextIdNikisoft.DeleteMessage);
   }

   getOrderAsc(): string {
      return this.text(LocalizedTextIdNikisoft.OrderAsc);
   }

   getOrderDesc(): string {
      return this.text(LocalizedTextIdNikisoft.OrderDesc);
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
