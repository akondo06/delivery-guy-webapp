import { ReactNode } from 'react';

import styles from './PageContainer.module.scss';

interface Props {
  children: ReactNode;
}

export default function PageContainer(props: Props) {
  return (
    <div className={styles.base}>
      <div className={styles.inner}>
        {props.children}
      </div>
    </div>
  );
}
