import React from 'react'
import { useQuery } from 'react-query'
import { getAPIUrl } from '../utils'

type Comment = {
  postId: number,
  id: number,
  name: string,
  email: string,
  body: string
}

export const CommentsList = () => {
  const { isLoading, error, data } = useQuery<Comment[], Error>('repoData', () =>
    fetch(getAPIUrl('comments')).then(res => res.json())
  )

  if (isLoading) return <div>Loading...</div>

  if (error) return <div>{'An error has occurred: ' + error.message}</div>

  return (
    <dl>
      {data?.map(comment => (
        <React.Fragment key={comment.id}>
          <dt>{comment.name} ({comment.email})</dt>
          <dd>{comment.body}</dd>
        </React.Fragment>
      ))}
    </dl>
  )
}
