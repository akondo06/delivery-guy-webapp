import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';

import { createItem, ItemResponse } from 'services/api';

interface Options<D, T> {
  noListsRefetch?: boolean;
  onSuccess?: (data: ItemResponse<T>, variables: D) => void;
  onError?: (error: AxiosError, variables: D) => void;
}

export function useCreateItem<D, T>(key: string, options?: Options<D, T>) {
  const queryClient = useQueryClient();

  const [smallKey, extra] = key.split('.');

  const {
    data,
    isLoading,
    error,
    // mutate,
    mutateAsync,
    reset
  } = useMutation<ItemResponse<T>, AxiosError, D>(['create', key], (data: D) => createItem<T, D>(key.replace(/\./ig, '/'), data), {
    onSuccess: (data, variables) => {
      if (!options?.noListsRefetch) {
        queryClient.refetchQueries(['list', key], { active: true });
        queryClient.refetchQueries(['list', smallKey], { active: true });
        // queryClient.refetchQueries(['item', key], { active: true });
      }

      if (!options || !options.onSuccess) {
        return;
      }
      options.onSuccess(data, variables);
    },
    onError: (error, variables) => {
      if (!options || !options.onError) {
        return;
      }

      if (error.response) {
        const responseData = error.response.data as { message?: string; };

        error.message = responseData.message ? responseData.message : error.message;
      }
      options.onError(error, variables);
    }
  });

  return {
    data,
    isLoading,
    error,
    mutate: mutateAsync,
    reset
  };
}
