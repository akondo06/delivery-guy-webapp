import { ReactNode } from 'react';

import styles from './BoxLayout.module.scss';

import Logo from '../Logo';

interface BoxLayoutProps {
  boxSize?: 'wide' | 'base';
  underElement?: ReactNode;
  children: ReactNode;
}

export default function BoxLayout(props: BoxLayoutProps) {

  const boxSize = props.boxSize === 'wide' ? styles.boxSizeWide : undefined;
  return (
    <div className={styles.base}>
      <div className={styles.innerContainer}>
        <div className={styles.inner}>
          <Logo
            className={styles.logo}
          />
          <div className={`${styles.box} ${boxSize}`}>
            {props.children}
          </div>
          {props.underElement ? (
            <div className={styles.under}>
              {props.underElement}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
