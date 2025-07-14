import { useCallback, useRef, useEffect } from 'react'

const useBackgroundTasks = () => {
  const tasksRef = useRef(new Map())

  const scheduleTask = useCallback((callback, taskId = Date.now()) => {
    tasksRef.current.set(taskId, callback)
    
    if (window.requestIdleCallback) {
      requestIdleCallback(() => {
        if (tasksRef.current.has(taskId)) {
          try {
            callback()
            tasksRef.current.delete(taskId)
          } catch (error) {
            console.error('Background task error:', error)
            tasksRef.current.delete(taskId)
          }
        }
      })
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        if (tasksRef.current.has(taskId)) {
          try {
            callback()
            tasksRef.current.delete(taskId)
          } catch (error) {
            console.error('Background task error:', error)
            tasksRef.current.delete(taskId)
          }
        }
      }, 100)
    }
  }, [])

  return { scheduleTask }
}

export default useBackgroundTasks
