import { camelCase } from 'utils/misc';

import styles from './Spacer.module.scss';

interface Props {
  size?: 'sm' | 'base' | 'xl';
}

export default function Spacer(props: Props) {
  const sizeClass = camelCase(`size-${props.size || 'base'}`);
  return (
    <div className={`${styles.base} ${styles[sizeClass]}`}></div>
  );
}
