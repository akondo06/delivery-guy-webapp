import { useQuery, useQueryClient } from 'react-query';

import { fetchOptionsOf } from 'services/api';

interface Options {
  enabled?: boolean;
}

interface Payload {
  [key: string]: string | string[] | null | undefined;
}

interface Option {
  value: string;
  label: string;
}

export function useOptions(key: string, payload?: Payload, extra?: Options) {
  const queryClient = useQueryClient();

  const keySegments = key.split('.');

  const options: Options = {};
  options.enabled = extra && extra.enabled !== undefined ? extra.enabled : undefined;

  const query = useQuery<Option[], Error>({
    queryKey: ['options', ...keySegments],
    queryFn: () => fetchOptionsOf(keySegments[0], payload),
    ...options
  });

  return {
    ...query,
    remove: () => queryClient.removeQueries(['options', ...keySegments], { exact: true })
  };
}
