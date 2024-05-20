
export function formatName(data?: null | { firstName?: string; lastName?: string }, noneStr?: string) {
  const first = data?.firstName;
  const last = data?.lastName;
  const none = noneStr || '';

  if (!first && !last) {
    return none;
  }

  if (first && !last) {
    return `${first}`;
  }

  if (!first && last) {
    return `${first}`;
  }

  return `${first} ${last}`;
}
