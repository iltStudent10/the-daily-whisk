import type { Recipe } from '../types'
import ItemListItem from './ItemListItem'

interface ItemListProps {
  recipes: Recipe[]
}

function ItemList({ recipes }: ItemListProps) {
  if (recipes.length === 0) {
    return <p className="status">No recipes found for this filter.</p>
  }

  return (
    <ul className="recipe-list">
      {recipes.map((recipe) => (
        <ItemListItem key={recipe.id} recipe={recipe} />
      ))}
    </ul>
  )
}

export default ItemList