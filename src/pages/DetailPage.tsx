import { Link, useParams } from 'react-router-dom'
import Card from '../components/Card'
import ErrorState from '../components/ErrorState'
import LoadingState from '../components/LoadingState'
import { useAppContext } from '../contexts/AppContext'

function DetailPage() {
  const { id } = useParams()
  const { recipes, loading, error } = useAppContext()

  if (loading) {
    return <LoadingState />
  }

  if (error) {
    return <ErrorState message={error} />
  }

  const recipe = recipes.find((item) => item.id === id)

  if (!recipe) {
    return <ErrorState message="Recipe not found for this URL." />
  }

  return (
    <Card title={recipe.title}>
      <p>{recipe.summary}</p>
      {recipe.imageUrl ? (
        <img src={recipe.imageUrl} alt={recipe.title} className="detail-image" />
      ) : null}
      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((ingredient) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>
      <h3>Instructions</h3>
      <p>{recipe.instructions}</p>
      <p className="meta">Category: {recipe.category}</p>
      <Link to="/" className="back-link">
        Back to recipes
      </Link>
    </Card>
  )
}

export default DetailPage