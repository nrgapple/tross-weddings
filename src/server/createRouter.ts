import { Context } from './context'
import * as trpc from '@trpc/server'
import { rule, shield } from 'trpc-shield'

const isAuthenticated = rule()(async (ctx, type, path, rawInput) => {
  console.log({ ctx })

  return false
})

const permissions = shield(
  {
    query: {
      invitee: isAuthenticated,
    },
  },
  {
    fallbackRule: isAuthenticated,
    fallbackError: 'Internal Server Error',
  },
)

/**
 * Helper function to create a router with context
 */
export function createRouter() {
  return trpc.router<Context>().middleware(permissions)
}
