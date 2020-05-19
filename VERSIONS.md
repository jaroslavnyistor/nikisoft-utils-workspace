# NikiSoft-Web-Utils

## Versions
- NsDate.isWeekend function added
- DI refactored - created configurator classes to configure DI and provide service and model
- Fixed isLoggedIn observable notified even the value has not changed
- Fixed notification of isLoggedIn
- ns-authenticate-response.model.ts uses rxjs-like approach

### 1.1.0.0
- Renamed text method to translate in localization-languages.service
- Fixed logout of user state of visible page has not been saved
- Fixed setting correct date and time locale and use in month calendar
- Fixed locale for date and date/time picker form control
- Refactored authentication service and model
- Refactored setup of DI providers in app.module

### 1.0.0.0
- ns-subscription.* classes to simplify access to service and models
- storing values to local storage with support of storing state of pages
- NsNavigationService for navigating
- NsMap classes which mimics Map-like behaviour
- Support for localized text
- Various helper functions for arrays, currency, date and times, numbers, strings and objects
- NsDate and NsDateTime to simplify work with date and date time
- Authentication classes to authenticate user, preserver information in local storage
- API access classes
