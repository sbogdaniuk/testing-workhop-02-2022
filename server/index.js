import express from 'express'
import { initGraphQLServer } from './graphql'
import { initRESTServer } from './rest'
import { getUser } from './api.js'

const app = express()

app.use(async (req, res, next) => {
  const username = req.headers.authorization

  if (username) {
    req.context = {
      user: await getUser({ username })
    }
  }

  next()
})

await initRESTServer(app)
await initGraphQLServer(app)

app.listen({ port: 3001 }, () => {
  console.log('🚀 GraphQL is running on http://localhost:3001/graphql')
  console.log('🚀 REST is running on http://localhost:3001/rest')
})
