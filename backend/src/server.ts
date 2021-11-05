import "reflect-metadata"
import { resolvers } from "./generatedGraphql"
import { buildSchema } from "type-graphql"
import { ApolloServer } from "apollo-server"
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const PORT = process.env.PORT || 4000

export async function bootstrap() {
  try {
    const schema = await buildSchema({ 
      resolvers, 
      validate: false
     })

    const server = new ApolloServer({
      schema,
      plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
      context: () => ({ prisma }),
    })

    // Start the server
    const { url } = await server.listen(PORT)
    console.log(`Server is running, GraphQL Playground available at ${url}`)
  } catch (e) {
    console.error(e)
  }
}
