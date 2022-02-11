import React, { useCallback } from 'react'
import { Comment } from '../../types/Comment'
import { CommentCard } from '../../components/CommentCard'
import { CommentInput } from '../../components/CommentInput'

import './CommentList.css'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { fetchComments } from '../../api/fetchComments'
import { RQKey } from '../types/RQKey'
import { UserData } from '../../types/UserData'
import { addComment } from '../../api/addComment'

export const CommentsList: React.VFC = () => {
  const { isLoading, error, data: comments } = useQuery<Comment[], { message?: string }>(RQKey.CommentsList, fetchComments)

  const queryClient = useQueryClient()
  const userData = queryClient.getQueryData<UserData>(RQKey.UserData)

  const submitComment = useMutation<Comment, unknown, string>(addComment,
    {
      onSuccess: (res) => {
        queryClient.setQueryData<Comment[]>(RQKey.CommentsList, (comments) => {
          return [...(comments as Comment[]), {
            ...res,
            user: userData
          }]
        } )
      }
    })

  const onCommentSubmit = useCallback((commentValue: string) => {
    submitComment.mutate(commentValue)
  }, [comments?.length] )

  if (isLoading) return <div>Loading...</div>

  if (error) return <div>{'An error has occurred: ' + error.message}</div>

  if (!comments || comments?.length === 0) return <div>There is no available data</div>

  return (
    <div className='list'>
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
      {
        userData &&
          <CommentInput userData={userData} onCommentSubmit={onCommentSubmit}/>
      }
    </div>
  )
}
