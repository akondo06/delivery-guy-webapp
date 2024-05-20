import cn from 'classnames/bind';

import ArrowLeft from 'icons/ArrowLeft';
import ArrowRight from 'icons/ArrowRight';

import { usePagination, DOTS } from 'hooks/usePagination';

import styles from './Pagination.module.scss';

const cx = cn.bind(styles);


interface Props {
  onPageChange: (n: number) => void;
  totalCount?: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
}

export default function Pagination({ onPageChange, totalCount, siblingCount = 1, currentPage, pageSize }: Props) {
  const range = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  // if (!range || currentPage === 0 || range.length < 2) {
  //   return null;
  // }

  if (!range || currentPage === 0) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = range[range.length - 1];
  return (
    <ul className={styles.base}>
      <li
        className={cx({
          item: true,
          disabled: currentPage === 1
        })}
        onClick={onPrevious}
      >
        <ArrowLeft className={styles.arrow} />
      </li>
      {range.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <div
              key={`${pageNumber}_${DOTS}_${index}`}
              className={`${styles.item} ${styles.dots}`}
            >
              {DOTS}
            </div>
          );
        }

        return (
          <li
            key={pageNumber}
            className={cx({
              item: true,
              selected: pageNumber === currentPage
            })}
            onClick={() => onPageChange(pageNumber as number)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={cx({
          item: true,
          disabled: currentPage === lastPage
        })}
        onClick={onNext}
      >
        <ArrowRight className={styles.arrow} />
      </li>
    </ul>
  );
}
