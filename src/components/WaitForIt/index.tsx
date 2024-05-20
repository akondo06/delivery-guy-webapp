import { ReactElement } from 'react';

import Spinner from 'components/Spinner';
// import NoData from 'components/NoData';

interface Props {
  isLoading?: boolean;
  data?: any;
  error?: Error | null;

  noDataElement?: ReactElement;

  children?: ReactElement | null;
}

export default function WaitFor(props: Props) {
  if (props.isLoading) {
    return (
      <Spinner />
    );
  }

  if (props.error) {
    return (
      <div>
        {`An error has occurred: ${props.error?.message}`}
      </div>
    );
  }

  if (Array.isArray(props.data) && !props.data.length) {
    // return props.noDataElement ? props.noDataElement : <NoData />;
    return props.noDataElement || null;
  }

  return props.children || null;
}
