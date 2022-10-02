import { Stack, VStack } from '@chakra-ui/react'
import Head from 'next/head'
import { ReactNode } from 'react'
import { TabBar } from '../TabBar/TabBar'
import { Header } from './Header/Header'

type DefaultLayoutProps = { children: ReactNode; providers?: any }

export const DefaultLayout = ({ children, providers }: DefaultLayoutProps) => {
  return (
    <>
      <Head>
        <title>Tross Weddings</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VStack minH="100vh" w="100%">
        <Header providers={providers} />
        <div
          id="portal"
          style={{ position: 'fixed', left: 0, top: 0, zIndex: 9999 }}
        />
        <Stack
          w="100%"
          alignItems="start"
          direction={{ lg: 'row' }}
          maxW="1800px"
        >
          <TabBar />
          <VStack h="100%" w="100%">
            {children}
          </VStack>
        </Stack>
      </VStack>
    </>
  )
}
