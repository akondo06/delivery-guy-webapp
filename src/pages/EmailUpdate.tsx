import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useParams
} from 'react-router-dom';

import BoxLayout from 'components/BoxLayout';
import Text from 'components/Text';
import  { ButtonLink } from 'components/Button';
import Spacer from 'components/Spacer';
import Spinner from 'components/Spinner';

import { useAuth } from '../hooks/useAuth';
import { useAction } from '../hooks/useAction';

import {
  EmailUpdateForm,
  EmailUpdateResponse
} from 'types/auth';

export default function EmailUpdate() {
  const auth = useAuth();

  const { token } = useParams();

  const { t } = useTranslation();

  const { error, data, isLoading, mutate } = useAction<EmailUpdateForm, EmailUpdateResponse>('auth.emailUpdate', token || 'aloha', auth.emailUpdate);

  useEffect(() => {
    mutate({
      token: token || 'aloha'
    });
  }, [token]);

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
      {isLoading ? (
        <Spinner size="xl" />
      ) : error ? (
        <>
          <Text variant="section-title" centered>
            An error has occurred:
          </Text>
          <Spacer />
          <Text centered>
            {error.message}
          </Text>
        </>
      ) : data ? (
        <Text centered>
          {t('text.email_update_success')}
        </Text>
      ) : null}
    </BoxLayout>
  );
}
