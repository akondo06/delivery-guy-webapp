import { useField } from 'formik';
import { useTranslation } from 'react-i18next';

import InputWrapper, { InputWrapperBaseProps } from '../InputWrapper';
import TheLitePicker from 'components/TheLitePicker';
import Calendar from 'icons/Calendar';
import X from 'icons/X';

import styles from './DateField.module.scss';

interface DateFieldBaseProps extends InputWrapperBaseProps {
  clearable?: boolean;
}

interface Props extends DateFieldBaseProps {
  min?: string | null;
  max?: string | null;
  value: string;
  onChange: (value: string | null, name: string) => void;
  onBlur?: (value: string | null, name: string) => void;
}

export default function DateField(props: Props) {
  const { t } = useTranslation();

  return (
    <InputWrapper
      {...props}

      actionElement={props.clearable && props.value ? (
        <button
          type="button"
          className={styles.actionClear}
          tabIndex={-1}
          onClick={() => props.onChange('', props.name)}
        >
          <X className={styles.actionClearIcon} />
        </button>
      ) : <Calendar className={styles.actionIcon} />}
    >
      {(styles) => (
        <TheLitePicker
          className={`${styles.control} ${props.disabled ? styles.controlIsDisabled : ''}`}
          id={props.id}
          name={props.name}
          start={props.value}
          end={null}
          min={props.min}
          max={props.max}
          single
          placeholder={props.placeholder ? t(props.placeholder) : undefined}
          disabled={props.disabled}
          onChange={(value, name) => props.onChange(value.start, name)}
          onBlur={(value, name) => props.onBlur && props.onBlur(value?.start, name)}
        />
      )}
    </InputWrapper>
  );
}

export function FormDateField(props: DateFieldBaseProps) {
  const [field, meta] = useField(props.name);
  return (
    <DateField
      {...field}
      {...props}
      onChange={(value, name: string) => field.onChange({ target: { name, value, type: 'date' }})}
      onBlur={(value, name: string) => field.onBlur({ target: { name, value, type: 'date' }})}
      error={meta.error && meta.touched ? meta.error : undefined}
    />
  );
}
