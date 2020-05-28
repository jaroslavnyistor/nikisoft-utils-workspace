import { NsApiErrorResponse } from './error/ns-api-error.response';

export enum NsApiResponseErrorType {
  UnableToConnectToServer = 0,
  UnknownError = 1,
  ServerFailed = 500,
  RequestedServiceNotFound = 404,
  NotAuthorized = 401,
  ServerValidationFailed = 400,
}

const NO_PERMISSION_GRANTED = -2;

export class NsApiResponseError {
  constructor(private _type: NsApiResponseErrorType, private _serverValidationResult: NsApiErrorResponse[] = []) {}

  get type(): NsApiResponseErrorType {
    return this._type;
  }

  get hasNoPermissionGrantedError(): boolean {
    return this._serverValidationResult.some((item) => item.code === NO_PERMISSION_GRANTED);
  }

  get serverValidationResult(): NsApiErrorResponse[] {
    return this._serverValidationResult;
  }

  toString(): string {
    return `${this._type}: ${this._serverValidationResult}`;
  }

  static forServerValidationFailed(code: number): NsApiResponseError {
    return new NsApiResponseError(NsApiResponseErrorType.ServerValidationFailed, [{ code, subCodes: [] }]);
  }
}
