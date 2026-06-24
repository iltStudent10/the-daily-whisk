import { Link } from 'react-router-dom'
import type { Recipe } from '../types'

interface ItemListItemProps {
  recipe: Recipe
}

function ItemListItem({ recipe }: ItemListItemProps) {
  return (
    <li className="recipe-item">
      <Link to={`/items/${recipe.id}`}>
        {recipe.imageUrl ? (
          <img src={recipe.imageUrl} alt={recipe.title} className="recipe-item-media" />
        ) : (
          <div aria-hidden="true" className="recipe-item-media recipe-item-media-fallback">
            🍽️
          </div>
        )}
        <div className="recipe-item-body">
          <h3>{recipe.title}</h3>
          <p>{recipe.summary}</p>
          <span className="chip">{recipe.category}</span>
        </div>
      </Link>
    </li>
  )
}

export default ItemListItem