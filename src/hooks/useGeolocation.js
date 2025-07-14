import { useState, useEffect } from 'react'

const useGeolocation = (enabled = false) => {
  const [location, setLocation] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!enabled || !navigator.geolocation) {
      return
    }

    setLoading(true)
    setError(null)

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000 // 5 minutes
    }

    const handleSuccess = (position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: position.timestamp
      })
      setLoading(false)
    }

    const handleError = (error) => {
      setError({
        code: error.code,
        message: error.message
      })
      setLoading(false)
    }

    const watchId = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError,
      options
    )

    return () => {
      navigator.geolocation.clearWatch(watchId)
    }
  }, [enabled])

  const getLocationBasedImages = () => {
    if (!location) return []
    
    // Mock location-based image suggestions
    const locationImages = [
      { id: 'loc1', title: 'Nearby Photo 1', distance: '0.5km' },
      { id: 'loc2', title: 'Nearby Photo 2', distance: '1.2km' },
      { id: 'loc3', title: 'Nearby Photo 3', distance: '2.1km' }
    ]
    
    return locationImages
  }

  return {
    location,
    error,
    loading,
    getLocationBasedImages,
    isSupported: !!navigator.geolocation
  }
}

export default useGeolocation
