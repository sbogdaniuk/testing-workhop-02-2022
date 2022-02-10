import { getAPIUrl } from '../utils'

export const fetchUsers = () => {
  return fetch(getAPIUrl('rest/users')).then(res => {
    return res.json()
  })
}
