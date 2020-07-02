import { Inject, Injectable } from '@angular/core';
import { DI_NS_STORAGE_KEY_PREFIX } from './ns-storage.di-tokens';

/**
 * Service which provides API to store values to local storage as key-value pairs
 */
@Injectable({
  providedIn: 'root',
})
export class NsStorageService {
  private readonly _keyStatePrefix: string;
  private _userId: number;

  /**
   * Gets ID of logged in user
   */
  get userId(): number {
    return this._userId;
  }

  /**
   * Sets ID of logged in user
   */
  set userId(value: number) {
    this._userId = value;
  }

  constructor(@Inject(DI_NS_STORAGE_KEY_PREFIX) keyStatePrefix: string) {
    this._keyStatePrefix = keyStatePrefix;
  }

  /**
   * Saves user specific key-value pair to storage
   * @param key
   * @param value
   */
  savePerUser(key: string, value: any) {
    localStorage.setItem(this.getKeyPerUser(key), JSON.stringify(value));
  }

  /**
   * Loads user specific value from storage based on the key
   * @param key
   */
  loadPerUser<T>(key: string): T {
    const savedValue = localStorage.getItem(this.getKeyPerUser(key));

    return JSON.parse(savedValue);
  }

  /**
   * Deletes user specific value from the storage based on the key
   * @param key
   */
  deletePerUser(key: string) {
    localStorage.removeItem(this.getKeyPerUser(key));
  }

  private getKeyPerUser(key: string) {
    let resolvedKey = this._keyStatePrefix;

    if (this.userId != null) {
      resolvedKey += `:${this.userId}`;
    }

    resolvedKey += `:${key}`;

    return resolvedKey;
  }

  /**
   * Saves key-value pair to storage
   * @param key
   * @param value
   */
  savePerApplication(key: string, value: any) {
    localStorage.setItem(this.getKeyPerApplication(key), JSON.stringify(value));
  }

  /**
   * Loads value from the storage based on the key
   * @param key
   */
  loadPerApplication<T>(key: string): T {
    const savedValue = localStorage.getItem(this.getKeyPerApplication(key));

    return JSON.parse(savedValue);
  }

  /**
   * Deletes value from the storage based on the key
   * @param key
   */
  deletePerApplication(key: string) {
    localStorage.removeItem(this.getKeyPerApplication(key));
  }

  private getKeyPerApplication(key: string) {
    return `${this._keyStatePrefix}:${key}`;
  }
}
