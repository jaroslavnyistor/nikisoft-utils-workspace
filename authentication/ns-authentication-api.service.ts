import { Observable } from 'rxjs';
import { NsAuthenticateResponseEntity } from './ns-authenticate-response.entity';

export interface NsAuthenticationApiService {
   authenticate(userName: string, password: string): Observable<NsAuthenticateResponseEntity>;

   logout(): void;
}
