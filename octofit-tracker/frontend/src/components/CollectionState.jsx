export function CollectionState({ loading, error, items, emptyLabel }) {
  if (loading) return <div className="collection-state">Loading tracker data...</div>
  if (error) return <div className="collection-state collection-state-error">{error}</div>
  if (items.length === 0) return <div className="collection-state">{emptyLabel}</div>
  return null
}