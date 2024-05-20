import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import cn from 'classnames/bind';

import { camelCase } from 'utils/misc';

import { ArrowLeft } from 'icons';
import Text from 'components/Text';

import styles from './SectionHeader.module.scss';

const cx = cn.bind(styles);

interface Props {
  title: string;
  to?: string;

  variant?: 'dialog';

  children?: ReactNode;
}

export default function SectionHeader(props: Props) {
  const to = props.to;

  const { t } = useTranslation();

  return (
    <div
      className={cx({
        base: true,
        [camelCase(`variant-${props.variant}`)]: !!props.variant
      })}
    >
      {to ? (
        <NavLink
          className={styles.goto}
          to={to}
        >
          <ArrowLeft className={styles.icon} />
          <Text variant="title">
            {t(props.title)}
          </Text>
        </NavLink>
      ) : (
        <Text variant="title">
          {t(props.title)}
        </Text>
      )}
      {props.children ? (
        <div className={styles.actions}>
          {props.children}
        </div>
      ) : null}
    </div>
  );
}
