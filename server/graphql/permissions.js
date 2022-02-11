import { rule, shield } from 'graphql-shield'

const isAuthenticated = rule()((parent, args, context) => {
  return !!context?.user
})

export const permissions = shield({
  Query: {
    me: isAuthenticated
  },
  Mutation: {
    addComment: isAuthenticated
  }
});
