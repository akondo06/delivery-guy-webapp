import { useState, ReactNode } from 'react';

import Button from 'components/Button';

import styles from './PageDividedLayout.module.scss';

export interface Props {
  aside: ReactNode;
  children: ReactNode;
}

export default function PageDividedLayout(props: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.base}>
      <div className={styles.inner}>
        <div
          className={isOpen ? `${styles.overlay} ${styles.overlayShown}` : styles.overlay}
          onClick={() => setIsOpen(false)}
        />
        <aside className={`${styles.aside} ${isOpen ? styles.asideShown : styles.asideHidden}`}>
          <div className={styles.asideInner}>
            {props.aside}
          </div>
        </aside>
        <div className={styles.content}>
          <div className={styles.contentInner}>
          <div className={styles.asideControl}>
            <Button
              variant="white"
              icon="Menu2"
              size="sm"
              onPress={() => setIsOpen(!isOpen)}
            />
          </div>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}
