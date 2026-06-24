import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import ItemForm from '../components/ItemForm'
import { useAppContext } from '../contexts/AppContext'
import type { NewRecipeInput } from '../types'

function FormPage() {
  const { addRecipe } = useAppContext()
  const navigate = useNavigate()

  function handleCreateRecipe(values: NewRecipeInput) {
    const recipe = addRecipe(values)
    navigate(`/items/${recipe.id}`)
  }

  return (
    <Card title="Add Recipe">
      <ItemForm onSubmit={handleCreateRecipe} />
    </Card>
  )
}

export default FormPage