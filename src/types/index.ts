export interface Recipe {
  id: string
  title: string
  summary: string
  category: string
  imageUrl?: string
  ingredients: string[]
  instructions: string
  createdAt: string
}

export interface NewRecipeInput {
  title: string
  summary: string
  category: string
  imageUrl?: string
  ingredients: string[]
  instructions: string
}

export interface RecipeFormValues {
  title: string
  summary: string
  category: string
  imageUrl: string
  ingredients: string
  instructions: string
}

export type RecipeFormErrors = Partial<Record<keyof RecipeFormValues, string>>