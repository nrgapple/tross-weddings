import { VStack } from '@chakra-ui/react'
import Head from 'next/head'
import { ReactNode } from 'react'
import { ReactQueryDevtools } from 'react-query/devtools'

type DefaultLayoutProps = { children: ReactNode }

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <Head>
        <title>Prisma Starter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VStack>
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
