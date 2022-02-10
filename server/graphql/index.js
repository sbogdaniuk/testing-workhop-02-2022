import path, { join } from 'path'
import { fileURLToPath } from 'url'
import { ApolloServer } from 'apollo-server-express'
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { addResolversToSchema } from '@graphql-tools/schema'
import { resolvers } from './resolvers.js'

// call with import.meta
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const initGraphQLServer = async (app) => {
  const schema = loadSchemaSync(join(__dirname, 'schema.graphql'), {
    loaders: [new GraphQLFileLoader()],
  })

  const server = new ApolloServer({
    cors: true,
    schema: addResolversToSchema({
      schema,
      resolvers,
    }),
    context: {},
  })

  await server.start()

  server.applyMiddleware({ app, path: '/graphql' })
}
