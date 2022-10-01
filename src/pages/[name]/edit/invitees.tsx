import { VStack } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { authRedirect } from '~/utils/redirects'

const Grid = dynamic(
  () => {
    return import('../../../components/InviteeGrid/InviteeGrid')
  },
  { ssr: false },
)

const InviteesPage = () => {
  const weddingName = useRouter().query.name as string
  return (
    <VStack height="100%" width="full">
      <VStack px="4" pt="0" mt="0px !important" width="full">
        <VStack borderX="1px" borderColor="blackAlpha.300" width="full">
          <Grid weddingName={weddingName} />
        </VStack>
      </VStack>
    </VStack>
  )
}

export default InviteesPage

export const getServerSideProps = async ctx => authRedirect(ctx)
