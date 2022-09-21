/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */
import { PrismaClient } from '@prisma/client'
import * as faker from 'faker'

const prisma = new PrismaClient()

async function createLocations(count: number) {
  const names = Array.from(Array(count)).map(_ => faker.random.word())

  await prisma.location.createMany({
    data: Array.from(Array(count)).map((_, i) => {
      return {
        name: names[i]!,
        address1: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(true),
        zipCode: faker.address.zipCode(),
        county: faker.address.county(),
      }
    }),
  })

  return await prisma.location.findMany({
    where: {
      name: {
        in: names,
      },
    },
  })
}

const createWedding = async ({
  scheduleCount,
  inviteesCount,
  weddingName,
}: {
  weddingName: string
  scheduleCount: number
  inviteesCount: number
}) => {
  const locations = await createLocations(scheduleCount)

  await prisma.wedding.create({
    data: {
      name: weddingName,
      schedule: {
        createMany: {
          data: Array.from(Array(scheduleCount)).map((_, i) => {
            return {
              name: faker.commerce.productName(),
              startAt: faker.date.future(1),
              endAt: faker.date.future(2),
              locationId: locations[i]!.id,
            }
          }),
        },
      },
      invitees: {
        createMany: {
          data: Array.from(Array(inviteesCount)).map(_ => {
            return {
              firstName: faker.name.firstName(1),
              lastName: faker.name.lastName(1),
            }
          }),
        },
      },
    },
  })
}

async function main() {
  await prisma.event.deleteMany({})
  await prisma.location.deleteMany({})
  await prisma.invitee.deleteMany({})
  await prisma.wedding.deleteMany({})

  await createWedding({
    inviteesCount: 10,
    scheduleCount: 5,
    weddingName: 'test-wedding-1',
  })

  await createWedding({
    inviteesCount: 50,
    scheduleCount: 3,
    weddingName: 'test-wedding-2',
  })
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
