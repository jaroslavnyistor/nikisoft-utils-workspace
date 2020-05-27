import { InjectionToken } from '@angular/core';
import { NsAuthenticationApiService } from './ns-authentication-api.service';

export const DI_NS_AUTHENTICATION_API_SERVICE = new InjectionToken<NsAuthenticationApiService>(
   'DI_NS_AUTHENTICATION_API_SERVICE'
);
export const DI_NS_AUTHENTICATION_TO_LOGIN_ON_EXPIRATION = new InjectionToken<NsAuthenticationApiService>(
   'DI_NS_AUTHENTICATION_TO_LOGIN_ON_EXPIRATION'
);
