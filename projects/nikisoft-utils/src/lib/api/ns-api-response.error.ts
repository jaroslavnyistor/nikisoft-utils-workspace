import { NsApiErrorCodes } from './error/ns-api-error.codes';
import { NsApiErrorResponse } from './error/ns-api-error.response';

/**
 * Determines API response error types
 */
export enum NsApiResponseErrorType {
  UnableToConnectToServer = 0,
  UnknownError = 1,
  ServerFailed = 500,
  RequestedServiceNotFound = 404,
  NotAuthorized = 401,
  ServerValidationFailed = 400,
}

/**
 * Wrapper around API response error
 */
export class NsApiResponseError {

  /**
   * Gets the type
   */
  get type(): NsApiResponseErrorType {
    return this._type;
  }

  /**
   * Determines if user has permission
   */
  get hasNoPermissionGrantedError(): boolean {
    return this._serverValidationResult.some((item) => item.code === NsApiErrorCodes.NoPermissionGranted);
  }

  /**
   * Returns server validation result
   */
  get serverValidationResult(): NsApiErrorResponse[] {
    return this._serverValidationResult;
  }

  toString(): string {
    return `${this._type}: ${this._serverValidationResult}`;
  }

  constructor(private _type: NsApiResponseErrorType, private _serverValidationResult: NsApiErrorResponse[] = []) {}

  /**
   * Creates NsApiResponseError based on API error code
   * @param code API error code
   */
  static forServerValidationFailed(code: number): NsApiResponseError {
    return new NsApiResponseError(NsApiResponseErrorType.ServerValidationFailed, [{ code, subCodes: [] }]);
  }
}
