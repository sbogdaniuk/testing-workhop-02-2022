import express from 'express'
import jsonServer from 'json-server'
import { DB_FILE_PATH } from '../constants.js'
import { getUser, addUser } from '../api.js'

export function convertToSlug(str = '') {
  return str.toLowerCase().replace(/ /g, '.').replace(/\.+/g, '.')
}

const authenticated = async (req, res, next) => {
  if (!req.context.user) {
    return res.status(401).send({ message: 'Not authenticated' })
  }

  next()
}

export const initRESTServer = async (app) => {
  const router = express.Router()

  router.get('/me', authenticated, async (req, res) => {
    return res.send(req.context.user)
  })

  router.post('/login', async (req, res) => {
    const { name } = req.body
    const username = convertToSlug(name)

    if (!username) {
      return res.status(400).send({ message: "Invalid param 'name'!" })
    }

    res.set({ authorization: username })

    const user = await getUser({ username })

    if (user) {
      return res.send(user)
    }

    // create new user
    const newUser = await addUser(
      {
        ...req.body,
        username,
        email: `${username}@email.com`,
      },
      { token: username },
    )

    return res.send(newUser)
  })

  router.post('/comments', authenticated, (req, res, next) => {
    req.body.createdAt = Date.now()
    req.body.modifiedAt = Date.now()
    req.body.userId = req.context.user.id
    // Continue to JSON Server router
    next()
  })
  router.put('/comments', authenticated, (req, res, next) => {
    delete req.body.createdAt
    delete req.body.userId
    req.body.modifiedAt = Date.now()
    // Continue to JSON Server router
    next()
  })

  // Use default router
  router.use(jsonServer.defaults(), jsonServer.router(DB_FILE_PATH))

  app.use('/rest', jsonServer.bodyParser, router)
}
