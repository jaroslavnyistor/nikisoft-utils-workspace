import { NsApiValidationServerError } from './validation/server/ns-api-validation-server.error';

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
   constructor(
      private _type: NsApiResponseErrorType, private _serverValidationResult: NsApiValidationServerError[] = []) {
   }

   get type(): NsApiResponseErrorType {
      return this._type;
   }

   get hasNoPermissionGrantedError(): boolean {
      return this._serverValidationResult.some(item => item.code === NO_PERMISSION_GRANTED);
   }

   get serverValidationResult(): NsApiValidationServerError[] {
      return this._serverValidationResult;
   }
}
