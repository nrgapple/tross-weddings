import DataEditor from '@glideapps/glide-data-grid'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import '@glideapps/glide-data-grid/dist/index.css'
import { inferQueryOutput, trpc } from '~/utils/trpc'
import { Box, Button, ButtonGroup, HStack, VStack } from '@chakra-ui/react'
import { MutateRow, useGrid } from '~/hooks/useGrid'
import { columns, emptyRow } from './utils'

export type InviteesAllResultItem = inferQueryOutput<'invitee.all'>[number]

export interface InviteeGridProps {
  weddingName: string
}

export const InviteeGrid = ({ weddingName }: InviteeGridProps) => {
  const inviteeQueryAll = trpc.useQuery([
    'invitee.forWedding',
    { name: weddingName },
  ])
  const inviteeMutationEdit = trpc.useMutation('invitee.edit')
  const { data } = inviteeQueryAll
  const {
    getData,
    onRowAppended,
    onCellEdited,
    getMutations,
    reorderRows,
    rows,
  } = useGrid({
    data: (data ?? []) as MutateRow<InviteesAllResultItem>[],
    columns,
    emptyRow,
  })

  if (inviteeQueryAll.status === 'error') {
    return <>error...</>
  }

  if (inviteeQueryAll.status === 'loading') {
    return <>loading...</>
  }

  const onSave = () => {
    const { created, updated } = getMutations()
    inviteeMutationEdit.mutate([
      ...created.map(x => ({ ...x, id: undefined })),
      ...updated,
    ])
  }

  return (
    <VStack width="full">
      <HStack justifyContent="end" p="2" w="full">
        <ButtonGroup>
          <Button
            h="8"
            _hover={{ color: 'blackAlpha.600' }}
            variant="unstyled"
            onClick={onSave}
            isLoading={inviteeMutationEdit.isLoading}
            loadingText="Saving..."
            spinner={<></>}
          >
            Save
          </Button>
        </ButtonGroup>
      </HStack>
      <Box
        borderY="1px"
        borderColor="blackAlpha.300"
        width="full"
        height="full"
        m="0 !important"
      >
        <DataEditor
          rowMarkers={'both'}
          onColumnMoved={reorderRows}
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
          isDraggable={true}
          width="%100"
        />
      </Box>{' '}
    </VStack>
  )
}

export default InviteeGrid
