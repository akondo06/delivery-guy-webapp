import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './ConfirmationModal.module.scss';

import Modal from 'components/Modal';
import Button, { ButtonProps } from 'components/Button';
import Text from 'components/Text';
import SectionHeader from 'components/SectionHeader';

export interface ConfirmationModalProps {
  title?: string;
  message?: string;
  onConfirm: (() => void) | (() => Promise<void>);

  variant?: ButtonProps['variant'];

  confirmLabel?: string;

  children?: (props: { show: () => void; }) => React.ReactNode;
}

export default function ConfirmationModal(props: ConfirmationModalProps) {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const closeMe = () => setIsOpen(false);

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      await props.onConfirm();
      setIsLoading(false);
      closeMe();
    } catch(error) {
      setIsLoading(false);
    }
  };

  return (
    <>
      {props.children ? props.children({
        show: () => setIsOpen(true)
      }) : null}
      <Modal
        isOpen={isOpen}
        onDismiss={closeMe}
        size="sm"
      >
        <SectionHeader
          title={props.title || 'titles.confirmation'}
          variant="dialog"
        />
        <div className={styles.content}>
          <Text
            variant="secondary"
            centered
          >
            {t(props.message || 'confirmations.are_you_sure')}
          </Text>
        </div>
        <div className={styles.actions}>
          <Button
            size="base"
            variant="gray-light"
            title={t('buttons.cancel')}
            onPress={closeMe}
            disabled={isLoading}
          />
          <Button
            size="base"
            variant={props.variant || 'primary'}
            title={props.confirmLabel || 'buttons.confirm'}
            onPress={handleConfirm}
            loading={isLoading}
            disabled={isLoading}
          />
        </div>
      </Modal>
    </>
  );
}
