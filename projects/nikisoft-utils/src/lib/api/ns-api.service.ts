import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { NsAuthenticateApiService } from '../authentication/ns-authenticate-api.service';
import { NsAuthenticateResponseEntity } from '../authentication/ns-authenticate-response.entity';
import { NsAuthenticateStorage } from '../authentication/ns-authenticate.storage';
import { NsNoPermissionService } from './no-permission/ns-no-permission.service';
import { NsNotFoundService } from './not-found/ns-not-found.service';
import { NsApiRequest } from './ns-api-request';
import { NsApiResponseError, NsApiResponseErrorType } from './ns-api-response.error';

const urlAuthenticate = 'api/authenticate';

/**
 * Exposes API to authenticate, logout user and send POST request with authorization
 * token to API
 */
@Injectable({
  providedIn: 'root',
})
export class NsApiService implements NsAuthenticateApiService {
  constructor(
    private _httpClient: HttpClient,
    private _credentialsStorageService: NsAuthenticateStorage,
    private _noPermissionNavService: NsNoPermissionService,
    private _notFoundNavService: NsNotFoundService,
  ) {
  }

  /**
   * Logs out user
   */
  logout(): void {
  }

  /**
   * Authenticates user based on user name and password
   * @param userName User name
   * @param password Password
   */
  public authenticate(userName: string, password: string): Observable<NsAuthenticateResponseEntity> {
    const request = new NsApiRequest(urlAuthenticate).withBody({
      userName,
      password,
    });

    return this.post<NsAuthenticateResponseEntity>(request);
  }

  /**
   * Sends a POST request with authorization token
   * @param request
   */
  postAuth<TData>(request: NsApiRequest): Observable<TData> {
    this.appendAuthorization(request);

    return this.post<TData>(request);
  }

  private appendAuthorization(request: NsApiRequest) {
    request
      .withHeader('Authorization', `Bearer ${this._credentialsStorageService.credentials.token}`)
      .withHeader('DeviceName', 'web');
  }

  private post<TData>(request: NsApiRequest): Observable<TData> {
    return this._httpClient.post<TData>(request.url, request.body, request.options).pipe(
      retry(3),
      catchError((error) => this.handleErrorResponse(error)),
    );
  }

  private handleErrorResponse(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent || error.status === 504) {
      return throwError(new NsApiResponseError(NsApiResponseErrorType.UnableToConnectToServer));
    }

    if (error.status === NsApiResponseErrorType.ServerValidationFailed) {
      const responseError = new NsApiResponseError(NsApiResponseErrorType.ServerValidationFailed, error.error);

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

    return throwError(new NsApiResponseError(NsApiResponseErrorType.UnknownError));
  }
}
