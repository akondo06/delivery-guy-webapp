import {
  useEffect,
  ReactNode
} from 'react';
import cn from 'classnames/bind';

import { camelCase } from 'utils/misc';

import Portal from 'components/Portal';
import Button from 'components/Button';
import Spinner from 'components/Spinner';

import styles from './Drawer.module.scss';

const cx = cn.bind(styles);

interface Props {
  isOpen?: boolean;
  withOverlay?: boolean;
  size?: 'base' | 'sm' | 'lg';
  onDismiss?: () => void;

  isLoading?: boolean;
  error?: string;

  children?: ReactNode;
}

const rootId = 'portal-root';

export default function Drawer(props: Props) {

  useEffect(() => {
    if(!props.withOverlay) {
      return;
    }

    document.body.classList.add('has-open-drawer');

    return () => {
      const rootElement = document.getElementById(rootId) as HTMLElement;

      if(!rootElement.firstChild) {
        document.body.classList.remove('has-open-drawer');
      }
    };
  }, []);

  return props.isOpen ? (
    <Portal
      rootId={rootId}
      wrapperClass={cx({
        wrapper: true,
        [camelCase(`size-${props.size || 'base'}`)]: true
      })}
    >
      {props.withOverlay && <div className={styles.overlay} />}
      <div className={styles.base}>
        <div className={styles.container}>
          <div className={styles.actions}>
            <Button
              icon="X"
              onPress={props.onDismiss}
            />
          </div>
          <div className={styles.content}>
            {props.isLoading ? (
              <div className={styles.loadingContainer}>
                <Spinner size="xl" />
              </div>
            ) : props.error ? (
              <div className={styles.errorContainer}>
                {props.error || 'Error!'}
              </div>
            ) :(
              props.children
            )}
          </div>
        </div>
      </div>
    </Portal>
  ) : null;
}
