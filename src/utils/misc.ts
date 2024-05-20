// ember style (cuz stackoverflow sucks ass):
// source: https://github.com/emberjs/ember.js/blob/v4.11.0/packages/%2540ember/string/index.ts

const STRING_CAMELIZE_REGEXP_1 = /(-|_|\.|\s)+(.)?/g;
const STRING_CAMELIZE_REGEXP_2 = /(^|\/)([A-Z])/g;

export function camelCase(str: string) {
  return str.replace(STRING_CAMELIZE_REGEXP_1, (m, s, chr) => (chr ? chr.toUpperCase() : '')).replace(STRING_CAMELIZE_REGEXP_2, (match) => match.toLowerCase());
}

const STRING_UNDERSCORE_REGEXP_1 = /([a-z\d])([A-Z]+)/g;
const STRING_UNDERSCORE_REGEXP_2 = /-|\s+/g;

export function snakeCase(str: string) {
  return str.replace(STRING_UNDERSCORE_REGEXP_1, '$1_$2').replace(STRING_UNDERSCORE_REGEXP_2, '_').toLowerCase();
}

const STRING_CAPITALIZE_REGEXP = /(^|\/)([a-z\u00C0-\u024F])/g;

export function capitalize(str: string) {
  return str.replace(STRING_CAPITALIZE_REGEXP, (match /*, separator, chr */) => match.toUpperCase());
}

export function ucFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatNumber(raw?: string | number | null) {
  const str = parseFloat(`${raw || 0}`).toFixed(2);

  const [main, tail] = str.split('.');

  if (tail[0] === tail[1] && tail[0] === '0') {
    return parseInt(main);
  }
  return parseFloat(`${main}.${tail[1] === '0' ? tail[0] : tail.substr(0, 2)}`);
}
