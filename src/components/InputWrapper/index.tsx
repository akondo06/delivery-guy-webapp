import { useTranslation } from 'react-i18next';

import styles from './InputWrapper.module.scss';

export interface InputWrapperBaseProps {
  id?: string;
  name: string;
  label?: string;
  placeholder?: string;

  disabled?: boolean;
  actionElement?: JSX.Element;
  error?: string;
}

export interface InputWrapperProps extends InputWrapperBaseProps {
  value: string | string[] | null;
  children: ((s: typeof styles) => React.ReactNode);
}

export default function InputWrapper(props: InputWrapperProps) {
  const { t } = useTranslation();

  return (
    <div className={props.value !== undefined && (props.value + '').length ? `${styles.base} ${styles.hasValue}` : styles.base}>
      <div className={styles.inner}>
        {props.children(styles)}
        {props.label ? (
          <label className={styles.label} htmlFor={props.id}>
            {t(props.label)}
          </label>
        ) : null}
        {props.actionElement ? (
          <div className={styles.action}>
            {props.actionElement}
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
