import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { UpdateAccountAvatar, Account } from 'types/account';

import { useAuth } from 'hooks/useAuth';
import { useUpdateItem } from 'hooks/useUpdateItem';

import { FormTextField } from 'components/TextField';
import Button from 'components/Button';
import Form from 'components/Form';
import Modal from 'components/Modal';
import SectionHeader from 'components/SectionHeader';
import AvatarEditor from 'components/AvatarEditor';
import DamnLayout from 'components/DamnLayout';

export default function AccountAvatarUpdate() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const auth = useAuth();

  const [image, setImage] = useState<Blob|null>(null);

  const update = useUpdateItem<UpdateAccountAvatar, Account>('user', 'avatar', {
    asFormData: true,
    onSuccess: (data) => {
      auth.setUser({
        ...(auth.user as Account),
        avatar: data?.data?.avatar
      });
      toast.success(t('toastr.success'));
      dismiss();
    },
    onError: () => {
      toast.error(t('toastr.error'));
    }
  });

  const dismiss = () => {
    update.reset();
    navigate('..');
  };

  // const form: UpdateAccountAvatar = {
  //   avatar: 'aloha'
  // };

  return (
    <Modal
      isOpen={true}
      size="sm"
      onDismiss={dismiss}
    >
      <SectionHeader
        title="titles.account_avatar_update"
        variant="dialog"
      />
      {/*<Form
        initialValues={form}
        validationSchema="UpdateAccountAvatar"
        error={update.error?.message}
        onSubmit={async (values) => handleSave(values as UpdateAccountAvatar)}
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
      </Form>*/}
      <DamnLayout variant="vertical">
        <AvatarEditor
          value={image}
          onChange={setImage}
        />
        {image ? (
          <Button
            type="submit"
            variant="primary"
            size="xl"
            title="buttons.submit"
            loading={update.isLoading}
            disabled={update.isLoading}
            onPress={() => update.mutate({ avatar: image })}
          />
        ) : null}
      </DamnLayout>
    </Modal>
  );
}
