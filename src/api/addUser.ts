import { getAPIUrl } from '../utils'
import { User } from '../types/User'

export const addUser = async (user: User) => {
  return fetch(getAPIUrl('rest/users'), {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then(res => res.json())
}
