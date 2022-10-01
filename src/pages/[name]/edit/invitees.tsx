import { HStack, VStack, Text } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

const Grid = dynamic(
  () => {
    return import('../../../components/InviteeGrid/InviteeGrid')
  },
  { ssr: false },
)

const InviteesPage = () => {
  const weddingName = useRouter().query.name as string
  return (
    <VStack height="100vh" width="full">
      <HStack
        borderBottom="1px"
        borderColor="blackAlpha.300"
        width="full"
        height="14"
        align="center"
        justify="space-between"
      >
        <Text p="4">Tross Weddings</Text>
      </HStack>
      <VStack px="4" pt="0" mt="0px !important" width="full">
        <VStack borderX="1px" borderColor="blackAlpha.300" width="full">
          <Grid weddingName={weddingName} />
        </VStack>
      </VStack>
    </VStack>
  )
}

export default InviteesPage
