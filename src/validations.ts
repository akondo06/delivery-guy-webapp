import * as Yup from 'yup';

export const Login = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required(),
  password: Yup.string()
    .trim()
    .required()
});

export const Register = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .required(),
  lastName: Yup.string()
    .trim()
    .required(),
  email: Yup.string()
    .trim()
    .required(),
  password: Yup.string()
    .trim()
    .required(),
  language: Yup.string()
    .trim()
    .oneOf(['en', 'de', 'es', 'ro'])
    .required()
});

export const Recover = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required()
});

export const UpdatePassword = Yup.object().shape({
  password: Yup.string()
    .trim()
    .required(),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'invalid').required()
    .trim()
    .required()
});

export const UpdateAccount = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .required(),
  lastName: Yup.string()
    .trim()
    .required(),
  language: Yup.string()
    .trim()
    .oneOf(['en', 'de', 'es', 'ro'])
    .required()
});

export const UpdateAccountAvatar = Yup.object().shape({
  avatar: Yup.mixed()
    .required()
});

export const UpdateAccountEmail = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required()
});

export const UpdateAccountPassword = Yup.object().shape({
  currentPassword: Yup.string()
    .trim()
    .required(),
  newPassword: Yup.string()
    .trim()
    .required()
});



export const CreateProperty = Yup.object().shape({
  name: Yup.string()
    .min(2)
    .max(100)
    .trim()
    .required(),

  type: Yup.string()
    .trim()
    .oneOf(['partial', 'full'])
    .required(),

  addressStreet: Yup.string()
    .min(2)
    .max(200)
    .trim()
    .required(),

  addressPostalCode: Yup.number()
    .positive()
    .integer()
    .required(),

  addressCity: Yup.string()
    .min(2)
    .max(200)
    .trim()
    .required(),

  addressCountry: Yup.string()
    .length(2)
    .trim()
    .required()
});

export const UpdateProperty = Yup.object().shape({
  name: Yup.string()
    .min(2)
    .max(100)
    .trim()
    .required(),

  type: Yup.string()
    .trim()
    .oneOf(['partial', 'full'])
    .required(),

  addressStreet: Yup.string()
    .min(2)
    .max(200)
    .trim()
    .required(),

  addressPostalCode: Yup.number()
    .positive()
    .integer()
    .required(),

  addressCity: Yup.string()
    .min(2)
    .max(200)
    .trim()
    .required(),

  addressCountry: Yup.string()
    .length(2)
    .trim()
    .required()
});
