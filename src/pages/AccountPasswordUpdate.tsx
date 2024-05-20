import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { UpdateAccountPassword, Account } from 'types/account';

import { useUpdateItem } from 'hooks/useUpdateItem';

import { FormTextField } from 'components/TextField';
import Button from 'components/Button';
import Form from 'components/Form';
import Modal from 'components/Modal';
import SectionHeader from 'components/SectionHeader';

export default function AccountEmailUpdate() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const update = useUpdateItem<UpdateAccountPassword, Account>('user', 'password', {
    onSuccess: () => {
      toast.success(t('toastr.success'));

      dismiss();
    },
    onError: () => {
      toast.error('Something went wrong!');
    }
  });

  const dismiss = () => {
    update.reset();
    navigate('..');
  };

  const form: UpdateAccountPassword = {
    currentPassword: '',
    newPassword: ''
  };

  return (
    <Modal
      isOpen={true}
      size="sm"
      onDismiss={dismiss}
    >
      <SectionHeader
        title="titles.account_password_update"
        variant="dialog"
      />
      <Form
        initialValues={form}
        validationSchema="UpdateAccountPassword"
        error={update.error?.message}
        onSubmit={async (values) => update.mutate(values as UpdateAccountPassword)}
        submitElement={(isSubmitting) => (
          <Button
            type="submit"
            variant="primary"
            size="xl"
            title="buttons.submit"
            loading={isSubmitting || update.isLoading}
            disabled={isSubmitting || update.isLoading}
          />
        )}
      >
        <FormTextField
          name="currentPassword"
          type="password"
          label="fields.current_password"
        />
        <FormTextField
          name="newPassword"
          type="password"
          label="fields.new_password"
        />
      </Form>
    </Modal>
  );
}
