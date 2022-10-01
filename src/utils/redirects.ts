import { getProviders } from 'next-auth/react'
import { getSession } from './services'

export const unauthRedirect = async ctx => {
  const req = ctx.req
  const session = await getSession(req)
  const providers = await getProviders()
  console.log({ session })

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
        destination: '/wedding',
      },
    }
  }
}
