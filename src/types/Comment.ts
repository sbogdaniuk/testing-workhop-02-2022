import { UserData } from './UserData'

export type Comment = {
  id: number,
  userId: number,
  body: string,
  user?: UserData
}
