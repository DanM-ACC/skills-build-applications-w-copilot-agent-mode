import { NavLink, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

function App() { return <Routes><Route element={<Shell />}><Route path="/" element={<Overview />} /><Route path="/users" element={<Users />} /><Route path="/teams" element={<Teams />} /><Route path="/activities" element={<Activities />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/workouts" element={<Workouts />} /></Route></Routes> }

function Shell() {
  const location = useLocation()
  const currentView = location.pathname === '/' ? 'Overview' : location.pathname.slice(1)
  const navigation = [['/', 'Overview'], ['/activities', 'Activities'], ['/leaderboard', 'Leaderboard'], ['/workouts', 'Workouts'], ['/teams', 'Teams'], ['/users', 'Users']]
  return <div className="app-shell"><aside className="sidebar"><div className="brand"><span className="brand-mark">O</span><span>OctoFit <small>TRACKER</small></span></div><p className="sidebar-label">Workspace</p><nav>{navigation.map(([path, label]) => <NavLink end={path === '/'} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} key={path} to={path}><span className="nav-dot" />{label}</NavLink>)}</nav><div className="sidebar-footer"><span className="status-dot" /> API connected</div></aside><main className="main-content"><header className="topbar"><div><p className="topbar-kicker">OctoFit command center</p><strong>{currentView}</strong></div><div className="profile-chip"><span>DR</span><div><strong>Demo runner</strong><small>Personal workspace</small></div></div></header><div className="content-wrap"><Outlet /></div></main></div>
}

function Overview() { return <section className="overview"><div className="overview-hero"><p className="eyebrow">Wednesday, September 16</p><h1>Make today<br /><em>count.</em></h1><p className="hero-copy">Track the work, celebrate the wins, and keep your momentum visible.</p><NavLink className="primary-action" to="/activities">View activity <span>→</span></NavLink></div><div className="overview-grid"><NavLink className="overview-tile tile-activity" to="/activities"><span className="tile-number">03</span><span className="tile-label">Recent activities</span><span className="tile-arrow">↗</span></NavLink><NavLink className="overview-tile tile-leaderboard" to="/leaderboard"><span className="tile-number">#01</span><span className="tile-label">Current rank</span><span className="tile-arrow">↗</span></NavLink><NavLink className="overview-tile tile-workout" to="/workouts"><span className="tile-number">25</span><span className="tile-label">Min to your next workout</span><span className="tile-arrow">↗</span></NavLink></div></section> }

export default App
