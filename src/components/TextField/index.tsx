import { useTranslation } from 'react-i18next';

import { useField, useFormikContext } from 'formik';

// import styles from './TextField.module.scss';

import InputWrapper, { InputWrapperBaseProps } from '../InputWrapper';

interface TextFieldBaseProps extends InputWrapperBaseProps {
  type?: 'text' | 'email' | 'password'  | 'file' | 'multiline';
}

export interface TextFieldProps extends TextFieldBaseProps {
  value: string;
  onChange: (value: string | null, name: string) => void;
  onBlur?: (value: string | null, name: string) => void;
}

export default function TextField(props: TextFieldProps) {
  return (
    <InputWrapper {...props}>
      {(styles) => (props.type === 'multiline' ? (
        <textarea
          className={styles.control}
          id={props.id}
          name={props.name}
          disabled={props.disabled}
          onChange={(event) => props.onChange(event.target.value, props.name)}
          onBlur={(event) => props.onBlur && props.onBlur(event.target.value, props.name)}
          defaultValue={props.value}
        />
      ) : (
        <input
          className={styles.control}
          id={props.id}
          name={props.name}
          value={props.value}
          type={props.type || 'text'}
          disabled={props.disabled}
          onChange={(event) => props.onChange(event.target.value, props.name)}
          onBlur={(event) => props.onBlur && props.onBlur(event.target.value, props.name)}
        />
      ))}
    </InputWrapper>
  );
}

export function FormTextField(props: TextFieldBaseProps) {
  const [field, meta] = useField(props.name);

  const { t } = useTranslation();

  const formik = useFormikContext();

  const backendError = formik.status && formik.status.backendErrors && formik.status.backendErrors[props.name];

  const error = meta.error || backendError;

  return (
    <TextField
      {...field}
      {...props}
      onChange={(value: string | null, name: string) => {
        if (formik.status) {
          formik.setStatus({
            ...formik.status,
            backendErrors: formik.status.backendErrors ? {...formik.status.backendErrors, [props.name]: undefined } : formik.status.backendErrors
          });
        }

        return field.onChange({ target: { name, value, type: props.type }});
      }}
      onBlur={(value: string | null, name: string) => field.onBlur({ target: { name, value, type: props.type }})}
      error={error && meta.touched ? t(error, { ns: 'validation' }) : undefined}
    />
  );
}


