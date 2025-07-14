import { useState, useEffect } from 'react'
import Gallery from './components/Gallery/Gallery'
import NetworkStatus from './components/Dashboard/NetworkStatus'
import PerformanceMetrics from './components/Dashboard/PerformanceMetrics'
import Settings from './components/Dashboard/Settings'
import Header from './components/Common/Header'
import './styles/global.css'

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [metrics, setMetrics] = useState({
    totalImages: 50,
    loadedImages: 0,
    averageLoadTime: 750,
    totalDataUsed: 0
  })
  
  const [gallerySettings, setGallerySettings] = useState({
    imageQuality: 'auto',
    lazyLoading: true,
    showPerformanceMetrics: true,
    simulateNetwork: false,
    simulatedSpeed: '4g',
    enableBackgroundTasks: true,
    showLoadingAnimations: true,
    enableGeolocation: false,
    preloadNextBatch: true
  })

  const handleMetricsUpdate = (newMetrics) => {
    console.log('Updating metrics:', newMetrics)
    setMetrics(newMetrics)
  }

  const handleSettingsReset = () => {
    setGallerySettings({
      imageQuality: 'auto',
      lazyLoading: true,
      showPerformanceMetrics: true,
      simulateNetwork: false,
      simulatedSpeed: '4g',
      enableBackgroundTasks: true,
      showLoadingAnimations: true,
      enableGeolocation: false,
      preloadNextBatch: true
    })
  }

  // Debug logging
  useEffect(() => {
    console.log('App State:', {
      showPerformanceMetrics: gallerySettings.showPerformanceMetrics,
      metrics,
      isSettingsOpen
    })
  }, [gallerySettings.showPerformanceMetrics, metrics, isSettingsOpen])

  return (
    <div className="app">
      <Header onSettingsClick={() => setIsSettingsOpen(true)} />
      
      <main className="main-content">
        {/* Dashboard */}
        <section className="dashboard">
          <NetworkStatus 
            settings={gallerySettings} 
            onSettingsChange={setGallerySettings}
          />
          {gallerySettings.showPerformanceMetrics && (
            <PerformanceMetrics 
              metrics={metrics}
              settings={gallerySettings}
            />
          )}
        </section>

        {/* Gallery */}
        <section className="gallery-section">
          <Gallery 
            settings={gallerySettings} 
            onMetricsUpdate={handleMetricsUpdate}
          />
        </section>
      </main>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <Settings 
          settings={gallerySettings}
          onSettingsChange={setGallerySettings}
          onReset={handleSettingsReset}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}
    </div>
  )
}

export default App
