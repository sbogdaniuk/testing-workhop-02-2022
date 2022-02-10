import express from 'express'
import { initGraphQLServer } from './graphql'
import { initRESTServer } from './rest'

const app = express()

await initGraphQLServer(app)
await initRESTServer(app)

app.listen({ port: 3001 }, () => {
  console.log('🚀 GraphQL is running on http://localhost:3001/graphql')
  console.log('🚀 REST is running on http://localhost:3001/rest')
})
