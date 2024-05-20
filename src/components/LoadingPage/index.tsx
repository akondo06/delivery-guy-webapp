import Spinner from 'components/Spinner';

import styles from './LoadingPage.module.scss';

export default function LoadingPage() {
  return (
    <div className={styles.base}>
      <Spinner size="xl" />
    </div>
  );
}
