import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import BoxLayout from 'components/BoxLayout';
import Form from 'components/Form';
import Text from 'components/Text';
import { FormTextField } from 'components/TextField';
import Button, { ButtonLink } from 'components/Button';
import Spacer from 'components/Spacer';

import { PasswordUpdateForm, PasswordUpdateResponse } from 'types/auth';
import { useAuth } from '../hooks/useAuth';
import { useAction } from '../hooks/useAction';

export default function PasswordUpdate() {
  const auth = useAuth();
  const { token } = useParams();

  const { t } = useTranslation();

  const form: PasswordUpdateForm = {
    token: token || 'none',
    password: '',
    passwordConfirm: ''
  };

  const { error, data, isLoading, mutate } = useAction<PasswordUpdateForm, PasswordUpdateResponse>('auth', 'passwordUpdate', auth.passwordUpdate);

  return (
    <BoxLayout
      underElement={
        <ButtonLink
          to="/login"
          size="xl"
          variant="white"
          title="buttons.go_to_login"
        />
      }
    >
      <Text
        variant="section-title"
        centered
      >
        {t('titles.password_update')}
      </Text>
      <Spacer />
      {data ? (
        <Text
          variant="section-subtitle"
          centered
        >
          {t('text.password_update_success')}
        </Text>
      ) : (
        <Form
          initialValues={form}
          validationSchema="UpdatePassword"
          onSubmit={async (values) => mutate(values as PasswordUpdateForm)}
          submitElement={(isSubmitting) => (
            <Button
              type="submit"
              variant="primary"
              size="xl"
              loading={isSubmitting || isLoading}
              disabled={isSubmitting || isLoading}
              title="buttons.submit"
            />
          )}
          error={error?.message}
        >
          <FormTextField
              name="password"
              type="password"
              label="fields.new_password"
            />
            <FormTextField
              name="passwordConfirm"
              type="password"
              label="fields.password_confirm"
            />
        </Form>
      )}
    </BoxLayout>
  );
}
