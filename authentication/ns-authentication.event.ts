import { NsAuthenticateResponseModel } from './ns-authenticate-response.model';

export interface NsAuthenticationEvent {
   credentials: NsAuthenticateResponseModel;
   url: string;
}
