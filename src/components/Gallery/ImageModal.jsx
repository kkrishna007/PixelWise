import React, { useRef, useEffect, useState } from 'react'
import useCanvas from '../../hooks/useCanvas'
import './ImageModal.css'

const ImageModal = ({ image, onClose, settings }) => {
  const canvasRef = useRef(null)
  const [editMode, setEditMode] = useState(false)
  const [filters, setFilters] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    blur: 0
  })

  const { applyFilters, resetCanvas } = useCanvas(canvasRef)

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value }
    setFilters(newFilters)
    applyFilters(image.url, newFilters)
  }

  const handleReset = () => {
    setFilters({
      brightness: 100,
      contrast: 100,
      saturation: 100,
      blur: 0
    })
    resetCanvas()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content image-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{image.title}</h2>
          <div className="modal-controls">
            <button 
              className={`btn ${editMode ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? 'View' : 'Edit'}
            </button>
            <button className="btn btn-secondary" onClick={onClose}>
              ✕
            </button>
          </div>
        </div>

        <div className="modal-body">
          <div className="image-container">
            {editMode ? (
              <canvas
                ref={canvasRef}
                className="edit-canvas"
                width={800}
                height={600}
              />
            ) : (
              <img
                src={image.url}
                alt={image.title}
                className="modal-image"
              />
            )}
          </div>

          {editMode && (
            <div className="edit-controls">
              <div className="filter-group">
                <label>Brightness: {filters.brightness}%</label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={filters.brightness}
                  onChange={(e) => handleFilterChange('brightness', e.target.value)}
                />
              </div>
              <div className="filter-group">
                <label>Contrast: {filters.contrast}%</label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={filters.contrast}
                  onChange={(e) => handleFilterChange('contrast', e.target.value)}
                />
              </div>
              <div className="filter-group">
                <label>Saturation: {filters.saturation}%</label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={filters.saturation}
                  onChange={(e) => handleFilterChange('saturation', e.target.value)}
                />
              </div>
              <div className="filter-group">
                <label>Blur: {filters.blur}px</label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={filters.blur}
                  onChange={(e) => handleFilterChange('blur', e.target.value)}
                />
              </div>
              <button className="btn btn-secondary" onClick={handleReset}>
                Reset
              </button>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <div className="image-details">
            <span className="detail-item">Quality: {image.quality}</span>
            <span className="detail-item">Load Time: {image.loadTime}ms</span>
            <span className="detail-item">Location: {image.location}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageModal
