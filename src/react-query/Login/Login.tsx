import React, { useCallback, useState } from 'react';
import Button from '@mui/material/Button'
import { LoginDialog } from '../../components/LoginDialog'
import { UserData } from '../../types/UserData'

type LoginProps = {
  userData?: UserData,
  onLogout: () =>  void,
  onLogin: (userData: UserData) => void,
}

export const Login: React.VFC<LoginProps> = ({ userData, onLogout, onLogin }): JSX.Element => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const openModal = useCallback(() => {
    setIsOpenModal(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsOpenModal(false)
  }, [])

  const onSubmit = useCallback((userData: UserData) => {
    onLogin(userData)
    closeModal()
  }, [onLogin])

  return (
    <>
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
            onClick={openModal}
          >Login</Button>
      }
      <LoginDialog isOpenModal={isOpenModal} onClose={closeModal} onSubmit={onSubmit}/>
    </>
)
}
