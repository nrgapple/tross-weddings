import DataEditor, {
  GridColumn,
  GridColumnIcon,
  Item,
  GridCell,
  GridCellKind,
  EditableGridCell,
} from '@glideapps/glide-data-grid';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '@glideapps/glide-data-grid/dist/index.css';
import { trpc } from '~/utils/trpc';
import { useEffect, useState } from 'react';
import { Button, VStack } from '@chakra-ui/react';

export const InviteeGrid = () => {
  const inviteeQueryAll = trpc.useQuery(['invitee.all']);
  const inviteeMutationEdit = trpc.useMutation('invitee.edit');
  const { data } = inviteeQueryAll;
  type Invitee = NonNullable<typeof data>[number];
  type InviteeRowItem = {
    wasEdited?: boolean;
    wasCreated?: boolean;
  } & Invitee;
  const [invitees, setInvitees] = useState<InviteeRowItem[]>(() => data ?? []);

  useEffect(() => {
    setInvitees(data ?? []);
  }, [data]);

  function getData([col, row]: Item): GridCell {
    const person = invitees[row];
    if (!columns[col]) {
      throw new Error('Invalid column');
    } else {
      return columns[col]!.data(person);
    }
  }

  const onRowAppended = () => {
    setInvitees([
      ...invitees,
      {
        id: `${invitees.length - 1}`,
        firstName: '',
        lastName: '',
        member: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        wasCreated: true,
      },
    ]);
  };

  const onCellEdited = (item: Item, value: EditableGridCell) => {
    const invitee = invitees[item[1]];
    if (!invitee) return;
    const columnName = columns[item[0]]?.template.id as keyof Invitee;
    if (!columnName) return;
    const newInvitee = {
      ...invitee,
      [columnName as string]: value.data,
      wasEdited: true,
    };
    const index = invitees.indexOf(invitee);
    const newInvitees = invitees;
    newInvitees[index] = newInvitee;
    setInvitees(newInvitees);
  };

  if (inviteeQueryAll.status !== 'success') {
    return <>Loading...</>;
  }

  const onSave = () => {
    const result = invitees
      .filter((x) => x.wasEdited || x.wasCreated)
      .map((x) => {
        const { wasCreated, wasEdited, ...rest } = x;
        return { ...rest, id: wasCreated ? undefined : x.id };
      });
    inviteeMutationEdit.mutate(result);
  };

  return (
    <VStack>
      <DataEditor
        getCellContent={getData}
        columns={columns.map((x) => x.template)}
        rows={invitees.length}
        trailingRowOptions={{
          sticky: true,
          tint: true,
          hint: 'New row...',
        }}
        rowSelectionMode={'auto'}
        onRowAppended={onRowAppended}
        onCellEdited={onCellEdited}
      />
      <Button onClick={onSave} isLoading={inviteeMutationEdit.isLoading}>
        Save
      </Button>
    </VStack>
  );
};

interface ColumnSetup {
  template: GridColumn;
  data: (person: any) => GridCell;
}

const columns: ColumnSetup[] = [
  {
    template: {
      title: 'First Name',
      id: 'firstName',
      width: 250,
      icon: GridColumnIcon.HeaderString,
      overlayIcon: GridColumnIcon.RowOwnerOverlay,
    },
    data: (person: any) => ({
      kind: GridCellKind.Text,
      data: person?.firstName ?? '',
      allowOverlay: true,
      displayData: person?.firstName ?? '',
    }),
  },
  {
    template: {
      title: 'Last Name',
      id: 'lastName',
      width: 250,
      icon: GridColumnIcon.HeaderString,
      overlayIcon: GridColumnIcon.RowOwnerOverlay,
    },
    data: (person: any) => ({
      kind: GridCellKind.Text,
      data: person?.lastName ?? '',
      allowOverlay: true,
      displayData: person?.lastName ?? '',
    }),
  },
];

export default InviteeGrid;
