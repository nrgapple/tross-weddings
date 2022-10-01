import { GridColumnIcon, GridCellKind } from '@glideapps/glide-data-grid'
import { ColumnSetup } from '~/hooks/useGrid'
import { InviteesAllResultItem } from './InviteeGrid'
import { v4 as uuid } from 'uuid'

export const emptyRow = (count: number) =>
  ({
    id: uuid(),
    firstName: '',
    lastName: '',
    member: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as InviteesAllResultItem)

export const columns: ColumnSetup<InviteesAllResultItem>[] = [
  {
    template: {
      title: 'First Name',
      id: 'firstName',
      width: 250,
      icon: GridColumnIcon.HeaderString,
      overlayIcon: GridColumnIcon.RowOwnerOverlay,
    },
    data: (person: InviteesAllResultItem) => ({
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
    data: (person: InviteesAllResultItem) => ({
      kind: GridCellKind.Text,
      data: person?.lastName ?? '',
      allowOverlay: true,
      displayData: person?.lastName ?? '',
    }),
  },
]
