import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import SupplyGraph from '../components/SupplyGraph'
import AgentTimeline from '../components/AgentTimeline'
import ReportPanel from '../components/ReportPanel'
import ActivityLog from '../components/ActivityLog'
import '../App.css'

const mockLogs = [
  { time: '14:21:03', message: 'Planner received supplier failure request.' },
  { time: '14:21:04', message: 'Dependency Mapper identified two affected products.' },
  { time: '14:21:05', message: 'Risk Analyzer estimated ₹8 Cr business impact.' },
  { time: '14:21:06', message: 'Supplier Finder selected Supplier B.' },
  { time: '14:21:07', message: 'Decision Agent generated recovery strategy.' },
]

const initialReport = {
  affectedProducts: 2,
  estimatedLoss: '₹8 Cr',
  recovery: '3 Days',
  confidence: '92%',
  recommendation: 'Switch sourcing to',
  recommendedSupplier: 'Supplier B',
}

const initialSimulation = {
  running: false,
  status: 'idle',
  timeline: { step: 0 },
  report: initialReport,
  graph: { failedNodes: [] },
  logs: mockLogs,
}

function Dashboard() {
  const [simulation, setSimulation] = useState(initialSimulation)

  useEffect(() => {
    if (!simulation.running) {
      return undefined
    }

    const interval = setInterval(() => {
      setSimulation((currentSimulation) => {
        const nextStep = currentSimulation.timeline.step + 1
        const isComplete = nextStep >= mockLogs.length

        return {
          ...currentSimulation,
          running: !isComplete,
          status: isComplete ? 'completed' : 'running',
          timeline: { step: nextStep },
          graph: {
            failedNodes: Array.from(
              { length: Math.min(nextStep, 3) },
              (_, index) => String(index + 1),
            ),
          },
          logs: mockLogs.slice(0, nextStep),
          report: isComplete ? initialReport : currentSimulation.report,
        }
      })
    }, 1800)

    return () => clearInterval(interval)
  }, [simulation.running])

  const runAnalysis = () => {
    if (simulation.running) {
      return
    }

    setSimulation({
      ...initialSimulation,
      running: true,
      status: 'running',
      logs: [],
      report: {
        ...initialReport,
        confidence: 'Calculating...',
        recommendation: 'Generating recommendation',
        recommendedSupplier: 'Analyzing...',
      },
    })
  }

  return (
    <div className="dashboard">
      <div className="header">
        <Header connected={true} />
      </div>

      <div className="sidebar">
        <Sidebar
          running={simulation.running}
          simulationStatus={simulation.status}
          onRun={runAnalysis}
        />
      </div>

      <div className="graph">
        <SupplyGraph failedNodes={simulation.graph.failedNodes} />
      </div>

      <div className="timeline">
        <div className="bottom-section">
          <AgentTimeline simulationStep={simulation.timeline.step} />
          <ActivityLog logs={simulation.logs} />
        </div>
      </div>

      <div className="report">
        <ReportPanel report={simulation.report} />
      </div>
    </div>
  )
}

export default Dashboard
