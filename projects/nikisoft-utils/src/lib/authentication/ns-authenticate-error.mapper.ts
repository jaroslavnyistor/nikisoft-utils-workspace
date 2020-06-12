import { LocalizedTextIdNikisoft } from '../localization/localized-text-id.nikisoft';
import { NsAuthenticateResponseError } from './ns-authenticate-error.response';

/**
 * Default mapping of authentication error from API
 */
export const nsAuthenticateErrorMapper = {
  [NsAuthenticateResponseError.BadUserNameOrPassword]: LocalizedTextIdNikisoft.BadUserNameOrPassword,
};
