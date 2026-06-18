import React, { useEffect, useState } from 'react'

export default function App() {
  const [status, setStatus] = useState<string>('unknown')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // initial health check
    fetchHealth()
  }, [])

  async function fetchHealth() {
    setLoading(true)
    try {
      const res = await fetch('http://localhost:8000/health')
      const json = await res.json()
      setStatus(json.status ?? 'unknown')
    } catch (err) {
      setStatus('unreachable')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif', padding: 24}}>
      <h1>OctoFit Tracker</h1>
      <p>Backend health: {loading ? 'checking...' : status}</p>
      <button onClick={fetchHealth} disabled={loading}>Refresh</button>
      <hr />
      <p>Frontend dev server: 5173</p>
      <p>Backend server: 8000</p>
      <p>MongoDB default port: 27017</p>
    </div>
  )
}
