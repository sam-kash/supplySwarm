import { useState } from 'react'
import { AlertTriangle, Database, Factory, LoaderCircle, Play } from 'lucide-react'
import './Sidebar.css'

const suppliers = ['Supplier A', 'Supplier B', 'Supplier C']

function Sidebar({ onRun, running, simulationStatus, error }) {
  const [supplier, setSupplier] = useState(suppliers[0])
  return (
    <div className="sidebar-container">
      <h2>Simulation Control</h2>

      <div className="input-group">
        <label htmlFor="dataset">
          <Database size={16} aria-hidden="true" />
          Dataset
        </label>

        <select id="dataset" defaultValue="Demo Dataset">
          <option>Demo Dataset</option>
        </select>
      </div>

      <div className="input-group">
        <label htmlFor="failure-type">
          <AlertTriangle size={16} aria-hidden="true" />
          Failure Type
        </label>

        <select id="failure-type" defaultValue="Supplier Failure">
          <option>Supplier Failure</option>
        </select>
      </div>

      <div className="input-group">
        <label htmlFor="supplier">
          <Factory size={16} aria-hidden="true" />
          Supplier
        </label>

        <select id="supplier" value={supplier} onChange={(event) => setSupplier(event.target.value)}>
          {suppliers.map((supplier) => (
            <option key={supplier}>{supplier}</option>
          ))}
        </select>
      </div>

      <div className="simulation-status">
        <span>Simulation Status</span>
        <strong className={simulationStatus}>
          <i aria-hidden="true" />
          {simulationStatus === 'running'
            ? 'Running'
            : simulationStatus === 'completed'
              ? 'Completed'
              : 'Idle'}
        </strong>
      </div>

      {error && <p className="analysis-error" role="alert">{error}</p>}

      <button
        className="run-btn"
        type="button"
        onClick={() => onRun({ type: 'supplier_failure', node: supplier })}
        disabled={running}
      >
        {running ? (
          <LoaderCircle size={18} className="spin" aria-hidden="true" />
        ) : (
          <Play size={18} aria-hidden="true" />
        )}
        {running ? 'Running Analysis...' : 'Run AI Analysis'}
      </button>
    </div>
  )
}

export default Sidebar
