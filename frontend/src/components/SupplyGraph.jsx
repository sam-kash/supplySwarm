import { Background, Controls, ReactFlow } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import CustomNode from './CustomNode'
import './SupplyGraph.css'

const nodeTypes = {
  custom: CustomNode,
}

const baseNodes = [
  {
    id: '1',
    type: 'custom',
    position: { x: 0, y: 20 },
    data: { label: 'Supplier A', subtitle: 'Supplier', status: 'normal' },
  },
  {
    id: '2',
    type: 'custom',
    position: { x: -130, y: 140 },
    data: { label: 'Battery Factory', subtitle: 'Manufacturer', status: 'normal' },
  },
  {
    id: '6',
    type: 'custom',
    position: { x: 130, y: 140 },
    data: { label: 'Display Supplier', subtitle: 'Component supplier', status: 'normal' },
  },
  {
    id: '3',
    type: 'custom',
    position: { x: 0, y: 280 },
    data: { label: 'Assembly Plant', subtitle: 'Production', status: 'normal' },
  },
  {
    id: '4',
    type: 'custom',
    position: { x: 0, y: 400 },
    data: { label: 'Warehouse', subtitle: 'Storage', status: 'normal' },
  },
  {
    id: '5',
    type: 'custom',
    position: { x: 0, y: 520 },
    data: { label: 'Retail', subtitle: 'Customer', status: 'normal' },
  },
]

const edges = [
  { id: '1-2', source: '1', target: '2', animated: true },
  { id: '1-6', source: '1', target: '6', animated: true },
  { id: '2-3', source: '2', target: '3', animated: true },
  { id: '6-3', source: '6', target: '3', animated: true },
  { id: '3-4', source: '3', target: '4', animated: true },
  { id: '4-5', source: '4', target: '5', animated: true },
]

function SupplyGraph({ failedNodes }) {
  const nodes = baseNodes.map((node, index) => ({
    ...node,
    data: {
      ...node.data,
      status: failedNodes.includes(node.id)
        ? 'failed'
        : failedNodes.length > 0 && failedNodes.length === index
          ? 'active'
          : 'normal',
    },
  }))

  return (
    <div className="supply-graph-container">
      <div className="graph-heading">
        <h2>Supply Chain Graph</h2>
        <span>Live network view</span>
      </div>

      <div className="react-flow-wrapper">
        <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView>
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  )
}

export default SupplyGraph
