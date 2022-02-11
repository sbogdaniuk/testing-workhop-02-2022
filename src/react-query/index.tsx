import React from 'react'
import { Providers } from './Providers'
import { ReactQueryAppPage } from './ReactQueryAppPage'

export const ReactQueryApp: React.VFC = () => (
  <Providers>
    <ReactQueryAppPage />
  </Providers>
)
