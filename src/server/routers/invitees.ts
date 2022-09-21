import { Prisma } from '@prisma/client'
import { z } from 'zod'
import { prisma } from '~/server/prisma'
import { createRouter } from '../createRouter'

const defaultPostSelect = Prisma.validator<Prisma.InviteeSelect>()({
  id: true,
  firstName: true,
  lastName: true,
  createdAt: true,
  updatedAt: true,
  member: true,
})

export const inviteeRouter = createRouter()
  .query('all', {
    async resolve() {
      return prisma.invitee.findMany({
        select: defaultPostSelect,
      })
    },
  })
  .query('forWedding', {
    input: z.object({
      name: z.string(),
    }),
    async resolve({ input }) {
      const wedding = await prisma.wedding.findUnique({
        where: {
          name: input.name,
        },
      })
      if (!wedding) return []
      return prisma.invitee.findMany({
        where: {
          weddingId: wedding.id,
        },
        select: defaultPostSelect,
      })
    },
  })
  .mutation('edit', {
    input: z.array(
      z.object({
        id: z.string().uuid().optional(),
        firstName: z.string().min(1).max(32).nullable(),
        lastName: z.string().min(1).max(32).nullable(),
      }),
    ),
    async resolve({ input }) {
      const createManyInvitees = prisma.invitee.createMany({
        data: input.filter(i => !i.id),
      })
      const updateManyInvitees = input
        .filter(i => !!i.id)
        .map(x =>
          prisma.invitee.update({
            data: x,
            where: {
              id: x.id,
            },
          }),
        )
      await prisma.$transaction([createManyInvitees, ...updateManyInvitees])
      return true
    },
  })
