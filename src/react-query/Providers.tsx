import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { QueryClientProviderProps } from 'react-query/types/react/QueryClientProvider'

type ProvidersProps = {
  client?: QueryClientProviderProps['client']
}

export const Providers: React.FC<ProvidersProps> = ({ children, client = new QueryClient() }) => {
  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  )
}
