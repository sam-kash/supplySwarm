import StatusCard from './StatusCard'
import './ReportPanel.css'

const defaultReport = {
  affectedProducts: 2,
  estimatedLoss: '₹8 Cr',
  recovery: '3 Days',
  confidence: '92%',
  recommendation: 'Switch sourcing to',
  recommendedSupplier: 'Supplier B',
}

function ReportPanel({ report = defaultReport }) {
  return (
    <div className="report-container">
      <h2>Analysis Report</h2>

      <div className="metrics">
        <StatusCard
          title="Affected Products"
          value={report.affectedProducts}
          color="#3b82f6"
        />
        <StatusCard
          title="Estimated Loss"
          value={report.estimatedLoss}
          color="#ef4444"
        />
        <StatusCard
          title="Recovery"
          value={report.recovery}
          color="#22c55e"
        />
        <StatusCard
          title="Confidence"
          value={report.confidence}
          color="#f59e0b"
        />
      </div>

      <div className="recommendation">
        <h3>Recommendation</h3>
        <p>
          {report.recommendation}
          <strong>{report.recommendedSupplier}</strong>
        </p>
        <span>Confidence: High</span>
      </div>
    </div>
  )
}

export default ReportPanel
