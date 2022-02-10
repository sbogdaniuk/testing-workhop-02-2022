import { getAPIUrl } from '../utils'
import { Comment } from '../types/Comment'

export const addComment = async (comment: Comment) => {
  return fetch(getAPIUrl('rest/comments'), {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then(res => res.json())
}
