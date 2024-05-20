import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { UpdateProperty, Property } from 'types/property';

// import { formatMoney } from 'utils/money';
import { countryLabel } from 'utils/country';

// import { useList } from 'hooks/useList';
import { useUpdateItem } from 'hooks/useUpdateItem';
import { useDeleteItem } from 'hooks/useDeleteItem';

// import Text from 'components/Text';
import Button, { ButtonLink } from 'components/Button';
import ConfirmButton from 'components/ConfirmButton';
import WaitForIt from 'components/WaitForIt';
import PageContainer from 'components/PageContainer';
import SectionHeader from 'components/SectionHeader';
import Item from 'components/Item';
import { useItemById } from 'hooks/useItemById';
// import DamnLayout from 'components/DamnLayout';
// import List from 'components/List';

import Spacer from 'components/Spacer';

export default function PropertyPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { isLoading, data, error } = useItemById<Property>('property', id, {
    onError: () => {
      navigate('..');
    }
  });

  const update = useUpdateItem<UpdateProperty, Property>('property', id, {
    onSuccess: () => {
      toast.success('Saved!');
    },
    onError: () => {
      toast.error('Something went wrong!');
    }
  });

  const deleteProperty = useDeleteItem('property');

  return (
    <PageContainer>
      <SectionHeader
        title={data ? data.name : 'Property'}
        to="/properties"
      >
        <ButtonLink
          variant="gray-light"
          icon="Pencil"
          iconColor="primary"
          to="update"
          title="buttons.edit"
        />
        {data?.deactivatedAt ? (
          <ConfirmButton
            variant="danger-light"
            icon="Trash"
            iconColor="danger"
            title="buttons.delete"
            confirmTitle="titles.property_delete"
            message="confirmations.property_delete"
            confirmVariant="danger"
            confirmLabel="buttons.delete"
            loading={deleteProperty.isLoading}
            disabled={deleteProperty.isLoading}
            onPress={() => id && deleteProperty.mutate(id)}
          />
        ) : null}
        {data?.deactivatedAt ? (
          <Button
            variant="success-light"
            loading={update.isLoading}
            disabled={update.isLoading}
            onPress={() => {
              if (update.isLoading) {
                return;
              }
              update.mutate({ deactivatedAt: null });
            }}
            title="buttons.reactivate"
          />
        ) : (
          <Button
            variant="danger-light"
            loading={update.isLoading}
            disabled={update.isLoading}
            onPress={() => {
              if (update.isLoading) {
                return;
              }
              update.mutate({ deactivatedAt: 'now' });
            }}
            title="buttons.deactivate"
          />
        )}
      </SectionHeader>
      <WaitForIt
        isLoading={isLoading}
        error={error}
        data={data}
      >
        <Item
          title={data?.type === 'full' ? 'Complete ownership' : 'Partial ownership'}
          titleIcon={data?.type === 'full' ? 'BuildingCommunity' : 'Building'}

          description={[
            data?.addressStreet,
            `${data?.addressPostalCode} ${data?.addressCity}`,
            countryLabel(data?.addressCountry)
          ]}

          isDeactivated={!!data?.deactivatedAt}
        />
      </WaitForIt>
      <Spacer />
      <SectionHeader title="titles.whatever">
        WHATEVER
      </SectionHeader>

      <Outlet />
    </PageContainer>
  );
}
