import { Heading, VStack } from '@chakra-ui/react'
import { getProviders, useSession } from 'next-auth/react'
import { unauthRedirect } from '~/utils/redirects'
import { NextPageWithLayout } from './_app'

const IndexPage: NextPageWithLayout = ({ providers }: any) => {
  const session = useSession()
  return (
    <VStack>
      <Heading>Welcome to Tross Weddings</Heading>
    </VStack>
  )
}

export default IndexPage

export const getServerSideProps = async ctx => unauthRedirect(ctx)
