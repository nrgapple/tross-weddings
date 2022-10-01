import { NextApiRequest } from 'next'
import { getToken } from 'next-auth/jwt'

export const getSession = async (req: unknown) => {
  let session: any = {}
  const jwt = await getToken({
    req: req as unknown as NextApiRequest,
  })
  if (!jwt) {
    return null
  }
  console.log({ jwt })

  session.user = {}
  session.user.id = jwt.id as number
  session.user.name = jwt.name as string
  return Promise.resolve(session)
}
