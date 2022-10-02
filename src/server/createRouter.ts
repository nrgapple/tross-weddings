import { Context } from './context'
import * as trpc from '@trpc/server'
import { deny, not, rule, shield } from 'trpc-shield'

const isAuthenticated = rule()(async ctx => ctx.session !== null)

const permissions = shield({
  query: {
    findOneWedding: isAuthenticated,
  },
})

/**
 * Helper function to create a router with context
 */
export function createRouter() {
  return trpc.router<Context>().middleware(permissions)
}
