/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { NextAuthOptions, unstable_getServerSession } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import { prisma } from './prisma'

export const options = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  jwt: {},
  callbacks: {
    // This is used to get the user id so that you can do db queries
    // on the user.
    jwt: async ({ token, user }) => {
      if (user) {
        token.uid = user.id
        token.email = user.email
      }
      return Promise.resolve(token)
    },
    session: async ({ session, token }) => {
      session.user.id = token.uid
      return Promise.resolve(session)
    },
  },
} as NextAuthOptions

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
export async function createContextInner({
  req,
  res,
}: trpcNext.CreateNextContextOptions) {
  const session = await unstable_getServerSession(req, res, options)
  return {
    req,
    res,
    session,
  }
}

export type Context = trpc.inferAsyncReturnType<typeof createContextInner>

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext(
  opts: trpcNext.CreateNextContextOptions,
): Promise<Context> {
  return await createContextInner(opts)
}
