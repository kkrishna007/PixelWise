import { useCallback } from 'react'

const useCanvas = (canvasRef) => {
  const applyFilters = useCallback((imageUrl, filters) => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.crossOrigin = 'anonymous'
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      ctx.filter = `
        brightness(${filters.brightness}%) 
        contrast(${filters.contrast}%) 
        saturate(${filters.saturation}%) 
        blur(${filters.blur}px)
      `
      
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    }

    img.src = imageUrl
  }, [canvasRef])

  const resetCanvas = useCallback(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.filter = 'none'
  }, [canvasRef])

  return { applyFilters, resetCanvas }
}

export default useCanvas
