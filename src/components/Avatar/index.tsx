import cn from 'classnames/bind';
import { Link } from 'react-router-dom';

import { camelCase } from 'utils/misc';

import styles from './Avatar.module.scss';

const cx = cn.bind(styles);

interface Props {
  id?: string | null;
  alt?: string;
  variant: 'account' | 'mainnav' | 'mainnavAside' | 'fluid';
  to?: string;
}

export default function Avatar({ id, alt, variant, to }: Props) {
  const containerClasses = cx({
    base: true,
    [camelCase(`variant-${variant}`)]: true
  });

  const altParts = (alt || '').split(' ');

  const initials = `${altParts[0][0] || ''}${altParts[altParts.length - 1][0] || ''}`.toUpperCase();

  // return (
  //   <span className={containerClasses}>
  //     {initials}
  //   </span>
  // );

  const img = id ? (
    <img src={`/api/user/avatar/${id}?width=50&height=50`} alt={initials} />
  ) : (
    <span>{initials}</span>
  );

  if (to) {
    return (
      <Link
        className={containerClasses}
        to={to}
      >
        {img}
      </Link>
    );
  }

  return (
    <span className={containerClasses}>
      {img}
    </span>
  );

  // const c = (new Date()).getTime();

  // return (
  //   <span className={containerClasses}>
  //     {id ? (
  //       <img src={`/api/avatar/${id}?width=50&height=50&c=${c}`} alt={initials} />
  //     ) : initials}
  //   </span>
  // );
}
