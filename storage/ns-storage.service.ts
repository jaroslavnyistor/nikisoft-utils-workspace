import { Inject, Injectable, InjectionToken, Provider } from '@angular/core';

export const DI_NS_STORAGE_KEY_PREFIX = new InjectionToken<string>('DI_NS_STORAGE_KEY_PREFIX ');

export function setStorageKeyPrefix(useValue: string): Provider {
   return {
      provide: DI_NS_STORAGE_KEY_PREFIX, useValue
   };
}

@Injectable({
   providedIn: 'root'
})
export class NsStorageService {
   private readonly _keyStatePrefix: string;
   private _userId: number;

   get userId(): number {
      return this._userId;
   }

   set userId(value: number) {
      this._userId = value;
   }

   constructor(@Inject(DI_NS_STORAGE_KEY_PREFIX) keyStatePrefix: string) {
      this._keyStatePrefix = keyStatePrefix;
   }

   savePerUser(key: string, value: any) {
      localStorage.setItem(
         this.getKeyPerUser(key),
         JSON.stringify(value)
      );
   }

   loadPerUser<T>(key: string): T {
      const savedValue = localStorage.getItem(
         this.getKeyPerUser(key)
      );

      return JSON.parse(savedValue);
   }

   deletePerUser(key: string) {
      localStorage.removeItem(
         this.getKeyPerUser(key)
      );
   }

   private getKeyPerUser(key: string) {
      let resolvedKey = this._keyStatePrefix;

      if (this.userId != null) {
         resolvedKey += `:${this.userId}`;
      }

      resolvedKey += `:${key}`;

      return resolvedKey;
   }

   savePerApplication(key: string, value: any) {
      localStorage.setItem(
         this.getKeyPerApplication(key),
         JSON.stringify(value)
      );
   }

   loadPerApplication<T>(key: string): T {
      const savedValue = localStorage.getItem(
         this.getKeyPerApplication(key)
      );

      return JSON.parse(savedValue);
   }

   deletePerApplication(key: string) {
      localStorage.removeItem(
         this.getKeyPerApplication(key)
      );
   }

   private getKeyPerApplication(key: string) {
      return `${this._keyStatePrefix}:${key}`;
   }
}
