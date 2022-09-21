import DataEditor from '@glideapps/glide-data-grid'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import '@glideapps/glide-data-grid/dist/index.css'
import { inferQueryOutput, trpc } from '~/utils/trpc'
import { Button, VStack } from '@chakra-ui/react'
import { MutateRow, useGrid } from '~/hooks/useGrid'
import { columns, emptyRow } from './utils'

export type InviteesAllResultItem = inferQueryOutput<'invitee.all'>[number]

export const InviteeGrid = () => {
  const inviteeQueryAll = trpc.useQuery(['invitee.all'])
  const inviteeMutationEdit = trpc.useMutation('invitee.edit')
  const { data } = inviteeQueryAll
  const { getData, onRowAppended, onCellEdited, getMutations, rows } = useGrid({
    data: data as MutateRow<InviteesAllResultItem>[],
    columns,
    emptyRow,
  })

  if (inviteeQueryAll.status !== 'success') {
    return <>Loading...</>
  }

  const onSave = () => {
    const { created, updated } = getMutations()
    inviteeMutationEdit.mutate([
      ...created.map(x => ({ ...x, id: undefined })),
      ...updated,
    ])
  }

  return (
    <VStack>
      <DataEditor
        getCellContent={getData}
        columns={columns.map(x => x.template)}
        rows={rows.length}
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
  )
}

export default InviteeGrid
