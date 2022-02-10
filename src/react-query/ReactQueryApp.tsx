import React from 'react'

import { Header } from '../components/Header'
import { CommentsList } from './CommentsList'
import { Providers } from './Providers'

export const ReactQueryApp = () => {
  return (
    <Providers>
      <div>
        <Header>
          <button>login</button>
        </Header>
        <CommentsList />
      </div>
    </Providers>
  )
}
