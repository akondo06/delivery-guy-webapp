import { useState } from 'react';

import { useDebounce } from 'hooks/useDebounce';

export function useListFilter<T>(initialValue: T) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<T>(initialValue);

  const debounced = useDebounce({
    search,
    filter
  }, 500);

  return {
    filter,
    setFilter,
    delayedFilter: debounced.filter,

    search,
    setSearch,
    delayedSearch: debounced.search
  };
}
