import GraphQLEmail from 'graphql-type-email'

import { getComments, getUser, addUser, addComment } from '../api.js'
import { convertToSlug } from '../rest/index.js'

export const resolvers = {
  Query: {
    me: (parent, args, { user }) => {
      return user
    },
    comments: (parent, args, context) => {
      return getComments()
    },
  },
  Mutation: {
    login: async (_, { name }) => {
      const username = convertToSlug(name)

      if (!username) {
        return new Error("Invalid param 'name'!")
      }

      const user = await getUser({ username })

      if (user) return user

      return addUser(
        {
          name,
          username,
          email: `${username}@email.com`,
        },
        { token: username },
      )
    },
    addComment: (_, { comment }, { user }) => {
      return addComment(comment, { token: user.username })
    },
  },
  Email: GraphQLEmail,
  Comment: {
    author: (parent, args, context) => {
      return getUser({ id: parent.userId })
    },
  },
}
