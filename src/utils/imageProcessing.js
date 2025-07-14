export const compressImage = (imageUrl, quality = 0.8) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.crossOrigin = 'anonymous'
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      
      ctx.drawImage(img, 0, 0)
      
      const compressedDataUrl = canvas.toDataURL('image/jpeg', quality)
      resolve(compressedDataUrl)
    }

    img.src = imageUrl
  })
}

export const generateLQIP = (imageUrl, blur = 1) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const scale = 0.1 // Very small size for LQIP
      canvas.width = img.width * scale
      canvas.height = img.height * scale
      
      ctx.filter = `blur(${blur}px)`
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      
      const lqipDataUrl = canvas.toDataURL('image/jpeg', 0.3)
      resolve(lqipDataUrl)
    }

    img.src = imageUrl
  })
}

export const getImageDimensions = (imageUrl) => {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
        aspectRatio: img.width / img.height
      })
    }
    img.src = imageUrl
  })
}

export const calculateOptimalSize = (originalWidth, originalHeight, maxWidth, maxHeight) => {
  const aspectRatio = originalWidth / originalHeight
  
  let width = originalWidth
  let height = originalHeight
  
  if (width > maxWidth) {
    width = maxWidth
    height = width / aspectRatio
  }
  
  if (height > maxHeight) {
    height = maxHeight
    width = height * aspectRatio
  }
  
  return { width: Math.round(width), height: Math.round(height) }
}
