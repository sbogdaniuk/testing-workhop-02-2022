import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import { useMutation } from 'react-query'
import { User } from '../../types/User'
import { addUser } from '../../api/addUser'
import { useUsers } from '../../react-query/context/UsersContext'

import './Header.css'

type HeaderProps = {
  userData?: {
    id: number,
    name: string,
    email: string
  };
  onLogin: (userData: { id: number, name: string, email: string }) => void;
  onLogout: () => void
}

export const Header: React.FC<HeaderProps> = ({ userData, onLogin, onLogout}) => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')

  const { data: users, isLoading } = useUsers()

  const registerUser = useMutation<User, unknown, User>(user => {
      return addUser(user)
    },
    {
      onSuccess: (data) => {
        onLogin(data)
        handleCloseModal()
      }
    })

  const submitUser = () => {
    const existingUser = users?.find((user: User) => user.name === userName.trim() && user.email === userEmail.trim())

    if (existingUser) {
      onLogin(existingUser)
    } else {
      registerUser.mutate({
        id: users ? users.length + 1 : 1,
        name: userName.trim(),
        email: userEmail.trim()
      })
    }

    handleCloseModal()
  }

  const handleOpenModal = () => {
    setIsOpenModal(true)
  }

  const handleCloseModal = () => {
    setUserName('')
    setUserEmail('')
    setIsOpenModal(false)
  }

  const isDisabledSubmit = !userName.trim() || !userEmail.trim()

  return (
    <header>
      <AppBar position="static">
        <Toolbar className="header-toolbar">
          <Link to="/">
          <IconButton>
            <ArrowBackIcon style={{color: 'white'}}/>
          </IconButton>
          </Link>
          {
            userData
            ? <div className='right-container'>
              <div className='username'>Hello, {userData.name}</div>
                <Button
                  color="inherit"
                  onClick={onLogout}
                >Logout</Button>
              </div>
            :
              <Button
                color="inherit"
                onClick={handleOpenModal}
              >Login</Button>
          }
        </Toolbar>
      </AppBar>
      <Dialog
        fullWidth
        open={isOpenModal}
        onClose={handleCloseModal}
      >
        <DialogTitle>Login</DialogTitle>
        {
          isLoading
            ? <div>Loading...</div>
            : <>
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
                <TextField
                  margin="dense"
                  id="email"
                  label="Email"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseModal}>Cancel</Button>
                <Button
                  disabled={isDisabledSubmit}
                  onClick={submitUser}
                >Submit</Button>
              </DialogActions>
            </>
        }
      </Dialog>
    </header>
  )
}
