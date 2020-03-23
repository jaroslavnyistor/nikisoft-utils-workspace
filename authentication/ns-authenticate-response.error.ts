import { LocalizedTextIdNikisoft } from '../localization/localized-text-id.nikisoft';

export enum NsAuthenticateResponseError {
   BadUserNameOrPassword = 1
}

export const nsAuthenticateResponseErrorResolver = {
   [NsAuthenticateResponseError.BadUserNameOrPassword]: LocalizedTextIdNikisoft.BadUserNameOrPassword,
};
