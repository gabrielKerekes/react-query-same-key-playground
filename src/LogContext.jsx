import { createContext, useContext, useState } from 'react'

const LogContext = createContext()

export const useLog = () => {
  const context = useContext(LogContext)
  if (!context) {
    throw new Error('useLog must be used within a LogProvider')
  }
  return context
}

export const LogProvider = ({ children }) => {
  const [logs, setLogs] = useState([])

  const addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs(prev => [...prev, { timestamp, message }])
  }

  const clearLogs = () => {
    setLogs([])
  }

  return (
    <LogContext.Provider value={{ logs, addLog, clearLogs }}>
      {children}
    </LogContext.Provider>
  )
}
