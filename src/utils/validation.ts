import type { RecipeFormErrors, RecipeFormValues } from '../types'

function isValidUrl(value: string): boolean {
  try {
    const parsed = new URL(value)
    return ['http:', 'https:'].includes(parsed.protocol)
  } catch {
    return false
  }
}

function hasAtLeastOneIngredient(rawIngredients: string): boolean {
  return rawIngredients
    .split(/[\n,]/)
    .map((value) => value.trim())
    .some(Boolean)
}

export function validateRecipeForm(values: RecipeFormValues): RecipeFormErrors {
  const errors: RecipeFormErrors = {}

  if (!values.title.trim()) {
    errors.title = 'Title is required.'
  }

  if (!values.summary.trim() || values.summary.trim().length < 10) {
    errors.summary = 'Summary must be at least 10 characters.'
  }

  if (!values.category.trim()) {
    errors.category = 'Category is required.'
  }

  if (!hasAtLeastOneIngredient(values.ingredients)) {
    errors.ingredients = 'Add at least one ingredient.'
  }

  if (!values.instructions.trim() || values.instructions.trim().length < 20) {
    errors.instructions = 'Instructions must be at least 20 characters.'
  }

  if (values.imageUrl.trim() && !isValidUrl(values.imageUrl.trim())) {
    errors.imageUrl = 'Image URL must be a valid http(s) URL.'
  }

  return errors
}