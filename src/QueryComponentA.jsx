import { useQuery } from '@tanstack/react-query'
import { useLog } from './LogContext'

export default function QueryComponentA() {
  const { addLog } = useLog()

  const fetchDataA = async () => {
    addLog('QueryComponentA: fetchDataA() executing')
    await new Promise(resolve => setTimeout(resolve, 1000))
    const result = { source: 'Component A', value: Math.random(), timestamp: new Date().toISOString() }
    addLog(`QueryComponentA: fetchDataA() completed with value ${result.value.toFixed(4)}`)
    return result
  }

  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ['shared-key'],
    queryFn: fetchDataA,
  })

  const handleRefetch = () => {
    addLog('QueryComponentA: refetch() called')
    refetch()
  }

  return (
    <div style={{ border: '2px solid blue', padding: '12px', marginBottom: '10px', borderRadius: '4px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <h3 style={{ margin: 0, fontSize: '16px' }}>Component A {isFetching && '(Fetching...)'}</h3>
        <button onClick={handleRefetch} style={{ padding: '4px 8px', fontSize: '12px' }} disabled={isFetching}>
          Refetch
        </button>
      </div>
      <div style={{ fontSize: '13px' }}>
        <p style={{ margin: '4px 0' }}><strong>Status:</strong> {isLoading ? 'Loading' : isFetching ? 'Fetching' : 'Idle'}</p>
        {error && <p style={{ margin: '4px 0' }}>Error: {error.message}</p>}
        {data && (
          <>
            <p style={{ margin: '4px 0' }}><strong>Source:</strong> {data.source}</p>
            <p style={{ margin: '4px 0' }}><strong>Value:</strong> {data.value.toFixed(4)}</p>
          </>
        )}
      </div>
    </div>
  )
}
