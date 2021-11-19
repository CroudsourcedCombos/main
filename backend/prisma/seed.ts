import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function main() {
  const pizza_1 = await prisma.food.create({
    data: {
      location: "UCLA",
      type: "pizza",
      name: "Pepperoni",
    },
  })
  const pizza_2 = await prisma.food.create({
    data: {
      location: "UCLA",
      type: "pizza",
      name: "Cheese",
    },
  })

  const soda_1 = await prisma.food.create({
    data: {
      location: "UCLA",
      type: "soda",
      name: "Sprite Mango",
    },
  })

  const alice = await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      firebaseId: "aaaaaa",
      email: "alice@prisma.io",
      name: "Alice",
      profile: {
        create: {
          bio: "Alice's Bio",
        },
      },
      reviews: {
        create: {
          rating: 0,
          food: {
            connect: {
              id: pizza_1.id
            }
          },
          text: "ReviewText",
        },
      },
      toTryList: {
        connect: [
          {
            id: soda_1.id
          },
          {
            id: pizza_1.id
          }
        ],
      },
    },
  })

  const bob = await prisma.user.upsert({
    where: { email: "bob@ucla.edu" },
    update: {},
    create: {
      email: "bob@ucla.edu",
      firebaseId: "AAAAddd",
      name: "Bob",
      profile: {
        create: {
          bio: "Bob's Bio",
        },
      },
      reviews: {
        create: {
          rating: 1,
          food: {
            connect: {
              id: pizza_1.id
            }
          },
          text: "ReviewText",
        },
      },
      favoritesList: {
        connect: [
          {
            id: pizza_1.id,
          },
          {
            id: pizza_2.id
          }
        ],
      },
      toTryList: {
        connectOrCreate: {
          where: {
            name: "Sprite Mango",
          },
          create: {
            location: "UCLA",
            type: "soda",
            name: "Sprite Mango",
          },
        },
      },
    },
  })
  console.log({ alice, bob })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
