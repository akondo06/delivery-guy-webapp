import { setLocale } from 'yup';

// https://github.com/jquense/yup#localization-and-i18n

function updateLocale() {
  setLocale({
    mixed: {
      default: 'invalid',
      required: 'required'
    },
    string: {
      email: 'invalid_email'
    },
    // number: {
    //   min: ({ min }) => ({ key: 'field_too_short', values: { min } }),
    //   max: ({ max }) => ({ key: 'field_too_big', values: { max } }),
    // },
  });
}

updateLocale();
