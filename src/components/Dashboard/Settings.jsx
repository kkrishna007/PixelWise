import React from 'react'
import './Settings.css'

const Settings = ({ settings, onSettingsChange, onReset, onClose }) => {
  const handleQualityChange = (quality) => {
    onSettingsChange({
      ...settings,
      imageQuality: quality
    })
  }

  const handleToggle = (setting) => {
    onSettingsChange({
      ...settings,
      [setting]: !settings[setting]
    })
  }

  const handleNetworkSpeedChange = (speed) => {
    onSettingsChange({
      ...settings,
      simulatedSpeed: speed
    })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content settings-panel" onClick={(e) => e.stopPropagation()}>
        <div className="card-header">
          <h3>Settings</h3>
          <div className="header-actions">
            <button className="btn btn-secondary" onClick={onReset}>
              Reset All
            </button>
            <button className="btn btn-secondary" onClick={onClose}>
              ✕
            </button>
          </div>
        </div>

        <div className="settings-sections">
          <div className="settings-section">
            <h4>Image Quality</h4>
            <div className="quality-options">
              {['auto', 'low', 'medium', 'high'].map(quality => (
                <label key={quality} className="quality-option">
                  <input
                    type="radio"
                    name="imageQuality"
                    value={quality}
                    checked={settings.imageQuality === quality}
                    onChange={() => handleQualityChange(quality)}
                  />
                  <div className="option-content">
                    <span className="quality-label">
                      {quality.charAt(0).toUpperCase() + quality.slice(1)}
                    </span>
                    {quality === 'auto' && (
                      <span className="quality-description">
                        Automatically adapts to network conditions
                      </span>
                    )}
                    {quality === 'low' && (
                      <span className="quality-description">
                        Fast loading, lower file sizes (50-100KB)
                      </span>
                    )}
                    {quality === 'medium' && (
                      <span className="quality-description">
                        Balanced quality and performance (100-200KB)
                      </span>
                    )}
                    {quality === 'high' && (
                      <span className="quality-description">
                        Best quality, larger file sizes (200KB+)
                      </span>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="settings-section">
            <h4>Network Simulation</h4>
            <div className="toggle-options">
              <label className="toggle-option">
                <input
                  type="checkbox"
                  checked={settings.simulateNetwork}
                  onChange={() => handleToggle('simulateNetwork')}
                />
                <div className="toggle-content">
                  <span className="toggle-label">Enable Network Simulation</span>
                  <span className="toggle-description">
                    Test different network conditions for development
                  </span>
                </div>
              </label>

              {settings.simulateNetwork && (
                <div className="network-speed-options">
                  <label>Network Speed:</label>
                  <div className="speed-grid">
                    {[
                      { value: 'slow-2g', label: 'Slow 2G', speed: '0.5 Mbps', description: 'Very slow connection' },
                      { value: '2g', label: '2G', speed: '1 Mbps', description: 'Basic mobile data' },
                      { value: '3g', label: '3G', speed: '3 Mbps', description: 'Standard mobile' },
                      { value: '4g', label: '4G', speed: '10+ Mbps', description: 'Fast connection' }
                    ].map(option => (
                      <label key={option.value} className="speed-option">
                        <input
                          type="radio"
                          name="simulatedSpeed"
                          value={option.value}
                          checked={settings.simulatedSpeed === option.value}
                          onChange={() => handleNetworkSpeedChange(option.value)}
                        />
                        <div className="speed-info">
                          <span className="speed-label">{option.label}</span>
                          <span className="speed-value">{option.speed}</span>
                          <span className="speed-description">{option.description}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="settings-section">
            <h4>Performance Monitoring</h4>
            <div className="toggle-options">
              <label className="toggle-option">
                <input
                  type="checkbox"
                  checked={settings.showPerformanceMetrics}
                  onChange={() => handleToggle('showPerformanceMetrics')}
                />
                <div className="toggle-content">
                  <span className="toggle-label">Show Performance Dashboard</span>
                  <span className="toggle-description">
                    Display real-time performance metrics and analytics
                  </span>
                </div>
              </label>

              <label className="toggle-option">
                <input
                  type="checkbox"
                  checked={settings.enableBackgroundTasks}
                  onChange={() => handleToggle('enableBackgroundTasks')}
                />
                <div className="toggle-content">
                  <span className="toggle-label">Enable Background Processing</span>
                  <span className="toggle-description">
                    Process images and tasks when device is idle
                  </span>
                </div>
              </label>

              <label className="toggle-option">
                <input
                  type="checkbox"
                  checked={settings.showLoadingAnimations}
                  onChange={() => handleToggle('showLoadingAnimations')}
                />
                <div className="toggle-content">
                  <span className="toggle-label">Show Loading Animations</span>
                  <span className="toggle-description">
                    Display custom loading states and transitions
                  </span>
                </div>
              </label>
            </div>
          </div>

          <div className="settings-section">
            <h4>Advanced Features</h4>
            <div className="toggle-options">
              <label className="toggle-option">
                <input
                  type="checkbox"
                  checked={settings.enableGeolocation}
                  onChange={() => handleToggle('enableGeolocation')}
                />
                <div className="toggle-content">
                  <span className="toggle-label">Enable Location Features</span>
                  <span className="toggle-description">
                    Show location-based image suggestions and organization
                  </span>
                </div>
              </label>

              <label className="toggle-option">
                <input
                  type="checkbox"
                  checked={settings.preloadNextBatch}
                  onChange={() => handleToggle('preloadNextBatch')}
                />
                <div className="toggle-content">
                  <span className="toggle-label">Preload Next Images</span>
                  <span className="toggle-description">
                    Load upcoming images in background for smoother experience
                  </span>
                </div>
              </label>

              <label className="toggle-option">
                <input
                  type="checkbox"
                  checked={settings.lazyLoading}
                  onChange={() => handleToggle('lazyLoading')}
                />
                <div className="toggle-content">
                  <span className="toggle-label">Lazy Loading</span>
                  <span className="toggle-description">
                    Load images only when they enter the viewport
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="settings-footer">
          <div className="current-settings">
            <h5>Current Configuration Summary:</h5>
            <div className="config-summary">
              <span className="config-item">
                Quality: {settings.imageQuality}
              </span>
              <span className="config-item">
                Network: {settings.simulateNetwork ? settings.simulatedSpeed : 'Real'}
              </span>
              <span className="config-item">
                Background Tasks: {settings.enableBackgroundTasks ? 'On' : 'Off'}
              </span>
              <span className="config-item">
                Lazy Loading: {settings.lazyLoading ? 'On' : 'Off'}
              </span>
              <span className="config-item">
                Geolocation: {settings.enableGeolocation ? 'On' : 'Off'}
              </span>
            </div>
          </div>
          
          <div className="settings-actions">
            <button className="btn btn-primary" onClick={onClose}>
              Apply Settings
            </button>
            <button className="btn btn-secondary" onClick={onReset}>
              Reset to Defaults
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
