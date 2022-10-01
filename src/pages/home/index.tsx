import { Heading, VStack } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { authRedirect } from '~/utils/redirects'

export default function HomePage() {
  const session = useSession()
  return (
    <VStack>
      <Heading>Hello {session.data?.user?.name}</Heading>
    </VStack>
  )
}

export const getServerSideProps = async ctx => authRedirect(ctx)
