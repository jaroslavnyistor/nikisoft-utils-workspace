import { Data } from '@angular/router';
import { NsDateTime } from '../dates/ns-date-time';
import { nsIsNotNullOrEmpty, nsJoin } from '../helpers/strings/ns-helpers-strings';
import { NsAuthenticateResponseEntity } from './ns-authenticate-response.entity';
import { NsAuthenticateRouteData } from './ns-authenticate-route-data';

export class NsAuthenticateResponseModel {
   private readonly _expires: NsDateTime;
   private readonly _fullName: string;
   private readonly _hasToken: boolean;

   constructor(private _entity: NsAuthenticateResponseEntity) {
      this._expires = NsDateTime.from(_entity.expires);
      this._fullName = nsJoin(' ', [_entity.firstName, _entity.lastName]);
      this._hasToken = nsIsNotNullOrEmpty(this._entity.token);
   }

   get isLoggedIn(): boolean {
      return this.hasToken() && !this.hasTokenExpired();
   }

   private hasToken(): boolean {
      return this._hasToken;
   }

   private hasTokenExpired(): boolean {
      return this._expires.isBefore(NsDateTime.from());
   }

   get fullName(): string {
      return this._fullName;
   }

   get userName(): string {
      return this._entity.userName;
   }

   get email(): string {
      return this._entity.email;
   }

   get id(): number {
      return this._entity.id;
   }

   hasPermission(data: NsAuthenticateRouteData | Data) {
      if (data == null || data.permission == null) {
         return true;
      }

      const permissionId = data.permission;
      return this.hasPermissionById(permissionId);
   }

   hasPermissionById(permissionId: number) {
      return permissionId !== 0 && this._entity.permissions.some(id => id === permissionId);
   }
}
