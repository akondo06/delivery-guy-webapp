import { useTranslation } from 'react-i18next';

import styles from './SearchBar.module.scss';

import Search from 'icons/Search';
import Button from 'components/Button';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void; 
  placeholder?: string;

  filterLabel?: string;
  filterOnPress?: () => void;

  disabled?: boolean;
}

export default function SearchBar(props: SearchBarProps) {
  const { t } = useTranslation();

  return (
    <div className={styles.base}>
      <form className={styles.form}>
        <div className={styles.controlIcon}>
          <Search />
        </div>
        <input
          className={styles.control}
          name="search"
          value={props.value}
          placeholder={t(props.placeholder || 'placeholders.search_by_identifier')}
          type="text"
          disabled={props.disabled}
          onChange={(event) => props.onChange(event.target.value)}
        />
      </form>
      {props.filterLabel ? (
        <Button
          variant="gray-light"
          size="base"
          icon="Filter"
          onPress={props.filterOnPress}
          disabled={props.disabled}
          title={props.filterLabel}
        />
      ) : null}
    </div>
  );
}
