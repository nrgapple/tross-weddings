import { Button, Heading, VStack } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { authRedirect } from '~/utils/redirects'
import { trpc } from '~/utils/trpc'

export default function HomePage() {
  const session = useSession()
  const router = useRouter()
  const { data } = trpc.useQuery(['wedding.all'])

  return (
    <VStack>
      <Heading>Hello {session.data?.user?.name}</Heading>
      <VStack>
        {data &&
          data.map(wedding => (
            <Button
              onClick={() => router.push(`/${wedding.name}/edit/invitees`)}
            >
              {wedding.name}
            </Button>
          ))}
      </VStack>
    </VStack>
  )
}

export const getServerSideProps = async ctx => authRedirect(ctx)
