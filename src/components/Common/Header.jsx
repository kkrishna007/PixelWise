import React from 'react'
import './Header.css'

const Header = ({ onSettingsClick }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-brand">
          <h1 className="header-title">PixelWise</h1>
          <p className="header-subtitle">Smart Photo Gallery with Adaptive Performance</p>
        </div>
        <div className="header-actions">
          <button 
            className="btn btn-primary"
            onClick={onSettingsClick}
          >
            ⚙️<span className="btn-text">Settings</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
