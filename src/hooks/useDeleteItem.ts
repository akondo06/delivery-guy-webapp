import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { deleteItem } from 'services/api';

interface Options<D> {
  onSuccessToast?: string;
  onSuccess?: (data: void, variables: D) => void;
  onError?: (error: Error, variables: D) => void;
}

export function useDeleteItem(key: string, options?: Options<string>) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const keySegments = key.split('.');

  return useMutation<string, Error, string>(['delete', key], (id: string) => deleteItem(keySegments[0], id), {
    onSuccess: (data, variables) => {
      queryClient.refetchQueries(['list', keySegments[0]], { active: true });
      // queryClient.refetchQueries(['item', keySegments[0]], { active: true });
      // queryClient.invalidateQueries(['item', keySegments[0]], { active: true }); // nope
      queryClient.removeQueries(['item', keySegments[0]], { active: true });

      toast.success(t(options?.onSuccessToast || 'toastr.deleted'));

      if (!options) {
        return;
      }

      if (!options.onSuccess) {
        return;
      }
      options.onSuccess(undefined, variables);
    },
    onError: (error, variables) => {
      toast.error(t('toastr.error'));

      if (!options || !options.onError) {
        return;
      }

      options.onError(error, variables);
    }
  });
}
