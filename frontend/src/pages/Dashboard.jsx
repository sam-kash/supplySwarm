import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import SupplyGraph from '../components/SupplyGraph'
import AgentTimeline from '../components/AgentTimeline'
import ReportPanel from '../components/ReportPanel'
import ActivityLog from '../components/ActivityLog'
import { analyzeSupplyChain } from '../services/api'
import '../App.css'

const agentCount = 5

const initialReport = {
  affectedProducts: 0,
  estimatedLoss: '—',
  recovery: '—',
  confidence: '—',
  recommendation: 'Run an analysis to generate a recommendation',
  recommendedSupplier: '—',
}

const initialSimulation = {
  running: false,
  status: 'idle',
  timeline: { step: 0 },
  report: initialReport,
  graph: { failedNodes: [], activeNodeId: null, disruptedNode: 'Supplier A' },
  logs: [],
  error: null,
  analysis: null,
}

const formatTime = (offset = 0) => {
  const time = new Date(Date.now() + offset * 1000)
  return time.toLocaleTimeString('en-GB', { hour12: false })
}

const getRecommendation = (action = '') => {
  const match = action.match(/to\s+(.+?)\.?$/i)

  return {
    recommendation: action ? 'Switch sourcing to' : 'No recommendation available',
    recommendedSupplier: match?.[1] || '—',
  }
}

const getFinalReport = (analysis) => ({
  affectedProducts: analysis.impact.affectedProducts.length,
  estimatedLoss: '—',
  recovery: `${analysis.impact.estimatedDelayDays} Days`,
  confidence: analysis.recommendation.options[0]
    ? `${analysis.recommendation.options[0].confidence}%`
    : '—',
  ...getRecommendation(analysis.recommendation.action),
})

const getAnalysisLogs = (analysis) => {
  const timeline = analysis.timeline
  const messageFor = (agent, fallback) => timeline.find((step) => step.agent === agent)?.message || fallback

  return [
    { time: formatTime(), message: 'Planner initialized the supplier failure analysis.' },
    { time: formatTime(1), message: messageFor('dependency', 'Dependencies mapped.') },
    { time: formatTime(2), message: messageFor('risk', 'Risk calculated.') },
    { time: formatTime(3), message: messageFor('supplier', 'Supplier analyzed.') },
    { time: formatTime(4), message: messageFor('decision', 'Recovery recommendation generated.') },
  ]
}

const getComponentNodeId = (component) => ({
  Battery: '2',
  Display: '6',
  Chip: '3',
}[component])

const buildPlaybackState = (analysis, step) => {
  const impactedComponents = analysis.impact.affectedComponents || []
  const impactedNodeIds = impactedComponents
    .map((component) => getComponentNodeId(component.component))
    .filter(Boolean)
  const failedNodes = step === 0 ? [] : ['1', ...impactedNodeIds.slice(0, Math.max(0, step - 1))]
  const activeNodeId = step > 0 && step < agentCount ? impactedNodeIds[step - 1] || null : null
  const logs = getAnalysisLogs(analysis).slice(0, step)
  const complete = step >= agentCount

  return {
    running: !complete,
    status: complete ? 'completed' : 'running',
    timeline: { step },
    graph: {
      failedNodes,
      activeNodeId,
      disruptedNode: analysis.event.node,
    },
    logs,
    error: null,
    analysis,
    report: complete ? getFinalReport(analysis) : initialReport,
  }
}

function Dashboard() {
  const [simulation, setSimulation] = useState(initialSimulation)

  useEffect(() => {
    if (!simulation.running || !simulation.analysis) {
      return undefined
    }

    const interval = setInterval(() => {
      setSimulation((currentSimulation) => {
        const nextStep = currentSimulation.timeline.step + 1
        return buildPlaybackState(currentSimulation.analysis, nextStep)
      })
    }, 1400)

    return () => clearInterval(interval)
  }, [simulation.running, simulation.analysis])

  const runAnalysis = async ({ type, node }) => {
    if (simulation.running) {
      return
    }

    setSimulation({
      ...initialSimulation,
      running: true,
      status: 'running',
      graph: { ...initialSimulation.graph, disruptedNode: node },
    })

    try {
      const analysis = await analyzeSupplyChain({ type, node })
      setSimulation({
        ...buildPlaybackState(analysis, 0),
        running: true,
      })
    } catch (error) {
      const message = error.response?.data?.error?.message || error.message || 'Unable to reach the backend.'

      setSimulation({
        ...initialSimulation,
        error: message,
        logs: [{ time: formatTime(), message }],
      })
    }
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
          error={simulation.error}
          onRun={runAnalysis}
        />
      </div>

      <div className="graph">
        <SupplyGraph
          failedNodes={simulation.graph.failedNodes}
          activeNodeId={simulation.graph.activeNodeId}
          disruptedNode={simulation.graph.disruptedNode}
        />
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
