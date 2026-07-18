import AgentCard from './AgentCard'
import './AgentTimeline.css'

const agents = [
  { name: 'Planner', description: 'Breaking the request into tasks...' },
  { name: 'Dependency Mapper', description: 'Traversing the supply graph...' },
  { name: 'Risk Analyzer', description: 'Calculating business impact...' },
  { name: 'Supplier Finder', description: 'Searching alternative suppliers...' },
  { name: 'Decision Agent', description: 'Generating recovery strategy...' },
]

function AgentTimeline({ simulationStep }) {
  return (
    <div className="timeline-container">
      <h2>AI Agent Activity</h2>

      <div className="timeline-list">
        {agents.map((agent, index) => {
          const status =
            simulationStep > index
              ? 'completed'
              : simulationStep === index
                ? 'running'
                : 'pending'

          return (
            <AgentCard
              key={agent.name}
              name={agent.name}
              description={status === 'pending' ? 'Waiting...' : agent.description}
              status={status}
              progress={status === 'completed' ? 100 : status === 'running' ? 70 : 0}
            />
          )
        })}
      </div>
    </div>
  )
}

export default AgentTimeline
