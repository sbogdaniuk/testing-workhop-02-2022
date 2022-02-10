import React from 'react'
import { Comment } from '../types/Comment';
import { CommentCard } from '../components/CommentCard'
import { CommentInput } from '../components/CommentInput'
import { User } from '../types/User'
import { useUsers } from './context/UsersContext'
import { useComments } from './context/CommentsContext'

import './CommentList.css'

type CommentsListProps = {
  userData?: {
    id: number,
    name: string,
    email: string
  }
}

export const CommentsList: React.FC<CommentsListProps> = ({ userData }) => {
  const { isLoading, error, comments } = useComments()

  const { data: users, isLoading: isUsersLoading } = useUsers()

  if (isLoading || isUsersLoading) return <div>Loading...</div>

  if (error) return <div>{'An error has occurred: ' + error.message}</div>

  if (comments?.length === 0) return <div>There is no available data</div>

  const fullData = comments.map((comment: Comment) => {
    const author = users.find((user: User) => user.id === comment.authorId)
    return {
      ...comment,
      author
    }
  })

  return (
    <div className='list'>
      {fullData.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
      {
        userData &&
          <CommentInput userData={userData} commentsCount={comments.length || 0}/>
      }
    </div>
  )
}
