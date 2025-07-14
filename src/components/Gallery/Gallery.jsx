import React, { useState, useEffect } from 'react'
import ImageCard from './ImageCard'
import ImageModal from './ImageModal'
import useBackgroundTasks from '../../hooks/useBackgroundTasks'
import './Gallery.css'

const Gallery = ({ settings, onMetricsUpdate }) => {
  const [images, setImages] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [loadingMetrics, setLoadingMetrics] = useState({
    totalImages: 0,
    loadedImages: 0,
    averageLoadTime: 0,
    totalDataUsed: 0
  })

  const { scheduleTask } = useBackgroundTasks()

  // Generate sample images
  useEffect(() => {
    const generateImages = () => {
      const imageList = Array.from({ length: 50 }, (_, index) => ({
        id: index + 1,
        title: `Photo ${index + 1}`,
        location: `Location ${Math.floor(Math.random() * 10) + 1}`,
        timestamp: new Date(Date.now() - Math.random() * 10000000000).toISOString()
      }))
      setImages(imageList)
      setLoadingMetrics(prev => ({ ...prev, totalImages: imageList.length }))
    }

    generateImages()
  }, [])

  // Background task for preloading
  useEffect(() => {
    if (images.length > 0) {
      scheduleTask(() => {
        // Preload next batch of images
        console.log('Background task: Preloading next batch of images')
      }, 'preload')
    }
  }, [images, scheduleTask])

  const handleImageClick = (imageData) => {
    setSelectedImage(imageData)
    
    // Update metrics
    setLoadingMetrics(prev => {
      const newLoadedCount = prev.loadedImages + 1
      const newAverageLoadTime = prev.averageLoadTime === 0 
        ? imageData.loadTime 
        : (prev.averageLoadTime * prev.loadedImages + imageData.loadTime) / newLoadedCount
      
      const updatedMetrics = {
        ...prev,
        loadedImages: newLoadedCount,
        averageLoadTime: newAverageLoadTime,
        totalDataUsed: prev.totalDataUsed + getImageSize(imageData.quality)
      }
      
      onMetricsUpdate(updatedMetrics)
      return updatedMetrics
    })
  }

  const getImageSize = (quality) => {
    switch (quality) {
      case 'low': return 50 // KB
      case 'medium': return 150
      case 'high': return 300
      default: return 150
    }
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  return (
    <div className="gallery">
      <div className="gallery-grid">
        {images.map((image) => (
          <ImageCard
            key={image.id}
            image={image}
            onImageClick={handleImageClick}
            settings={settings}
          />
        ))}
      </div>
      
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={closeModal}
          settings={settings}
        />
      )}
    </div>
  )
}

export default Gallery
