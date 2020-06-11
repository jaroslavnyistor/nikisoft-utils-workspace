import { Provider, Type } from '@angular/core';
import {
  DI_NS_AUTHENTICATION_API_SERVICE,
  DI_NS_AUTHENTICATION_TO_LOGIN_ON_EXPIRATION,
} from './ns-authenticate.di-tokens';
import { NsAuthenticateApiService } from './ns-authenticate-api.service';

/**
 * Configures DI for authentication
 */
export class NsAuthenticateDiConfigurator {
  /**
   * Use the class to authenticate user
   * @param useClass Subclass of NsAuthenticateApiService
   */
  static provideAuthService<TAuthService extends NsAuthenticateApiService>(useClass: Type<TAuthService>): Provider {
    return { provide: DI_NS_AUTHENTICATION_API_SERVICE, useClass };
  }

  /**
   * Determines in case that user login expires, should app navigate to login screen
   * @param useValue True if app should navigate to login screen after user's login expires.
   */
  static setToLoginOnExpiration(useValue: boolean): Provider {
    return { provide: DI_NS_AUTHENTICATION_TO_LOGIN_ON_EXPIRATION, useValue };
  }
}
