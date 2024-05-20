import {
  useMemo,
  useState
} from 'react';

import {
  SortingState
} from '@tanstack/react-table';

import { useQuery } from 'react-query';

import { useDebounce } from 'hooks/useDebounce';

import { fetchListOf, LookupResponse } from 'services/api';

interface Order {
  [key: string]: 'asc' | 'desc';
}

interface Payload {
  [key: string]: string | number | undefined | null | Order;
}


interface PaginationState {
  skip: number;
  limit: number;
}

interface State<D> {
  search: string;
  filter?: D;
  pagination: PaginationState;
  sorting: SortingState;
}

interface Options<D> {
  enabled?: boolean;

  filter?: D;
  search?: string;

  pageSize?: number;
  keepPreviousData?: boolean;
  staleTime?: number;
  sort?: SortingState;

  payloadTransform?: (payload: Payload) => Payload;
}


function transformPayload<D>({ search, filter, sorting, pagination }: State<D>) {
  const order = sorting && sorting.length ? sorting.reduce<Order>((acc, curr) => {
    acc[curr.id] = curr.desc ? 'desc' : 'asc';
    return acc;
  }, {}): undefined;

  const result: Payload = {
    ...(filter || {}),
    // search,

    skip: pagination.skip,
    limit: pagination.limit,

    order
    // sortBy: sorting
  };

  const searchQuery = (search || '').toLowerCase().replace('/[^0-9a-z ]/ig', '');

  if (searchQuery.length) {
    result.search = searchQuery;
  }

  return result;
}

export function useList<T, D>(key: string, opts: Options<D> = {}) {
  const {
    enabled,
    filter,
    search,
    sort,
    pageSize,
    payloadTransform,
    staleTime,
    keepPreviousData
  } = opts;

  const [sorting, setSorting] = useState<SortingState>(sort || []);
  const [pagination, setPagination] = useState<PaginationState>({ skip: 0, limit: pageSize ?? 100 });

  const debounced = useDebounce({
    sorting
  }, 500);

  const payload = useMemo(() => {
    const values = transformPayload({
      search: search || '',
      filter,
      sorting: debounced.sorting,
      pagination
    });

    if (payloadTransform) {
      return payloadTransform(values);
    }

    return values;
  }, [
    debounced,
    filter,
    search,
    pagination,
    payloadTransform
  ]);

  const keySegments = key.split('.');

  const list = useQuery<LookupResponse<T>, Error>({
    queryKey: ['list', keySegments[0], payload],
    queryFn: () => fetchListOf<T>(keySegments[0], payload),
    keepPreviousData: keepPreviousData !== undefined ? keepPreviousData : true,
    staleTime,
    enabled
  });

  return {
    data: list.data?.data,
    error: list.error,
    isLoading: list.isLoading || list.isFetching,

    // pagination,
    // setPagination,

    pagination: {
      currentPage: Math.floor(pagination.skip / pagination.limit) + 1,
      totalCount: list.data?.totalCount,
      pageSize: pagination.limit
    },
    setCurrentPage: (page: number) => setPagination({
      skip: (page * pagination.limit) - pagination.limit,
      limit: pagination.limit
    }),

    sorting,
    setSorting
  };
}
