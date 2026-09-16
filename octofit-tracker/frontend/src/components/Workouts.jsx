import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'
import { CollectionState } from './CollectionState'

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('workouts').then(setWorkouts).catch((requestError) => setError(requestError.message)).finally(() => setLoading(false)) }, [])
  return <section className="page-section"><div className="section-heading"><div><p className="eyebrow">Train with intent</p><h1>Workouts</h1></div><span className="section-count">{workouts.length} plans</span></div><CollectionState loading={loading} error={error} items={workouts} emptyLabel="No workouts available." /><div className="card-grid">{workouts.map((workout) => <article className="info-card workout-card" key={workout._id || workout.id || workout.name}><span className={`difficulty difficulty-${workout.difficulty}`}>{workout.difficulty}</span><h2>{workout.name}</h2><p>{workout.focus} · {workout.durationMinutes} minutes</p><ul>{workout.exercises?.map((exercise) => <li key={exercise}>{exercise}</li>)}</ul></article>)}</div></section>
}