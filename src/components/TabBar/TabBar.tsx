import { IconType } from 'react-icons'
import NextLink from 'next/link'
import {
  Button,
  VStack,
  Icon,
  Text,
  useColorModeValue,
  Box,
  Stack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { HiOutlineHome, HiOutlineCalendar, HiOutlineUser } from 'react-icons/hi'
import { trpc } from '~/utils/trpc'
import { useSession } from 'next-auth/react'

export const TabBar = () => {
  const session = useSession()
  const { data, isLoading } = trpc.useQuery(['wedding.findOneWedding'])
  const backgroundColor = useColorModeValue('white', 'gray.800')

  return (
    session &&
    !isLoading && (
      <Box
        position={{ base: 'fixed', lg: 'sticky' }}
        top={{ base: undefined, lg: '14' }}
        bottom={{ base: 0, lg: undefined }}
        pt={{ lg: '40px' }}
        w={{ base: '100%', lg: 'auto' }}
        h="auto"
        zIndex="1000"
        boxShadow={{
          base: '0 -4px 6px -1px rgba(0, 0, 0, 0.1),0 -2px 4px -1px rgba(0, 0, 0, 0.06)',
          lg: 'none',
        }}
        background={{ base: backgroundColor, lg: 'none' }}
      >
        <Stack
          w="100%"
          h="auto"
          p={{ base: 0.5, lg: 1 }}
          direction={{ base: 'row', lg: 'column' }}
          justify={{ base: 'space-around', lg: 'flex-start' }}
          align={{ base: 'center', lg: 'center' }}
        >
          <Stack
            w="100%"
            direction={{ base: 'row', lg: 'column' }}
            justify={{ base: 'space-around', lg: 'flex-start' }}
            align={{ sm: 'center', lg: 'center' }}
          >
            <TabBarLink href="/home" text={'Home'} icon={HiOutlineHome} />
            {data?.name && (
              <TabBarLink
                href={`${data.name}/edit/invitees`}
                text={'Invitees'}
                icon={HiOutlineUser}
              />
            )}
            <TabBarLink href="/members" text={'Members'} icon={HiOutlineUser} />
            <TabBarLink
              href="/events"
              text={'Events'}
              icon={HiOutlineCalendar}
            />
          </Stack>
        </Stack>
      </Box>
    )
  )
}

const TabBarLink = ({
  href,
  icon,
  text,
}: {
  href: string
  icon: IconType
  text: string
}) => {
  const router = useRouter()
  const active = router.asPath === href
  const textColor = useColorModeValue('gray.700', 'gray.300')
  const activeColor = useColorModeValue('brand.600', 'brand.200')
  const activeBackgroundColor = useColorModeValue('gray.100', 'gray.700')

  return (
    <NextLink href={href} passHref>
      <Button
        as="a"
        isActive={active}
        variant="ghost"
        h="auto"
        w={{ base: 16, sm: 20, md: 24 }}
        color={active ? activeColor : textColor}
        _active={{ background: activeBackgroundColor }}
      >
        <VStack h="100%" px={{ base: 1.5, sm: 3 }} py={{ base: 1, sm: 1.5 }}>
          <Icon
            as={icon}
            boxSize={{ base: 5, sm: 6, md: 7 }}
            viewBox="0 0 24px 24px"
          />
          <Text fontSize={{ base: 'xx-small', sm: 'x-small', md: 'small' }}>
            {text}
          </Text>
        </VStack>
      </Button>
    </NextLink>
  )
}
