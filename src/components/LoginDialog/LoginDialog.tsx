import React, { useState } from 'react'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import TextField from '@mui/material/TextField'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'

type LoginDialogProps = {
  isOpenModal: boolean,
  onClose: () => void,
  onSubmit: (username: string) => void
}

export const LoginDialog: React.VFC<LoginDialogProps> = ({ isOpenModal, onClose, onSubmit}): JSX.Element => {
  const [userName, setUserName] = useState<string>('')

  const isDisabledSubmit = userName.trim().length === 0

  return (
    <Dialog
      fullWidth
      open={isOpenModal}
      onClose={onClose}
    >
      <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please, enter username and email
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            disabled={isDisabledSubmit}
            onClick={() => onSubmit(userName)}
          >Submit</Button>
        </DialogActions>
    </Dialog>
  )
}
