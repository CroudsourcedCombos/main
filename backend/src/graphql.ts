import "reflect-metadata"
import { resolvers } from "@generated/type-graphql"
import { buildSchema } from "type-graphql"
import { ApolloServer } from "apollo-server"
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import pkg from "@prisma/client"
const { PrismaClient } = pkg

const prisma = new PrismaClient()

const PORT = process.env.PORT || 4000

async function bootstrap() {
  const schema = await buildSchema({ resolvers, validate: false })

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    context: () => ({ prisma }),
  })

  // Start the server
  const { url } = await server.listen(PORT)
  console.log(`Server is running, GraphQL Playground available at ${url}`)
}

bootstrap()
