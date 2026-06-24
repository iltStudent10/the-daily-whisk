import { NavLink } from 'react-router-dom'

function NavBar() {
  return (
    <nav aria-label="Main navigation" className="navbar">
      <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
        Home
      </NavLink>
      <NavLink to="/add" className={({ isActive }) => (isActive ? 'active' : '')}>
        Add Recipe
      </NavLink>
    </nav>
  )
}

export default NavBar