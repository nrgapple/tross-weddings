import {
  GetServerSideProps,
  GetServerSidePropsContext,
  PreviewData,
} from 'next'
import { getProviders } from 'next-auth/react'
import { ParsedUrlQuery } from 'querystring'
import { getSession } from './services'

export type CTXType = GetServerSidePropsContext<ParsedUrlQuery, PreviewData>

export const unauthRedirect = async (ctx: CTXType) => {
  const req = ctx.req
  const session = await getSession(req)
  const providers = await getProviders()
  if (session === null)
    return {
      props: {
        providers,
        session,
      },
    }

  const { user } = session
  if (user) {
    return {
      redirect: {
        permanent: false,
        destination: '/home',
      },
    }
  }
  return {
    props: {},
  }
}

export const authRedirect = async (ctx: CTXType) => {
  const req = ctx.req
  const session = await getSession(req)
  const providers = await getProviders()
  if (session !== null)
    return {
      props: {
        providers,
        session,
      },
    }
  return {
    redirect: {
      permanent: false,
      destination: '/',
    },
  }
}
