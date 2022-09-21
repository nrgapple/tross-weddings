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
    input: z.object({
      weddingName: z.string(),
      data: z.array(
        z.object({
          id: z.string().uuid().optional(),
          firstName: z.string().min(1).max(32).nullable(),
          lastName: z.string().min(1).max(32).nullable(),
          isMember: z.boolean().nullable().optional(),
        }),
      ),
    }),
    async resolve({ input: { weddingName, data }, ctx: { session } }) {
      const wedding = await prisma.wedding.findUnique({
        where: {
          name: weddingName,
        },
      })
      if (!wedding) return false

      const createManyInvitees = data
        .filter(i => !i.id)
        .map(x =>
          prisma.invitee.create({
            data: {
              firstName: x.firstName,
              lastName: x.lastName,
              member: {
                create: {
                  type: null,
                  description: '',
                  deletedAt: x.isMember ? null : new Date(),
                  ...(x.isMember
                    ? {
                        deletedBy: {
                          connect: {
                            id: session?.user?.id ?? undefined,
                          },
                        },
                      }
                    : {}),
                },
              },
              Wedding: {
                connect: {
                  id: wedding.id,
                },
              },
            },
          }),
        )
      const updateManyInvitees = data
        .filter(i => !!i.id)
        .map(x =>
          prisma.invitee.update({
            data: {
              firstName: x.firstName,
              lastName: x.lastName,
              member: {
                update: {
                  deletedAt: x.isMember ? null : new Date(),
                  userId: x.isMember ? null : session?.user?.id,
                },
              },
            },
            where: {
              id: x.id,
            },
          }),
        )
      await prisma.$transaction([...createManyInvitees, ...updateManyInvitees])
      return true
    },
  })
