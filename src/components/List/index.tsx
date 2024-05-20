import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import Spinner from 'components/Spinner';
import { ButtonLink } from 'components/Button';
import NoData from 'components/NoData';
import DamnLayout, { DamnLayoutProps } from 'components/DamnLayout';

import styles from './List.module.scss';

interface ListProps<T> {
  data?: T[];
  isLoading?: boolean;
  error?: string;

  createTo?: string;
  layout: DamnLayoutProps['variant'];
  item: (props: { item: T; index: number; collection: T[] }) => ReactElement | null;
}

export default function List<T>(props: ListProps<T>) {
  const { t } = useTranslation();

  return (
    <div className={styles.base}>
      <div className={styles.listContainer}>
        <div className={styles.list}>
          <DamnLayout variant={props.layout}>
            {props.data?.map((item, index, collection) => props.item({
              item,
              index,
              collection
            }))}
          </DamnLayout>
        </div>
        {!props.isLoading && props.data && !props.data.length ? (
          <NoData
            actionComponent={props.createTo ? (
              <ButtonLink
                variant="gray-light"
                size="xs"
                icon="Plus"
                iconColor="primary"
                to={props.createTo}
                title="buttons.add"
              />
            ) : null}
          />
        ) : null}
        {props.isLoading ? (
          <div className={props.data?.length ? styles.loadingContainerSticky : styles.loadingContainer}>
            <div className={styles.loadingContainerInner}>
              <Spinner size="xl" />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
