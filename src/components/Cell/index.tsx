import { ReactNode } from 'react';
import cn from 'classnames/bind';

import { camelCase } from 'utils/misc';

import styles from './Cell.module.scss';

const cx = cn.bind(styles);



interface Props {
  variant?: 'actions';
  children: ReactNode;
}

export default function Cell(props: Props) {
  return (
    <div
      className={cx({
        base: true,
        [camelCase(`variant-${props.variant}`)]: !!props.variant
      })}
    >
      {props.children}
    </div>
  );
}
