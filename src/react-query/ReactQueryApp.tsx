import React, { useCallback, useState } from 'react'

import { Header } from '../components/Header'
import { CommentsList } from './CommentsList'
import { Providers } from './Providers'

export const ReactQueryApp = () => {
  const [userData, setUserData] = useState<{id: number, name: string, email: string}>()

  const onLogout = useCallback(() => {
    setUserData(undefined)
  }, [setUserData])

  return (
    <Providers>
      <div>
        <Header
          userData={userData}
          onLogin={setUserData}
          onLogout={onLogout}
        />
        {
          <CommentsList userData={userData} />
        }
      </div>
    </Providers>
  )
}
