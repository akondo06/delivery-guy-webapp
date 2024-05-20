import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import cn from 'classnames/bind';

import { camelCase } from 'utils/misc';

import styles from './NoData.module.scss';

const cx = cn.bind(styles);

interface Props {
  variant?: 'transparent';
  message?: string;

  actionComponent?: ReactNode;
}

export default function NoData(props: Props) {
  const { t } = useTranslation();

  const variant = props.variant || 'normal';

  return (
    <div
      className={cx({
        base: true,
        [camelCase(`variant-${variant}`)]: true
      })}
    >
      <div className={styles.text}>
        {t(props.message || 'text.no_entries')}
      </div>
      {props.actionComponent || null}
    </div>
  );
}
