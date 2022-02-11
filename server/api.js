import fetch from 'node-fetch'
import queryString from 'query-string'

import { SERVER_URL } from './constants.js'

const getUrl = (url, query) =>
  [[SERVER_URL, url].filter(Boolean).join('/'), queryString.stringify(query)]
    .filter(Boolean)
    .join('?')
const getUserUrl = (id, query) => getUrl(`users/${id}`, query)
const getUsersUrl = (query) => getUrl('users', query)
const getCommentsUrl = (query) => getUrl('comments', query)

// GET POST PUT
const post = (url, body, { token }) =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(body),
  }).then((res) => res.json())


export const getUsers = (query) =>
  fetch(getUsersUrl(query)).then((res) => res.json())

export const getUserById = (id, query) =>
  fetch(getUserUrl(id, query)).then((res) => res.json())

export const getUser = (query = {}) => {
  const { id, ...rest } = query
  if (id) {
    return getUserById(id, rest)
  }

  return getUsers(query).then((users) => users[0])
}

export const addUser = (user, config) => post(getUsersUrl(), user, config)


// Comments
export const getComments = (query) =>
  fetch(getCommentsUrl(query)).then((res) => res.json())
export const addComment = (comment, config) => post(getCommentsUrl(), comment, config)
