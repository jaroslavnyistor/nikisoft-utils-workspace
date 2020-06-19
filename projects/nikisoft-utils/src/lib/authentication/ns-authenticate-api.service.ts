import { Observable, of } from 'rxjs';
import { NsDate } from '../objects/ns-date';
import { NsAuthenticateResponseEntity } from './ns-authenticate-response.entity';

/**
 * Defines contract of authentication API service
 */
export interface NsAuthenticateApiService {
  authenticate(userName: string, password: string): Observable<NsAuthenticateResponseEntity>;

  logout(): void;
}

/**
 * The service is dummy implementation of NsAuthenticateApiService in case that
 * app does not need any authentication.
 */
export class NsNoAuthenticateApiService implements NsAuthenticateApiService {
  authenticate(userName: string, password: string): Observable<NsAuthenticateResponseEntity> {
    return of({
      id: 1,
      firstName: 'Dummy',
      lastName: 'User',
      userName: 'dummy_user',
      email: 'dummy@dummy.com',
      token: 'dummy-token',
      expires: NsDate.now().addYears(1).toString(),
      permissions: [],
    });
  }

  logout(): void {
  }
}
