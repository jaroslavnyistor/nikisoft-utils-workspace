import { Provider } from '@angular/core';
import { DI_NS_STORAGE_KEY_PREFIX } from './ns-storage.di-tokens';

/**
 * Provides API to configure DI for storage
 */
export class NsStorageDiConfigurator {
  /**
   * Configures DI providers
   * @param storageKeyPrefix Prefix for the keys in storage
   */
  static configure(storageKeyPrefix: string): Provider {
    return { provide: DI_NS_STORAGE_KEY_PREFIX, useValue: storageKeyPrefix };
  }
}
