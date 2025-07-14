import React, { useState, useEffect, useRef } from 'react'
import useIntersectionObserver from '../../hooks/useIntersectionObserver'
import useNetworkInfo from '../../hooks/useNetworkInfo'
import './ImageCard.css'

const ImageCard = ({ image, onImageClick, settings }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)
  const [loadStartTime, setLoadStartTime] = useState(null)
  const [loadTime, setLoadTime] = useState(null)
  const canvasRef = useRef(null)
  
  const { ref, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px'
  })
  
  const networkInfo = useNetworkInfo(
    settings.simulateNetwork,
    settings.simulatedSpeed
  )

  // Get appropriate image URL based on network conditions
  const getImageUrl = () => {
    if (!settings.imageQuality || settings.imageQuality === 'auto') {
      const quality = networkInfo.getOptimalImageQuality()
      return getUrlForQuality(quality)
    }
    return getUrlForQuality(settings.imageQuality)
  }

  const getUrlForQuality = (quality) => {
    const baseUrl = `https://picsum.photos/id/${image.id}`
    switch (quality) {
      case 'low':
        return `${baseUrl}/400/300?blur=1`
      case 'medium':
        return `${baseUrl}/600/400`
      case 'high':
        return `${baseUrl}/800/600`
      default:
        return `${baseUrl}/600/400`
    }
  }

  // Generate canvas placeholder
  useEffect(() => {
    if (hasIntersected && !isLoaded && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      
      // Create a simple geometric placeholder
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, '#f3f4f6')
      gradient.addColorStop(1, '#e5e7eb')
      
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Add loading indicator
      ctx.fillStyle = '#6366f1'
      ctx.font = '14px system-ui'
      ctx.textAlign = 'center'
      ctx.fillText('Loading...', canvas.width / 2, canvas.height / 2)
    }
  }, [hasIntersected, isLoaded])

  // Handle image loading
  useEffect(() => {
    if (hasIntersected && !isLoaded && !isError) {
      const img = new Image()
      const imageUrl = getImageUrl()
      
      setLoadStartTime(Date.now())
      
      img.onload = () => {
        setIsLoaded(true)
        setLoadTime(Date.now() - loadStartTime)
      }
      
      img.onerror = () => {
        setIsError(true)
      }
      
      // Add artificial delay based on network speed
      const delay = networkInfo.getLoadingDelay()
      setTimeout(() => {
        img.src = imageUrl
      }, delay)
    }
  }, [hasIntersected, networkInfo, settings])

  const handleImageClick = () => {
    onImageClick({
      ...image,
      url: getImageUrl(),
      loadTime,
      quality: settings.imageQuality === 'auto' ? networkInfo.getOptimalImageQuality() : settings.imageQuality
    })
  }

  return (
    <div 
      ref={ref}
      className={`image-card ${isLoaded ? 'loaded' : ''}`}
      onClick={handleImageClick}
    >
      {hasIntersected && !isLoaded && !isError && (
        <canvas 
          ref={canvasRef}
          className="image-placeholder"
          width={300}
          height={200}
        />
      )}
      
      {isLoaded && (
        <img 
          src={getImageUrl()}
          alt={image.title}
          className="image"
          loading="lazy"
        />
      )}
      
      {isError && (
        <div className="image-error">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7,10 12,15 17,10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          <p>Failed to load</p>
        </div>
      )}
      
      <div className="image-info">
        <h3>{image.title}</h3>
        <div className="image-meta">
          <span className="image-quality">
            {settings.imageQuality === 'auto' ? networkInfo.getOptimalImageQuality() : settings.imageQuality}
          </span>
          {loadTime && (
            <span className="load-time">{loadTime}ms</span>
          )}
        </div>
      </div>
      
      {!hasIntersected && (
        <div className="image-skeleton">
          <div className="skeleton-content"></div>
        </div>
      )}
    </div>
  )
}

export default ImageCard