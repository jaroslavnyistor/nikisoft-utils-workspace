import { Inject, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NsAuthenticateStorage } from '../authentication/ns-authenticate.storage';
import { NsDate } from '../objects/ns-date';
import { NsLanguage } from '../objects/ns-language';
import { NsString } from '../objects/ns-string';
import { DI_NS_DEFAULT_LANGUAGE } from './localization-languages.di-tokens';
import { LocalizationLanguagesStorage } from './localization-languages.storage';
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
  private _currentLanguage: LocalizationLanguage;
  private _definition: any;

  get currentLanguage(): LocalizationLanguage {
    return this._currentLanguage;
  }

  set currentLanguage(value: LocalizationLanguage) {
    if (this.currentLanguage !== value) {
      this._currentLanguage = value;
      this._languageStorage.language = value;
    }
  }

  constructor(
    private readonly _authenticateStorage: NsAuthenticateStorage,
    private readonly _languageStorage: LocalizationLanguagesStorage,
    private readonly _localizedTextService: LocalizedTextService,
    @Inject(DI_NS_DEFAULT_LANGUAGE) private readonly _defaultLanguage: LocalizationLanguage = LocalizationLanguage.EN,
  ) {
  }

  /**
   * Loads translated texts and performs initialization
   */
  load(): Promise<any> {
    let language = this._languageStorage.language as LocalizationLanguage;

    if (!language) {
      language = this._defaultLanguage;

      this._languageStorage.language = language;
    }

    return this._localizedTextService
      .download(language)
      .pipe(tap((value) => this.initialize(value, language)))
      .toPromise();
  }

  private initialize(definition: any, localizationLanguage: LocalizationLanguage) {
    this._definition = definition;

    this.currentLanguage = localizationLanguage;

    const language = NsLanguage.resolve();
    NsDate.initialize(language);
  }

  /**
   * Translates textId to localized text. Also if params are provided,
   * applies them to the text.
   * @param textId ID of text
   * @param params Optional. Will be applied to translated text. Uses index-base approach, e.g
   * text is "Customer name is {0} and {1}" and params are "Peter", "Smith"
   */
  translate(textId: any, ...params: any[]): string {
    let result = this._definition[textId];

    if (result === undefined) {
      return `---Property ${textId} is not defined!---`;
    }

    if (params != null) {
      result = NsString.format(result, params);
    }

    return result;
  }

  /**
   * Gets 'Cancel' text
   */
  getCancelText(): string {
    return this.translate(LocalizedTextIdNikisoft.Cancel);
  }

  /**
   * Gets 'Save' text
   */
  getSaveText(): string {
    return this.translate(LocalizedTextIdNikisoft.Save);
  }

  /**
   * Gets 'ValidationEmailIncorrectFormat' text
   */
  getValidationEmailIncorrectFormat(): string {
    return this.translate(LocalizedTextIdNikisoft.Validation_EmailIncorrectFormat);
  }

  /**
   * Gets 'ValidationEmailIncorrectFormat' text
   */
  getValidationMaxLengthExceed(value: number): string {
    return this.translate(LocalizedTextIdNikisoft.Validation_MaxLength, value);
  }

  /**
   * Gets 'ValidationMinLength' text
   */
  getValidationIsLessThanMinLength(value: number): string {
    return this.translate(LocalizedTextIdNikisoft.Validation_MinLength, value);
  }

  /**
   * Gets 'ValidationMaxValue' text
   */
  getValidationMaxValueExceed(value: number): string {
    return this.translate(LocalizedTextIdNikisoft.Validation_MaxValue, value);
  }

  /**
   * Gets 'ValidationMinValue' text
   */
  getValidationIsLessThanMinValue(value: number): string {
    return this.translate(LocalizedTextIdNikisoft.Validation_MinValue, value);
  }

  /**
   * Gets 'ValidationRequired' text
   */
  getValidationRequired(): string {
    return this.translate(LocalizedTextIdNikisoft.Validation_Required);
  }

  /**
   * Gets 'NotAuthorized' text
   */
  getNotAuthorized(): string {
    return this.translate(LocalizedTextIdNikisoft.NotAuthorized);
  }

  /**
   * Gets 'RequestedServiceNotFound' text
   */
  getRequestedServiceNotFound(): string {
    return this.translate(LocalizedTextIdNikisoft.RequestedServiceNotFound);
  }

  /**
   * Gets 'ServerFailed' text
   */
  getServerFailed(): string {
    return this.translate(LocalizedTextIdNikisoft.ServerFailed);
  }

  /**
   * Gets 'UnableToConnectToServer' text
   */
  getUnableToConnectToServer(): string {
    return this.translate(LocalizedTextIdNikisoft.UnableToConnectToServer);
  }

  /**
   * Gets 'UnknownError' text
   */
  getUnknownError(): string {
    return this.translate(LocalizedTextIdNikisoft.UnknownError);
  }

  /**
   * Gets 'DeleteTitle' text
   */
  getDeleteTitle(): string {
    return this.translate(LocalizedTextIdNikisoft.DeleteTitle);
  }

  /**
   * Gets 'DeleteMessage' text
   */
  getDeleteMessage(): string {
    return this.translate(LocalizedTextIdNikisoft.DeleteMessage);
  }

  /**
   * Gets 'OrderAsc' text
   */
  getOrderAsc(): string {
    return this.translate(LocalizedTextIdNikisoft.OrderAsc);
  }

  /**
   * Gets 'OrderDesc' text
   */
  getOrderDesc(): string {
    return this.translate(LocalizedTextIdNikisoft.OrderDesc);
  }
}
