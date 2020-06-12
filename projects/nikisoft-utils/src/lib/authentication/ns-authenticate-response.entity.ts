/**
 * Contract for data returned by authentication API call
 */
export interface NsAuthenticateResponseEntity {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  token: string;
  expires: string;
  permissions: number[];
}

/**
 * Helper function to create default value of NsAuthenticateResponseEntity
 */
export function newNsAuthenticateResponseEntity(): NsAuthenticateResponseEntity {
  return {
    id: 0,
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    token: '',
    expires: null,
    permissions: [],
  };
}
