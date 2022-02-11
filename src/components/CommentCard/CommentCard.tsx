import React from 'react'
import CardHeader from '@mui/material/CardHeader'
import Avatar from '@mui/material/Avatar'
import { deepOrange } from '@mui/material/colors'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'

import './CommentCard.css'
import { Comment } from '../../types/Comment'
import { Date } from '../Date'

type CommentCardProps = {
  comment: Comment
}

export const CommentCard: React.VFC<CommentCardProps> = ({ comment }): JSX.Element => {
  return (
    <Card sx={{ width: 500 }} className="comment-card">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: deepOrange[500] }}>
            {comment.user?.name.charAt(0)}
          </Avatar>
        }
        action={<Date timestamp={comment.createdAt}/>}
        title={comment.user?.name}
        subheader={comment.user?.email}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {comment.body}
        </Typography>
      </CardContent>
   </Card>
  )
}
