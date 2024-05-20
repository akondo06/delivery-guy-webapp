import { useTranslation } from 'react-i18next';

import Avatar from 'components/Avatar';
import { ButtonLink } from 'components/Button';

import { localeLabel } from 'utils/locale';

import { User } from 'types/auth';

import styles from './AccountCard.module.scss';

interface Props {
  account: User | null
}

export default function AccountCard({ account }: Props) {
  const { t } = useTranslation();

  return (
    <div className={styles.base}>
      <div className={styles.info}>
        <div className={styles.avatar}>
          <Avatar
            id={account?.avatar}
            alt={`${account?.firstName} ${account?.lastName}`}
            variant="account"
            to="avatar-update"
          />
        </div>
        <div className={styles.about}>
          <div className={styles.item}>
            <div className={styles.label}>
              {t('fields.name')}
            </div>
            <div className={styles.value}>
              {account?.firstName} {account?.lastName}
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.label}>
              {t('fields.language')}
            </div>
            <div className={styles.value}>
              {localeLabel(account?.language)}
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.label}>
              {t('fields.email')}
            </div>
            <div className={styles.value}>
              {account?.email}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.actions}>
        <ButtonLink
          variant="gray-light"
          icon="Mail"
          iconColor="primary"
          to="email-update"
          title="buttons.change_email"
        />
        <ButtonLink
          variant="gray-light"
          icon="ShieldLock"
          iconColor="primary"
          to="password-update"
          title="buttons.change_password"
        />
      </div>
    </div>
  );
}
