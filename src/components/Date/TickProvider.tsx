import React, { createContext, useContext, useEffect, useState } from 'react';

const TickContext = createContext({ tick: 0})

export const TickProvider: React.FC = ({ children}) => {
  const [tick, setTick] = useState<number>(0)

  useEffect(() => {
    const intervalHandler = setInterval(() => {
      setTick((tick) => tick + 1)
    }, 60000)

    return () => {
      clearInterval(intervalHandler)
      setTick(0)
    }
  }, [])

  return (
    <TickContext.Provider value={{tick}}>
      {children}
    </TickContext.Provider>
  )
}

export const useTick = () => {
  const context = useContext(TickContext)

  if (!context) {
    throw new Error("Use 'useTick' inside 'TickProvider'")
  }

  return context
}
