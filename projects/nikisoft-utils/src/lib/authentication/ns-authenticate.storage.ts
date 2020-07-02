import { Injectable } from '@angular/core';
import { NsStorageService } from '../storage/ns-storage.service';
import { newNsAuthenticateResponseEntity, NsAuthenticateResponseEntity } from './ns-authenticate-response.entity';

/**
 * Stores user's credentials to local storage
 */
@Injectable({
  providedIn: 'root',
})
export class NsAuthenticateStorage {
  private static keyId = 'id';
  private static keyCredentials = 'credentials';

  /**
   * Gets user's credentials
   */
  get credentials(): NsAuthenticateResponseEntity {
    return this._storage.loadPerApplication(NsAuthenticateStorage.keyCredentials);
  }

  constructor(private readonly _storage: NsStorageService) {
    this._storage.userId = _storage.loadPerApplication(NsAuthenticateStorage.keyId);

    const credentials = this.credentials;
    if (credentials != null) {
      this._storage.userId = credentials.id;
    }
  }

  /**
   * Stores user's credentials
   * @param value
   */
  login(value: NsAuthenticateResponseEntity) {
    this.saveUserId(value.id);
    this.saveCredentials(value);
  }

  /**
   * Removes user's credentials
   */
  logout() {
    const credentials = newNsAuthenticateResponseEntity();
    this.saveCredentials(credentials);

    this.saveUserId(credentials.id);
  }

  private saveCredentials(newCredentials: NsAuthenticateResponseEntity) {
    this._storage.savePerApplication(NsAuthenticateStorage.keyCredentials, newCredentials);
  }

  private saveUserId(userId: number) {
    this._storage.savePerApplication(NsAuthenticateStorage.keyId, userId);
    this._storage.userId = userId;
  }
}
