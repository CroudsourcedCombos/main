/* eslint-disable quotes */
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function main() {
  const sandwich_1 = await prisma.food.create({
    data: {
      location: "UCLA",
      type: "sandwich",
      name: '{"breads":["Country Loaf"],"cheeses":["Cheddar Cheese"],"toppings":["Egg Salad","Grilled Rosemary Chicken Breast"],"add_ons":["Red Onion"],"spreads":["Olive Oil","Pesto Sauce"]}',
    },
  })

  const soda_1 = await prisma.food.create({
    data: {
      location: "UCLA",
      type: "soda",
      name: "2",
    },
  })

  const alice = await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      firebaseId: "rjn3we2tWMPNmtYDaNDTDwFRCPU2",
      email: "royalcows9@gmail.com",
      name: "Julie",
      profile: {
        create: {
          bio: "Alice's Bio",
        },
      },
      reviews: {
        create: {
          rating: 2,
          food: {
            connect: {
              id: sandwich_1.id,
            },
          },
          text: "ReviewText",
        },
      },
      toTryList: {
        connect: [
          {
            id: soda_1.id,
          },
          {
            id: sandwich_1.id,
          },
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
              id: sandwich_1.id,
            },
          },
          text: "ReviewText",
        },
      },
      favoritesList: {
        connect: [
          {
            id: sandwich_1.id,
          },
        ],
      },
      toTryList: {
        connectOrCreate: {
          where: {
            name: "2",
          },
          create: {
            location: "UCLA",
            type: "soda",
            name: "2",
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
