import { Prisma } from '@prisma/client';
import { prisma } from '~/server/prisma';
import { createRouter } from '../createRouter';

const defaultPostSelect = Prisma.validator<Prisma.InviteeSelect>()({
  id: true,
  firstName: true,
  lastName: true,
  createdAt: true,
  updatedAt: true,
  member: true,
});

export const inviteeRouter = createRouter().query('all', {
  async resolve() {
    return prisma.invitee.findMany({
      select: defaultPostSelect,
    });
  },
});
