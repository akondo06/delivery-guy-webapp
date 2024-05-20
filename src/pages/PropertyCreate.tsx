import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { CreateProperty, Property } from 'types/property';

import { useCreateItem } from 'hooks/useCreateItem';

import Text from 'components/Text';
import { FormTextField } from 'components/TextField';
import { FormSelectField } from 'components/SelectField';
import Button from 'components/Button';
import Form from 'components/Form';
import Spacer from 'components/Spacer';
import Modal from 'components/Modal';
import DamnLayout from 'components/DamnLayout';
import SectionHeader from 'components/SectionHeader';

export default function PropertyCreate() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const create = useCreateItem<CreateProperty, Property>('property', {
    onSuccess: () => {
      toast.success('Property created!');
      dismiss();
    },
    onError: () => {
      toast.error('Something went wrong!');
    }
  });

  const dismiss = () => {
    create.reset();
    navigate('/properties');
  };

  const form: CreateProperty = {
    name: '',
    type: 'partial',
    addressStreet: '',
    addressCity: '',
    addressPostalCode: '',
    addressCountry: '',
    reference: ''
  };

  return (
    <Modal
      isOpen={true}
      size="sm"
      onDismiss={dismiss}
    >
      <SectionHeader
        title="titles.property_create"
        variant="dialog"
      />
      <Form
        initialValues={form}
        validationSchema="CreateProperty"
        error={create.error?.message}
        onSubmit={(values) => create.mutate(values as CreateProperty)}
        submitElement={(isSubmitting) => (
          <Button
            type="submit"
            variant="primary"
            size="xl"
            title="buttons.create"
            loading={isSubmitting}
            disabled={isSubmitting}
          />
        )}
      >
        <FormTextField
          name="name"
          type="text"
          label="fields.name"
        />
        <FormTextField
          name="reference"
          type="text"
          label="fields.reference"
        />

        <Text variant="group-title">
          {t('titles.address')}
        </Text>
        <Spacer size="sm" />
        <FormTextField
          name="addressStreet"
          type="text"
          label="fields.street"
        />
        <DamnLayout variant="fieldsPostalCodeCity">
          <FormTextField
            name="addressPostalCode"
            type="text"
            label="fields.postal_code"
          />
          <FormTextField
            name="addressCity"
            type="text"
            label="fields.city"
          />
        </DamnLayout>
        <FormSelectField
          name="addressCountry"
          label="fields.country"
          optionsName="country"
        />
      </Form>
    </Modal>
  );
}
