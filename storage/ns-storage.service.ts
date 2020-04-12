import { Inject, Injectable, InjectionToken, Provider } from '@angular/core';

const DI_NS_STORAGE_KEY_PREFIX = new InjectionToken<string>('DI_NS_STORAGE_KEY_PREFIX ');

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

   save(key: string, value: any) {
      localStorage.setItem(
         this.getKey(key),
         JSON.stringify(value)
      );
   }

   load<T>(key: string): T {
      const savedValue = localStorage.getItem(
         this.getKey(key)
      );

      return JSON.parse(savedValue);
   }

   delete(key: string) {
      localStorage.removeItem(
         this.getKey(key)
      );
   }

   private getKey(key: string) {
      let result = this._keyStatePrefix;

      if (this.userId != null) {
         result += `:${this.userId}`;
      }

      result += `:${key}`;

      return result;
   }

   static setStorageKeyPrefix(useValue: string): Provider {
      return {
         provide: DI_NS_STORAGE_KEY_PREFIX, useValue
      };
   }
}
