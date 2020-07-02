import { Injectable } from '@angular/core';
import { NsStorageService } from '../storage/ns-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LocalizationLanguagesStorage {
  private static keyLanguage = 'language';

  /**
   * Gets current language
   */
  get language(): string {
    return this._storage.loadPerApplication(LocalizationLanguagesStorage.keyLanguage);
  }

  /**
   * Sets language
   * @param value New language
   */
  set language(value: string) {
    this._storage.savePerApplication(LocalizationLanguagesStorage.keyLanguage, value);
  }

  constructor(private readonly _storage: NsStorageService) {
  }
}
