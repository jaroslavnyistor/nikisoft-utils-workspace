import { LocalizedTextIdNikisoft } from '../../localization/localized-text-id.nikisoft';
import { NsApiErrorCodes } from './ns-api-error.codes';

/**
 * Contains mapping of API error code to ID of localized text.
 * It's simple object where property is the API error code and value is ID of localized text
 */
export const nsApiErrorMapper = {
  [NsApiErrorCodes.QueryFailed]: LocalizedTextIdNikisoft.QueryFailed,
  [NsApiErrorCodes.NoPermissionGranted]: LocalizedTextIdNikisoft.NoPermissionGranted,
};
