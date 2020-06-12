import { Data } from '@angular/router';

/**
 * Defines extra data attached to angular route
 */
export interface NsAuthenticateRouteData extends Data {
  permission: number;
}
