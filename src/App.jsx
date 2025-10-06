import { useQueryClient } from '@tanstack/react-query'
import { useLog } from './LogContext'
import QueryComponentA from './QueryComponentA'
import QueryComponentB from './QueryComponentB'

function App() {
  const queryClient = useQueryClient()
  const { logs, addLog, clearLogs } = useLog()

  const refetchBoth = () => {
    addLog('=== Refetching both queries via queryClient.refetchQueries ===')
    queryClient.refetchQueries({ queryKey: ['shared-key'] })
  }

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '1200px', margin: '20px auto', padding: '0 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>React Query Same Key Investigation</h1>
        <button
          onClick={refetchBoth}
          style={{
            padding: '8px 16px',
            fontSize: '14px',
            backgroundColor: '#ff6b6b',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Refetch Both
        </button>
      </div>
      <p style={{ fontSize: '14px', marginTop: '0', marginBottom: '15px' }}>
        Both components use the same query key: <code>['shared-key']</code>
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        <div>
          <QueryComponentA />
          <QueryComponentB />
        </div>

        <div style={{
          border: '2px solid #333',
          padding: '15px',
          backgroundColor: '#f5f5f5',
          borderRadius: '4px',
          height: 'fit-content'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h2 style={{ margin: 0, fontSize: '18px' }}>Logs</h2>
            <button
              onClick={clearLogs}
              style={{
                padding: '4px 8px',
                fontSize: '12px',
                backgroundColor: '#666',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Clear
            </button>
          </div>
          <div style={{
            maxHeight: '500px',
            overflowY: 'auto',
            fontFamily: 'monospace',
            fontSize: '12px'
          }}>
            {logs.length === 0 ? (
              <p style={{ color: '#999', fontSize: '12px' }}>No logs yet...</p>
            ) : (
              logs.map((log, index) => (
                <div key={index} style={{ marginBottom: '4px' }}>
                  <span style={{ color: '#666' }}>[{log.timestamp}]</span> {log.message}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
