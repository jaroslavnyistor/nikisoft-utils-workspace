import { Injectable } from '@angular/core';
import { LocalizationLanguagesService } from '../../localization/localization-languages.service';
import { NsApiResponseError, NsApiResponseErrorType } from '../ns-api-response.error';
import { NsApiErrorResponse } from './ns-api-error.response';

/**
 * Resolves API errors
 */
@Injectable({
  providedIn: 'root',
})
export class NsApiErrorResolverService {
  constructor(private readonly _langService: LocalizationLanguagesService) {}

  /**
   * Uses mapper to map error to localized texts.
   * @param mapper Mapper, see nsApiErrorMapper const
   * @param error Error received from API call
   */
  resolve(mapper: any, error: NsApiResponseError): string[] {
    if (mapper == null) {
      return [this._langService.getUnknownError()];
    }

    switch (error.type) {
      case NsApiResponseErrorType.UnableToConnectToServer:
        return [this._langService.getUnableToConnectToServer()];
      case NsApiResponseErrorType.UnknownError:
        return [this._langService.getUnknownError()];
      case NsApiResponseErrorType.ServerFailed:
        return [this._langService.getServerFailed()];
      case NsApiResponseErrorType.RequestedServiceNotFound:
        return [this._langService.getRequestedServiceNotFound()];
      case NsApiResponseErrorType.NotAuthorized:
        return [this._langService.getNotAuthorized()];
      case NsApiResponseErrorType.ServerValidationFailed:
        return this.resolveServerValidationErrors(mapper, error.serverValidationResult);
      default:
        return [this._langService.getUnknownError()];
    }
  }

  private resolveServerValidationErrors(mapper: any, serverErrors: NsApiErrorResponse[]): string[] {
    const result: string[] = [];

    serverErrors.forEach((serverError) => {
      if (serverError.subCodes.length === 0) {
        const errorText = NsApiErrorResolverService.getServerErrorText(mapper, this._langService, serverError.code);
        result.push(errorText);
      } else {
        const subCodesMapper = mapper[serverError.code];
        serverError.subCodes.forEach((code) => {
          const subErrorText = NsApiErrorResolverService.getServerErrorText(subCodesMapper, this._langService, code);
          result.push(subErrorText);
        });
      }
    });

    return result;
  }

  private static getServerErrorText(mapper: any, langService: LocalizationLanguagesService, code: number) {
    const textId = mapper[code];
    return langService.translate(textId);
  }
}
