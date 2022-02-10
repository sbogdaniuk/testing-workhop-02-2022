import React, { useCallback, useState } from 'react';
import CardHeader from '@mui/material/CardHeader'
import Avatar from '@mui/material/Avatar'
import { deepOrange } from '@mui/material/colors'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import './CommentInput.css'
import { UserData } from '../../types/UserData'

type CommentInputProps = {
  userData: UserData,
  onCommentSubmit: (commentValue: string) => void
}

export const CommentInput: React.VFC<CommentInputProps> = ({ userData, onCommentSubmit }): JSX.Element => {
  const [commentValue, setCommentValue] = useState<string>('')

  const onSubmit = useCallback(() => {
    onCommentSubmit(commentValue)
    setCommentValue('')
  }, [commentValue, onCommentSubmit])

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
          value={commentValue}
          onChange={(e) => setCommentValue(e.target.value)}
        />
        {
          !!commentValue.trim().length &&
            <Button
              className='submit-btn'
              onClick={onSubmit}
            >Submit</Button>
        }
      </CardContent>
    </Card>
  )
}
