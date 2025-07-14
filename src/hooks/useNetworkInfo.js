import { useState, useEffect } from 'react'

const useNetworkInfo = (simulateNetwork = false, simulatedSpeed = '4g') => {
  const [networkInfo, setNetworkInfo] = useState({
    isOnline: true,
    effectiveType: '4g',
    downlink: 10,
    rtt: 50,
    saveData: false
  })

  useEffect(() => {
    if (simulateNetwork) {
      const simulatedData = {
        'slow-2g': { effectiveType: 'slow-2g', downlink: 0.5, rtt: 2000 },
        '2g': { effectiveType: '2g', downlink: 1, rtt: 1000 },
        '3g': { effectiveType: '3g', downlink: 3, rtt: 500 },
        '4g': { effectiveType: '4g', downlink: 10, rtt: 50 }
      }
      
      setNetworkInfo(prev => ({
        ...prev,
        ...simulatedData[simulatedSpeed]
      }))
    } else {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
      
      if (connection) {
        setNetworkInfo({
          isOnline: navigator.onLine,
          effectiveType: connection.effectiveType || '4g',
          downlink: connection.downlink || 10,
          rtt: connection.rtt || 50,
          saveData: connection.saveData || false
        })
      }
    }
  }, [simulateNetwork, simulatedSpeed])

  const getOptimalImageQuality = () => {
    if (!networkInfo.isOnline) return 'low'
    if (networkInfo.saveData) return 'low'
    
    switch (networkInfo.effectiveType) {
      case 'slow-2g':
      case '2g':
        return 'low'
      case '3g':
        return 'medium'
      case '4g':
      default:
        return 'high'
    }
  }

  const getLoadingDelay = () => {
    switch (networkInfo.effectiveType) {
      case 'slow-2g': return 2000
      case '2g': return 1000
      case '3g': return 500
      case '4g': return 100
      default: return 100
    }
  }

  return {
    ...networkInfo,
    getOptimalImageQuality,
    getLoadingDelay
  }
}

export default useNetworkInfo
