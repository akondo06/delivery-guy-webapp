import { useMutation, useQueryClient } from 'react-query';

import { updateItem, ItemResponse } from 'services/api';

interface Options<D, T> {
  asFormData?: boolean;
  onSuccess?: (data: ItemResponse<T>, variables: D) => void;
  onError?: (error: Error, variables: D) => void;
}

export function useUpdateItem<D, T>(key: string, id?: string, options?: Options<D, T>) {
  const queryClient = useQueryClient();

  const actualId = id || 'dump';

  const {
    data,
    isLoading,
    error,
    // mutate,
    mutateAsync,
    reset
  } = useMutation<ItemResponse<T>, Error, D>(['update', key, { id }], (data: D) => updateItem<T, D>(key, actualId, data, { asFormData: options?.asFormData }), {
    onSuccess: (data, variables) => {
      queryClient.refetchQueries(['list', key], { active: true });
      queryClient.refetchQueries(['item', key], { active: true });

      if (!options || !options.onSuccess) {
        return;
      }
      options.onSuccess(data, variables);
    },
    onError: (error, variables) => {
      if (!options || !options.onError) {
        return;
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
