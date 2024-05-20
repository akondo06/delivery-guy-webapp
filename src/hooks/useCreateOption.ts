import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';

import { createOption } from 'services/api';

interface Options<D, T> {
  onSuccess?: (data: T, variables: D) => void;
  onError?: (error: AxiosError, variables: D) => void;
}

interface Payload {
  [key: string]: string | string[] | null | undefined;
}

interface Option {
  value: string;
  label: string;
}

export function useCreateOption(key: string, options?: Options<Payload, Option>) {
  const queryClient = useQueryClient();

  const [smallKey, extra] = key.split('.');

  return useMutation<Option, AxiosError, Payload>({
    mutationKey: ['create', key],
    mutationFn: (data) => createOption(key.replace(/\./ig, '/'), data),
    onSuccess: (data, variables) => {
      queryClient.refetchQueries(['list', key], { active: true });
      queryClient.refetchQueries(['list', smallKey], { active: true });

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
}
