import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'
import { CollectionState } from './CollectionState'

const endpoint = '/api/teams/'

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection(endpoint).then(setTeams).catch((requestError) => setError(requestError.message)).finally(() => setLoading(false)) }, [])
  return <section className="page-section"><div className="section-heading"><div><p className="eyebrow">Together is stronger</p><h1>Teams</h1></div><span className="section-count">{teams.length} teams</span></div><CollectionState loading={loading} error={error} items={teams} emptyLabel="No teams found." /><div className="card-grid">{teams.map((team) => <article className="info-card" key={team._id || team.id || team.name}><div className="card-mark">{team.name?.slice(0, 1).toUpperCase()}</div><h2>{team.name}</h2><p>{team.description}</p><div className="card-meta"><span>{team.members?.length || 0} members</span><span>Active team</span></div></article>)}</div></section>
}