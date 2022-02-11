import React from 'react'

import { Header } from '../components/Header'
import { CommentsList } from './CommentsList'
import { Login } from './Login'
import { AUTHORIZATION_KEY } from '../constants'
import { useQuery } from 'react-query'
import { RQKey } from './types/RQKey'
import { getUser } from '../api/login'
import { TickProvider } from '../components/Date/TickProvider'

const authKey = localStorage.getItem(AUTHORIZATION_KEY)

export const ReactQueryAppPage: React.VFC = (): JSX.Element => {
  const { isLoading } = useQuery(RQKey.UserData, getUser, {
    enabled: !!authKey,
  })

  return (
    <>
      <Header>
        {
          isLoading
          ? <div>Loading</div>
          : <Login />
        }
      </Header>
      <TickProvider>
        <CommentsList />
      </TickProvider>
    </>
  )
}
