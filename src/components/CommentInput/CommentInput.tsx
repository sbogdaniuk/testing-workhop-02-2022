import React, { useState } from 'react'
import CardHeader from '@mui/material/CardHeader'
import Avatar from '@mui/material/Avatar'
import { deepOrange } from '@mui/material/colors'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useMutation } from 'react-query'
import { Comment } from '../../types/Comment'
import { addComment } from '../../api/addComment'
import { useComments } from '../../react-query/context/CommentsContext'

import './CommentInput.css'

type CommentInputProps = {
  userData?: {
    id: number,
    name: string,
    email: string
  };
  commentsCount: number;
}

export const CommentInput: React.FC<CommentInputProps> = ({ userData, commentsCount }) => {
  const [comment, setComment] = useState('')
  const { addNewComment } = useComments()
  const mutation = useMutation<Comment, unknown, Comment>(comment => {
    return addComment(comment)
  },
    {
      onSuccess: (comment) => {
        if (comment) {
          addNewComment(comment)
        }

        setComment('')
      }
    })

  if (!userData) {
    return null
  }

  const onSubmit = () => {
    const dataToSubmit = {
      id: commentsCount + 1,
      authorId: userData.id,
      body: comment
    }

    mutation.mutate(dataToSubmit)
  }


  return (
    <Card sx={{ width: 500 }} className="card">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: deepOrange[500] }}>
            {userData.name.charAt(0)}
          </Avatar>
        }
        title={userData.name}
        subheader={userData.email}
      />
      <CardContent>
        <TextField
          id="user-comment"
          label="Your comment"
          multiline
          fullWidth
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        {
          !!comment.trim().length &&
            <Button
              className='submit-btn'
              onClick={onSubmit}
            >Submit</Button>
        }
      </CardContent>
    </Card>
  )
}
