import { Activity } from 'lucide-react'
import './Header.css'

function Header({ connected = false }) {
  return (
    <div className="header-content">
      <div className="header-left">
        <h1>SwarmChain</h1>
        <p>AI Operations Intelligence Assistant</p>
      </div>

      <div className="header-right">
        <div className={`status-badge ${connected ? 'is-connected' : 'is-offline'}`}>
          <Activity size={16} aria-hidden="true" />
          <span>{connected ? 'System Online' : 'Backend Offline'}</span>
        </div>

        <small>Local Demo Mode</small>
      </div>
    </div>
  )
}

export default Header
