import { APP_INITIALIZER, Provider } from '@angular/core';
import { DI_NS_DEFAULT_LANGUAGE } from './localization-languages.di-tokens';
import { LocalizationLanguagesService } from './localization-languages.service';
import { LocalizationLanguage } from './localization.language';

export function localizationLanguagesServiceAppInitializer(service: LocalizationLanguagesService) {
   return () => service.load();
}

export class LocalizationLanguagesDiConfigurator {
   static configure(defaultLanguage: LocalizationLanguage): Provider[] {
      return [
         {
            provide: APP_INITIALIZER,
            useFactory: localizationLanguagesServiceAppInitializer,
            deps: [LocalizationLanguagesService],
            multi: true
         },
         { provide: DI_NS_DEFAULT_LANGUAGE, useValue: defaultLanguage },
      ];
   }

}
