import { join } from 'path'
import { ApolloServer } from 'apollo-server-express'
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { addResolversToSchema } from '@graphql-tools/schema'
import {applyMiddleware} from 'graphql-middleware'

import { SERVER_ROOT_PATH } from '../constants.js'
import { resolvers } from './resolvers.js'
import { permissions } from './permissions.js'

let SCHEMA_PATH = join(SERVER_ROOT_PATH, 'graphql/schema.graphql');

export const initGraphQLServer = async (app) => {
  const schema = loadSchemaSync(SCHEMA_PATH, {
    loaders: [new GraphQLFileLoader()],
  })

  const server = new ApolloServer({
    cors: true,
    schema: applyMiddleware(
      addResolversToSchema({
        schema,
        resolvers,
      }),
      permissions
    ),
    context: ({ req, res }) => ({ req, res, user: req.context?.user }),
    formatResponse: (response, query ) => {
      const { context } = query;
      const { res, req: request, user } = context; // http response and request
      // now you can set http response headers

      if (user) {
        res.set({ authorization: user.username })
      }

      return response; // graphql response
    },
    introspection: true
  })

  await server.start()

  server.applyMiddleware({ app, path: '/graphql' })
}
