import { Injectable } from '@angular/core';
import { NsStorageService } from '../storage/ns-storage.service';
import { NsAuthenticateResponseEntity } from './ns-authenticate-response.entity';

const keyId = 'id';
const keyCredentials = 'credentials';
const keyLanguage = 'language';

@Injectable({
   providedIn: 'root'
})
export class NsCredentialsStorageService {
   constructor(private _storage: NsStorageService) {
      this._storage.userId = JSON.parse(localStorage.getItem(keyId));

      const credentials = this.credentials;
      if (credentials != null) {
         this._storage.userId = credentials.id;
      }
   }

   get language(): string {
      return localStorage.getItem(keyLanguage);
   }

   get credentials(): NsAuthenticateResponseEntity {
      return this._storage.load(keyCredentials);
   }

   login(value: NsAuthenticateResponseEntity) {
      this.saveUserId(value.id);
      this.saveCredentials(value);
   }

   logout(value: NsAuthenticateResponseEntity) {
      const credentials = this.credentials;

      if (credentials && credentials.id > 0) {
         const newCredentials = {
            ...value,
            id: credentials.id,
         };

         this.saveCredentials(newCredentials);
      }

      this.saveUserId(value.id);
   }

   private saveCredentials(newCredentials: NsAuthenticateResponseEntity) {
      this._storage.save(keyCredentials, newCredentials);
   }

   private saveUserId(userId: number) {
      localStorage.setItem(keyId, JSON.stringify(userId));
      this._storage.userId = userId;
   }

   setLanguage(value: string) {
      localStorage.setItem(keyLanguage, value);
   }
}
