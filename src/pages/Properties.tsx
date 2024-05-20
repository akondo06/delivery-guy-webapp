import { Outlet } from 'react-router-dom';

import { Property } from 'types/property';

import { useAuth } from 'hooks/useAuth';
import { useList } from 'hooks/useList';

import { formatNumber } from 'utils/misc';
import { countryLabel } from 'utils/country';

import { ButtonLink } from 'components/Button';
import PageContainer from 'components/PageContainer';
import SectionHeader from 'components/SectionHeader';
import { ItemLink } from 'components/Item';
import List from 'components/List';

export default function Properties() {
  const { user } = useAuth();

  const propertyList = useList<Property, any>('property.main');

  return (
    <PageContainer>
      <SectionHeader title="titles.properties">
        {propertyList?.data && !propertyList.data?.length ? null : (
          <ButtonLink
            variant="gray-light"
            icon="Plus"
            iconColor="primary"
            to="create"
            title="buttons.new_property"
          />
        )}
      </SectionHeader>

      <List
        isLoading={propertyList.isLoading}
        error={propertyList.error?.message}
        data={propertyList.data}

        createTo="create"

        layout="properties"

        item={({ item }) => (
          <ItemLink
            key={item.id}

            title={item.name}
            titleIcon={item.type === 'full' ? 'BuildingCommunity' : 'Building'}

            description={[
              item.addressStreet,
              `${item.addressPostalCode} ${item.addressCity}`,
              countryLabel(item.addressCountry)
            ]}

            attributes={!!(user?.id && user?.id !== item.userId) ? [
              ['Home', '-'],
            ] : [
              // ['Home', t('text.count_units', { count: item.unitCount || 0 })],
              // ['HomeCheck', t('text.count_units', { count: item.occupiedUnitCount || 0 })],
              // ['Home', `${formatNumber(item.unitCount || 0)}`],
              // ['HomeCheck', `${formatNumber(item.occupiedUnitCount || 0)}`],
              // ['Percentage', `${formatNumber(item.occupancyRate || 0)}`]
              ['HomeCheck', `${formatNumber(item.occupiedUnitCount || 0)} / ${formatNumber(item.unitCount || 0)}`]
            ]}

            isDeactivated={!!item.deactivatedAt}
            isExternal={!!(user?.id && user?.id !== item.userId)}

            to={item.id}
          />
        )}
      />
      <Outlet />
    </PageContainer>
  );
}
