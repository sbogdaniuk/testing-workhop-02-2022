import jsonServer from 'json-server'
import fetch from 'node-fetch'
import queryString from 'query-string'
import { SERVER_URL, DB_FILE_PATH } from '../constants.js'

export function convertToSlug(str) {
  return str.toLowerCase()
    .replace(/ /g, '.')
    .replace(/\.+/g, '.');
}

const getUrl = (url, query) =>
  [[SERVER_URL, url].filter(Boolean).join('/'), queryString.stringify(query)]
    .filter(Boolean)
    .join('?')
const getUsersUrl = (query) => getUrl('users', query)

const authenticated = async (req, res, next) => {
  const username = req.headers.authorization

  if (!username) {
    return res.status(401).send({ message: 'Not authenticated' })
  }

  const user = await fetch(getUsersUrl({ username }))
    .then((res) => res.json())
    .then((users) => users[0])
    .catch(() => {})

  if (!user) {
    return res.status(401).send({ message: 'Not authenticated' })
  }

  req.context = { user }
  next()
}

export const initRESTServer = async (app) => {
  app.use('/rest', jsonServer.bodyParser)

  app.get('/rest/me', authenticated, async (req, res) => {
    return res.send(req.context.user)
  })

  app.post('/rest/login', async (req, res) => {
    const { name } = req.body
    const username = convertToSlug(name)

    if (!name || !username) {
      return res.status(400).send({ message: "Invalid param 'name'!" })
    }

    res.set({ authorization: username })

    const user = await fetch(getUsersUrl({ username }))
      .then((res) => res.json())
      .then((users) => users[0])

    if (user) {
      return res.send(user)
    }

    // create new user
    const newUser = await fetch(getUsersUrl(), {
      method: 'POST',
      headers: {
        authorization: username,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...req.body,
        username,
        email: `${username}@email.com`
      })
    }).then((res) => res.json())

    return res.send(newUser)
  })

  app.post('/rest/comments', authenticated, (req, res, next) => {
    req.body.createdAt = Date.now()
    req.body.modifiedAt = Date.now()
    req.body.userId = req.context.user.id
    // Continue to JSON Server router
    next()
  })
  app.put('/rest/comments', authenticated, (req, res, next) => {
    delete req.body.createdAt
    delete req.body.userId
    req.body.modifiedAt = Date.now()
    // Continue to JSON Server router
    next()
  })

  // Use default router
  app.use('/rest', jsonServer.defaults(), jsonServer.router(DB_FILE_PATH))
}
