import type { Recipe } from '../types'

const RECIPES_ENDPOINT = '/data/recipes.json'

export async function getRecipes(signal?: AbortSignal): Promise<Recipe[]> {
  const response = await fetch(RECIPES_ENDPOINT, { signal })

  if (!response.ok) {
    throw new Error('Unable to load recipes right now. Please try again.')
  }

  const data = (await response.json()) as Recipe[]
  return data
}