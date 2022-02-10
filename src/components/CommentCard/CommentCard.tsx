import React from 'react'
import CardHeader from '@mui/material/CardHeader'
import Avatar from '@mui/material/Avatar'
import { deepOrange } from '@mui/material/colors'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'

import './CommentCard.css'
import { FullCommentInfo } from '../../types/Comment'

type CommentCardProps = {
  comment: FullCommentInfo
}

export const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  return (
    <Card sx={{ width: 500 }} className="comment-card">
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: deepOrange[500] }}>
          {comment.author?.name.charAt(0)}
        </Avatar>
      }
      title={comment.author?.name}
      subheader={comment.author?.email}
    />
    <CardContent>
      <Typography variant="body2" color="text.secondary">
        {comment.body}
      </Typography>
    </CardContent>
  </Card>
  )
}
