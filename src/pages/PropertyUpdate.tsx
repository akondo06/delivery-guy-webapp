import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { UpdateProperty, Property } from 'types/property';

import { useItemById } from 'hooks/useItemById';
import { useUpdateItem } from 'hooks/useUpdateItem';

import Text from 'components/Text';
import { FormTextField } from 'components/TextField';
import { FormSelectField } from 'components/SelectField';
import Button from 'components/Button';
import Form from 'components/Form';
import Spacer from 'components/Spacer';
import Modal from 'components/Modal';
import DamnLayout from 'components/DamnLayout';
import SectionHeader from 'components/SectionHeader';

export default function PropertyEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useTranslation();

  const { isLoading, data, error } = useItemById<Property>('property', id);

  const update = useUpdateItem<UpdateProperty, Property>('property', id, {
    onSuccess: () => {
      toast.success('Saved!');
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

  const form: UpdateProperty = {
    name: data?.name || '',
    type: data?.type || 'partial',
    addressStreet: data?.addressStreet || '',
    addressCity: data?.addressCity || '',
    addressPostalCode: data?.addressPostalCode || '',
    addressCountry: data?.addressCountry || '',
    reference: data?.reference || ''
  };

  return (
    <Modal
      isOpen={true}
      size="sm"
      onDismiss={dismiss}

      isLoading={isLoading}
      error={error?.message}
    >
      <SectionHeader
        title="titles.property_update"
        variant="dialog"
      />
      <Form
        initialValues={form}
        validationSchema="UpdateProperty"
        error={update.error?.message}
        onSubmit={async (values) => update.mutate(values as UpdateProperty)}
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
