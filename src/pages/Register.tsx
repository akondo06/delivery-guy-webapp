import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import BoxLayout from 'components/BoxLayout';
import Form from 'components/Form';
import Text from 'components/Text';
import { FormTextField } from 'components/TextField';
import Button, { ButtonLink } from 'components/Button';
import Spacer from 'components/Spacer';
import DamnLayout from 'components/DamnLayout';

import { RegisterForm, RegisterResponse } from 'types/auth';
import { useAuth } from '../hooks/useAuth';
import { useAction } from 'hooks/useAction';
import { useLocale } from 'hooks/useLocale';


export default function Register() {
  const auth = useAuth();
  const { locale } = useLocale();
  const { t } = useTranslation();

  const form: RegisterForm = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    language: locale
  };

  const { error, data, isLoading, mutate } = useAction<RegisterForm, RegisterResponse>('auth', 'register', auth.register);

  return (
    <BoxLayout
      underElement={
        <>
          <Text centered>
            By registering, you accept our <Link to="/privacy-policy">Privacy Policy</Link>
          </Text>
          <Spacer />
          <ButtonLink
            to="/login"
            size="xl"
            variant="white"
            title="buttons.go_to_login"
          />
        </>
      }
    >
      {data ? (
        <Text centered>
          {t('text.register_success')}
        </Text>
      ) : (
        <Form
          initialValues={form}
          validationSchema="Register"
          onSubmit={async (values) => mutate(values as RegisterForm)}
          submitElement={(isSubmitting) => (
            <Button
              type="submit"
              variant="primary"
              size="xl"
              loading={isSubmitting || isLoading}
              disabled={isSubmitting || isLoading}
              title="buttons.create_account"
            />
          )}
          error={error?.message}
        >
          <DamnLayout variant="fieldsNames">
            <FormTextField
              name="firstName"
              type="text"
              label="fields.first_name"
            />
            <FormTextField
              name="lastName"
              type="text"
              label="fields.last_name"
            />
          </DamnLayout>
          <FormTextField
            name="email"
            type="email"
            label="fields.email"
          />
          <FormTextField
            name="password"
            type="password"
            label="fields.password"
          />
        </Form>
      )}
    </BoxLayout>
  );
}
