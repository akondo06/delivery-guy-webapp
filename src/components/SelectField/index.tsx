import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useField } from 'formik';
import AsyncSelect from 'react-select/async';
import AsyncCreatableSelect from 'react-select/async-creatable';

import { snakeCase } from 'utils/misc';

import { fetchOptionsOf } from 'services/api';
import InputWrapper, { InputWrapperBaseProps } from 'components/InputWrapper';

import { useOptions } from 'hooks/useOptions';
import { useCreateOption } from 'hooks/useCreateOption';

interface SelectFieldBaseProps extends InputWrapperBaseProps {
  clearable?: boolean;
  multi?: boolean;
  loadOnInit?: boolean;

  optionsName: 'property-unit-meter' | 'property-unit-tag' | 'country' | 'locale' | 'recurrent-type';
  optionsPayload?: { [key: string]: string | undefined; };
  allowCreate?: { [key: string]: string | undefined; };
}

interface Props extends SelectFieldBaseProps {
  value: string | string[] | null;
  onChange: (value: string | string[] | null, name: string) => void;
  onBlur?: (value: string | string[] | null, name: string) => void;
}

interface Option {
  value: string;
  label: string;
}

export default function SelectField(props: Props) {
  const { t } = useTranslation();
  const mounted = useRef(false);

  const [initialValue, setInitialValue] = useState<Option[] | null>(null);
  const [debounce, setDebounce] = useState<{ cb?: () => void, delay?: number }>({});

  const optionsName = props.optionsName;

  const initialSelected = useOptions(optionsName, {
    id: props.value ? Array.isArray(props.value) ? props.value : [props.value] : null,
    ...(props.optionsPayload || {})
  }, { enabled: !!props.value });

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if(!initialSelected.data || initialSelected.isLoading) {
      return;
    }

    setInitialValue(initialSelected.data);

    return () => {
      initialSelected.remove();
      setInitialValue(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialSelected.data]);

  useEffect(() => {
    const { cb, delay } = debounce;
    if (cb) {
      const timeout = setTimeout(cb, delay);
      return () => clearTimeout(timeout); 
    }
  }, [debounce]);

  const loadOptions = (search: string, callback: (options: Option[]) => void) => {
     setDebounce({
       cb: async () => {
         const data = await fetchOptionsOf(optionsName, { search, ...(props.optionsPayload || {}) });
         callback(data || []);
       },
       delay: 500
     });
  };

  const createItem = useCreateOption(optionsName || 'what', {
    onSuccess: (data) => {
      const properValue = props.multi && Array.isArray(initialValue) ? [...initialValue, data] : [data];

      props.onChange(props.multi ? properValue.map((o) => o.value) : properValue[0].value || 'unknown', props.name);

      setInitialValue(properValue);
    },
    onError: () => {
      toast.error('Something went wrong!');
    }
  });

  const Element = props.allowCreate ? AsyncCreatableSelect : AsyncSelect;

  const labelPrefix = `${snakeCase(optionsName)}`;

  return (
    <InputWrapper {...props}>
      {() => (
        <Element
          id={props.id}
          name={props.name}

          onChange={(newValue) => {
            const properValue = props.multi && Array.isArray(newValue) ? newValue : [newValue];
            props.onChange(props.multi ? properValue.map((o) => o.value) : properValue[0].value || 'unknown', props.name);
            setInitialValue(properValue);
          }}
          onBlur={(event) => props.onBlur ? props.onBlur(event.target.value, props.name) : undefined}

          isMulti={props.multi}
          isClearable={props.clearable}

          value={initialValue}
          loadOptions={loadOptions}
          cacheOptions
          defaultOptions

          onCreateOption={props.allowCreate ? (name: string) => {
            createItem.mutate({ ...(props.allowCreate || {}), name });
          } : undefined}

          getOptionValue={(option) => option.value}
          getOptionLabel={(option) => {
            const key = `${labelPrefix}.${option.label}`;
            const label = t(key);
            return key && label && key === label ? option.label : label;
          }}

          isDisabled={props.disabled}
          isLoading={initialSelected.isLoading || createItem.isLoading}

          styles={{
            menuPortal: (base) => ({
              ...base,
              zIndex: 9999
            }),
            control: (base) => ({
              ...base,

              alignItems: 'center',
              backgroundColor: 'hsl(0, 0%, 100%)',
              borderColor: '#E7E4E4',
              borderRadius: '0.5rem',
              borderStyle: 'solid',
              borderWidth: 2,
              boxShadow: undefined,
              boxSizing: 'border-box',
              cursor: 'default',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              label: 'control',
              padding: '0.9rem 0.25rem 0 0.25rem',
              minHeight: '3.5rem',
              height: 'auto',
              outline: '0 !important',
              position: 'relative',
              transition: "box-shadow 0.4s, border-color 0.1s",

              '&:hover': {
                borderColor: '#cfc9c9'
              },

              '&:focus': {
                outline: 0,
                boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
                borderColor: '#109688'
              },
              '&:focus-within': {
                outline: 0,
                boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
                borderColor: '#109688'
              }
            }),
            singleValue: (base) => ({
              ...base,
              color: '#232C3B',
              fontSize: '1rem'
            }),
            indicatorsContainer: (base) => ({
              ...base,
              transform: 'translateY(-0.42rem)'
            })
          }}
          placeholder=""
          menuPortalTarget={document.body}
          menuShouldScrollIntoView={false}
          isSearchable
        />
      )}
    </InputWrapper>
  );
}

export function FormSelectField(props: SelectFieldBaseProps) {
  const [field, meta] = useField(props.name);
  return (
    <SelectField
      {...field}
      {...props}
      onChange={(value, name: string) => field.onChange({ target: { name, value, type: 'select' }})}
      onBlur={(value, name: string) => field.onBlur({ target: { name, value, type: 'select' }})}
      error={meta.error && meta.touched ? meta.error : undefined}
    />
  );
}
