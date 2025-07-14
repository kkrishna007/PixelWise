export const getNetworkSpeed = () => {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
  
  if (!connection) {
    return {
      effectiveType: '4g',
      downlink: 10,
      rtt: 50
    }
  }
  
  return {
    effectiveType: connection.effectiveType,
    downlink: connection.downlink,
    rtt: connection.rtt,
    saveData: connection.saveData
  }
}

export const getOptimalImageQuality = (networkInfo) => {
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

export const estimateLoadTime = (imageSizeKB, networkSpeed) => {
  // Simple estimation: size in KB / speed in Mbps * 8 (bits to bytes) * 1000 (ms)
  const speedKBps = (networkSpeed * 1024) / 8 // Convert Mbps to KBps
  return Math.round((imageSizeKB / speedKBps) * 1000)
}

export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

export const isSlowConnection = (networkInfo) => {
  return networkInfo.effectiveType === 'slow-2g' || 
         networkInfo.effectiveType === '2g' ||
         networkInfo.downlink < 1.5
}
