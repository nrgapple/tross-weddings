import { Button, Input, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { authRedirect } from '~/utils/redirects'
import { trpc } from '~/utils/trpc'

export default function HomePage() {
  const [name, setName] = useState()
  const { data } = trpc.useQuery(['wedding.findOneWedding'])
  const { mutate, isLoading } = trpc.useMutation('wedding.createWedding')

  return (
    <VStack>
      <Input
        value={name}
        onChange={e => {
          setName(e.target.value)
        }}
      />
      <Button
        isLoading={isLoading}
        onClick={e => {
          e.preventDefault()
          if (name) mutate({ name })
        }}
      >
        Add Wedding
      </Button>
    </VStack>
  )
}

export const getServerSideProps = async ctx => authRedirect(ctx)
