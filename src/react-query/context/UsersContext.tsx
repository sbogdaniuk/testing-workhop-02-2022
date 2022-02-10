import React, { useContext, createContext, PropsWithChildren } from 'react';
import { useQuery } from 'react-query'
import { User } from '../../types/User'
import { fetchUsers } from '../../api/fetchUsers'

interface UserContextProps {
  data: User[];
  isLoading: boolean
}

const UsersContext = createContext<UserContextProps>({ data: [], isLoading: false})

type UsersProviderProps = PropsWithChildren<{}>


export const UsersProvider = ({ children }: UsersProviderProps) => {
  const {isLoading, data } = useQuery<unknown, unknown, User[]>('users', fetchUsers)

  return (
    <UsersContext.Provider value={{ data: data || [], isLoading }}>
      {children}
    </UsersContext.Provider>
  )
}

export const useUsers = () => {
  const context = useContext(UsersContext)

  if (!context) {
    throw new Error("Use 'useUsers' inside 'CommentsProvider'")
  }

  return context
}

