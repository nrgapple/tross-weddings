/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */
import { PrismaClient } from '@prisma/client';
import * as faker from 'faker';

const prisma = new PrismaClient();

async function main() {
  await prisma.location.createMany({
    data: Array.from(Array(10)).map((_) => {
      return {
        name: faker.random.word(),
        address1: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(true),
        zipCode: faker.address.zipCode(),
        county: faker.address.county(),
      };
    }),
  });

  const locations = await prisma.location.findMany({});

  await prisma.wedding.create({
    data: {
      schedule: {
        createMany: {
          data: Array.from(Array(10)).map((_) => {
            return {
              name: faker.commerce.productName(),
              startAt: faker.date.future(1),
              endAt: faker.date.future(2),
              locationId: faker.helpers.randomize(locations.map((x) => x.id)),
            };
          }),
        },
      },
      invitees: {
        createMany: {
          data: Array.from(Array(100)).map((_) => {
            return {
              firstName: faker.name.firstName(1),
              lastName: faker.name.lastName(1),
            };
          }),
        },
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
