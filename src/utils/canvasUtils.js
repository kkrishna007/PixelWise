export const createGradientBackground = (ctx, width, height, colors = ['#f3f4f6', '#e5e7eb']) => {
  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, colors[0])
  gradient.addColorStop(1, colors[1])
  
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)
}

export const drawLoadingIndicator = (ctx, x, y, progress = 0) => {
  const radius = 20
  const lineWidth = 3
  
  // Background circle
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, 2 * Math.PI)
  ctx.strokeStyle = '#e5e7eb'
  ctx.lineWidth = lineWidth
  ctx.stroke()
  
  // Progress arc
  ctx.beginPath()
  ctx.arc(x, y, radius, -Math.PI / 2, (-Math.PI / 2) + (2 * Math.PI * progress))
  ctx.strokeStyle = '#6366f1'
  ctx.lineWidth = lineWidth
  ctx.stroke()
}

export const applyImageFilters = (ctx, filters) => {
  const filterString = Object.entries(filters)
    .map(([key, value]) => {
      switch (key) {
        case 'brightness':
          return `brightness(${value}%)`
        case 'contrast':
          return `contrast(${value}%)`
        case 'saturation':
          return `saturate(${value}%)`
        case 'blur':
          return `blur(${value}px)`
        case 'hue':
          return `hue-rotate(${value}deg)`
        case 'sepia':
          return `sepia(${value}%)`
        case 'grayscale':
          return `grayscale(${value}%)`
        default:
          return ''
      }
    })
    .filter(Boolean)
    .join(' ')
  
  ctx.filter = filterString
}

export const resizeCanvas = (canvas, newWidth, newHeight) => {
  const imageData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height)
  
  canvas.width = newWidth
  canvas.height = newHeight
  
  const ctx = canvas.getContext('2d')
  ctx.putImageData(imageData, 0, 0)
}

export const downloadCanvasAsImage = (canvas, filename = 'image.png') => {
  const link = document.createElement('a')
  link.download = filename
  link.href = canvas.toDataURL()
  link.click()
}
