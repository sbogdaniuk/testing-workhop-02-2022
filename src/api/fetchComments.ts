import { getAPIUrl } from '../utils'

export const fetchComments = async () => {
  return  fetch(getAPIUrl('rest/comments')).then(res => {
    return res.json()
  })
}
