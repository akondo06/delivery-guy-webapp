import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';

import { camelCase } from 'utils/misc';

import * as icons from 'icons';

import styles from './Button.module.scss';

interface BaseProps {
  size?:  'xs' | 'sm' | 'base' | 'xl';
  variant?: 'primary' | 'white' | 'success-light' | 'danger-light' | 'danger' | 'gray-light' | 'transparent-light';

  icon?: keyof typeof icons;
  iconColor?: 'primary' | 'danger';

  disabled?: boolean;
  loading?: boolean;

  title?: string;

  children?: React.ReactNode;
}


function useBase(props: BaseProps) {
  const { t } = useTranslation();
  const content = props.children ? props.children : props.title ? t(props.title) : null;

  const containerClasses = [
    styles.base,
    styles[camelCase(`variant_${props.variant || 'white'}`)],
    styles[camelCase(`size_${props.size || 'base'}`)],

    props.loading ? styles.loading : undefined,
    props.disabled ? styles.disabled : undefined,
    props.icon ? styles.withIcon : undefined,

    props.iconColor ? styles[camelCase(`iconColor_${props.iconColor}`)] : undefined,

    props.icon && !content ? styles.iconOnly : undefined,
  ];

  return {
    containerClasses: containerClasses.filter((v) => v).join(' '),
    content
  };
}


export interface ButtonProps extends BaseProps {
  id?: string;
  type?: 'submit';
  onPress?: () => void;
}

export default function Button(props: ButtonProps) {
  const { containerClasses, content } = useBase(props);

  const Icon = props.icon && icons[props.icon];

  return (
    <button
      className={containerClasses}

      id={props.id}
      type={props.type}
      disabled={props.disabled}

      onClick={props.onPress}
    >
      {Icon ? (<Icon />) : null}
      {content ? (
        <span>
          {content}
        </span>
      ) : null}
    </button>
  );
}


interface ButtonLinkProps extends BaseProps {
  to: string;
  replace?: boolean;
  state?: any;
}

export function ButtonLink(props: ButtonLinkProps) {
  const { containerClasses, content } = useBase(props);
  const Icon = props.icon && icons[props.icon];

  return (
    <Link
      className={containerClasses}

      to={props.to}
      replace={props.replace}
      state={props.state}
    >
      {Icon ? (<Icon />) : null}
      <span>
        {content}
      </span>
    </Link>
  );
}
