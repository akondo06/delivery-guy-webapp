import i18n from 'i18next';

interface Options {
  currency?: string;
  language?: string;
}

export function formatMoney(value: number | string | null | undefined, options?: Options) {
  if (value === undefined || value === null) {
    return;
  }
  const formatter = new Intl.NumberFormat(options?.language || i18n.language, {
    style: 'currency',
    currency: options?.currency || 'EUR',
    currencyDisplay: 'code'
  });

  const resolvedOptions = formatter.resolvedOptions();

  const formatted = formatter.format(parseInt(`${value}`));

  return !options?.currency ? formatted.replace(resolvedOptions.currency || 'EUR', '').trim() : formatted;
}
