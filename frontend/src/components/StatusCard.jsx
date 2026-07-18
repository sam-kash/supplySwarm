import './StatusCard.css'

function StatusCard({ title, value, color }) {
  return (
    <div className="status-card">
      <span className="status-title">{title}</span>
      <h2 className="status-value" style={{ color }}>
        {value}
      </h2>
    </div>
  )
}

export default StatusCard
