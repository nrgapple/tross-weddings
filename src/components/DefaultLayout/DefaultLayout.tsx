import { Button, VStack } from '@chakra-ui/react'
import { getProviders, signIn, useSession } from 'next-auth/react'
import Head from 'next/head'
import { ReactNode } from 'react'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Header } from '../Header/Header'

type DefaultLayoutProps = { children: ReactNode; providers?: any }

export const DefaultLayout = ({ children, providers }: DefaultLayoutProps) => {
  return (
    <>
      <Head>
        <title>Tross Weddings</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VStack>
        <Header providers={providers} />
        <main>
          <div
            id="portal"
            style={{ position: 'fixed', left: 0, top: 0, zIndex: 9999 }}
          />
          {children}
        </main>
      </VStack>

      {process.env.NODE_ENV !== 'production' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </>
  )
}
