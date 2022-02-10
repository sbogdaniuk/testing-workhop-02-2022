import React, { useCallback, useState } from 'react'

import { Header } from '../components/Header'
import { CommentsList } from './CommentsList'
import { Login } from './Login'
import { UserData } from '../types/UserData'


export const ReactQueryAppPage: React.VFC = (): JSX.Element => {
  const [userData, setUserData] = useState<UserData>()

  const onLogout = useCallback(() => {
    setUserData(undefined)
  }, [])

  return (
    <>
      <Header>
        <Login userData={userData} onLogout={onLogout} onLogin={setUserData} />
      </Header>
      <CommentsList userData={userData} />
    </>
  )
}
