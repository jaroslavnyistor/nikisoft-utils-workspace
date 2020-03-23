import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { buildLocalizedTextEnLanguages } from './localized-text-lang-en.languages';
import { buildLocalizedTextSkLanguages } from './localized-text-lang-sk.languages';
import { buildLocalizedTextEnNikiSoft } from './localized-text-lang-en.nikisoft';
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

      return this._httpClient.get(`assets/localization/localized-text-lang-${languageCode}.json`)
      .pipe(
         switchMap(value => (of({
               ...localizedText,
               ...value
            }))
         )
      );
   }
}
