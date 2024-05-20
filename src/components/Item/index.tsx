import { ReactNode } from 'react';
import {
  NavLink
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { camelCase } from 'utils/misc';

import * as icons from 'icons';
import Text from 'components/Text';

import styles from './Item.module.scss';

interface BaseProps {
  variant?: 'secondary';

  title: string;
  titleIcon?: keyof typeof icons;
  subtitle?: string;

  description?: string | (string|undefined)[];
  isDeactivated?: boolean;
  isExternal?: boolean;
  isOld?: boolean;

  tags?: string[];
  attributes?: [keyof typeof icons, string | undefined | null][];

  photo?: string;

  actions?: ReactNode;
}

function BaseItem(props: BaseProps) {
  const { t } = useTranslation();

  const desc = (Array.isArray(props.description) ? props.description : [props.description]).filter((item) => item);
  const Icon = props.titleIcon && icons[props.titleIcon];

  const variantClass = styles[camelCase(`variant-${props.variant || 'default'}`)];

  const attributes = (props.attributes || []).map((item) => ({
    Icon: icons[item[0]],
    title: item[1]
  }));

  const tags = props.tags || [];

  return (
    <>
      <span className={styles.info}>
        <span className={styles.header}>
          {Icon ? <Icon className={styles.icon} /> : null}
          <Text variant="subtitle">
            {props.title}
          </Text>
          {props.subtitle ? (
            <span className={styles.subtitle}>
              <Text variant="secondary">
                {props.subtitle}
              </Text>
            </span>
          ) : null}
        </span>
        {desc.length ? (
          <span className={`${styles.desc} ${variantClass}`}>
            {desc.map((line, i) => (
              <Text key={i} variant="secondary">
                {line}
              </Text>
            ))}
          </span>
        ) : null}
        {tags.length ? (
          <span className={`${styles.tags} ${variantClass}`}>
            {tags.map((title, i) => (
              <span
                key={i}
                className={styles.tag}
              >
                <Text variant="tag">
                  {t(title)}
                </Text>
              </span>
            ))}
          </span>
        ) : null}
        {attributes.length ? (
          <span className={`${styles.attributes} ${variantClass}`}>
            {attributes.map(({ Icon, title }, i) => (
              <span
                key={i}
                className={styles.attribute}
              >
                <Icon className={`${styles.attributeIcon} ${styles.icon}`} />
                <Text variant="attribute">
                  {t(title || 'text.none')}
                </Text>
              </span>
            ))}
          </span>
        ) : null}
      </span>
      {props.actions ? (
        <span className={styles.actions}>
          {props.actions}
        </span>
      ) : props.photo ? (
        <span className={styles.picture}>
        </span>
      ) : null}
    </>
  );
}


export default function Item(props: BaseProps) {
  return (
    <div
      className={[
        styles.base,
        props.isExternal ? styles.external : null,
        props.isDeactivated ? styles.deactivated : null,
        props.isOld ? styles.old : null
      ].filter(Boolean).join(' ')}
    >
      <BaseItem {...props} />
    </div>
  );
}


interface ItemLinkProps extends BaseProps {
  to: string;
  replace?: boolean;
  state?: any;
}


export function ItemLink({ to, replace, state, ...otherProps }: ItemLinkProps) {
  return (
    <NavLink
      className={({ isActive }) => [
        styles.base,
        isActive ? styles.active : null,
        otherProps.isExternal ? styles.external : null,
        otherProps.isDeactivated ? styles.deactivated : null,
        otherProps.isOld ? styles.old : null
      ].filter(Boolean).join(' ')}
      to={to}
      replace={replace}
      state={state}
    >
      <BaseItem {...otherProps} />
      {otherProps.photo ? null : (
        <span className={styles.goTo}>
          <icons.ArrowRight />
        </span>
      )}
    </NavLink>
  );
}
