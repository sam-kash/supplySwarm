import { CheckCircle2, Circle, LoaderCircle } from 'lucide-react'
import './AgentCard.css'

function AgentCard({ name, description, status, progress }) {
  const getIcon = () => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 size={20} color="#22c55e" aria-hidden="true" />
      case 'running':
        return <LoaderCircle size={20} color="#f59e0b" className="spin" aria-hidden="true" />
      default:
        return <Circle size={20} color="#64748b" aria-hidden="true" />
    }
  }

  return (
    <div className={`agent-card ${status}`}>
      <div className="agent-header">
        {getIcon()}
        <h4>{name}</h4>
      </div>

      <p>{description}</p>

      {status === 'running' && (
        <div className="progress" aria-label={`${progress}% complete`}>
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      )}
    </div>
  )
}

export default AgentCard
