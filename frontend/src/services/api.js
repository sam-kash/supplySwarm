import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function analyzeSupplyChain({ type, node }) {
  const response = await apiClient.post('/analyze', { type, node })

  if (!response.data.success) {
    throw new Error(response.data.error?.message || 'Analysis failed.')
  }

  return response.data
}
