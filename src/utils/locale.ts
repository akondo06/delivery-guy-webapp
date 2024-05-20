import i18n from 'i18next';

export function localeLabel(value?: string) {
  const inLocale = new Intl.DisplayNames([i18n.language], { type: 'language' });

  let name;
  try {
    name = inLocale.of((value || '').toLowerCase());
  } catch (error) {
    name = value;
  }

  return name || 'undefined';
}

export function localeList() {
  return [
    'en',
    // 'de',
    // 'es',
    'ro',
  ].map((id) => ({
    id,
    name: localeLabel(id)
  }));
}
