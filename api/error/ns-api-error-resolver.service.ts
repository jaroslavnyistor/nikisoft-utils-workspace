import { Injectable } from '@angular/core';
import { LocalizationLanguagesService } from '../../localization/localization-languages.service';
import { NsApiResponseError, NsApiResponseErrorType } from '../ns-api-response.error';
import { NsApiErrorResponse } from './ns-api-error.response';

@Injectable({
   providedIn: 'root'
})
export class NsApiErrorResolverService {
   resolve(mapper: any, langService: LocalizationLanguagesService, error: NsApiResponseError): string[] {
      switch (error.type) {
         case NsApiResponseErrorType.UnableToConnectToServer:
            return [langService.getUnableToConnectToServer()];
         case NsApiResponseErrorType.UnknownError:
            return [langService.getUnknownError()];
         case NsApiResponseErrorType.ServerFailed:
            return [langService.getServerFailed()];
         case NsApiResponseErrorType.RequestedServiceNotFound:
            return [langService.getRequestedServiceNotFound()];
         case NsApiResponseErrorType.NotAuthorized:
            return [langService.getNotAuthorized()];
         case NsApiResponseErrorType.ServerValidationFailed:
            return this.resolveServerValidationErrors(
               mapper,
               langService,
               error.serverValidationResult
            );
         default:
            return [langService.getUnknownError()];
      }
   }

   private resolveServerValidationErrors(
      mapper: any,
      langService: LocalizationLanguagesService,
      serverErrors: NsApiErrorResponse[]
   ): string[] {
      const result: string[] = [];

      serverErrors.forEach(serverError => {
         if (serverError.subCodes.length === 0) {
            const errorText = this.getServerErrorText(mapper, langService, serverError.code);
            result.push(errorText);
         } else {
            const subCodesMapper = mapper[serverError.code];
            serverError.subCodes.forEach(code => {
               const subErrorText = this.getServerErrorText(subCodesMapper, langService, code);
               result.push(subErrorText);
            });
         }
      });

      return result;
   }

   private getServerErrorText(mapper: any, langService: LocalizationLanguagesService, code: number) {
      const textId = mapper[code];
      return langService.text(textId);
   }
}
