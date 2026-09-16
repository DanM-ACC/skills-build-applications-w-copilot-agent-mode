import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'
import { CollectionState } from './CollectionState'

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => { fetchCollection('users').then(setUsers).catch((requestError) => setError(requestError.message)).finally(() => setLoading(false)) }, [])

  return <section className="page-section"><div className="section-heading"><div><p className="eyebrow">Community</p><h1>Users</h1></div><span className="section-count">{users.length} members</span></div><CollectionState loading={loading} error={error} items={users} emptyLabel="No users found." />{users.length > 0 && <div className="data-table-wrap"><table className="data-table"><thead><tr><th>Name</th><th>Username</th><th>Email</th><th>Joined</th></tr></thead><tbody>{users.map((user) => <tr key={user._id || user.id || user.username}><td><strong>{user.firstName} {user.lastName}</strong></td><td className="muted">@{user.username}</td><td>{user.email}</td><td>{user.joinedAt ? new Date(user.joinedAt).toLocaleDateString() : '—'}</td></tr>)}</tbody></table></div>}</section>
}