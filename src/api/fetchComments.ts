import { getAPIUrl } from '../utils'
import { Comment } from '../types/Comment'

export const fetchComments = async (): Promise<Comment[]> => {
  return fetch(getAPIUrl('comments?_expand=user'), {
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then(res => {
    return res.json()
  })
}
