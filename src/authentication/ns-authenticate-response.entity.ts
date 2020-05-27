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
