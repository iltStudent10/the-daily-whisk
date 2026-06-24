import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useFetchItems } from '../hooks/useFetchItems'
import type { NewRecipeInput, Recipe } from '../types'

interface AppProviderProps {
  children: React.ReactNode
}

export interface AppContextValue {
  recipes: Recipe[]
  filteredRecipes: Recipe[]
  filter: string
  loading: boolean
  error: string | null
  setFilter: (value: string) => void
  addRecipe: (input: NewRecipeInput) => Recipe
}

export const AppContext = createContext<AppContextValue | undefined>(undefined)

export function AppProvider({ children }: AppProviderProps) {
  const { data, loading, error } = useFetchItems()
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    if (data && recipes.length === 0) {
      setRecipes(data)
    }
  }, [data, recipes.length])

  const filteredRecipes = useMemo(() => {
    if (filter === 'all') {
      return recipes
    }

    return recipes.filter((recipe) => recipe.category === filter)
  }, [recipes, filter])

  function addRecipe(input: NewRecipeInput): Recipe {
    const recipe: Recipe = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }

    setRecipes((current) => [recipe, ...current])
    return recipe
  }

  const value = useMemo(
    () => ({
      recipes,
      filteredRecipes,
      filter,
      loading,
      error,
      setFilter,
      addRecipe,
    }),
    [recipes, filteredRecipes, filter, loading, error],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext(): AppContextValue {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error('useAppContext must be used inside AppProvider')
  }

  return context
}