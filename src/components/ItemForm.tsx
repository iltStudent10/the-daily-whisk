import { useState } from 'react'
import type { NewRecipeInput, RecipeFormValues } from '../types'
import { validateRecipeForm } from '../utils/validation'

interface ItemFormProps {
  onSubmit: (value: NewRecipeInput) => void
}

const initialFormValues: RecipeFormValues = {
  title: '',
  summary: '',
  category: '',
  imageUrl: '',
  ingredients: '',
  instructions: '',
}

function ItemForm({ onSubmit }: ItemFormProps) {
  const [values, setValues] = useState<RecipeFormValues>(initialFormValues)
  const [errors, setErrors] = useState<Record<string, string>>({})

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target

    setValues((current) => ({
      ...current,
      [name]: value,
    }))
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const validationErrors = validateRecipeForm(values)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    onSubmit({
      title: values.title.trim(),
      summary: values.summary.trim(),
      category: values.category,
      imageUrl: values.imageUrl.trim() || undefined,
      ingredients: values.ingredients
        .split(/[\n,]/)
        .map((ingredient) => ingredient.trim())
        .filter(Boolean),
      instructions: values.instructions.trim(),
    })

    setValues(initialFormValues)
    setErrors({})
  }

  return (
    <form className="recipe-form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="title">Title</label>
      <input id="title" name="title" value={values.title} onChange={handleChange} />
      {errors.title ? <p className="field-error">{errors.title}</p> : null}

      <label htmlFor="summary">Summary</label>
      <textarea id="summary" name="summary" value={values.summary} onChange={handleChange} rows={3} />
      {errors.summary ? <p className="field-error">{errors.summary}</p> : null}

      <label htmlFor="category">Category</label>
      <select id="category" name="category" value={values.category} onChange={handleChange}>
        <option value="">Choose a category</option>
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner</option>
        <option value="dessert">Dessert</option>
        <option value="snack">Snack</option>
      </select>
      {errors.category ? <p className="field-error">{errors.category}</p> : null}

      <label htmlFor="imageUrl">Image URL (optional)</label>
      <input id="imageUrl" name="imageUrl" value={values.imageUrl} onChange={handleChange} />
      {errors.imageUrl ? <p className="field-error">{errors.imageUrl}</p> : null}

      <label htmlFor="ingredients">Ingredients (one per line or comma-separated)</label>
      <textarea
        id="ingredients"
        name="ingredients"
        value={values.ingredients}
        onChange={handleChange}
        rows={4}
      />
      {errors.ingredients ? <p className="field-error">{errors.ingredients}</p> : null}

      <label htmlFor="instructions">Instructions</label>
      <textarea
        id="instructions"
        name="instructions"
        value={values.instructions}
        onChange={handleChange}
        rows={5}
      />
      {errors.instructions ? <p className="field-error">{errors.instructions}</p> : null}

      <button type="submit">Save Recipe</button>
    </form>
  )
}

export default ItemForm