import {
  EditableGridCell,
  GridCell,
  GridColumn,
  Item,
} from '@glideapps/glide-data-grid';
import { omit } from 'radash';
import { useCallback, useEffect, useState } from 'react';

export interface UseGridProps<T> {
  data: MutateRow<T>[];
  columns: ColumnSetup<T>[];
  emptyRow: (count: number) => T;
}

export interface ColumnSetup<T> {
  template: GridColumn;
  data: (item: T) => GridCell;
}

export interface MutateRowExtraProps {
  wasEdited?: boolean;
  wasDeleted?: boolean;
  wasCreated?: boolean;
}

export type MutateRow<T> = T & MutateRowExtraProps;

export const useGrid = <T>({ data, columns, emptyRow }: UseGridProps<T>) => {
  const [rows, setRows] = useState(() => data);

  useEffect(() => {
    setRows(data ?? []);
  }, [data]);

  const getData = useCallback(
    ([col, row]: Item): GridCell => {
      const item = data[row] as T;
      if (!columns[col]) {
        throw new Error('Invalid column');
      } else {
        return (columns[col] as ColumnSetup<T>).data(item);
      }
    },
    [columns, data],
  );

  const onRowAppended = useCallback(() => {
    setRows([
      ...rows,
      {
        ...emptyRow(rows.length),
        createdAt: new Date(),
        updatedAt: new Date(),
        wasCreated: true,
      },
    ]);
  }, [rows, emptyRow]);

  const onCellEdited = useCallback(
    (item: Item, value: EditableGridCell) => {
      const currRow = rows[item[1]];
      if (!currRow) return;
      const columnName = columns[item[0]]?.template.id as keyof T;
      if (!columnName) return;
      const newInvitee = {
        ...currRow,
        [columnName as string]: value.data,
        wasEdited: true,
      };
      const index = rows.indexOf(currRow);
      const newInvitees = rows;
      newInvitees[index] = newInvitee;
      setRows(newInvitees);
    },
    [columns, rows],
  );

  const getMutations = useCallback(() => {
    const removeFieldsFunc = (row: MutateRow<T>) =>
      omit(row, ['wasCreated', 'wasEdited', 'wasDeleted']);
    return {
      created: rows.filter((row) => row.wasCreated).map(removeFieldsFunc),
      updated: rows.filter((row) => row.wasEdited).map(removeFieldsFunc),
      deleted: rows.filter((row) => row.wasDeleted).map(removeFieldsFunc),
    };
  }, [rows]);

  return { getData, onRowAppended, onCellEdited, getMutations, rows } as const;
};
