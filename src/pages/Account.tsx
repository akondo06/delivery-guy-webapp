import { toast } from 'react-toastify';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { UpdateAccount, Account } from 'types/account';

import Button, { ButtonLink } from 'components/Button';
import ConfirmButton from 'components/ConfirmButton';
import Text from 'components/Text';
import PageContainer from 'components/PageContainer';
import SectionHeader from 'components/SectionHeader';
import AccountCard from 'components/AccountCard';
import Switch from 'components/Switch';

import { useAuth } from 'hooks/useAuth';
import { useUpdateItem } from 'hooks/useUpdateItem';

export default function AccountPage() {
  const { t } = useTranslation();
  const auth = useAuth();
  const user = auth.user;

  const updateUser = useUpdateItem<UpdateAccount, Account>('user', 'me', {
    onSuccess: (data) => {
      toast.success(t('toastr.saved'));
      auth.setUser(data.data || null);
    },
    onError: () => {
      toast.error(t('toastr.error'));
    }
  });

  const handleSupportAccessChange = (supportAccess: boolean) => {
    updateUser.mutate({ supportAccess });
  };

  return (
    <PageContainer>
      <SectionHeader title="titles.profile">
        <ButtonLink
          variant="gray-light"
          icon="Pencil"
          iconColor="primary"
          title="buttons.edit"
          to="update"
        />
        <ConfirmButton
          variant="danger-light"
          title="buttons.logout"
          message="confirmations.account_logout"
          loading={auth.loading}
          disabled={auth.loading}
          onPress={() => auth.logout()}
        />
      </SectionHeader>
      <AccountCard
        account={user}
      />

      <SectionHeader title="titles.support_access" />
      <div className="ItemContainer">
        <Switch
          id="supportAccess"
          name="supportAccess"
          label="fields.support_access"
          value={user?.supportAccess || false}
          onChange={handleSupportAccessChange}
          disabled={updateUser.isLoading}
          loading={updateUser.isLoading}
        />
      </div>

      <div className="soon">
        <SectionHeader title="titles.subscription" />
        <div className="ItemContainer">
          <Text>
            Soon
          </Text>
        </div>
        {/*<SectionHeader title="titles.accounts">
          <Button
            variant="gray-light"
            icon="Plus"
            iconColor="primary"
            title="buttons.add"
            disabled
          />
        </SectionHeader>
        <div className="ItemContainer">
          <Text>
            Soon
          </Text>
        </div>*/}
        <SectionHeader title="titles.your_data">
          <Button
            variant="danger-light"
            title="buttons.delete_account"
            disabled
          />
        </SectionHeader>
        <div className="ItemContainer">
          <Text>
            Soon
          </Text>
        </div>
      </div>
      <Outlet />
    </PageContainer>
  );
}
