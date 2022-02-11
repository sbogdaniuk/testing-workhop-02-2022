import moment from 'moment'

export const timeFromNow = (timestamp: number): string => {
  return moment(timestamp).fromNow()
}
