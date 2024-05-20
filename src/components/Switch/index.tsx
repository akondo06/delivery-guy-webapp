import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { useField } from 'formik';

import styles from './Switch.module.scss';


export interface BaseProps {
  id?: string;
  name: string;
  label: string;

  inForm?: boolean;

  disabled?: boolean;
  loading?: boolean;
  error?: string;
}

export interface SwitchProps extends BaseProps {
  value: boolean;
  onChange: (value: boolean, name: string) => void;
  onBlur?: (value: boolean, name: string) => void;
}

export default function Switch(props: SwitchProps) {
  const { t } = useTranslation();

  function handleKeyPress(event: React.KeyboardEvent<HTMLLabelElement>) {
    if (event.keyCode !== 32) {
      return;
    }
    event.preventDefault();
    props.onChange(!props.value, props.name);
  }

  return (
    <div className={`${styles.base} ${props.inForm ? styles.inForm : ''} ${props.loading ? styles.loading : ''}`}>
      <div className={styles.inner}>
        <div className={styles.switchContainer}>
          <input
            className={styles.checkbox}

            type="checkbox"
            name={props.name}
            id={props.id}
            checked={props.value}
            onChange={() => props.onChange(!props.value, props.name)}
            onBlur={() => props.onBlur && props.onBlur(props.value, props.name)}
            disabled={props.disabled}
          />
          {props.id ? (
            <label
              className={styles.switch}
              htmlFor={props.id}
              tabIndex={props.disabled ? -1 : 1}
              onKeyDown={(event) => { handleKeyPress(event); }}
            >
              <span
                className={`${styles.switchInner} ${props.disabled ? styles.disabled : ''}`}
                tabIndex={-1}
              />
              <span
                className={`${styles.ball} ${props.disabled ? styles.disabled : ''}`}
                tabIndex={-1}
              />
            </label>
          ) : null}
        </div>
        {props.label && props.label.length ? (
          <div
            className={styles.label}
            onClick={() => props.onChange(!props.value, props.name)}
          >
            {t(props.label)}
          </div>
        ) : null}
      </div>
      <div className={styles.under}>
        {props.error && props.error.length ? (
            <div className={styles.error}>
              {props.error}
            </div>
        ) : null}
      </div>
    </div>
  );
}

export function FormSwitch(props: BaseProps) {
  const [field, meta] = useField(props.name);
  const { value, checked, ...fieldProps } = field;
  return (
    <Switch
      {...fieldProps}
      {...props}
      id={props.name}
      value={!!value}
      onChange={(value: boolean, name: string) => field.onChange({ target: { name, value, type: 'text' }})}
      onBlur={(value: boolean, name: string) => field.onChange({ target: { name, value, type: 'text' }})}
      error={meta.error && meta.touched ? meta.error : undefined}
      inForm
    />
  );
}


