
const dateFormatter = new Intl.DateTimeFormat('de-DE', { // use 'default' for browser one...
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
});

const dateTimeFormatter = new Intl.DateTimeFormat('de-DE', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',

  hour: 'numeric',
  minute: 'numeric',
  // second: 'numeric'
});

const monthFormatter = new Intl.DateTimeFormat('de-DE', {
  month: 'long'
});

const monthYearFormatter = new Intl.DateTimeFormat('de-DE', {
  year: 'numeric',
  month: 'long'
});

const shortMonthFormatter = new Intl.DateTimeFormat('de-DE', {
  // year: '2-digit',
  month: 'short'
});

export function formatDate(str?: string) {
  return str && dateFormatter.format(new Date(str));
}

export function formatDateTime(str?: string) {
  return str && dateTimeFormatter.format(new Date(str));
}

export function formatMonth(str?: string) {
  return str && monthFormatter.format(new Date(str));
}

export function formatMonthYear(str?: string) {
  return str && monthYearFormatter.format(new Date(str));
}

export function formatShortMonth(str?: string) {
  return str && shortMonthFormatter.format(new Date(str));
}
