import { InjectionToken } from '@angular/core';
import { NsAuthenticateApiService } from './ns-authenticate-api.service';

/**
 * DI token for service to use as authentication
 */
export const DI_NS_AUTHENTICATION_API_SERVICE = new InjectionToken<NsAuthenticateApiService>(
  'DI_NS_AUTHENTICATION_API_SERVICE',
);

/**
 * DI token if app should navigate to login route when user login expires
 */
export const DI_NS_AUTHENTICATION_TO_LOGIN_ON_EXPIRATION = new InjectionToken<boolean>(
  'DI_NS_AUTHENTICATION_TO_LOGIN_ON_EXPIRATION',
);
