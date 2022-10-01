import { createRouter } from '../createRouter'
import { prisma } from '../prisma'

export const weddingRouter = createRouter().query('all', {
  async resolve({ ctx: { session } }) {
    return session?.user?.id
      ? prisma.wedding.findMany({
          where: {
            userId: session.user.id,
          },
        })
      : null
  },
})
