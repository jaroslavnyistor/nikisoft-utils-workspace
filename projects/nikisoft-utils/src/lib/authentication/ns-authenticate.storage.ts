import { Injectable } from '@angular/core';
import { NsStorageService } from '../storage/ns-storage.service';
import { newNsAuthenticateResponseEntity, NsAuthenticateResponseEntity } from './ns-authenticate-response.entity';

const keyId = 'id';
const keyCredentials = 'credentials';
const keyLanguage = 'language';

@Injectable({
  providedIn: 'root',
})
export class NsAuthenticateStorage {
  constructor(private readonly _storage: NsStorageService) {
    this._storage.userId = _storage.loadPerApplication(keyId);

    const credentials = this.credentials;
    if (credentials != null) {
      this._storage.userId = credentials.id;
    }
  }

  get language(): string {
    return this._storage.loadPerApplication(keyLanguage);
  }

  get credentials(): NsAuthenticateResponseEntity {
    return this._storage.loadPerApplication(keyCredentials);
  }

  login(value: NsAuthenticateResponseEntity) {
    this.saveUserId(value.id);
    this.saveCredentials(value);
  }

  logout() {
    const credentials = newNsAuthenticateResponseEntity();
    this.saveCredentials(credentials);

    this.saveUserId(credentials.id);
  }

  private saveCredentials(newCredentials: NsAuthenticateResponseEntity) {
    this._storage.savePerApplication(keyCredentials, newCredentials);
  }

  private saveUserId(userId: number) {
    this._storage.savePerApplication(keyId, userId);
    this._storage.userId = userId;
  }

  setLanguage(value: string) {
    this._storage.savePerApplication(keyLanguage, value);
  }
}
