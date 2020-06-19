import { Inject, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NsAuthenticateStorage } from '../authentication/ns-authenticate.storage';
import { NsDate } from '../objects/ns-date';
import { NsLanguage } from '../objects/ns-language';
import { NsString } from '../objects/ns-string';
import { DI_NS_DEFAULT_LANGUAGE } from './localization-languages.di-tokens';
import { LocalizationLanguage } from './localization.language';
import { LocalizedTextIdNikisoft } from './localized-text-id.nikisoft';
import { LocalizedTextService } from './localized-text.service';

/**
 * Provides functionality around language engine
 */
@Injectable({
  providedIn: 'root',
})
export class LocalizationLanguagesService {
  private readonly _storageService: NsAuthenticateStorage;
  private readonly _localizedTextService: LocalizedTextService;
  private readonly _defaultLanguage: LocalizationLanguage;
  private _currentLanguage: LocalizationLanguage;
  private _definition: any;

  get currentLanguage(): LocalizationLanguage {
    return this._currentLanguage;
  }

  constructor(
    storageService: NsAuthenticateStorage,
    localizedTextService: LocalizedTextService,
    @Inject(DI_NS_DEFAULT_LANGUAGE) defaultLanguage: LocalizationLanguage = null,
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

    return this._localizedTextService
      .download(language)
      .pipe(tap((value) => this.initialize(value, language)))
      .toPromise();
  }

  private initialize(definition: any, localizationLanguage: LocalizationLanguage) {
    this._definition = definition;

    this.saveSelectedLanguage(localizationLanguage);

    const language = NsLanguage.resolve();
    NsDate.initialize(language);
  }

  saveSelectedLanguage(language: LocalizationLanguage) {
    this._currentLanguage = language;
    this._storageService.setLanguage(language);
  }

  translate(prop: any, args?: any): string {
    let result = this._definition[prop];

    if (result === undefined) {
      return `---Property ${prop} is not defined!---`;
    }

    if (args != null) {
      result = NsString.format(result, args);
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
}
