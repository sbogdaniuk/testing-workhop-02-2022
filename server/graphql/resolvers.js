import GraphQLEmail from 'graphql-type-email';

import { DB } from '../database'

export const resolvers = {
  Query: {
    me: () => {
      return DB.users[0]
    },
    comments: () => {
      return DB.comments
    },
  },
  Email: GraphQLEmail
}
