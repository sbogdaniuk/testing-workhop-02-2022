import { getAPIUrl } from '../utils'
import { UserData } from '../types/UserData'
import { AUTHORIZATION_KEY } from '../constants'

export const login = (username: string): Promise<UserData> => {
  return fetch(getAPIUrl('login'), {
    method: 'POST',
    body: JSON.stringify({ name: username }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then(res => {
    return res.json()
  })
}

export const getUser = () => {
  const token = localStorage.getItem(AUTHORIZATION_KEY) as string

    return fetch(getAPIUrl('me'), {
      headers: {
        'authorization': token
      }
    }).then(res => {
      return res.json()
    })
}
