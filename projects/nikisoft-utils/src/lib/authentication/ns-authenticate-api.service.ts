import { Observable, of } from 'rxjs';
import { NsDate } from '../objects/ns-date';
import { NsAuthenticateResponseEntity } from './ns-authenticate-response.entity';

export interface NsAuthenticateApiService {
  authenticate(userName: string, password: string): Observable<NsAuthenticateResponseEntity>;

  logout(): void;
}

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

  logout(): void {}
}
