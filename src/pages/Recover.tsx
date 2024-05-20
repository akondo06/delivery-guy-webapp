import { useTranslation } from 'react-i18next';

import BoxLayout from 'components/BoxLayout';
import Form from 'components/Form';
import Text from 'components/Text';
import { FormTextField } from 'components/TextField';
import Button, { ButtonLink } from 'components/Button';
import Spacer from 'components/Spacer';

import { RecoverForm, RecoverResponse } from 'types/auth';
import { useAuth } from '../hooks/useAuth';
import { useAction } from '../hooks/useAction';

export default function Recover() {
  const auth = useAuth();

  const { t } = useTranslation();

  const form: RecoverForm = {
    email: ''
  };

  const { error, data, isLoading, mutate } = useAction<RecoverForm, RecoverResponse>('auth', 'recover', auth.recover);

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
        {t('titles.recover')}
      </Text>
      <Spacer />
      {data ? (
        <Text
          variant="section-subtitle"
          centered
        >
          {t('text.recover_success')}
        </Text>
      ) : (
        <Form
          initialValues={form}
          validationSchema="Recover"
          onSubmit={async (values) => mutate(values as RecoverForm)}
          submitElement={(isSubmitting) => (
            <Button
              type="submit"
              variant="primary"
              size="xl"
              loading={isSubmitting || isLoading}
              disabled={isSubmitting || isLoading}
              title="buttons.request_email"
            />
          )}
          error={error?.message}
        >
          <Text
            variant="section-subtitle"
            centered
          >
            {t('text.recover_instructions_in_email')}
          </Text>
          <Spacer />
          <FormTextField
            name="email"
            type="email"
            label="fields.email"
          />
        </Form>
      )}
    </BoxLayout>
  );
}
