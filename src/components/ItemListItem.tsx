import { Link } from 'react-router-dom'
import type { Recipe } from '../types'

interface ItemListItemProps {
  recipe: Recipe
}

function ItemListItem({ recipe }: ItemListItemProps) {
  return (
    <li className="recipe-item">
      <Link to={`/items/${recipe.id}`}>
        <h3>{recipe.title}</h3>
        <p>{recipe.summary}</p>
        <span className="chip">{recipe.category}</span>
      </Link>
    </li>
  )
}

export default ItemListItem