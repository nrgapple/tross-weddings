import {
  Avatar,
  Button,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
  useColorModeValue,
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
      position="sticky"
      top="0"
      borderBottom="1px"
      borderColor={useColorModeValue('gray.200', 'gray.900')}
      h="14"
      w="100%"
      justifyContent={'space-between'}
      px="4"
      backgroundColor={'gray.50'}
      boxShadow="md"
      zIndex={100}
    >
      <Heading size={'md'} fontFamily="cursive">
        Tross Weddings
      </Heading>
      {session.status === 'unauthenticated'
        ? modalButton
        : session.status === 'authenticated' && (
            <HStack>
              <Menu autoSelect={false}>
                <MenuButton>
                  <HStack align={'start'}>
                    <Avatar size={'sm'} />
                    <Text fontSize={'xs'}>{session.data?.user?.name}</Text>
                  </HStack>
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => signOut()}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          )}
      {modalContent}
    </HStack>
  )
}
