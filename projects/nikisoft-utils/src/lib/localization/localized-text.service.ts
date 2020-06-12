import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DI_NS_USES_LOCALIZATION } from './localization-languages.di-tokens';
import { LocalizationLanguage } from "./localization.language";
import { buildLocalizedTextEnLanguages } from './localized-text-lang-en.languages';
import { buildLocalizedTextEnNikiSoft } from './localized-text-lang-en.nikisoft';
import { buildLocalizedTextSkLanguages } from './localized-text-lang-sk.languages';
import { buildLocalizedTextSkNikiSoft } from './localized-text-lang-sk.nikisoft';

@Injectable({
  providedIn: 'root',
})
export class LocalizedTextService {
  private readonly baseLocalizedTextMap = {
    [LocalizationLanguage.EN]: [buildLocalizedTextEnNikiSoft, buildLocalizedTextEnLanguages],
    [LocalizationLanguage.SK]: [buildLocalizedTextSkNikiSoft, buildLocalizedTextSkLanguages],
  };

  constructor(
    private readonly _httpClient: HttpClient,
    @Inject(DI_NS_USES_LOCALIZATION) private readonly _useLocalization: boolean,
  ) {}

  download(languageCode: string): Observable<any> {
    let localizedText = {};

    const builders = this.baseLocalizedTextMap[languageCode];

    if (builders == null) {
      throw new Error(`Language ${languageCode} not supported`);
    }

    builders.forEach((builder) => (localizedText = Object.assign(localizedText, builder())));

    return this._useLocalization ? this.downloadTexts$(languageCode, localizedText) : of(localizedText);
  }

  private downloadTexts$(languageCode: string, localizedText: any): Observable<any> {
    return this.getHttpRequest$(languageCode).pipe(map((value) => ({ ...localizedText, ...value })));
  }

  private getHttpRequest$(languageCode: string) {
    const headers = {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        Pragma: 'no-cache',
        Expires: '0',
      },
    };

    return this._httpClient.get(`assets/localization/localized-text-lang-${languageCode}.json`, headers);
  }
}
