import React, { PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { QueryClientProviderProps } from 'react-query/types/react/QueryClientProvider'
import { UsersProvider } from './context/UsersContext'
import { CommentsProvider } from './context/CommentsContext'

type ProvidersProps = PropsWithChildren<{
  client?: QueryClientProviderProps['client']
}>

export const Providers = ({ children, client = new QueryClient() }: ProvidersProps) => {
  return (
    <QueryClientProvider client={client}>
      <UsersProvider>
        <CommentsProvider>
          {children}
        </CommentsProvider>
      </UsersProvider>
    </QueryClientProvider>
  )
}
