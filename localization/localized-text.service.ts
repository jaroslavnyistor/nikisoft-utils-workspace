import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { buildLocalizedTextEnLanguages } from './localized-text-lang-en.languages';
import { buildLocalizedTextEnNikiSoft } from './localized-text-lang-en.nikisoft';
import { buildLocalizedTextSkLanguages } from './localized-text-lang-sk.languages';
import { buildLocalizedTextSkNikiSoft } from './localized-text-lang-sk.nikisoft';

@Injectable({
   providedIn: 'root'
})
export class LocalizedTextService {
   private readonly baseLocalizedTextMap = {
      en: [
         buildLocalizedTextEnNikiSoft,
         buildLocalizedTextEnLanguages,
      ],
      sk: [
         buildLocalizedTextSkNikiSoft,
         buildLocalizedTextSkLanguages,
      ]
   };

   constructor(private _httpClient: HttpClient) {
   }

   download(languageCode: string): Observable<any> {
      let localizedText = {};

      const builders = this.baseLocalizedTextMap[languageCode];

      if (builders == null) {
         throw new Error(`Language ${languageCode} not supported`);
      }

      builders.forEach(builder => localizedText = Object.assign(
         localizedText,
         builder()
      ));

      return this._httpClient.get(
         `assets/localization/localized-text-lang-${languageCode}.json`,
         {
            headers: {
               'Cache-Control':  'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
               'Pragma': 'no-cache',
               'Expires': '0'
            }
         }
      )
      .pipe(
         map(value => ({
               ...localizedText,
               ...value
            })
         )
      );
   }
}
