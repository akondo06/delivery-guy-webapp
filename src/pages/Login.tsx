import { Location } from 'history';
import {
  useNavigate,
  useLocation,
  Link
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import BoxLayout from 'components/BoxLayout';
import Form from 'components/Form';
import Text from 'components/Text';
import { FormTextField } from 'components/TextField';
import Button, { ButtonLink } from 'components/Button';
import Spacer from 'components/Spacer';

import { LoginForm } from 'types/auth';
import { useAuth } from '../hooks/useAuth';
import { useAction } from 'hooks/useAction';

interface CustomizedState {
  from?: Location;
}

export default function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const form: LoginForm = {
    email: process.env.REACT_APP_TEST_EMAIL || '',
    password: process.env.REACT_APP_TEST_PASSWORD || ''
  };

  const state = location.state as CustomizedState;
  const fromPath = state && state.from ? state.from.pathname : '/';

  const { error, isLoading, mutate } = useAction<LoginForm, void>('auth', 'login', auth.login, {
    onSuccess() {
      navigate(fromPath.includes('logout') ? '/' : fromPath, { replace: true });
    }
  });

  return (
    <BoxLayout
      underElement={
        <>
          <Text centered>
            By logging in, you accept our <Link to="/privacy-policy">Privacy Policy</Link>
          </Text>
          <Spacer />
          <ButtonLink
            to="/register"
            size="xl"
            variant="white"
            title="buttons.create_account"
          />
        </>
      }
    >
      <Form
        initialValues={form}
        validationSchema="Login"
        onSubmit={async (values) => mutate(values as LoginForm)}
        submitElement={(isSubmitting) => (
          <Button
            type="submit"
            variant="primary"
            size="xl"
            title="buttons.login"
            loading={isSubmitting || isLoading}
            disabled={isSubmitting || isLoading}
          />
        )}
        error={error?.message}
      >
        <FormTextField
          name="email"
          type="email"
          label="fields.email"
        />
        <FormTextField
          name="password"
          type="password"
          label="fields.password"

          actionElement={
            <Link to="/recover">
              {t('buttons.forgot')}
            </Link>
          }
        />
      </Form>
    </BoxLayout>
  );
}
