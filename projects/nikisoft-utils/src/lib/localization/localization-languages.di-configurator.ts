import { APP_INITIALIZER, Provider } from '@angular/core';
import { DI_NS_DEFAULT_LANGUAGE, DI_NS_USES_LOCALIZATION } from './localization-languages.di-tokens';
import { LocalizationLanguagesService } from './localization-languages.service';
import { LocalizationLanguage } from './localization.language';

/**
 * Initializes language engine
 * @param service
 */
export function localizationLanguagesServiceAppInitializer(service: LocalizationLanguagesService) {
  return () => service.load();
}

/**
 * Configures Angular DI so language engine is used correctly
 */
export class LocalizationLanguagesDiConfigurator {
  static configure(defaultLanguage: LocalizationLanguage, usesLocalization: boolean): Provider[] {
    const resolvedUseLocalization = usesLocalization == null ? true : usesLocalization;

    return [
      { provide: DI_NS_DEFAULT_LANGUAGE, useValue: defaultLanguage },
      { provide: DI_NS_USES_LOCALIZATION, useValue: resolvedUseLocalization },
      {
        provide: APP_INITIALIZER,
        useFactory: localizationLanguagesServiceAppInitializer,
        deps: [LocalizationLanguagesService],
        multi: true,
      },
    ];
  }
}
