import { Observable, of } from 'rxjs';
import { NsDate } from '../dates/ns-date';
import { NsAuthenticateResponseEntity } from './ns-authenticate-response.entity';

export interface NsAuthenticationApiService {
   authenticate(userName: string, password: string): Observable<NsAuthenticateResponseEntity>;

   logout(): void;
}

export class NsNoAuthenticationApiService implements NsAuthenticationApiService {
   authenticate(userName: string, password: string): Observable<NsAuthenticateResponseEntity> {
      return of(
         {
            id: 1,
            firstName: 'Dummy',
            lastName: 'User',
            userName: 'dummy_user',
            email: 'dummy@dummy.com',
            token: 'dummy-token',
            expires: NsDate.now().addYears(1).toString(),
            permissions: []
         }
      );
   }

   logout(): void {
   }
}
