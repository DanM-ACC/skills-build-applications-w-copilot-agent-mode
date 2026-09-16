import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'
import { CollectionState } from './CollectionState'

const endpoint = '/api/leaderboard/'

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection(endpoint).then(setLeaders).catch((requestError) => setError(requestError.message)).finally(() => setLoading(false)) }, [])
  return <section className="page-section"><div className="section-heading"><div><p className="eyebrow">The weekly climb</p><h1>Leaderboard</h1></div><span className="section-count">{leaders.length} ranked</span></div><CollectionState loading={loading} error={error} items={leaders} emptyLabel="No leaderboard entries yet." />{leaders.length > 0 && <div className="leaderboard-list">{leaders.map((entry, index) => <article className={`leaderboard-row ${index === 0 ? 'leaderboard-row-top' : ''}`} key={entry._id || entry.id || entry.rank}><span className="rank">{entry.rank || index + 1}</span><div className="leader-name"><strong>{entry.user?.firstName ? `${entry.user.firstName} ${entry.user.lastName}` : entry.user?.username || 'Athlete'}</strong><span>{entry.team?.name || 'Independent'}</span></div><strong className="points">{entry.points} <small>pts</small></strong></article>)}</div>}</section>
}