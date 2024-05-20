import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { UpdateAccount, Account } from 'types/account';

import { useAuth } from 'hooks/useAuth';
import { useUpdateItem } from 'hooks/useUpdateItem';

import { FormTextField } from 'components/TextField';
import { FormSelectField } from 'components/SelectField';
import Button from 'components/Button';
import Form from 'components/Form';
import Modal from 'components/Modal';
import DamnLayout from 'components/DamnLayout';
import SectionHeader from 'components/SectionHeader';

export default function AccountUpdate() {
  const navigate = useNavigate();
  const auth = useAuth();

  const update = useUpdateItem<UpdateAccount, Account>('user', 'me', {
    onSuccess: (data) => {
      toast.success('Saved!');

      auth.setUser(data.data || null);
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

  const form: UpdateAccount = {
    firstName: auth.user?.firstName || '',
    lastName: auth.user?.lastName || '',
    language: auth.user?.language || ''
  };

  return (
    <Modal
      isOpen={true}
      size="sm"
      onDismiss={dismiss}
    >
      <SectionHeader
        title="titles.account_update"
        variant="dialog"
      />
      <Form
        initialValues={form}
        validationSchema="UpdateAccount"
        error={update.error?.message}
        onSubmit={async (values) => update.mutate(values as UpdateAccount)}
        submitElement={(isSubmitting) => (
          <Button
            type="submit"
            variant="primary"
            size="xl"
            title="buttons.save"
            loading={isSubmitting}
            disabled={isSubmitting}
          />
        )}
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
        <FormSelectField
          name="language"
          label="fields.language"
          optionsName="locale"
        />
      </Form>
    </Modal>
  );
}
