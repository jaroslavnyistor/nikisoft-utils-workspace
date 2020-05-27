import { LocalizedTextIdNikisoft } from '../../localization/localized-text-id.nikisoft';
import { NsApiErrorCodes } from './ns-api-error.codes';

export const nsApiErrorMapper = {
   [NsApiErrorCodes.QueryFailed]: LocalizedTextIdNikisoft.QueryFailed,
   [NsApiErrorCodes.NoPermissionGranted]: LocalizedTextIdNikisoft.NoPermissionGranted,
};
