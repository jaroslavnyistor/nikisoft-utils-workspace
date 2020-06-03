export function resolveLanguage(): string {
  let language;
  if (window.navigator.languages) {
    language = window.navigator.languages[0];
  } else {
    language = window.navigator.language;
  }

  return language;
}

export function resolveLanguageFactory() {
  return () => resolveLanguage();
}
