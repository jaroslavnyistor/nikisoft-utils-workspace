import { InjectionToken } from '@angular/core';
import { NsAuthenticateApiService } from './ns-authenticate-api.service';

export const DI_NS_AUTHENTICATION_API_SERVICE = new InjectionToken<NsAuthenticateApiService>(
  'DI_NS_AUTHENTICATION_API_SERVICE',
);
export const DI_NS_AUTHENTICATION_TO_LOGIN_ON_EXPIRATION = new InjectionToken<NsAuthenticateApiService>(
  'DI_NS_AUTHENTICATION_TO_LOGIN_ON_EXPIRATION',
);
