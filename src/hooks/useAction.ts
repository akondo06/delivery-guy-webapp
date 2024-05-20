import { useEffect } from 'react';
import {
  useMutation,
  // useQueryClient,
  MutationFunction
} from 'react-query';

import { ApiError } from 'services/api';

interface Options<D, T> {
  onMutate?: (variables: D) => void;
  onSuccess?: (data: T, variables: D) => void;
  onError?: (error: ApiError, variables: D) => void;
}

export function useAction<D, T>(key: string, id: string, func: MutationFunction<T, D>, options?: Options<D, T>) {
  // const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    error,
    // mutate,
    mutateAsync,
    reset
  } = useMutation<T, ApiError, D>(['action', key, { id }], func, {
    onMutate: (variables) => {
      if (!options || !options.onMutate) {
        return;
      }
      options.onMutate(variables);
    },
    onSuccess: (data, variables) => {
      // queryClient.refetchQueries(['list', key], { active: true });
      // queryClient.refetchQueries(['item', key], { active: true });

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

  useEffect(() => {
    reset();
  }, [reset, id, key]);

  return {
    data,
    isLoading,
    error,
    mutate: mutateAsync,
    reset
  };
}
