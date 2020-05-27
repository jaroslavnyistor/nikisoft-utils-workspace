import { Provider, Type } from '@angular/core';
import {
  DI_NS_AUTHENTICATION_API_SERVICE,
  DI_NS_AUTHENTICATION_TO_LOGIN_ON_EXPIRATION,
} from './ns-authenticate.di-tokens';
import { NsAuthenticationApiService } from './ns-authentication-api.service';

export class NsAuthenticateDiConfigurator {
  static provideAuthService<TAuthService extends NsAuthenticationApiService>(useClass: Type<TAuthService>): Provider {
    return { provide: DI_NS_AUTHENTICATION_API_SERVICE, useClass };
  }

  static setToLoginOnExpiration(useValue: boolean): Provider {
    return { provide: DI_NS_AUTHENTICATION_TO_LOGIN_ON_EXPIRATION, useValue };
  }
}
