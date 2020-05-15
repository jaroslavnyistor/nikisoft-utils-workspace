import { Provider } from '@angular/core';
import { DI_NS_STORAGE_KEY_PREFIX } from './ns-storage.di-tokens';

export class NsStorageDiConfigurator {
   static configure(useValue: string): Provider {
      return { provide: DI_NS_STORAGE_KEY_PREFIX, useValue };
   }
}
