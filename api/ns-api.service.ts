import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { NsPageNoPermissionService } from '../../ui/page/no-permission/ns-page-no-permission.service';
import { NsPageNotFoundService } from '../../ui/page/not-found/ns-page-not-found.service';
import { NsAuthenticateResponseEntity } from '../authentication/ns-authenticate-response.entity';
import { NsAuthenticationApiService } from '../authentication/ns-authentication-api.service';
import { NsCredentialsStorageService } from '../authentication/ns-credentials-storage.service';
import { NsApiRequest } from './ns-api-request';
import { NsApiResponseError, NsApiResponseErrorType } from './ns-api-response.error';

const urlAuthenticate = 'api/authenticate';

@Injectable({
   providedIn: 'root'
})
export class NsApiService implements NsAuthenticationApiService {
   constructor(
      private _httpClient: HttpClient,
      private _credentialsStorageService: NsCredentialsStorageService,
      private _noPermissionNavService: NsPageNoPermissionService,
      private _notFoundNavService: NsPageNotFoundService
   ) {
   }

   logout(): void {
   }

   public authenticate(userName: string, password: string): Observable<NsAuthenticateResponseEntity> {
      const request = new NsApiRequest(urlAuthenticate)
         .withBody({
            userName,
            password
         });

      return this.post<NsAuthenticateResponseEntity>(request);
   }

   postAuth<TData>(request: NsApiRequest): Observable<TData> {
      this.appendAuthorization(request);

      return this.post<TData>(request);
   }

   private appendAuthorization(request: NsApiRequest) {
      request.withHeader('Authorization', `Bearer ${this._credentialsStorageService.credentials.token}`)
         .withHeader('DeviceName', 'web');
   }

   private post<TData>(request: NsApiRequest): Observable<TData> {
      return this._httpClient.post<TData>(
         request.url,
         request.body,
         request.options
      )
         .pipe(
            retry(3),
            catchError(error => this.handleErrorResponse(error))
         );
   }

   private handleErrorResponse(error: HttpErrorResponse): Observable<any> {
      if (error.error instanceof ErrorEvent || error.status === 504) {
         console.error('An error occurred:', error.error);
         return throwError(new NsApiResponseError(NsApiResponseErrorType.UnableToConnectToServer));
      }

      if (error.status === NsApiResponseErrorType.ServerValidationFailed) {
         const responseError = new NsApiResponseError(
            NsApiResponseErrorType.ServerValidationFailed,
            error.error
         );

         if (responseError.hasNoPermissionGrantedError) {
            this._noPermissionNavService.navigate();
            return EMPTY;
         }

         return throwError(responseError);
      }

      if (error.status === NsApiResponseErrorType.RequestedServiceNotFound) {
         this._notFoundNavService.navigate();
         return EMPTY;
      }

      const errorType: NsApiResponseErrorType = error.status;
      if (errorType) {
         return throwError(new NsApiResponseError(errorType));
      }

      console.error(
         `Backend returned code ${error.status}, ` +
         `body was: ${error.error}`);

      return throwError(new NsApiResponseError(NsApiResponseErrorType.UnknownError));
   }
}
