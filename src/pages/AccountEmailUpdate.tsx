import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { UpdateAccountEmail, Account } from 'types/account';

// import { useAuth } from 'hooks/useAuth';
import { useUpdateItem } from 'hooks/useUpdateItem';

import { FormTextField } from 'components/TextField';
import Button from 'components/Button';
import Form from 'components/Form';
import Modal from 'components/Modal';
import SectionHeader from 'components/SectionHeader';

export default function AccountEmailUpdate() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const update = useUpdateItem<UpdateAccountEmail, Account>('user', 'email', {
    onSuccess: () => {
      toast.success(t('toastr.account_email_update_success'));
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

  const form: UpdateAccountEmail = {
    email: ''
  };

  return (
    <Modal
      isOpen={true}
      size="sm"
      onDismiss={dismiss}
    >
      <SectionHeader
        title="titles.account_email_update"
        variant="dialog"
      />
      <Form
        initialValues={form}
        validationSchema="UpdateAccountEmail"
        error={update.error?.message}
        onSubmit={async (values) => update.mutate(values as UpdateAccountEmail)}
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
          name="email"
          type="text"
          label="fields.new_email"
        />
      </Form>
    </Modal>
  );
}
