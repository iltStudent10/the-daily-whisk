import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="card">
      <h2>Page not found</h2>
      <p>The page you requested does not exist.</p>
      <Link to="/" className="back-link">
        Go back home
      </Link>
    </section>
  )
}

export default NotFoundPage