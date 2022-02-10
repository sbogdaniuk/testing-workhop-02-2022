import React, { useContext, createContext, useState, useEffect, useCallback, PropsWithChildren } from 'react';
import { useQuery } from 'react-query'
import { fetchComments } from '../../api/fetchComments'
import { Comment } from '../../types/Comment'

type CommentsProviderProps = PropsWithChildren<{}>

interface CommentsContext {
  isLoading: boolean,
  error?: {
    message?: string
  } | null,
  comments: Comment[],
  addNewComment: (comment: Comment) => void
}

const CommentsContext = createContext<CommentsContext>({ isLoading: false, comments: [], addNewComment: () => {}})

export const CommentsProvider = ({ children }: CommentsProviderProps) => {
  const [comments, setComments] = useState<Comment[]>([])

  const {isLoading, error, data } = useQuery<unknown, {message?: string }, Comment[]>('commentsList', fetchComments)

  useEffect(() => {
    if (data) {
      setComments(data)
    }
  }, [data])

  const addNewComment = useCallback((newComment: Comment) => {
    setComments([...comments, newComment])
  }, [setComments, comments])

  return (
    <CommentsContext.Provider value={{isLoading, error, comments, addNewComment }}>
      {children}
    </CommentsContext.Provider>
  )
}

export const useComments = () => {
  const context = useContext(CommentsContext)

  if (!context) {
    throw new Error("Use 'useComments' inside 'CommentsProvider'")
  }

  return context
}

