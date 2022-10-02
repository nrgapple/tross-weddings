import { z } from 'zod'
import { createRouter } from '../createRouter'
import { prisma } from '../prisma'

export const weddingRouter = createRouter()
  .query('findOneWedding', {
    async resolve({ ctx: { session } }) {
      return session
        ? prisma.wedding.findUnique({
            where: {
              userId: session.user.id,
            },
          })
        : null
    },
  })
  .mutation('createWedding', {
    input: z.object({
      name: z.string(),
    }),
    async resolve({ input, ctx }) {
      return prisma.wedding.create({
        data: {
          name: input.name,
          userId: ctx.session.user.id,
        },
      })
    },
  })
