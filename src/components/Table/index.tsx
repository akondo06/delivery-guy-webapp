import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  ColumnDef,
  flexRender,
  SortingState,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  OnChangeFn
} from '@tanstack/react-table';

import cn from 'classnames/bind';
// import { camelCase } from 'utils/misc';

// import Cell from 'components/Cell';
import Spinner from 'components/Spinner';
import NoData from 'components/NoData';

import styles from './Table.module.scss';
const cx = cn.bind(styles);

function IndeterminateCheckbox({ indeterminate, className = '', ...rest }: { indeterminate?: boolean } & React.HTMLProps<HTMLInputElement>) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, indeterminate]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + ' cursor-pointer'}
      {...rest}
    />
  );
}

interface TableProps<T> {
  columns: ColumnDef<T>[];
  selectable?: boolean;
  sortable?: boolean;
  exportable?: boolean;
  toggleable?: boolean;

  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;

  data?: T[];
  isLoading?: boolean;
  error?: string;
}

export default function Table<T>(props: TableProps<T>) {
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const { t } = useTranslation();

  const selectColumns = React.useMemo<ColumnDef<T>[]>(() => props.selectable ? [{
    id: 'select',
    header: ({ table }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler()
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler()
          }}
        />
      </div>
    )
  }] : [], [props.selectable]);


  const columns = React.useMemo<ColumnDef<T>[]>(() => [
    ...selectColumns,
    ...props.columns
  ], [selectColumns, props.columns]);

  const table = useReactTable({
    data: props.data || [],
    columns,

    defaultColumn: {
      size: 0,
      enableSorting: false,

      // cell: (info) => (
      //   <Cell>
      //     {info.renderValue<string>()}
      //   </Cell>
      // )
    },
    state: {
      sorting: props.sorting,
      columnVisibility,
      rowSelection
    },

    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onSortingChange: props.onSortingChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(), 
    enableSorting: props.sortable,
    manualSorting: true, // here so sorting happens on the backend thingie ...
    debugTable: true,
    debugHeaders: true,
    debugColumns: true
  });

  return (
    <div className={styles.base}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={styles.th}
                    colSpan={header.colSpan}

                    style={header.column.columnDef.size ? {
                      width: header.getSize()
                    } : undefined}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={cx({
                          columnHeader: true,
                          columnHeaderSortable: header.column.getCanSort(),
                          columnHeaderSortableAsc: header.column.getIsSorted() === 'asc',
                          columnHeaderSortableDesc: header.column.getIsSorted() === 'desc'
                        })}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {typeof header.column.columnDef.header === 'string' ? t(header.column.columnDef.header) : flexRender(header.column.columnDef.header, header.getContext())}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className={styles.tbody}>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className={styles.tr}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className={styles.td}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {!props.isLoading && props.data && !props.data.length ? (
          <NoData variant="transparent" />
        ) : null}
        {props.isLoading ? (
          <div className={props.data?.length ? styles.loadingContainerSticky : styles.loadingContainer}>
            <div className={styles.loadingContainerInner}>
              <Spinner size="xl" />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
