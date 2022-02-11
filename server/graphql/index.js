import { join } from 'path'
import { ApolloServer } from 'apollo-server-express'
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { addResolversToSchema } from '@graphql-tools/schema'
import { resolvers } from './resolvers.js'
import { SERVER_ROOT_PATH } from '../constants.js'

let SCHEMA_PATH = join(SERVER_ROOT_PATH, 'graphql/schema.graphql');

export const initGraphQLServer = async (app) => {
  const schema = loadSchemaSync(SCHEMA_PATH, {
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
