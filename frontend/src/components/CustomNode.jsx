import { Factory } from 'lucide-react'
import { Handle, Position } from '@xyflow/react'
import './CustomNode.css'

function CustomNode({ data }) {
  return (
    <div className={`custom-node ${data.status}`}>
      <Handle type="target" position={Position.Top} />
      <Factory size={18} aria-hidden="true" />

      <div>
        <h4>{data.label}</h4>
        <small>{data.subtitle}</small>
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}

export default CustomNode
