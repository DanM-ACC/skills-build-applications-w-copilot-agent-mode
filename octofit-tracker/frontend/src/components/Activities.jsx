import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'
import { CollectionState } from './CollectionState'

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('activities').then(setActivities).catch((requestError) => setError(requestError.message)).finally(() => setLoading(false)) }, [])
  return <section className="page-section"><div className="section-heading"><div><p className="eyebrow">Recent movement</p><h1>Activities</h1></div><span className="section-count">{activities.length} logged</span></div><CollectionState loading={loading} error={error} items={activities} emptyLabel="No activities logged yet." />{activities.length > 0 && <div className="activity-list">{activities.map((activity) => <article className="activity-row" key={activity._id || activity.id}><div className="activity-icon">{activity.type?.slice(0, 1).toUpperCase()}</div><div className="activity-main"><strong>{activity.type}</strong><span>{activity.user?.firstName || activity.user?.username || 'OctoFit member'} · {activity.team?.name || 'Personal'}</span></div><div className="activity-stat"><strong>{activity.durationMinutes} min</strong><span>{activity.distanceKilometers} km</span></div><time>{activity.recordedAt ? new Date(activity.recordedAt).toLocaleDateString() : '—'}</time></article>)}</div>}</section>
}