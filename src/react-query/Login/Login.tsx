import React, { useCallback, useState } from 'react'
import Button from '@mui/material/Button'
import { LoginDialog } from '../../components/LoginDialog'
import { UserData } from '../../types/UserData'
import { useMutation, useQueryClient } from 'react-query'
import { login } from '../../api/login'
import { AUTHORIZATION_KEY } from '../../constants'
import { RQKey } from '../types/RQKey'

export const Login: React.VFC = (): JSX.Element => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const queryClient = useQueryClient()
  const userData = queryClient.getQueryData<UserData>(RQKey.UserData)

  const loginUser = useMutation<UserData, unknown, string>(login, {
    onSuccess: (data) => {
      localStorage.setItem(AUTHORIZATION_KEY, data.username)
      queryClient.setQueryData(RQKey.UserData, data)
    }
  })

  const onLogout = useCallback(() => {
    localStorage.removeItem(AUTHORIZATION_KEY)
    loginUser.reset()
    queryClient.resetQueries(RQKey.UserData, { exact: true })
  }, [])

  const openModal = useCallback(() => {
    setIsOpenModal(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsOpenModal(false)
  }, [])

  const onSubmit = useCallback((username) => {
    loginUser.mutate(username)
    closeModal()
  }, [])

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
