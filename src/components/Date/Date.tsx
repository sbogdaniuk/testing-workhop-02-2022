import React, { useEffect, useState } from 'react'
import { useTick } from './TickProvider'
import { timeFromNow } from '../../utils/timeFromNow'

type DateProps = {
  timestamp: number
}

export const Date: React.VFC<DateProps> = ({ timestamp }) => {
  const [dateFromNow, setDateFromNow] = useState<string>(() => timeFromNow(timestamp))

  const { tick } = useTick()

  useEffect(() => {
    setDateFromNow(timeFromNow(timestamp))
  }, [tick])

  return (
    <div>{ dateFromNow }</div>
  )
}

