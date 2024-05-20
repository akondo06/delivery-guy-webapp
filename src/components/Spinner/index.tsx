import { camelCase } from 'utils/misc';

import styles from './Spinner.module.scss';

export interface SpinnerProps {
  size?: 'base' | 'xl';
}

export default function Spinner(props: SpinnerProps) {
  const sizeClass = camelCase(`size-${props.size || 'base'}`);
  return (
    <div className={`${styles.base} ${styles[sizeClass]}`}></div>
  );
}
