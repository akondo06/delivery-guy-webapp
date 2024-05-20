import * as React from 'react';

import {
  Formik,
  Form as FormikForm,
  FormikErrors,
  FormikValues
} from 'formik';

import * as validations from 'validations';


import styles from './Form.module.scss';

// interface Props {
//   onSubmit: () => void;
//   children?: React.ReactNode;
// }

// export default function Form(props: Props) {
//   function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault();

//     props.onSubmit();
//   }

//   return (
//     <form className="Form" onSubmit={handleSubmit}>
//       {props.children}
//     </form>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
interface BackendError extends Error {
  response?: {
    data?: {
      validations?: FormikErrors<FormikValues>;
    }
  }
}

interface Props {
  initialValues: FormikValues;
  validationSchema?: keyof typeof validations;

  onSubmit: (values: FormikValues) => void | Promise<any>;
  submitElement?: (isSubmitting: boolean) => React.ReactNode;

  error?: string;

  // backendErrors?: FormikErrors<FormikValues>;

  children?: React.ReactNode;
}

export default function Form(props: Props) {
  return (
    <Formik
      initialValues={props.initialValues}
      validationSchema={props.validationSchema && validations[props.validationSchema]}
      onSubmit={async (values, actions) => {
        try {
          actions.setStatus({
            backendErrors: null
          });
          await props.onSubmit(values);
        } catch (error) {
          actions.setStatus({
            backendErrors: (error as BackendError).response?.data?.validations
          });
        }
      }}
    >
      {(formikProps) => {
        return (
          <FormikForm className={styles.base}>
              {props.children}

              {props.submitElement && props.submitElement(formikProps.isSubmitting)}

              {props.error && (
                <div>
                  {props.error}
                </div>
              )}
          </FormikForm>
        );
      }}
    </Formik>
  );
}
