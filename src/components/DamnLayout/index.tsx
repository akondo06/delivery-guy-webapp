import { ReactNode } from 'react';

import styles from './DamnLayout.module.scss';

export interface DamnLayoutProps {
  variant: 'stats' | 'vertical' | 'fieldsNames' | 'fieldsPostalCodeCity' | 'properties' | 'propertyStats' | 'propertyUnitFloor' | 'propertyContacts' | 'propertyUnitMeters';
  children: ReactNode;
}

export default function DamnLayout(props: DamnLayoutProps) {
  return (
    <div className={styles[props.variant]}>
      {props.children}
    </div>
  );
}
