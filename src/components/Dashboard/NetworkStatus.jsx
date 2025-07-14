import React from 'react'
import useNetworkInfo from '../../hooks/useNetworkInfo'
import './NetworkStatus.css'

const NetworkStatus = ({ settings, onSettingsChange }) => {
  const networkInfo = useNetworkInfo(settings.simulateNetwork, settings.simulatedSpeed)

  const getStatusColor = () => {
    if (!networkInfo.isOnline) return 'status-offline'
    if (networkInfo.effectiveType === 'slow-2g' || networkInfo.effectiveType === '2g') return 'status-slow'
    return 'status-online'
  }

  const getConnectionIcon = () => {
    if (!networkInfo.isOnline) return '📡'
    switch (networkInfo.effectiveType) {
      case 'slow-2g': return '📶'
      case '2g': return '📶'
      case '3g': return '📶'
      case '4g': return '📶'
      default: return '📶'
    }
  }

  const getSignalStrength = () => {
    switch (networkInfo.effectiveType) {
      case 'slow-2g': return 1
      case '2g': return 2
      case '3g': return 3
      case '4g': return 4
      default: return 4
    }
  }

  return (
    <div className="card network-status">
      <div className="card-header">
        <h3>Network Status</h3>
        <div className="network-simulation">
          <label>
            <input
              type="checkbox"
              checked={settings.simulateNetwork}
              onChange={(e) => onSettingsChange({
                ...settings,
                simulateNetwork: e.target.checked
              })}
            />
            Simulate Network
          </label>
        </div>
      </div>

      <div className="network-info">
        <div className={`status-indicator ${getStatusColor()}`}>
          <span className="status-icon">{getConnectionIcon()}</span>
          <span className="status-text">
            {networkInfo.isOnline ? networkInfo.effectiveType.toUpperCase() : 'Offline'}
          </span>
          <div className="signal-bars">
            {[1, 2, 3, 4].map(bar => (
              <div 
                key={bar}
                className={`signal-bar ${bar <= getSignalStrength() ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>

        <div className="network-details">
          <div className="detail-row">
            <span className="label">Connection Type:</span>
            <span className="value">{networkInfo.effectiveType || 'Unknown'}</span>
          </div>
          <div className="detail-row">
            <span className="label">Downlink Speed:</span>
            <span className="value">{networkInfo.downlink} Mbps</span>
          </div>
          <div className="detail-row">
            <span className="label">Round Trip Time:</span>
            <span className="value">{networkInfo.rtt} ms</span>
          </div>
          <div className="detail-row">
            <span className="label">Data Saver:</span>
            <span className="value">{networkInfo.saveData ? 'Enabled' : 'Disabled'}</span>
          </div>
        </div>

        {settings.simulateNetwork && (
          <div className="simulation-controls">
            <label>Simulated Speed:</label>
            <select
              value={settings.simulatedSpeed}
              onChange={(e) => onSettingsChange({
                ...settings,
                simulatedSpeed: e.target.value
              })}
            >
              <option value="slow-2g">Slow 2G (0.5 Mbps)</option>
              <option value="2g">2G (1 Mbps)</option>
              <option value="3g">3G (3 Mbps)</option>
              <option value="4g">4G (10+ Mbps)</option>
            </select>
            <div className="simulation-note">
              <small>Simulated conditions affect image quality and loading behavior</small>
            </div>
          </div>
        )}
      </div>

      <div className="optimal-quality">
        <span className="label">Recommended Quality:</span>
        <span className={`quality-badge quality-${networkInfo.getOptimalImageQuality()}`}>
          {networkInfo.getOptimalImageQuality().toUpperCase()}
        </span>
      </div>

      <div className="network-stats">
        <div className="stat-item">
          <span className="stat-value">{networkInfo.isOnline ? '✓' : '✗'}</span>
          <span className="stat-label">Online</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{Math.round(networkInfo.downlink * 100) / 100}</span>
          <span className="stat-label">Mbps</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{networkInfo.rtt}</span>
          <span className="stat-label">ms RTT</span>
        </div>
      </div>
    </div>
  )
}

export default NetworkStatus
