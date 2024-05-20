import ConfirmationModal from 'components/ConfirmationModal';
import Button, { ButtonProps } from 'components/Button';

interface ConfirmaButtonProps extends ButtonProps {
  confirmTitle?: string;
  message?: string;
  confirmLabel?: string;
  confirmVariant?: ButtonProps['variant'];
}

export default function ConfirmaButton(props: ConfirmaButtonProps) {
  const {
    confirmTitle,
    message,
    confirmLabel,
    ...buttonProps
  } = props;

  return (
    <ConfirmationModal
      title={confirmTitle}
      message={message}
      variant={props.confirmVariant || props.variant}
      confirmLabel={confirmLabel || props.title}
      onConfirm={() => props.onPress && props.onPress()}
    >
      {({ show }) => (
        <Button
          {...buttonProps}
          onPress={() => show()}
        />
      )}
    </ConfirmationModal>
  );
}
