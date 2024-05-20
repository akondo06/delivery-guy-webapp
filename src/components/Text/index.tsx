import { ReactNode, createElement }from 'react';
import cn from 'classnames/bind';

import { camelCase } from 'utils/misc';

import styles from './Text.module.scss';

const cx = cn.bind(styles);

export interface TextProps {
  variant?: 'normal' | 'secondary' | 'section-title' | 'section-subtitle' | 'title' | 'subtitle' | 'group-title' | 'tag' | 'attribute';
  centered?: boolean;

  parseContent?: boolean;

  children?: ReactNode;
}

export default function Text(props: TextProps) {
  const containerClasses = cx({
    base: true,
    [camelCase(`variant-${props.variant || 'normal'}`)]: true,
    alignCenter: props.centered
  });

  if (props.parseContent) {
    return createElement('span', {
      className: containerClasses,
      dangerouslySetInnerHTML: { __html: props.children }
    });
  }

  return (
    <span className={containerClasses}>
      {props.children}
    </span>
  );
}
