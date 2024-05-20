import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import { fetchItemById, ItemResponse } from 'services/api';


interface Options<T> {
  onSuccess?: (data: ItemResponse<T>) => void;
  onError?: (error: AxiosError) => void;
}

export function useItemById<T>(key: string, id?: string, options?: Options<T>) {
  const actualId = id || 'dumb';
  const keySegments = key.split('.');

  const list = useQuery<ItemResponse<T>, AxiosError>({
    queryKey: ['item', ...keySegments, { id: actualId }],
    queryFn: () => fetchItemById<T>(keySegments[0], actualId),
    enabled: id !== undefined,
    onSuccess: (data) => {
      if (!options || !options.onSuccess) {
        return;
      }
      options.onSuccess(data);
    },
    onError: (error) => {
      if (!options || !options.onError) {
        return;
      }

      if (error.response) {
        const responseData = error.response.data as { message?: string; };

        error.message = responseData.message ? responseData.message : error.message;
      }
      options.onError(error);
    }
  });

  return {
    data: list.data?.data,
    error: list.error,
    isLoading: list.isLoading || list.isFetching
  };
}
