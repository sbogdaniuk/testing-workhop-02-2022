import { getAPIUrl } from '../utils'
import { Comment } from '../types/Comment'
import { AUTHORIZATION_KEY } from '../constants'

export const addComment = (comment: string): Promise<Comment> => {
  const token = localStorage.getItem(AUTHORIZATION_KEY) as string

    return fetch(getAPIUrl('rest/comments'), {
      method: 'POST',
      body: JSON.stringify({ body: comment }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'authorization': token
      },
    }).then(res => res.json())
}
