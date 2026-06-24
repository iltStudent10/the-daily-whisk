import Card from '../components/Card'
import ErrorState from '../components/ErrorState'
import ItemList from '../components/ItemList'
import LoadingState from '../components/LoadingState'
import { useAppContext } from '../contexts/AppContext'

function HomePage() {
  const { filteredRecipes, filter, setFilter, loading, error } = useAppContext()

  if (loading) {
    return <LoadingState />
  }

  if (error) {
    return <ErrorState message={error} />
  }

  return (
    <Card title="Recipe Browser">
      <div className="filter-row">
        <label htmlFor="categoryFilter">Filter by category</label>
        <select
          id="categoryFilter"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        >
          <option value="all">All</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="dessert">Dessert</option>
          <option value="snack">Snack</option>
        </select>
      </div>

      <ItemList recipes={filteredRecipes} />
    </Card>
  )
}

export default HomePage