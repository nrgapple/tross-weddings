import {
  Avatar,
  Button,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  VStack,
} from '@chakra-ui/react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useModal } from '~/hooks/useModal'

interface HeaderProps {
  providers: any
}

export const Header = ({ providers }: HeaderProps) => {
  const session = useSession()
  const { modalContent, modalButton } = useModal({
    title: 'Log In',
    body: (
      <VStack>
        <Button
          minW="240px"
          backgroundColor="#333"
          _hover={{
            backgroundColor: '#333',
          }}
          onClick={() => signIn(providers[0])}
          color="white"
        >
          GitHub
        </Button>
      </VStack>
    ),
  })

  return (
    <HStack
      h="14"
      w="100%"
      justifyContent={'space-between'}
      p="3"
      backgroundColor={'gray.50'}
      boxShadow="md"
    >
      <Heading size={'md'}>Tross Weddings</Heading>
      {session.status === 'unauthenticated' ? (
        modalButton
      ) : (
        <Menu autoSelect={false}>
          <MenuButton>
            <Avatar size={'sm'} />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => signOut()}>Logout</MenuItem>
          </MenuList>
        </Menu>
      )}
      {modalContent}
    </HStack>
  )
}
