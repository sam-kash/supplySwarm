import './ActivityLog.css'

function ActivityLog({ logs }) {
  return (
    <div className="activity-log">
      <h2>Activity Log</h2>

      <div className="log-list">
        {logs.length === 0 ? (
          <p className="empty-log">Run an analysis to see agent activity.</p>
        ) : (
          logs.map((log, index) => (
            <div key={`${log.time}-${index}`} className="log-item">
              <span className="log-time">{log.time}</span>
              <p>{log.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ActivityLog
