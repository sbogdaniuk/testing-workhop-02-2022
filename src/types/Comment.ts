import { User } from './User'

export type Comment = {
  id: number,
  authorId: number,
  body: string
}

export type FullCommentInfo = {
  id: number,
  authorId: number,
  body: string,
  author?: User
}
