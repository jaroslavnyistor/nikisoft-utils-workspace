import { LocalizedTextIdNikisoft } from '../localization/localized-text-id.nikisoft';
import { NsAuthenticateResponseError } from './ns-authenticate-error.response';

export const nsAuthenticateErrorMapper = {
  [NsAuthenticateResponseError.BadUserNameOrPassword]: LocalizedTextIdNikisoft.BadUserNameOrPassword,
};
